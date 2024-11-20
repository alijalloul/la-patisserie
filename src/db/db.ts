import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Declare globalThis to support global variable in the global namespace
declare const globalThis: {
  prismaGlobal: PrismaClient;
} & typeof global;

let db: PrismaClient;

if (process.env.NODE_ENV === "production") {
  // In production, just create a new PrismaClient instance
  db = new PrismaClient();
} else {
  // In development, use a global singleton to prevent creating multiple PrismaClient instances
  if (!globalThis.prismaGlobal) {
    globalThis.prismaGlobal = prismaClientSingleton();
  }
  db = globalThis.prismaGlobal;
}

export default db;
