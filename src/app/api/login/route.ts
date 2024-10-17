import db from "@/db/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

interface LoginCredentials {
  email: string;
  password: string;
}

async function login(email: string, password: string): Promise<string | null> {
  const user = await db.user.findUnique({ where: { email } });

  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  const token = jwt.sign({ userId: user.id }, JWT_SECRET as string, { expiresIn: "1h" });

  return token;
}

export async function POST(request: Request): Promise<NextResponse> {
  const { email, password }: LoginCredentials = await request.json();

  try {
    const token = await login(email, password);

    if (token) {
      console.log("token: ", token);

      return new NextResponse("Login successful", {
        status: 200,
        headers: {
          "Set-Cookie": `token=${token}; Path=/; Max-Age=${60 * 60}`,
        },
      });
    } else {
      return NextResponse.json(
        { error: "Invalid credentials" },
        {
          status: 401,
        }
      );
    }
  } catch (error) {
    console.log("error: ", error);

    return new NextResponse("Login failed", { status: 400 });
  }
}
