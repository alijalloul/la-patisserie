import { getVerificationTokenByEmail } from "@/app/(customerFacing)/auth/authentication";
import db from "@/db/db";
import { v4 } from "uuid";

export async function generateVerificationToken(email: string) {
  const token = v4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({ where: { id: existingToken.id } });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
}
