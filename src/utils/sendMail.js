import nodemailer from 'nodemailer';

export const sendEmail = async (mailOptions) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: false, // Use true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({ from: process.env.SMTP_FROM, ...mailOptions });
  } catch (error) {
    console.error('Failed to send email:', error.message);
    throw error;
  }
};
