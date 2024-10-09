/* eslint-disable @typescript-eslint/ban-ts-comment */
import { EmailParams, Recipient, Sender } from "mailersend";
import { mailerSend, senderEmail } from "./mailerSendarKey";
import { errorLogger, infoLogger } from "../logger";
import { IDueRentForNotification } from "../../interfaces/common";

export const sendDueRentEmailToTenant = async (details: IDueRentForNotification) => {
  try {
    const sentFrom = new Sender(senderEmail, "Support Team");
    const recipients = [new Recipient(details?.user?.email, `${details?.firstName} ${details?.lastName}`)];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject("Rent Payment Reminder").setHtml(`
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rent Payment Due</title>
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
      <h1>Rent Payment Due</h1>
    </div>

    <!-- Email Body -->
    <div class="email-body">
      <p>Dear ${details?.firstName} ${details?.lastName},</p>

      <p>This is a reminder that your rent payment for the property named: ${details?.property?.title} is due.</p>

      <p><strong>Due Rent Amount:</strong> $ ${details?.dueRent}</p>
      <p><strong>Due for:</strong> ${details?.dueMonths} Months</p>
      <p><strong>Due for:</strong> ${details?.dueDays} Total Days</p>
      <p><strong>Monthly Rent:</strong> $ ${details?.property?.monthlyRent}</p>
      <p><strong>Assigned Date:</strong> ${new Date(details?.property?.tenantAssignedAt).toLocaleDateString()}</p>

      <p>Please make the payment as soon as possible to avoid any late fees. If you have already made the payment, kindly disregard this notice.</p>

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

</html>`);

    await mailerSend.email.send(emailParams);
    infoLogger.info(`Email notification sent to  ${details?.user?.email}`);
  } catch (error) {
    //@ts-ignore
    errorLogger.error(`Failed to send login email to  : ${error.message}`);
  }
};
