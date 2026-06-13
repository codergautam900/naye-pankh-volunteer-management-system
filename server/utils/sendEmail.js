import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, html }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html
  });
};

