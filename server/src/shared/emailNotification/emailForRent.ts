/* eslint-disable @typescript-eslint/ban-ts-comment */
import { EmailParams, Recipient } from "mailersend";
import { errorLogger, infoLogger } from "../logger";
import { mailerSend, supportEmailSender } from "./mailerSenderKey";
import { IOwnerDetailsForNotification, ITenantDetailsForNotificationForPayment } from "./types/emailNotificationTypes";

// sent to property owner after received rent from tenant
export const sendEmailToOwnerAfterRentReceived = async (details: IOwnerDetailsForNotification) => {
  try {
    const recipients = [new Recipient(details?.email as string, `${details.firstName} ${details.lastName}`)];

    const emailParams = new EmailParams()
      .setFrom(supportEmailSender)
      .setTo(recipients)
      .setReplyTo(supportEmailSender)
      .setSubject("You have received a rent from tenant").setHtml(`<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rent Payment Received</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      margin-top:5px;
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
      <h1>Rent Payment Received</h1>
    </div>

    <!-- Email Body -->
    <div class="email-body">
      <p>Dear ${details?.firstName} ${details?.lastName},</p>

      <p>We are pleased to inform you that you have received a rent payment from your tenant</p>

      <p><strong>Amount: ${details?.amountToPay} </strong></p>
      <p><strong>Payment Date:</strong> ${new Date(details?.createdAt).toLocaleDateString()}</p>
      <p><strong>Tenant:</strong> ${details?.tenantName}</p>

      <p>Please note that it may take a few days for the payment to be fully processed and approved. We appreciate your patience during this time.</p>

      <p>Thank you for your understanding.</p>
    </div>

    <div class="email-footer">
      © 2024  All rights reserved.
    </div>
  </div>

</body>

</html>
`);

    await mailerSend.email.send(emailParams);
    infoLogger.info(`Email notification sent to  ${details?.email}`);
  } catch (error) {
    //@ts-ignore
    errorLogger.error(`Failed to send email to  : ${details?.email}`, error);
  }
};

// sent to tenant for payment approved after waiting few days
export const sendEmailToTenantAfterPaymentApproved = async (details: ITenantDetailsForNotificationForPayment) => {
  try {
    const recipients = [new Recipient(details?.email as string, `${details.firstName} ${details.lastName}`)];

    const emailParams = new EmailParams()
      .setFrom(supportEmailSender)
      .setTo(recipients)
      .setReplyTo(supportEmailSender)
      .setSubject("Confirmation: Your Payment Has Been Successfully Completed").setHtml(`<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Approved</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }

    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .email-header {
      background-color: #004c99; /* Darker shade for header */
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
      margin: 0 0 15px; /* More space between paragraphs */
    }

    .email-footer {
      background-color: #f1f1f1;
      padding: 15px;
      text-align: center;
      font-size: 14px;
      color: #555555;
      border-top: 1px solid #e5e5e5; /* Separator line */
    }

    .highlight {
      background-color: #e6f7ff; /* Light background for key messages */
      padding: 10px;
      border-left: 4px solid #007bff; /* Accent color */
      margin: 15px 0; /* Space around highlight */
    }

    @media only screen and (max-width: 600px) {
      .email-container {
        width: 100% !important;
      }

      .email-header h1 {
        font-size: 20px;
      }

      .email-body {
        padding: 15px;
      }
    }
  </style>
</head>

<body>

  <div class="email-container">
    <!-- Email Header -->
    <div class="email-header">
      <h1>Payment Confirmation</h1>
    </div>

    <!-- Email Body -->
    <div class="email-body">
      <p>Dear ${details.firstName} ${details.lastName},</p>

      <p>We are delighted to confirm that your payment has been successfully processed and accepted.</p>
      
      <div class="highlight">
        Thank you for your Payment. Your transaction is complete and your account has been updated accordingly.
      </div>

      <p>If you have any questions regarding your payment or need further assistance, please feel free to reach out to us.</p>

      <p>Thank you for choosing our services!</p>
    </div>

    <!-- Email Footer -->
    <div class="email-footer">
      © 2024 ***. All rights reserved.
    </div>
  </div>

</body>

</html>`);

    await mailerSend.email.send(emailParams);
    infoLogger.info(`Email notification sent to  ${details?.email}`);
  } catch (error) {
    //@ts-ignore
    errorLogger.error(`Failed to send email to  : ${details?.email}`, error);
  }
};
// sent to tenant for payment failure
export const sendEmailToTenantAfterPaymentFailed = async (details: ITenantDetailsForNotificationForPayment) => {
  try {
    const recipients = [new Recipient(details?.email as string, `${details.firstName} ${details.lastName}`)];

    const emailParams = new EmailParams()
      .setFrom(supportEmailSender)
      .setTo(recipients)
      .setReplyTo(supportEmailSender)
      .setSubject("Important: Your Payment Could Not Be Processed").setHtml(`<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Failed</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }

    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .email-header {
      background-color: #ff4d4d; /* Red color for error */
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
      margin: 0 0 15px; /* More space between paragraphs */
    }

    .email-footer {
      background-color: #f1f1f1;
      padding: 15px;
      text-align: center;
      font-size: 14px;
      color: #555555;
      border-top: 1px solid #e5e5e5; /* Separator line */
    }

    .highlight {
      background-color: #fff3cd; /* Light yellow background for warnings */
      padding: 10px;
      border-left: 4px solid #856404; /* Darker accent color */
      margin: 15px 0; /* Space around highlight */
    }

    @media only screen and (max-width: 600px) {
      .email-container {
        width: 100% !important;
      }

      .email-header h1 {
        font-size: 20px;
      }

      .email-body {
        padding: 15px;
      }
    }
  </style>
</head>

<body>

  <div class="email-container">
    <!-- Email Header -->
    <div class="email-header">
      <h1>Payment Failed</h1>
    </div>

    <!-- Email Body -->
    <div class="email-body">
      <p>Dear ${details.firstName} ${details.lastName},</p>

      <p>We regret to inform you that your recent payment could not be processed.</p>
      
      <div class="highlight">
        Please check your payment details or contact your bank for further assistance. Your account has not been charged.
      </div>

      <p>If you have any questions or need further assistance, please feel free to reach out to us.</p>

      <p>Thank you for your understanding!</p>
    </div>

    <!-- Email Footer -->
    <div class="email-footer">
      © 2024 ***. All rights reserved.
    </div>
  </div>

</body>

</html>`);

    await mailerSend.email.send(emailParams);
    infoLogger.info(`Email notification sent to  ${details?.email}`);
  } catch (error) {
    //@ts-ignore
    errorLogger.error(`Failed to send email to  : ${details?.email}`, error);
  }
};
