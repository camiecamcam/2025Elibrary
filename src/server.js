
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON request bodies

// Configure Nodemailer transport for Outlook
const transporter = nodemailer.createTransport({
  service: 'Outlook365',
  auth: {
    user: 'your-email@vigan.sti.edu.ph',
    pass: 'your-email-password',
  },
});

// Route to send an email
app.post('/send-email', async (req, res) => {
  const { email, idNumber } = req.body;

  const mailOptions = {
    from: 'your-email@vigan.sti.edu.ph',
    to: email,
    subject: 'Welcome to E-Library STI Vigan',
    text: `You have been added to the E-Library STI Vigan. You can use your account now.
    Use your ID Number as the password: ${idNumber}
    Access the library at https://elibrary.stivigan.com`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: `Email sent to ${email}` });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

