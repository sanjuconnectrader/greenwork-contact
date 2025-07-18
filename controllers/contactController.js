import nodemailer from 'nodemailer';
import ContactMessage from '../models/ContactMessage.js';
import dotenv from 'dotenv';
dotenv.config();

// --- mailer configuration -----------------------------------------------
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  authMethod: 'LOGIN',
  tls: {
    ciphers: 'SSLv3'
  }
});

transporter.verify()
  .then(() => console.log('✓ Gmail SMTP ready'))
  .catch(err => console.error('✗ SMTP error:', err));

// --- premium email template generator -----------------------------------
const generatePremiumEmailTemplate = (data) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Submission | GreenWorks</title>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    /* Base Styles */
    body {
      margin: 0;
      padding: 0;
      background-color: #f8f9fa;
      font-family: 'Montserrat', sans-serif;
      color: #333;
      line-height: 1.6;
    }
    
    /* Container */
    .email-container {
      max-width: 650px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    }
    
    /* Header */
    .email-header {
      background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%);
      padding: 40px 30px;
      text-align: center;
      color: white;
      position: relative;
      overflow: hidden;
    }
    
    .email-header:before {
      content: "";
      position: absolute;
      top: -50px;
      right: -50px;
      width: 200px;
      height: 200px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
    }
    
    .email-header h1 {
      font-family: 'Playfair Display', serif;
      font-weight: 600;
      font-size: 28px;
      margin: 0;
      position: relative;
      z-index: 1;
    }
    
    .email-header p {
      opacity: 0.9;
      font-size: 16px;
      margin: 10px 0 0;
      position: relative;
      z-index: 1;
    }
    
    /* Content */
    .email-content {
      padding: 40px;
    }
    
    /* Client Card */
    .client-card {
      background: #f8f9fa;
      border-radius: 10px;
      padding: 25px;
      margin-bottom: 30px;
      border-left: 4px solid #2e7d32;
    }
    
    .detail-row {
      display: flex;
      margin-bottom: 15px;
      align-items: center;
    }
    
    .detail-label {
      font-weight: 600;
      color: #555;
      width: 120px;
      flex-shrink: 0;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .detail-value {
      flex-grow: 1;
      font-size: 15px;
    }
    
    .detail-value a {
      color: #2e7d32;
      text-decoration: none;
      font-weight: 500;
    }
    
    /* Message Box */
    .message-box {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 25px;
      margin-top: 30px;
    }
    
    .message-box h3 {
      font-family: 'Playfair Display', serif;
      margin-top: 0;
      color: #2e7d32;
      font-size: 18px;
    }
    
    .message-content {
      white-space: pre-line;
      line-height: 1.7;
    }
    
    /* Action Button */
    .action-container {
      text-align: center;
      margin: 35px 0 20px;
    }
    
    .action-btn {
      display: inline-block;
      background: linear-gradient(to right, #2e7d32, #4caf50);
      color: white !important;
      text-decoration: none;
      padding: 14px 28px;
      border-radius: 50px;
      font-weight: 600;
      font-size: 15px;
      box-shadow: 0 4px 15px rgba(46, 125, 50, 0.3);
      transition: all 0.3s ease;
    }
    
    .action-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(46, 125, 50, 0.4);
    }
    
    /* Footer */
    .email-footer {
      text-align: center;
      padding: 25px;
      background: #f1f3f5;
      color: #777;
      font-size: 12px;
    }
    
    .logo {
      font-weight: 700;
      color: #2e7d32;
      font-size: 18px;
      margin-bottom: 8px;
      letter-spacing: 1px;
    }
    
    /* Responsive */
    @media (max-width: 600px) {
      .email-content {
        padding: 25px;
      }
      
      .detail-row {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .detail-label {
        margin-bottom: 5px;
        width: 100%;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>New Client Inquiry</h1>
      <p>GreenWorks Contact Form Submission</p>
    </div>
    
    <div class="email-content">
      <div class="client-card">
        <div class="detail-row">
          <div class="detail-label">Client Name</div>
          <div class="detail-value">${data.name}</div>
        </div>
        
        <div class="detail-row">
          <div class="detail-label">Email Address</div>
          <div class="detail-value"><a href="mailto:${data.email}">${data.email}</a></div>
        </div>
        
        <div class="detail-row">
          <div class="detail-label">Phone Number</div>
          <div class="detail-value">${data.phone || 'Not provided'}</div>
        </div>
        
        <div class="detail-row">
          <div class="detail-label">Location</div>
          <div class="detail-value">${data.address || 'Not provided'}</div>
        </div>
      </div>
      
      <div class="message-box">
        <h3>Client Message</h3>
        <div class="message-content">${data.message.replace(/\n/g, '<br>')}</div>
      </div>
      
      <div class="action-container">
        <a href="mailto:${data.email}?subject=Re: Your GreenWorks Inquiry" class="action-btn">
          Reply to ${data.name.split(' ')[0]}
        </a>
      </div>
      
      <p style="text-align: center; color: #777; font-size: 14px;">
        Please respond within 24 hours for best client experience.
      </p>
    </div>
    
    <div class="email-footer">
      <div class="logo">GREENWORKS</div>
      <p>Premium Landscaping & Garden Services</p>
      <p>© ${new Date().getFullYear()} GreenWorks. All Rights Reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
};

// --- route handler -------------------------------------------------------
export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, phone, address, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false,
        message: 'Name, email, and message are required fields' 
      });
    }

    // 1. Persist to DB
    await ContactMessage.create({ name, email, phone, address, message });

    // 2. Generate and send email with premium template
    const mailOptions = {
      from: `"GreenWorks Concierge" <${process.env.EMAIL_USER}>`,
      to: 'sanjiths513@gmail.com',
      subject: `🌟 New Client Inquiry: ${name}`,
      html: generatePremiumEmailTemplate({ name, email, phone, address, message }),
      replyTo: email,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'High'
      }
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({ 
      success: true,
      message: 'Your message has been sent successfully! Our team will respond shortly.' 
    });
    
  } catch (err) {
    console.error('Error processing contact form:', err);
    return res.status(500).json({ 
      success: false,
      message: 'An unexpected error occurred. Please try again or contact us directly at support@greenworks.com.' 
    });
  }
};