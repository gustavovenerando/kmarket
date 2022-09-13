import { createTransport } from "nodemailer";
import { IEmailRequest } from "../interfaces/email";
import "dotenv/config";

const sendEmailUtil = async ({ subject, text, to }: IEmailRequest) => {
  const transporter = createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter
    .sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
    })
    .then(() => {
      return "Email sent with success";
    })
    .catch((err) => {
      return `Email not sent. ${err}`;
    });
};

export default sendEmailUtil;
