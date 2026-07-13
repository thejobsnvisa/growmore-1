// api/log-view.js (Inside your BACKEND Vercel project)

export default async function handler(req, res) {
  const origin = req.headers.origin;

  /* ========= STRICT CORS SYSTEM ========= */
  // Checks if the incoming site is your frontend domain
  if (origin && (origin === "https://growmore.one" || origin === "https://www.growmore.one" || origin.includes("localhost"))) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Fallback
  }

  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  /* ========= OPTIONS PRE-FLIGHT ========= */
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  /* ========= REST OF YOUR CODE (POST HANDLING) ========= */
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    let body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { pagePath, userId } = body;

    console.log(`[VERCEL LOG] User: ${userId || 'Guest'} | Page: ${pagePath}`);

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
