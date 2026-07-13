// api/log-view.js (Inside your BACKEND Vercel project)

export default async function handler(req, res) {
  const origin = req.headers.origin;

  /* ========= CORS CONFIGURATION ========= */
  // Dynamically mirrors the request origin so your frontend never triggers a CORS block
  res.setHeader("Access-Control-Allow-Origin", origin || "*");
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  /* ========= CORS PRE-FLIGHT SOLUTION ========= */
  // This turns the red "404 Not Found" OPTIONS check into a green "200 OK"
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  /* ========= ENFORCE POST METHOD ========= */
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    /* ========= SAFE BODY PARSE ========= */
    let body;
    try {
      body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    } catch (err) {
      return res.status(400).json({ success: false, message: "Invalid JSON" });
    }

    const { pagePath, userId } = body;

    // Validation check
    if (!pagePath) {
      return res.status(400).json({
        success: false,
        message: "pagePath is required",
      });
    }

    /* ========= PRINT ANALYTICS LOGS WITH TIMESTAMP ========= */
    const timestamp = new Date().toISOString();
    const activeUser = userId || "Guest";

    // This prints perfectly in your growmore-1 Vercel Project "Logs" dashboard tab
    console.log(`[VERCEL LOG] ${timestamp} | User: ${activeUser} | Page: ${pagePath}`);

    /* ========= SUCCESS RESPONSES ========= */
    return res.status(200).json({
      success: true,
      message: "Log registered successfully.",
    });

  } catch (error) {
    console.error("ANALYTICS CRITICAL ERROR FULL:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
