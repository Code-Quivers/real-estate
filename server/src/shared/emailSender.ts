/* eslint-disable @typescript-eslint/ban-ts-comment */
import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";
import config from "../config";
import { errorLogger, infoLogger } from "./logger";
import { IServiceProviderDetailsForNotification, ITenantDetailsForNotification } from "../interfaces/common";

const mailerSend = new MailerSend({
  apiKey: config.mailer_send_key as string,
});

export const sendEmail = async () => {
  try {
    const sentFrom = new Sender("support@codequivers.com", "Support Team");
    const recipients = [new Recipient("shafinur512@gmail.com")];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject("Login Notification")
      .setHtml(`<strong>Dear  You have successfully logged in.`)
      .setText(`Dear You have successfully logged in.`);

    await mailerSend.email.send(emailParams);
  } catch (error) {
    //@ts-ignore
    errorLogger.error(`Failed to send login email to  : ${error.message}`);
  }
};

export const sendEmailToServiceProvider = async (details: IServiceProviderDetailsForNotification) => {
  try {
    const sentFrom = new Sender("support@codequivers.com", "Support Team");
    const recipients = [new Recipient(details?.companyEmailAddress, `${details.firstName} ${details.lastName}`)];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject("You have received a maintenance request").setHtml(`<html lang="en">

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

      <p>Kind regards,</p>

      <div class="email-signature">
        <!-- Signature -->
        <div class="signature-info">
          <h4>[Your Name]</h4>
          <p>[Company Name]</p>
          <p>[Phone Number]</p>
          <p>[Email Address]</p>
        </div>
      </div>
    </div>

    
    <div class="email-footer">
      © 2024 CodeQuivers. All rights reserved.
    </div>
  </div>

</body>

</html>`);

    await mailerSend.email.send(emailParams);
    infoLogger.info(`Email notification sent to  ${details.companyEmailAddress}`);
  } catch (error) {
    //@ts-ignore
    errorLogger.error(`Failed to send login email to  : ${error.message}`);
  }
};

// sent to tenant for service status changed
export const sendEmailToTenantAfterStatusChanged = async (details: ITenantDetailsForNotification) => {
  try {
    const sentFrom = new Sender("support@codequivers.com", "Support Team");
    const recipients = [new Recipient(details?.user?.email, `${details.firstName} ${details.lastName}`)];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject("Your maintenance request has been changed").setHtml(`<html lang="en">
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

      <p>Kind regards,</p>

      <div class="email-signature">
        <!-- Signature -->
        <div class="signature-info">
          <h4>[Your Name]</h4>
          <p>[Company Name]</p>
          <p>[Phone Number]</p>
          <p>[Email Address]</p>
        </div>
      </div>
    </div>

    
    <div class="email-footer">
      © 2024 CodeQuivers. All rights reserved.
    </div>
  </div>

</body>

</html>`);

    await mailerSend.email.send(emailParams);
    infoLogger.info(`Email notification sent to  ${details.user.email}`);
  } catch (error) {
    //@ts-ignore
    errorLogger.error(`Failed to send login email to  : ${error.message}`);
  }
};
