import { MailerSend } from "mailersend";
import config from "../../config";

export const mailerSend = new MailerSend({
  apiKey: config.mailer_send_key as string,
});
