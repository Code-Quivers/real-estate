/* eslint-disable no-undef */
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_student_pass: process.env.DEFAULT_STUDENT_PASS,
  default_faculty_pass: process.env.DEFAULT_FACULTY_PASS,
  default_admin_pass: process.env.DEFAULT_ADMIN_PASS,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    secret: process.env.JWT_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    forget_password: process.env.JWT_FORGET_PASSWORD,
    forget_password_expires_in: process.env.JWT_FORGET_PASSWORD_EXPIRES_IN,
  },
  client_url: process.env.CLIENT_URL,
  stripe_sk: process.env.STIPE_SK_LIVE || "",
  mailer_send_key: process.env.MAILER_SEND_API_KEY,
  mailer_send_email: process.env.MAILER_SEND_EMAIL,
};
