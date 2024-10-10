import { MailerSend, Sender } from "mailersend";
import config from "../../config";

export const mailerSend = new MailerSend({
  apiKey: config.mailer_send_key as string,
});

export const supportEmailSender = new Sender(config.mailer_send_email as string, "Support Team");
