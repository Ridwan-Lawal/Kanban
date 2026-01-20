import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html: string;
}) {
  try {
    await transporter.sendMail({
      from: `"Kanban Support" ${process.env.EMAIL_SERVER_USER}`,
      to,
      subject,
      text,
      html,
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    throw new Error("Something went wrong sending mail");
  }
}
