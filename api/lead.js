import nodemailer from "nodemailer";

export default async function handler(req, res) {
  const origin = req.headers.origin;

  /* ========= CORS ========= */
  res.setHeader("Access-Control-Allow-Origin", origin || "*");
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    /* ========= SAFE BODY ========= */
    let body;
    try {
      body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    } catch (err) {
      return res.status(400).json({ success: false, message: "Invalid JSON" });
    }

    const { name, email, phone, visaType, message } = body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name & Email required",
      });
    }

    /* ========= CRM (SAFE, NON-BLOCKING) ========= */
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);

      const crmResponse = await fetch(
        "https://case.growmore.one/api/webhooks/website-form",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Name: name,
            Email: email,
            Phone: phone || "",
            Inquiries: visaType || "General Inquiry",
            Message: message || "",
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeout);
      console.log("CRM STATUS:", crmResponse.status);
    } catch (err) {
      console.error("CRM ERROR:", err.message);
    }

    /* ========= EMAIL CHECK ========= */
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("❌ EMAIL ENV MISSING");
      return res.status(500).json({
        success: false,
        message: "Email config missing",
      });
    }

    /* ========= EMAIL TRANSPORT ========= */
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    /* ========= SEND EMAIL ========= */
    try {
      await transporter.sendMail({
        from: `"Growmore" <${process.env.EMAIL_USER}>`,
        to: "info@growmore.one",
        subject: "New Lead",
        html: `
          <h3>Lead Details</h3>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone || "N/A"}</p>
          <p><b>Visa:</b> ${visaType || "N/A"}</p>
          <p><b>Message:</b> ${message || "N/A"}</p>
        `,
      });
    } catch (emailError) {
      console.error("EMAIL ERROR FULL:", emailError);
      return res.status(500).json({
        success: false,
        message: "Email failed",
        error: emailError.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Submitted successfully",
    });

  } catch (error) {
    console.error("CRITICAL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server crashed",
      error: error.message,
    });
  }
}
