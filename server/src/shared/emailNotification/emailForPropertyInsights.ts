/* eslint-disable @typescript-eslint/ban-ts-comment */
import { EmailParams, Recipient } from "mailersend";
import { mailerSend, supportEmailSender } from "./mailerSenderKey";
import { errorLogger, infoLogger } from "../logger";
import { IServiceProviderDetailsAssigned, ITenantDetailsAssigned } from "./types/emailNotificationTypes";

export const sendAssignedEmailToTenant = async (details: ITenantDetailsAssigned) => {
  try {
    const recipients = [new Recipient(details?.user?.email, `${details?.fullName}`)];

    const emailParams = new EmailParams()
      .setFrom(supportEmailSender)
      .setTo(recipients)
      .setReplyTo(supportEmailSender)
      .setSubject("You have been added to a Property").setHtml(`
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Property Assignment</title>
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
    }
  </style>
</head>

<body>

  <div class="email-container">
    <!-- Email Header -->
    <div class="email-header">
      <h1>Welcome to Your New Property!</h1>
    </div>

    <!-- Email Body -->
    <div class="email-body">
      <p>Dear ${details?.fullName},</p>

      <p>We are pleased to inform you that you have been successfully added as a tenant for the property <strong>${details?.title}</strong>.</p>

      <p>Please note the details of your property:</p>

      <p><strong>Property Address:</strong> ${details?.address}</p>
      <p><strong>Monthly Rent:</strong> $${details?.monthlyRent}</p>
      <p><strong>Assigned Date:</strong> ${details?.tenantAssignedAt ? new Date(details?.tenantAssignedAt).toLocaleDateString() : new Date().toLocaleDateString()}</p>

      <p>If you have any questions, feel free to reach out to us.</p>

      <p>Thank you,<br>Property Management Team</p>
    </div>
  </div>

</body>

</html>`);

    await mailerSend.email.send(emailParams);
    infoLogger.info(`Email notification sent to  ${details?.user?.email}`);
  } catch (error) {
    errorLogger.error(`Failed to send email to  : ${details?.user?.email}`, error);
  }
};
export const sendAssignedEmailToServiceProvider = async (details: IServiceProviderDetailsAssigned) => {
  try {
    const recipients = [new Recipient(details?.email, `${details?.fullName}`)];

    const emailParams = new EmailParams()
      .setFrom(supportEmailSender)
      .setTo(recipients)
      .setReplyTo(supportEmailSender)
      .setSubject("You have been added to a Property").setHtml(`
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Property Assignment</title>
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
    }
  </style>
</head>

<body>

  <div class="email-container">
    <!-- Email Header -->
    <div class="email-header">
      <h1>Welcome to Your New Property!</h1>
    </div>

    <!-- Email Body -->
    <div class="email-body">
      <p>Dear ${details?.fullName},</p>

      <p>We are pleased to inform you that you have been successfully added as a Service Provider for the property : <strong>${details?.title}</strong>.</p>

      <p>Please note the details of your property:</p>

      <p><strong>Property Address:</strong> ${details?.address}</p>
      

      <p>If you have any questions, feel free to reach out to us.</p>

      <p>Thank you,<br>Property Management Team</p>
    </div>
  </div>

</body>

</html>`);

    await mailerSend.email.send(emailParams);
    infoLogger.info(`Email notification sent to  ${details?.email}`);
  } catch (error) {
    errorLogger.error(`Failed to send email to  : ${details?.email}`, error);
  }
};
