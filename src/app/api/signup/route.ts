import db from "@/db/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

interface SignupData {
  fn: string;
  ln: string;
  email: string;
  password: string;
}

async function signup(fn: string, ln: string, email: string, password: string): Promise<NextResponse | void> {  
  const user = await db.user.findUnique({ where: { email } });

  if (user) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);


  try {
    await db.user.create({
      data: { firstName: fn, lastName: ln, email, password: hashedPassword },
    });
  } catch (error) {
    console.error("Prisma Error:", error);
    throw error;
  }
}

export async function POST(request: Request): Promise<NextResponse> {

  const { fn, ln, email, password }: SignupData = await request.json();

  try {
    const res = await signup(fn, ln, email, password);


    if (res) {
      return res;
    }

    return new NextResponse("Signup successful.", { status: 200 });
  } catch (error) {
    console.log("Signup failed error: ", error)
    return new NextResponse("Signup failed", { status: 400 });
  }
}
