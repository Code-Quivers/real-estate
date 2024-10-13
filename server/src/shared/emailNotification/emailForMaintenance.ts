import { EmailParams, Recipient } from "mailersend";
import { mailerSend, supportEmailSender } from "./mailerSenderKey";
import { errorLogger, infoLogger } from "../logger";
import {
  IDetailsForMaintenanceNotification,
  IDetailsForMaintenanceNotificationForTenant,
  IMaintenanceRequestDetails,
  ITenantDetailsForNotification,
} from "./types/emailNotificationTypes";

// sending email for received maintenance request
export const sendEmailForMaintenanceRequestToPropertyOwner = async (details: IDetailsForMaintenanceNotification) => {
  try {
    const recipients = [new Recipient(details?.user?.email as string, `${details.firstName} ${details.lastName}`)];

    const emailParams = new EmailParams()
      .setFrom(supportEmailSender)
      .setTo(recipients)
      .setReplyTo(supportEmailSender)
      .setSubject("Maintenance Request Submitted by Tenant").setHtml(`
        <html lang="en">
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
              .signature-info {
                text-align: left;
                margin-top: 10px;
                color: #555555;
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="email-header">
                <h1>Maintenance Service Request</h1>
              </div>
              <div class="email-body">
                <p>Dear ${details?.firstName} ${details?.lastName},</p>
                <p>Your tenant : ${details?.tenantName},  has submitted a maintenance request. Here are the details:</p>
                <p><strong>Issue Description:</strong> ${details?.issueDescription}</p>
                <p><strong>Location:</strong> ${details?.location}</p>
                <p>Please review the request and confirm it for service providers as soon as possible.</p>
              </div>
              <div class="email-footer">
                © 2024 *****. All rights reserved.
              </div>
            </div>
          </body>
        </html>`);

    await mailerSend.email.send(emailParams);
    infoLogger.info(`Email notification sent to ${details?.user?.email}`);
  } catch (error) {
    console.log(error);
    errorLogger.error(`Failed to send email: ${details?.user?.email}`, error);
  }
};

// sending email for received maintenance request
export const sendEmailForMaintenanceRequestToServiceProvider = async (details: IDetailsForMaintenanceNotification) => {
  try {
    const recipients = [
      new Recipient(
        (details?.companyEmailAddress as string) || (details?.user?.email as string),
        `${details.firstName} ${details.lastName}`,
      ),
    ];

    const emailParams = new EmailParams()
      .setFrom(supportEmailSender)
      .setTo(recipients)
      .setReplyTo(supportEmailSender)
      .setSubject("Tenant has submitted a Maintenance Request").setHtml(`<html lang="en">

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
      <p>Dear ${details?.firstName} ${details?.lastName},</p>

      <p>We would like to request maintenance services for the following issue:</p>

      <p><strong>Issue Description:</strong> [Description of the issue]</p>
      <p><strong>Location:</strong> [Location]</p>
      <p><strong>Requested Service Date:</strong> [Date]</p>

      <p>Please confirm the service appointment at your earliest convenience. We appreciate your prompt attention to this
        matter.</p>
 

      
    </div>

    
    <div class="email-footer">
      © 2024 *****. All rights reserved.
    </div>
  </div>

</body>

</html>`);

    await mailerSend.email.send(emailParams);
    infoLogger.info(`Email notification sent to  ${details?.companyEmailAddress || details?.user?.email}`);
  } catch (error) {
    errorLogger.error(`Failed to send email : ${details?.companyEmailAddress || details?.user?.email}`, error);
  }
};

// sending email for service provider accepted the request to tenant
export const sendEmailForMaintenanceRequestForAcceptToTenant = async (
  details: IDetailsForMaintenanceNotificationForTenant,
) => {
  try {
    const recipients = [new Recipient(details?.user?.email, `${details.tenantName}`)];

    const emailParams = new EmailParams()
      .setFrom(supportEmailSender)
      .setTo(recipients)
      .setReplyTo(supportEmailSender)
      .setSubject("Your Maintenance Request Has Been Accepted").setHtml(`<html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Maintenance Service Request Accepted</title>
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
              <h1>Maintenance Request Accepted</h1>
            </div>

            <!-- Email Body -->
            <div class="email-body">
              <p>Dear ${details.tenantName},</p>

              <p>We are pleased to inform you that your maintenance request has been accepted by the service provider, ${details?.serviceProviderName} from ${details?.companyName}.</p>

              <p><strong>Issue Description:</strong> ${details.issueDescription}</p>
              <p><strong>Location:</strong> ${details.location}</p>
              <p><strong>Priority:</strong> ${details.issuePriority}</p>

              <p>We will keep you updated with any further details or service appointments. Thank you for your patience!</p>

             
            
            </div>

            <div class="email-footer">
              © 2024 *****. All rights reserved.
            </div>
          </div>
        </body>
        </html>`);

    await mailerSend.email.send(emailParams);
    infoLogger.info(`Email notification sent to  ${details?.user?.email}`);
  } catch (error) {
    errorLogger.error(`Failed to send email : ${details?.user?.email}`, error);
  }
};

// sent to tenant for service status changed
export const sendEmailToTenantAfterStatusChanged = async (
  maintenanceDetails: IMaintenanceRequestDetails,
  details: ITenantDetailsForNotification,
) => {
  try {
    const recipients = [new Recipient(details?.user?.email, `${details.firstName} ${details.lastName}`)];

    const emailParams = new EmailParams()
      .setFrom(supportEmailSender)
      .setTo(recipients)
      .setReplyTo(supportEmailSender)
      .setSubject("Your maintenance request has been changed").setHtml(` <html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Maintenance Request Status Update</title>
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
      <h1>Maintenance Request Status Update</h1>
    </div>

    <!-- Email Body -->
    <div class="email-body">
      <p>Dear ${details?.firstName} ${details?.lastName},</p>

      <p>We wanted to inform you that the status of your maintenance request has been updated by the service provider.</p>

       
      <p><strong>Previous Status:</strong> ${maintenanceDetails?.previousStatus}</p>
      <p><strong>Updated Status:</strong> ${maintenanceDetails?.updatedStatus}</p>

      <p>If you have any questions or need further assistance, please feel free to contact us. We appreciate your patience as we address your maintenance needs.</p>

      <p>Thank you for choosing our Services.</p>

     
    </div>

    <!-- Email Footer -->
    <div class="email-footer">
      © 2024 ****. All rights reserved.
    </div>
  </div>

</body>

</html>
`);

    await mailerSend.email.send(emailParams);
    infoLogger.info(`Email notification sent to  ${details.user.email}`);
  } catch (error) {
    errorLogger.error(`Failed to send email : ${details?.user?.email}`, error);
  }
};
