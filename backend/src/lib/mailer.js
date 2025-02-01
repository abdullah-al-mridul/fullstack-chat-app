import nodemailer from "nodemailer";
export const sendVerificationEmail = async (to, subject, text) => {
  try {
    const emailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification - HaloTalk</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #0f172a;
            margin: 0;
            padding: 20px;
            color: #e2e8f0;
          }

          .email-container {
            background: linear-gradient(to bottom, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98));
            backdrop-filter: blur(10px);
            max-width: 600px;
            margin: 0 auto;
            padding: 40px;
            border-radius: 24px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.05);
            position: relative;
            overflow: hidden;
          }

          /* Decorative background elements */
          .bg-gradient-1 {
            position: absolute;
            top: -100px;
            right: -100px;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: linear-gradient(45deg, #7c3aed40, #2563eb40);
            filter: blur(40px);
            z-index: -1;
          }

          .bg-gradient-2 {
            position: absolute;
            bottom: -100px;
            left: -100px;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: linear-gradient(45deg, #2563eb40, #7c3aed40);
            filter: blur(40px);
            z-index: -1;
          }

          .logo-container {
            text-align: center;
            margin-bottom: 32px;
          }

          .logo {
            background: linear-gradient(45deg, #7c3aed, #2563eb);
            color: white;
            width: 48px;
            height: 48px;
            line-height: 48px;
            font-size: 24px;
            border-radius: 12px;
            display: inline-block;
            text-align: center;
            margin-bottom: 16px;
            box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
          }

          .brand-name {
            font-size: 24px;
            font-weight: bold;
            background: linear-gradient(45deg, #7c3aed, #2563eb);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin: 0;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }

          .email-content {
            text-align: center;
            margin: 32px 0;
          }

          .greeting {
            font-size: 18px;
            margin-bottom: 16px;
            color: #f1f5f9;
            font-weight: 600;
          }

          .message {
            color: #94a3b8;
            line-height: 1.6;
            margin-bottom: 32px;
          }

          .verification-code {
            background: linear-gradient(45deg, rgba(124, 58, 237, 0.1), rgba(37, 99, 235, 0.1));
            border: 2px solid rgba(124, 58, 237, 0.2);
            padding: 24px;
            border-radius: 16px;
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #a78bfa;
            margin: 32px 0;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }

          .note {
            font-size: 14px;
            color: #64748b;
            margin-top: 24px;
          }

          .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 24px;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            color: #64748b;
            font-size: 14px;
          }

          .footer a {
            color: #a78bfa;
            text-decoration: none;
          }

          .footer a:hover {
            text-decoration: underline;
          }

          .expiry-notice {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(124, 58, 237, 0.1);
            padding: 8px 16px;
            border-radius: 100px;
            margin-top: 24px;
            font-size: 14px;
            color: #a78bfa;
            border: 1px solid rgba(124, 58, 237, 0.2);
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="bg-gradient-1"></div>
          <div class="bg-gradient-2"></div>
          
          <div class="logo-container">
            <div class="logo">H</div>
            <h1 class="brand-name">HaloTalk</h1>
          </div>

          <div class="email-content">
            <h2 class="greeting">Verify Your Email</h2>
            <p class="message">
              Thanks for signing up! To complete your registration and start using HaloTalk,
              please enter the verification code below.
            </p>

            <div class="verification-code">
              ${text}
            </div>

            <div class="expiry-notice">
              ⏰ Code expires in 10 minutes
            </div>

            <p class="note">
              If you didn't request this verification code, you can safely ignore this email.
            </p>
          </div>

          <div class="footer">
            <p>
              Powered by HaloTalk<br>
              Built with ❤️ by <a href="https://abdullah-al-mridul-dev.vercel.app/" target="_blank">Abdullah Al Mridul</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: to,
      subject: subject,
      html: emailHtml,
    });
    console.log("Email sent successfully");
  } catch (err) {
    console.log(err);
  }
};
