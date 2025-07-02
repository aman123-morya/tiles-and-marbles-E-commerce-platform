// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Replace with your Gmail credentials
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "amankumar829273@gmail.com",       // Your 
    pass: "vbnnychbbhginigv",              // Use App Password, not Gmail password
  },
});

app.post("/send-order", (req, res) => {
  const { name, phone, email, product, quantity, address } = req.body;

  const mailOptions = {
    from: "amankumar829273@gmail.com",
    to: "amankumar829273@gmail.com", // Seller’s Gmail
    subject: `New Tile Order from ${name}`,
    html: `
      <h3>New Order Received</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Product:</strong> ${product}</p>
      <p><strong>Quantity:</strong> ${quantity} Sq Ft</p>
      <p><strong>Delivery Address:</strong> ${address}</p>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending mail:", error);
      return res.json({ success: false });
    } else {
      console.log("Email sent:", info.response);
      return res.json({ success: true });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
