/* eslint-disable @typescript-eslint/ban-ts-comment */
import { EmailParams, Recipient, Sender } from "mailersend";
import { mailerSend, senderEmail } from "./mailerSendarKey";
import { errorLogger, infoLogger } from "../logger";
import { IResetPassword } from "../../interfaces/common";

export const sendResetPasswordLink = async (details: IResetPassword) => {
  console.log("details", details);

  try {
    const sentFrom = new Sender(senderEmail, "Support Team");
    const recipients = [new Recipient(details?.email)];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject("Reset Your Password").setHtml(`
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }

    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .email-header {
      background-color: #2b3e50;
      color: #ffffff;
      text-align: center;
      padding: 20px;
    }

    .email-header h1 {
      margin: 0;
      font-size: 24px;
    }

    .email-body {
      padding: 20px;
      line-height: 1.6;
      color: #333333;
    }

    .email-body p {
      margin: 0 0 10px;
    }

    .reset-link {
      display: inline-block;
      margin-top: 15px;
      padding: 10px 15px;
      background-color: #2b3e50;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
    }

    .email-footer {
      background-color: #f1f1f1;
      padding: 15px;
      text-align: center;
      font-size: 14px;
      color: #555555;
    }

    .email-signature {
      margin-top: 30px;
      padding-top: 15px;
      border-top: 1px solid #e5e5e5;
    }

    .signature-info {
      text-align: left;
      margin-top: 10px;
      color: #555555;
    }

    .signature-info h4 {
      margin: 0;
      font-size: 16px;
    }

    .signature-info p {
      margin: 2px 0;
    }

    @media only screen and (max-width: 600px) {
      .email-container {
        width: 100% !important;
      }

      .email-header h1 {
        font-size: 20px;
      }

      .email-body {
        padding: 10px;
      }

      .signature-info h4 {
        font-size: 14px;
      }
    }
  </style>
</head>

<body>

  <div class="email-container">
    <!-- Email Header -->
    <div class="email-header">
      <h1>Reset Your Password</h1>
    </div>

    <!-- Email Body -->
    <div class="email-body">
      <p>Dear ${details?.email}</p>

      <p>We received a request to reset your password. You can reset your password by clicking the link below:</p>

      <a href="${details?.link}" class="reset-link">Reset Password</a>

      <p>If you did not request a password reset, please ignore this email.</p>

      <p>If you have any questions or need assistance, please feel free to contact us.</p>

      <p>Thank you for your prompt attention to this matter.</p>

      <p>Kind regards,</p>

      <div class="email-signature">
        <!-- Signature -->
        <div class="signature-info">
          <h4>Property Management Team</h4>
          <p>Company Name</p>
          <p>Phone: [Your Phone Number]</p>
          <p>Email: [Your Email Address]</p>
        </div>
      </div>
    </div>

    <div class="email-footer">
      © 2024 CodeQuivers. All rights reserved.
    </div>
  </div>

</body>

</html>
`);

    await mailerSend.email.send(emailParams);
    infoLogger.info(`Email notification sent to  ${details?.email}`);
  } catch (error) {
    console.log("error", error);
    //@ts-ignore
    errorLogger.error(`Failed to send login email to  : ${error.message}`);
  }
};
