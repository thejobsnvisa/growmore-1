// api/log-view.js (Inside your BACKEND Vercel project)

export default async function handler(req, res) {
  const origin = req.headers.origin;

  /* ========= DYNAMIC CORS SYSTEM ========= */
  if (origin && (origin === "https://growmore.one" || origin === "https://www.growmore.one" || origin.includes("localhost"))) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  /* ========= CORS PRE-FLIGHT COMPLIANCE ========= */
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    /* ========= SAFE JSON PARSE ========= */
    let body;
    try {
      body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    } catch (err) {
      return res.status(400).json({ success: false, message: "Invalid JSON" });
    }

    // Extracted 'action' to represent the click event
    const { pagePath, userId, timestamp, action } = body;

    if (!pagePath) {
      return res.status(400).json({ success: false, message: "pagePath is required" });
    }

    const userIdentifier = userId ? `UID: ${userId}` : "Unauthenticated User";
    const logTimestamp = timestamp || new Date().toISOString();
    const eventAction = action ? `[Action: ${action}]` : "[Action: Page View]";

    /* ========= PRINT ANALYTICS LOGS WITH ORIGINAL TIMESTAMPS ========= */
    // Will output: [TRACKING] [Time: ...] | [User: ...] | [Page: /about] | [Action: Clicked Voice Widget Start]
    console.log(`[TRACKING] [Time: ${logTimestamp}] | [User: ${userIdentifier}] | [Page: ${pagePath}] | ${eventAction}`);

    return res.status(200).json({
      success: true,
      message: "Log successfully written.",
    });

  } catch (error) {
    console.error("CRITICAL ERROR IN ANALYTICS LOG:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
