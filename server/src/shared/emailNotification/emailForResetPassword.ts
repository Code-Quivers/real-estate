/* eslint-disable @typescript-eslint/ban-ts-comment */
import { EmailParams, Recipient } from "mailersend";
import { mailerSend, supportEmailSender } from "./mailerSenderKey";
import { errorLogger, infoLogger } from "../logger";
import config from "../../config";
import { IResetPassword } from "./types/emailNotificationTypes";

export const sendResetPasswordLink = async (details: IResetPassword) => {
  try {
    const recipients = [new Recipient(details?.email)];

    const emailParams = new EmailParams()
      .setFrom(supportEmailSender)
      .setTo(recipients)
      .setReplyTo(supportEmailSender)
      .setSubject("Email with instructions on how to Reset Password").setHtml(`
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
    
    .reset-container{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
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
      <h1>Please reset your password</h1>
    </div>

    <!-- Email Body -->
    <div class="email-body">
      <p>Dear ${details?.email}</p>

      <p>We received a request to reset your password. To reset your password, please follow the link below.</p>

      <div class="reset-container">
        <a href="${details?.link}" class="reset-link">Reset My Password</a>
      </div>

      <i>This link will expire in ${config.jwt.forget_password_expires_in?.replace("m", "")} minutes. If you did not request a password reset, please ignore this message.</p>
 
       
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
    errorLogger.error(`Failed to send login email to  : ${details?.email}`, error);
  }
};
