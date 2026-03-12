export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  if (!req.body.name || !req.body.email || !req.body.phone) {
    return res.status(400).json({
      success: false,
      message: "Name, email and phone are required"
    });
  }

  try {

    const phone = req.body.phone || "";

    const match = phone.match(/^\+(\d{1,3})(\d+)$/);
    const countryCode = match ? `+${match[1]}` : "";
    const phoneNumber = match ? match[2] : phone;

    const body = new URLSearchParams({
      Name: req.body.name,
      Email: req.body.email,
      Phone: phoneNumber,
      Country_Code: countryCode,
      Inquiries: req.body.visaType || "General Inquiry",
      Source: req.body.source || "Website Form",
      Message: req.body.message || ""
    });

    const response = await fetch(
      "https://leads.growmore.one/api/website-form",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      }
    );

    const data = await response.json();

    return res.status(200).json({
      success: true,
      crmResponse: data
    });

  } catch (error) {

    console.error("Webhook error:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
}