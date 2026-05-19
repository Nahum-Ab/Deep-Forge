import express from "express";
import path from "path";
import dotenv from "dotenv";
import { google } from "googleapis";
import { Resend } from "resend";
import nodemailer from "nodemailer";
import fs from "fs";
import { getWelcomeEmailHtml, getWelcomeEmailText } from "./src/lib/emails/welcomeEmail";

const envPathRoot = path.resolve(process.cwd(), '.env');
const examplePathRoot = path.resolve(process.cwd(), '.env.example');

if (!fs.existsSync(envPathRoot) && fs.existsSync(examplePathRoot)) {
  console.log(`[Env] .env not found. Auto-generating from .env.example...`);
  try {
    fs.copyFileSync(examplePathRoot, envPathRoot);
    console.log(`[Env] Success! Copied .env.example to .env automatically.`);
  } catch (err) {
    console.error(`[Env] Failed to copy .env.example to .env automatically`, err);
  }
}

if (fs.existsSync(envPathRoot)) {
  dotenv.config({ path: envPathRoot, override: true });
  console.log(`[Env] Loaded from ${envPathRoot}`);
} else {
  console.warn(`[Env] No .env file found. Attempting to fall back to .env.example...`);
  if (fs.existsSync(examplePathRoot)) {
    dotenv.config({ path: examplePathRoot, override: true });
    console.log(`[Env] Loaded fallback from ${examplePathRoot}`);
  }
}

// Basic rate limiting map (dev-local, for production use Redis)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export const app = express();
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API Route to handle signatures/subscriptions
app.post("/api/subscribe", async (req, res) => {
  const { email, source = "website" } = req.body;
  const clientIp = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "unknown";

    // 1. Basic Rate Limiting (5 requests per 10 mins per IP)
    const now = Date.now();
    const rateData = rateLimitMap.get(clientIp) || { count: 0, lastReset: now };
    if (now - rateData.lastReset > 600000) {
      rateData.count = 0;
      rateData.lastReset = now;
    }
    if (rateData.count >= 5) {
      return res.status(429).json({ 
        success: false, 
        error: "RATE_LIMIT_EXCEEDED", 
        message: "Too many attempts. Please try again later." 
      });
    }
    rateData.count++;
    rateLimitMap.set(clientIp, rateData);

    // 2. Server-side Validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: "INVALID_EMAIL", 
        message: "Please provide a valid email address." 
      });
    }

    const sanitizedEmail = email.trim().toLowerCase();

    try {
      // 3. Google Sheets Integration
      // Aggressive cleaning for environment variables to handle various copy-paste errors
      const deepClean = (val?: string, field?: 'email' | 'key' | 'id') => {
        if (!val) return "";
        let cleaned = val.trim();
        
        // 1. Handle full Spreadsheet URL instead of just ID
        if (field === 'id' && cleaned.includes('/d/')) {
          const match = cleaned.match(/\/d\/([a-zA-Z0-9-_]+)/);
          if (match) return match[1];
        }

        // 2. Detect if the user pasted the entire Service Account JSON into this field
        if (cleaned.startsWith("{") && cleaned.endsWith("}")) {
          try {
            const parsed = JSON.parse(cleaned);
            if (field === 'email' && parsed.client_email) return parsed.client_email.trim();
            if (field === 'key' && parsed.private_key) return parsed.private_key.trim();
            if (field === 'id' && parsed.spreadsheet_id) return parsed.spreadsheet_id.trim();
          } catch (e) {
            // Not valid JSON, continue
          }
        }

        // 3. Strip common prefixes (case insensitive)
        cleaned = cleaned.replace(/^(Email|Key|Account|Id|Token|Secret|client_email|private_key):\s*/i, '');

        // 4. Handle JSON-escaped newlines sometimes present in manual entry
        if (field === 'key') {
          cleaned = cleaned.replace(/\\n/g, '\n');
        }

        // 5. Extract PEM block if it's a key
        if (field === 'key') {
          const startMarker = "-----BEGIN PRIVATE KEY-----";
          const startIdx = cleaned.indexOf(startMarker);
          if (startIdx !== -1) {
            cleaned = cleaned.substring(startIdx);
          }
        }

        // 6. Final quote stripping and invisible char removal
        return cleaned.replace(/^["']|["']$/g, '').replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
      };

      const fs = await import("fs/promises");
      let fallbackEmail = "";
      let fallbackKey = "";
      try {
        const saData = await fs.readFile(path.join(process.cwd(), "service-account.json"), "utf8");
        const saJson = JSON.parse(saData);
        fallbackEmail = saJson.client_email || "";
        fallbackKey = saJson.private_key || "";
      } catch (e) {
        // Ignored
      }

      const spreadsheetId = deepClean(process.env.GOOGLE_SHEETS_SPREADSHEET_ID || "1Qg5yq6-Ah1B_yAJXuDysnYgJlIUQMBh9an955GFYwUI", 'id');
      const emailEnv = deepClean(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, 'email');
      const keyEnv = deepClean(process.env.GOOGLE_PRIVATE_KEY, 'key');
      
      const isPersonalEmail = (email: string) => email.includes("gmail.com") && !email.includes("gserviceaccount.com");

      // Prioritize fallback if it's a valid service account, otherwise use env (unless env is a personal email but fallback isn't available)
      let clientEmail = fallbackEmail || emailEnv;
      if (fallbackEmail && isPersonalEmail(emailEnv)) {
        clientEmail = fallbackEmail;
      } else if (!fallbackEmail && isPersonalEmail(emailEnv)) {
        console.error(`[Subscribe] CONFIG ERROR: [${emailEnv}] is a personal account. This WILL fail.`); 
      }

      let privateKey = fallbackKey || keyEnv;
      
      const isValidFormat = clientEmail.includes("@") && privateKey.includes("PRIVATE KEY") && spreadsheetId.length > 5;
      const isPlaceholder = clientEmail.includes("your-service-account") || spreadsheetId.includes("your-spreadsheet-id");

      if (isValidFormat && !isPlaceholder) {
        if (isPersonalEmail(clientEmail)) {
          console.error(`[Subscribe] CONFIG ERROR: [${clientEmail}] is a personal account.`); 
          console.error(`=> You MUST use the service email from your JSON: "firebase-adminsdk-fbsvc@gen-lang-client-0523345337.iam.gserviceaccount.com"`);
        }

        try {
          console.log(`[Subscribe] Initializing sheet sync. Service Account: ${clientEmail.substring(0, 15)}...`);
          
          const jwtClient = new google.auth.JWT({
            email: clientEmail,
            key: privateKey,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
          });

          // Pre-flight authorization to catch auth errors early
          await jwtClient.authorize();

          const sheets = google.sheets({ version: 'v4', auth: jwtClient });

          // Check for duplicates
          const range = 'Sheet1!A:A';
          console.log("[Subscribe] Verifying subscriber registry...");
          const getResponse = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
          });

          const rows = getResponse.data.values || [];
          const isDuplicate = rows.some(row => row[0]?.toLowerCase() === sanitizedEmail);

          if (isDuplicate) {
            console.log("[Subscribe] Email already in registry.");
            return res.json({ success: true, status: "ALREADY_SUBSCRIBED" });
          }

          // Append new row
          console.log("[Subscribe] Registering new elite member...");
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
          console.log("[Subscribe] Google Sheets registry updated.");
        } catch (sheetsError: any) {
          console.error("[Subscribe] Registry Sync Failed:", sheetsError.message);
          
          if (sheetsError.response?.data) {
            console.error("[Subscribe] Error Details:", JSON.stringify(sheetsError.response.data));
          }

          if (sheetsError.message.includes('invalid_grant')) {
            console.error(`FATAL AUTH ERROR: The service account [${clientEmail}] was not found or the private key is mismatched.`);
            console.error("1. Verify the 'client_email' in your JSON key file MATCHES exactly.");
            console.error("2. Ensure the PRIVATE KEY is the FULL block including BEGIN/END lines.");
          } else if (sheetsError.message.includes('permission_denied') || (sheetsError.code === 403)) {
            console.error(`PERMISSION DENIED: You MUST share the Spreadsheet with [${clientEmail}] as an 'Editor'.`);
          } else if (sheetsError.code === 404) {
            console.error(`SPREADSHEET NOT FOUND: Check if ID [${spreadsheetId}] is correct.`);
          }
          // Proceeding to email phase regardless of registry sync status
        }
      } else {
        if (isPlaceholder) {
          console.warn("[Subscribe] Google Sheets configuration appears to be placeholders. Skipping sync.");
        } else {
          console.warn("[Subscribe] Google Sheets configuration missing (ID, Email, or Key). Skipping sync.");
        }
      }

      // 4. Welcome Email via Resend or Nodemailer
      const resendKey = process.env.RESEND_API_KEY;
      const smtpEmail = process.env.SMTP_EMAIL;
      const smtpPassword = process.env.SMTP_PASSWORD;
      
      const fromEmail = process.env.EMAIL_FROM || "DeepForge Team <hello@deepforge.com>";
      const siteUrl = process.env.SITE_URL || process.env.APP_URL || "https://deepforge.com";
      const emailSubject = "Welcome to DeepForge — You're In.";

      if (resendKey) {
        console.log("[Subscribe] Sending welcome email via Resend...");
        const resend = new Resend(resendKey);
        try {
          await resend.emails.send({
            from: fromEmail,
            to: sanitizedEmail,
            subject: emailSubject,
            html: getWelcomeEmailHtml(siteUrl),
            text: getWelcomeEmailText(siteUrl),
          });
          console.log("[Subscribe] Welcome email sent via Resend.");
        } catch (emailError) {
          console.error("[Subscribe] Resend email delivery failed:", emailError);
        }
      } else if (smtpEmail && smtpPassword) {
        console.log("[Subscribe] Sending welcome email via SMTP (Nodemailer)...");
        try {
          const transporter = nodemailer.createTransport({
            service: "gmail", // Assuming Gmail for ease, otherwise you can use host/port
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
          console.log("[Subscribe] Welcome email sent via SMTP.");
        } catch (emailError) {
          console.error("[Subscribe] SMTP email delivery failed:", emailError);
        }
      } else {
        console.warn("[Subscribe] Neither Resend API key nor SMTP credentials provided. Skipping welcome email.");
      }

      res.json({ success: true, status: "SUBSCRIBED" });
    } catch (error) {
      console.error("[Subscribe] Critical error:", error);
      res.status(500).json({ 
        success: false, 
        error: "SERVER_ERROR", 
        message: "Internal server error. Please try again later." 
      });
    }
  });

  // API Route to fetch Gumroad products
  app.get("/api/products", async (req, res) => {
    console.log("[Gumroad] Received request for /api/products");
    try {
      let token = process.env.GUMROAD_ACCESS_TOKEN;
      
      // Trim and clean up token if provided
      if (token) {
        token = token.trim().replace(/^["']|["']$/g, '');
      }
      
      // Fallback to verified demo token if missing, empty, or set to placeholder
      if (!token || token === "your_gumroad_access_token_here") {
        console.log("[Gumroad] GUMROAD_ACCESS_TOKEN is missing or placeholder. Using verified fallback demo token.");
        token = "bVr_V9Wax81RJZ-Ek0O25_bmf-3zslMhzIFdaWo8JJ8";
      }

      console.log("[Gumroad] Fetching from external API...");
      const response = await fetch("https://api.gumroad.com/v2/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        console.error(`[Gumroad] API rejected request: ${response.status}`);
        return res.status(response.status).json({ 
          error: "API_REJECTION", 
          message: `Gumroad API rejected request: ${response.status}`,
          status: response.status 
        });
      }

      const data = await response.json();
      console.log(`[Gumroad] Successfully fetched ${data.products?.length || 0} products`);
      res.json(data.products || []);
    } catch (error) {
      console.error("[Gumroad] Critical error:", error);
      // Ensure we always return JSON to the client
      res.status(500).json({ 
        error: "SYNC_EXCEPTION", 
        message: error instanceof Error ? error.message : "Unknown synchronization error" 
      });
    }
  });

async function startServer() {
  const PORT = 3000;

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}
