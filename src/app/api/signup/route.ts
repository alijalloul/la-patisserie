import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import db from "@/db/db";
import nodemailer from "nodemailer";

const JWT_SECRET = process.env.JWT_SECRET as string;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.NODEMAILER_PASS,
  },
});

const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
    });
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
};

function generateVerificationToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1d" });
}

async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.BASE_URL}/api/verify-email?token=${token}`;

  try {
    await sendEmail(
      email,
      "Verify Your Email Address",
      `Please verify your email address by clicking the following link: ${verificationUrl}`
    );
  } catch (error) {
    return new NextResponse(
      "Error occurred while sending your verification email",
      { status: 400 }
    );
  }
}

async function signup(email: string, password: string) {
  const user = await db.user.findUnique({ where: { email } });
  if (user) return new NextResponse("User already exists", { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await db.user.create({
      data: { email, password: hashedPassword, isVerified: false },
    });

    const token = generateVerificationToken(user.id);

    await sendVerificationEmail(email, token);
  } catch (error) {
    console.error("Prisma Error:", error);
    throw error;
  }
}

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    await signup(email, password);
    return new NextResponse(
      "Signup successful. Please check your email for verification.",
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Signup failed", { status: 400 });
  }
}
