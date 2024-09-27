"use server";

import nodemailer from 'nodemailer';

export async function sendContactEmail(data: { name: string; email: string; message: string }) {
  const { name, email, message } = data;

  const transporter = nodemailer.createTransport({
    host: 'smtp.your-email-provider.com', // Replace with your email provider's SMTP server
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'your-email@example.com', // Replace with your email
      pass: 'your-email-password', // Replace with your email password
    },
  });

  const mailOptions = {
    from: email,
    to: 'your-email@example.com', // Receiver email
    subject: `New Contact Form Submission from ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Error sending email' };
  }
}
