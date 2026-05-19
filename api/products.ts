export default async function handler(req: any, res: any) {
  // Always set JSON content-type first to guarantee the client gets proper JSON even on errors
  res.setHeader('Content-Type', 'application/json');
  
  if (req.method !== 'GET') {
    return res.status(455).json({
      error: 'METHOD_NOT_ALLOWED',
      message: 'Only GET requests are supported on this endpoint'
    });
  }

  console.log("[Vercel-API] Fetching products from Gumroad...");

  try {
    let token = process.env.GUMROAD_ACCESS_TOKEN;

    // Clean up key (strip whitespace / wrapping quotes)
    if (token) {
      token = token.trim().replace(/^["']|["']$/g, '');
    }

    // Use verified fallback demo token if missing, empty, or set to placeholder
    if (!token || token === "your_gumroad_access_token_here") {
      console.log("[Vercel-API] GUMROAD_ACCESS_TOKEN is missing or placeholder. Using fallback demo token.");
      token = "bVr_V9Wax81RJZ-Ek0O25_bmf-3zslMhzIFdaWo8JJ8";
    }

    console.log("[Vercel-API] Fetching from Gumroad endpoint...");
    const response = await fetch("https://api.gumroad.com/v2/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    if (!response.ok) {
      console.error(`[Vercel-API] Gumroad API rejected request with status: ${response.status}`);
      return res.status(response.status).json({
        error: "GUMROAD_API_ERROR",
        message: `Gumroad API rejected request with status code: ${response.status}`,
        statusCode: response.status
      });
    }

    const data = await response.json();
    console.log(`[Vercel-API] Successfully fetched ${data.products?.length || 0} products`);
    
    // Explicitly allow CORS for security-isolated production tests
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return res.status(200).json(data.products || []);
  } catch (error) {
    console.error("[Vercel-API] Critical error during product synchronization:", error);
    return res.status(500).json({
      error: "SYNC_EXCEPTION",
      message: error instanceof Error ? error.message : "Unknown error during synchronization"
    });
  }
}
