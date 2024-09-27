"use server";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { serialize } from "cookie";
import db from "@/db/db";
import nodemailer from "nodemailer";

const JWT_SECRET = process.env.JWT_SECRET as string;

const transporter = nodemailer.createTransport({
  service: "gmail", // You can use another service provider if needed
  auth: {
    user: process.env.EMAIL_FROM, // Your email address
    pass: process.env.NODEMAILER_PASS, // Your email password or app password
  },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
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

// Generate a verification token
function generateVerificationToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1d" });
}

// Send verification email
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

// Signup function
export async function signup(email: string, password: string) {
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
    throw error; // Or handle it as needed
  }
}

// Login function
export async function login(email: string, password: string) {
  const user = await db.user.findUnique({ where: { email } });
  if (!user || !user.isVerified) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
  return token;
}

// Handle signup request
export async function handleSignup({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    await signup(email, password);

    console.log("signup over");
    return new NextResponse(
      "Signup successful. Please check your email for verification.",
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Signup failed", { status: 400 });
  }
}

// Handle login request
export async function handleLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const token = await login(email, password);
    if (token) {
      return new NextResponse("Login successful", {
        status: 200,
        headers: {
          "Set-Cookie": serialize("token", token, {
            path: "/",
            httpOnly: true,
          }),
        },
      });
    } else {
      return new NextResponse("Invalid credentials or email not verified", {
        status: 401,
      });
    }
  } catch (error) {
    return new NextResponse("Login failed", { status: 400 });
  }
}

// Verify email function
export async function verifyEmail(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    await db.user.update({
      where: { id: decoded.userId },
      data: { isVerified: true },
    });
    return new NextResponse("Email verified successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Invalid or expired token", { status: 400 });
  }
}
