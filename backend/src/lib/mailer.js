import nodemailer from "nodemailer";
export const sendVerificationEmail = async (to, subject, text) => {
  try {
    const emailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
          }

          .email-container {
            background-color: #ffffff;
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .email-header {
            text-align: center;
            font-size: 24px;
            color: #333;
          }

          .email-content {
            margin-top: 20px;
            font-size: 16px;
            color: #555;
          }

          .email-content p {
            line-height: 1.5;
          }

          .verification-code {
            display: inline-block;
            background-color: #4CAF50;
            color: #fff;
            font-size: 24px;
            padding: 15px 25px;
            border-radius: 5px;
            margin-top: 20px;
          }

          .email-footer {
            text-align: center;
            margin-top: 30px;
            font-size: 14px;
            color: #888;
          }

          .email-footer a {
            color: #4CAF50;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <h2>Email Verification</h2>
          </div>
          <div class="email-content">
            <p>Hello,</p>
            <p>Thank you for registering! Please use the following code to verify your email address:</p>
            <div class="verification-code">
              ${text}
            </div>
            <p>If you did not request this, please ignore this email.</p>
          </div>
          <div class="email-footer">
            <p>Best regards, <br><a href="https://abdullah-al-mridul-dev.vercel.app/" target="_blank">Abdullah Al Mridul</a></p>
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
