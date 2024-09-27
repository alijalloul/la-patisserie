import { NextRequest, NextResponse } from "next/server";

async function hashPassword(password: string) {
  const arrayBuffer = await crypto.subtle.digest(
    "SHA-512",
    new TextEncoder().encode(password)
  );

  return Buffer.from(arrayBuffer).toString("base64");
}

async function isAuthenticated(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return false;

  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");

  const hashedPassword = await hashPassword(password);

  return (
    username === process.env.ADMIN_USERNAME &&
    hashedPassword === process.env.ADMIN_HASHED_PASSWORD

  );
}

export async function middleware(req: NextRequest) {
  if (!(await isAuthenticated(req))) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": "Basic" },
    });
  }
}

export const config = {
  matcher: "/admin/:path*",
};
