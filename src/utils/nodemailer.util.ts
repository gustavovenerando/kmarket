import { createTransport } from "nodemailer";
import { IEmailRequest } from "../interfaces/email";
import "dotenv/config";
import AppError from "../errors/AppError";

const sendEmailUtil = async ({ subject, text, to }: IEmailRequest) => {
  const transporter = createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
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
      throw new AppError(400, `Deu ruim ${err}`);
    });
};

export default sendEmailUtil;
