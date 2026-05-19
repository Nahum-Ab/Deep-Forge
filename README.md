# DeepForge Project Setup Guide

Welcome to the DeepForge project! This guide will provide you with all the required steps, hidden dependencies, and configuration setup to run this complete full-stack application natively on your local machine outside of any managed environments.

## 1. Prerequisites
Ensure you have the following installed locally on your clean setup:
- **Node.js** (v18.0.0 or higher recommended, preferably v20+)
- **npm** (v9+ or v10+)
- **Git** (optional, but recommended for version control)

## 2. Project Features
- **Client**: React (Vite, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion)
- **Server**: Express, Node.js, `esbuild` for build-time resolution, rate-limiting, external service handling.
- **Third-Party Services**:
  - Gumroad API (v2) for product fetching
  - Google Sheets API for Waitlist logic
  - SMTP/Nodemailer & Resend for transactional emails

---

## 3. Environment Variables (Critical Setup)

Below is the COMPLETE environment variable required to operate standard functionality. Do not skip setting these.

**CRITICAL NOTE FOR DOWNLOADED BUNDLES**:
Unlike standard templates, **your `.env` file containing your GUMROAD_ACCESS_TOKEN has been exceptionally included in the ZIP download** so that the backend works out-of-the-box locally. `GUMROAD_ACCESS_TOKEN` is synced dynamically in `server.ts` to perform direct Gumroad API integrations. No mock data is used.

### Environment Variable Usage Explained:

**File**: `.env`

- **APP_URL** / **SITE_URL**
  - *Where*: Used in `server.ts` or email services for generating links back to this app.
  - *Setup*: `http://localhost:3000` for local dev.

- **GUMROAD_ACCESS_TOKEN**
  - *Where*: `server.ts` > `/api/products` route handler (Line ~275)
  - *Why*: Authenticates against `https://api.gumroad.com/v2/products` to fetch live products dynamically.
  - *How to get*: Go to Gumroad Settings -> Advanced -> Applications and generate an access token.

- **GOOGLE_SHEETS_SPREADSHEET_ID**
  - *Where*: `server.ts` > Google Auth configuration for `/api/subscribe` route handler (Line ~76).
  - *Why*: Connects Waitlist component directly to Google sheets where your users email will land.

- **GOOGLE_SERVICE_ACCOUNT_EMAIL**
  - *Where*: `server.ts` > Google Auth configuration.
  - *Why*: The developer account identity permitted to edit the Google sheet document.

- **GOOGLE_PRIVATE_KEY**
  - *Where*: `server.ts` > Google Auth configuration.
  - *Why*: Essential Private Key string that Google SDK uses for JWT token generation. Format must respect `\n` linebreaks.

- **EMAIL_FROM** / **RESEND_API_KEY** / **SMTP_EMAIL** / **SMTP_PASSWORD**
  - *Where*: `server.ts` > `sendWelcomeEmail` function.
  - *Why*: Determines context about welcome emails sent to users joining the waitlist via Resend SDK or standard Nodemailer.

- **VITE_FIREBASE_*** (API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID)
  - *Where*: Generally injected in the vite `import.meta.env` accessible on your Client-Side application (used if you scale this project using Firebase Analytics or DB in the future).

*(A sanitized version of these keys is provided in `.env.example` within the codebase).*

---

## 4. Run Locally

### Approach A: Development Mode (Hot Reloading / Live Server)
Open your terminal at the project root folder.

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Dev server**
   ```bash
   npm run dev
   ```
   **Note**: The script handles both the React frontend (Vite) and the Express backend (TSX/Node). Expect terminal logs to mention both Vite Hot-reloading alongside standard `http://localhost:3000` port bindings for Express API routing.

### Approach B: Production Build (Compilation and Serving)
Deploying to a Node hosting service like Render, Vercel (as an App), or Heroku.

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Build Client and Server**
   ```bash
   npm run build
   ```
   *Explanation*: This triggers Vite's build method to compile React to static files inside `./dist`, while subsequently triggering `esbuild` to convert `server.ts` into a CommonJS production-ready server file `./dist/server.cjs`.

3. **Start the optimized runtime server**
   ```bash
   npm run start
   ```
   Your app will serve both Express routes + React static bundles simultaneously on `http://localhost:3000`.

---

## 5. Explicitly Removed Cloud-Managed Logic
Historically, this structure may rely on hidden runtime containers provided by Google AI Studio. **This project has strictly excised all managed infrastructure assumptions.**

- **Routing / API Proxy**: All custom API routing (`/api/health`, `/api/subscribe`, `/api/products`) is fully exposed and authored in `./server.ts`.
- **Environment Context Loading**: Standard `dotenv.config()` intercepts the local `.env` logic manually on load. No internal platform manager injects these implicitly on start.
- **Vite Middleware Integration**: Server natively registers Vite standard routing integration internally inside `./server.ts`. No proxy or hidden Nginx container routing manages this anymore.

---

## 6. Project Architecture / File Structure Explained

```text
|-- dist                 # Final optimized production builds (generated post-build)
|-- public               # Public assets like favicon or global svg (unhashed)
|-- src
|   |-- components       # Reusable modular React UI code (Hero, Cards, Buttons, Form Modal)
|   |-- lib              # Hooks, Data logic, Welcome Email Text/HTML Templates
|   |-- types            # Top level typescript structures & types
|   |-- index.css        # Tailwind's integration point for stylesheets
|   |-- App.tsx          # Main React UI routing tree
|   |-- main.tsx         # The client entry point mounting React root node.
|-- .env.example         # An explicit placeholder map of all your sensitive keys needed to work locally
|-- package.json         # Complete mapping of production & dev-only npm packages + scripts!
|-- server.ts            # ALL Back-end endpoints, external data-fetching (gumroad, sheets) and standard dev Express setups natively written for you!
|-- tsconfig.json        # Compiler preferences applied globally for the client build process.
|-- vite.config.ts       # Config to bootstrap standard Vite environment rendering pipelines.
```

## 7. Diagnostics & Troubleshooting
* **Module not found during runtime**: Ensure you executed `npm install` post-download.
* **Gumroad products not fetching**: Verify valid Bearer key is typed accurately onto `.env` at `GUMROAD_ACCESS_TOKEN`. Use `curl https://api.gumroad.com/v2/products -H "Authorization: Bearer <TOKEN>"` as isolated test.
* **Unstyled pages / Tailwind CSS classes broken**: Re-run the TSX process; ensure `index.css` is still referenced appropriately in `main.tsx`. Make sure your Node versions fit the ^18.x standard expectations.
* **Error `TypeError [ERR_INVALID_URL_SCHEME]` on Vite build**: Validate your `@/` alias targets or node tsx parameters. The package `tsconfig.node.json` configuration typically guarantees this resolves.
