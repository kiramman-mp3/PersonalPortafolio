import { PrismaPg } from "@prisma/adapter-pg";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import { env } from "../../config/env.ts";

const databaseUrl = env["DATABASE_URL"];

declare global {
  // eslint-disable-next-line no-var
  var __prismaInstance: any | undefined;
}

function createPrismaClient() {
  if (!databaseUrl) {
    console.warn("ADVERTENCIA: DATABASE_URL no está definida en las variables de entorno.");
  }
  const adapter = databaseUrl ? new PrismaPg({ connectionString: databaseUrl }) : undefined;
  return new PrismaClient(adapter ? { adapter } : undefined);
}

// Patrón Singleton para evitar agotar el pool de conexiones en entornos Serverless (Vercel)
const prisma = globalThis.__prismaInstance || createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.__prismaInstance = prisma;
} else {
  globalThis.__prismaInstance = prisma;
}

export default prisma;