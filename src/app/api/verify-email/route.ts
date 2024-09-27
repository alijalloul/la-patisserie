import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import db from "@/db/db";

const JWT_SECRET = process.env.JWT_SECRET as string;

async function verifyEmail(token: string) {
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

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return new NextResponse("Verification token is missing", { status: 400 });
  }

  return verifyEmail(token);
}
