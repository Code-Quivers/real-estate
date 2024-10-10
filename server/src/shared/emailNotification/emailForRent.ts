/* eslint-disable @typescript-eslint/ban-ts-comment */
import { EmailParams, Recipient } from "mailersend";

import { errorLogger, infoLogger } from "../logger";
import { mailerSend, supportEmailSender } from "./mailerSenderKey";
import { IOwnerDetailsForNotification } from "./types/emailNotificationTypes";

// sent to property owner after received rent from tenant
export const sendEmailToOwnerAfterRentReceived = async (details: IOwnerDetailsForNotification) => {
  try {
    const recipients = [new Recipient(details?.user?.email, `${details.firstName} ${details.lastName}`)];

    const emailParams = new EmailParams()
      .setFrom(supportEmailSender)
      .setTo(recipients)
      .setReplyTo(supportEmailSender)
      .setSubject("You have received a rent from tenant").setHtml(`<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Maintenance Service Request</title>
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
      <h1>Maintenance Service Request</h1>
    </div>

    <!-- Email Body -->
    <div class="email-body">
      <p>Dear [Service Provider],</p>

      <p>We would like to request maintenance services for the following issue:</p>

      <p><strong>Issue Description:</strong> [Description of the issue]</p>
      <p><strong>Location:</strong> [Location]</p>
      <p><strong>Requested Service Date:</strong> [Date]</p>

      <p>Please confirm the service appointment at your earliest convenience. We appreciate your prompt attention to this
        matter.</p>

  
      
    </div>

    
    <div class="email-footer">
      © 2024 ****. All rights reserved.
    </div>
  </div>

</body>

</html>`);

    await mailerSend.email.send(emailParams);
    infoLogger.info(`Email notification sent to  ${details.user.email}`);
  } catch (error) {
    //@ts-ignore
    errorLogger.error(`Failed to send email to  : ${error.message}`);
  }
};
