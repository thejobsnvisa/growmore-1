import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { name, email, phone, visaType, message, source } =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email and phone are required",
      });
    }

    // ✅ Better phone parsing
    const cleanPhone = phone.replace(/\D/g, ""); // remove all non-digits
    const countryCode = cleanPhone.slice(0, 2); // safer default
    const phoneNumber = cleanPhone.slice(2);

    // ✅ CRM PAYLOAD (JSON)
    const crmPayload = {
      Name: name,
      Email: email,
      Phone: phoneNumber,
      Country_Code: countryCode,
      Inquiries: visaType || "General Inquiry",
      Source: source || "Website Form",
      Message: message || "",
    };

    console.log("📤 Sending to CRM:", crmPayload);

    // ✅ CRM CALL
    const crmResponse = await fetch(
      "https://case.growmore.one/api/webhooks/website-form",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(crmPayload),
      }
    );

    const crmText = await crmResponse.text(); // capture raw response

    console.log("📥 CRM Response:", crmText);

    if (!crmResponse.ok) {
      throw new Error(`CRM Error: ${crmText}`);
    }

    // ✅ Email (unchanged)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Growmore Immigration"`,
      to: "info@growmore.one",
      bcc: "info@growmoreimmigration.com",
      subject: "Appointment Booking from Website",
      html: `
        <h3>New Lead</h3>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Phone: +${countryCode} ${phoneNumber}</p>
        <p>Inquiry: ${visaType}</p>
        <p>Message: ${message}</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Success",
    });

  } catch (error) {
    console.error("❌ ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}