import { google } from 'googleapis';

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

    const { pagePath, userId, timestamp, action } = body;

    if (!pagePath) {
      return res.status(400).json({ success: false, message: "pagePath is required" });
    }

    const userIdentifier = userId ? `UID: ${userId}` : "Unauthenticated User";
    const logTimestamp = timestamp || new Date().toISOString();
    const eventAction = action || "Page View";

    /* ========= PRINT ANALYTICS LOGS TO VERCEL CONSOLE ========= */
    console.log(`[TRACKING] [Time: ${logTimestamp}] | [User: ${userIdentifier}] | [Page: ${pagePath}] | [Action: ${eventAction}]`);

    /* ========= DIRECT GOOGLE SHEETS INTEGRATION ========= */
    // Ensure you set these variables in your Vercel Project Environment Variables Dashboard
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (clientEmail && privateKey && spreadsheetId) {
      // Initialize Auth Client
      const auth = new google.auth.JWT(
        clientEmail,
        null,
        privateKey.replace(/\\n/g, '\n'), // Formats private key correctly for deployment environments
        ['https://www.googleapis.com/auth/spreadsheets']
      );

      const sheets = google.sheets({ version: 'v4', auth });

    // Define your columns: Column A, B, C, D
      const timestampCell = logTimestamp;                      // Column A: Date & Time
      const actionCell = eventAction;                          // Column B: Event Action
      const pagePathCell = pagePath;                            // Column C: Current Webpage Path
      const userIdCell = userId || 'Anonymous Guest';           // Column D: User Identifier

      // A 2D array represents [ [Row 1 Cells...], [Row 2 Cells...] ]
      // This maps directly to Row Cells: A, B, C, D
      const newRow = [
        timestampCell, 
        actionCell, 
        pagePathCell, 
        userIdCell
      ];

      // Append row directly to the spreadsheet
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Sheet1!A:D', // Target Sheet1, automatically finds the first empty row in columns A through D
        valueInputOption: 'USER_ENTERED', // Formats dates and strings correctly automatically
        requestBody: {
          values: [newRow], // Must be wrapped in an outer array to represent a list of rows
        },
      });
      
      console.log(`[SHEETS SUCCESS] Added row: ${JSON.stringify(newRow)}`);
    } else {
      console.warn("[WARNING] Google Sheet credentials not fully set. Logging locally only.");
    }

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