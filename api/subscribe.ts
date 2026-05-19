import { google } from 'googleapis';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import { getWelcomeEmailHtml, getWelcomeEmailText } from '../src/lib/emails/welcomeEmail';

export default async function handler(req: any, res: any) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(455).json({
      success: false,
      error: 'METHOD_NOT_ALLOWED',
      message: 'Only POST requests are supported on this endpoint'
    });
  }

  const { email, source = "website" } = req.body || {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ 
      success: false, 
      error: "INVALID_EMAIL", 
      message: "Please provide a valid email address." 
    });
  }

  const sanitizedEmail = email.trim().toLowerCase();

  try {
    // 1. Google Sheets Integration
    const deepClean = (val?: string, field?: 'email' | 'key' | 'id') => {
      if (!val) return "";
      let cleaned = val.trim();
      
      if (field === 'id' && cleaned.includes('/d/')) {
        const match = cleaned.match(/\/d\/([a-zA-Z0-9-_]+)/);
        if (match) return match[1];
      }

      if (cleaned.startsWith("{") && cleaned.endsWith("}")) {
        try {
          const parsed = JSON.parse(cleaned);
          if (field === 'email' && parsed.client_email) return parsed.client_email.trim();
          if (field === 'key' && parsed.private_key) return parsed.private_key.trim();
          if (field === 'id' && parsed.spreadsheet_id) return parsed.spreadsheet_id.trim();
        } catch (e) {
          // Ignore parse errors
        }
      }

      if (field === 'key') {
        cleaned = cleaned.replace(/\\n/g, '\n');
        const startMarker = "-----BEGIN PRIVATE KEY-----";
        const startIdx = cleaned.indexOf(startMarker);
        if (startIdx !== -1) {
          cleaned = cleaned.substring(startIdx);
        }
      }

      return cleaned.replace(/^["']|["']$/g, '').replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
    };

    // Load Service Account JSON if exists
    let fallbackEmail = "";
    let fallbackKey = "";
    try {
      const saPath = path.join(process.cwd(), "service-account.json");
      if (fs.existsSync(saPath)) {
        const saData = fs.readFileSync(saPath, "utf8");
        const saJson = JSON.parse(saData);
        fallbackEmail = saJson.client_email || "";
        fallbackKey = saJson.private_key || "";
      }
    } catch (e) {
      // Ignored
    }

    const spreadsheetId = deepClean(process.env.GOOGLE_SHEETS_SPREADSHEET_ID || "1Qg5yq6-Ah1B_yAJXuDysnYgJlIUQMBh9an955GFYwUI", 'id');
    const emailEnv = deepClean(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, 'email');
    const keyEnv = deepClean(process.env.GOOGLE_PRIVATE_KEY, 'key');
    
    let clientEmail = fallbackEmail || emailEnv;
    let privateKey = fallbackKey || keyEnv;
    
    const isValidFormat = clientEmail.includes("@") && privateKey.includes("PRIVATE KEY") && spreadsheetId.length > 5;
    const isPlaceholder = clientEmail.includes("your-service-account") || spreadsheetId.includes("your-spreadsheet-id");

    if (isValidFormat && !isPlaceholder) {
      try {
        console.log(`[Vercel-Subscribe] Injecting entry to Google Sheet: ${spreadsheetId}`);
        const jwtClient = new google.auth.JWT({
          email: clientEmail,
          key: privateKey,
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        await jwtClient.authorize();
        const sheets = google.sheets({ version: 'v4', auth: jwtClient });

        // Check for duplicates
        const range = 'Sheet1!A:A';
        const getResponse = await sheets.spreadsheets.values.get({
          spreadsheetId,
          range,
        });

        const rows = getResponse.data.values || [];
        const isDuplicate = rows.some(row => row[0]?.toLowerCase() === sanitizedEmail);

        if (isDuplicate) {
          console.log("[Vercel-Subscribe] Email already in waitlist registry.");
        } else {
          // Append new row
          await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: 'Sheet1!A:D',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
              values: [[
                sanitizedEmail,
                new Date().toISOString(),
                source,
                "subscribed"
              ]],
            },
          });
          console.log("[Vercel-Subscribe] Registry Google Sheet updated.");
        }
      } catch (sheetsError: any) {
        console.error("[Vercel-Subscribe] Google Sheet Sync Failed:", sheetsError.message);
      }
    } else {
      console.warn("[Vercel-Subscribe] Credentials formatting error or missing configuration. Skipping sheets sync.");
    }

    // 2. Welcome Email via Resend or Nodemailer
    const resendKey = process.env.RESEND_API_KEY;
    const smtpEmail = process.env.SMTP_EMAIL;
    const smtpPassword = process.env.SMTP_PASSWORD;
    
    const fromEmail = process.env.EMAIL_FROM || "DeepForge Team <hello@deepforge.com>";
    const siteUrl = process.env.SITE_URL || process.env.APP_URL || "https://deepforge.com";
    const emailSubject = "Welcome to DeepForge — You're In.";

    if (resendKey && !resendKey.includes("re_your_resend_api_key_here")) {
      console.log("[Vercel-Subscribe] Sending email via Resend...");
      const resend = new Resend(resendKey);
      try {
        await resend.emails.send({
          from: fromEmail,
          to: sanitizedEmail,
          subject: emailSubject,
          html: getWelcomeEmailHtml(siteUrl),
          text: getWelcomeEmailText(siteUrl),
        });
        console.log("[Vercel-Subscribe] Welcome email sent.");
      } catch (e) {
        console.error("[Vercel-Subscribe] Resend API failed:", e);
      }
    } else if (smtpEmail && smtpPassword && !smtpEmail.includes("your_email@gmail.com")) {
      console.log("[Vercel-Subscribe] Sending email via SMTP (Nodemailer)...");
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: smtpEmail,
            pass: smtpPassword,
          },
        });
        
        await transporter.sendMail({
          from: fromEmail,
          to: sanitizedEmail,
          subject: emailSubject,
          text: getWelcomeEmailText(siteUrl),
          html: getWelcomeEmailHtml(siteUrl),
        });
        console.log("[Vercel-Subscribe] SMTP welcome email sent.");
      } catch (e) {
        console.error("[Vercel-Subscribe] SMTP send failed:", e);
      }
    } else {
      console.warn("[Vercel-Subscribe] No email configuration keys found. Skipping welcome email.");
    }

    return res.status(200).json({ success: true, status: "SUBSCRIBED" });
  } catch (error) {
    console.error("[Vercel-Subscribe] Server Error:", error);
    return res.status(500).json({
      success: false,
      error: "SERVER_ERROR",
      message: error instanceof Error ? error.message : "Internal subscription handler crash"
    });
  }
}
