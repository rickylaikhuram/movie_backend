import { PrismaClient } from "@prisma/client";
const globalForPrisma = global;
const prisma = globalForPrisma.prisma ??
    new PrismaClient({
        log: process.env.NODE_ENV === "developmen" ? ["query"] : [],
    });
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
export default prisma;
//# sourceMappingURL=prisma.js.map