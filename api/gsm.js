import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const data = req.body;

    // ✅ Validation
    if (!data.fullName || !data.email) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    /* ========= CRM ========= */
    const crmBody = new URLSearchParams({
      Name: data.fullName,
      Email: data.email,
      Phone: data.phone || "",
      Country: data.country || "",
      Inquiries: "GSM Visa Eligibility Assessment",
      Source: "Website GSM Form",
      Message: `
Occupation: ${data.occupation}
Qualification: ${data.qualification}
Points: ${data.estimatedPoints}
Location: ${data.location}
Comments: ${data.comments || "None"}
      `.trim(),
    });

    fetch("https://leads.growmore.one/api/website-form", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: crmBody.toString(),
    }).catch(err => console.error("CRM Error:", err));

    /* ========= EMAIL ========= */
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({
        success: false,
        message: "Email configuration missing",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailHtml = `...same template...`;

    await transporter.sendMail({
      from: `"Growmore Immigration" <${process.env.EMAIL_USER}>`, // ✅ FIXED
      to: "info@growmore.one",
      bcc: "info@growmoreimmigration.com",
      subject: `GSM Assessment Inquiry: ${data.fullName}`,
      html: emailHtml,
    });

    return res.status(200).json({
      success: true,
      message: "Submission successful",
    });

  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}