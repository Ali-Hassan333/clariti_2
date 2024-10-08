import nodemailer from 'nodemailer';

export async function sendVerificationEmail(email: string, code: string) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: parseInt('465'),
    auth: {
      user: "labs@moreclariti.com",
      pass: "befj vneq aklt ekoh",
    },
  });

  await transporter.sendMail({
    from: "labs@moreclariti.com",
    to: email,
    subject: 'Verify your email',
    html: `
     <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clariti Verification Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #0033A0;
            color: white;
            padding: 10px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
        }
        .lock-icon {
            font-size: 24px;
        }
        .content {
            padding: 20px;
        }
        .code {
            background-color: #f5f5f5;
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            padding: 10px;
            margin: 20px 0;
        }
        .footer {
            font-size: 12px;
            text-align: center;
            margin-top: 40px;
            color: #666;
        }
        a {
            color: #0033A0;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">Clariti</div>
        <div class="lock-icon">🔒</div>
    </div>
    <div class="content">
        <h1>Welcome to Clariti</h1>
        <p>Your verification code is:</p>
        <div class="code">${code}</div>
        <p>This code will expire in 24 hours.</p>
        <p>If you didn't request this code, someone may be trying to access your account. Please <a href="#">update your password</a>, and if you need more help or want to report suspicious activity, please <a href="#">contact us</a>.</p>
        <p>Yours sincerely,</p>
        <p>The Clariti Security Team</p>
    </div>
    <div class="footer">
        © 2024 Clariti<br>
        123 Main Street, Anytown, AN 12345
    </div>
</body>
    `,
  });
}