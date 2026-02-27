import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/app/generated/prisma/client";
import { serverEnv } from "@/config/env/server";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};
const adapter = new PrismaNeon({ connectionString: serverEnv.DATABASE_URL });
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
export default prisma;
