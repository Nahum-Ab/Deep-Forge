/**
 * Welcome Email Template for DeepForge
 * Match with the brand: Minimal, Premium, Dark-accented.
 */
export const getWelcomeEmailHtml = (siteUrl: string) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to DeepForge</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #050505;
      color: #ffffff;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
      background-color: #050505;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
    }
    .logo {
      font-size: 24px;
      font-weight: 800;
      letter-spacing: -0.05em;
      text-transform: uppercase;
      color: #ffffff;
      text-decoration: none;
    }
    .accent {
      color: #4f6ef7;
    }
    .content {
      line-height: 1.6;
      font-size: 16px;
      color: #a1a1aa;
    }
    .headline {
      font-size: 28px;
      font-weight: 800;
      letter-spacing: -0.04em;
      color: #ffffff;
      margin-bottom: 20px;
      line-height: 1.2;
    }
    .cta-container {
      margin-top: 40px;
      text-align: center;
    }
    .cta-button {
      display: inline-block;
      background-color: #4f6ef7;
      color: #ffffff;
      padding: 16px 32px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: background-color 0.2s ease;
    }
    .footer {
      margin-top: 60px;
      padding-top: 20px;
      border-top: 1px solid #1f1f23;
      font-size: 12px;
      color: #52525b;
      text-align: center;
    }
    .footer a {
      color: #52525b;
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <a href="${siteUrl}" class="logo">Deep<span class="accent">Forge</span></a>
    </div>
    
    <div class="content">
      <h1 class="headline">You're now part of DeepForge.</h1>
      <p>We're building something precise and powerful. As an early member, you'll be the first to know when we launch new performance systems, strategic protocols, and engineering insights.</p>
      <p>Stay sharp. Stay disciplined. The standard is excellence.</p>
    </div>

    <div class="cta-container">
      <a href="${siteUrl}" class="cta-button">Explore The Arsenal</a>
    </div>

    <div class="footer">
      <p>&copy; 2025 DeepForge Labs. All rights reserved.</p>
      <p>If you didn't sign up for this, you can safely ignore this email or <a href="#">unsubscribe</a>.</p>
    </div>
  </div>
</body>
</html>
  `;
};

export const getWelcomeEmailText = (siteUrl: string) => {
  return `
Welcome to DeepForge.

You're now part of the elite. We're building something precise and powerful.
As an early member, you'll be the first to know when we launch, what we're building, and why it matters.

Explore The Arsenal: ${siteUrl}

Stay sharp.

DeepForge Team
  `;
};
