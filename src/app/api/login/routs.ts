import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { serialize } from "cookie";
import db from "@/db/db";

const JWT_SECRET = process.env.JWT_SECRET as string;

async function login(email: string, password: string) {
  const user = await db.user.findUnique({ where: { email } });
  if (!user || !user.isVerified) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
  return token;
}

export async function POST(request: Request) {
  const { email, password } = await request.json();

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
