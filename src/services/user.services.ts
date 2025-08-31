import prisma from "../config/prisma.js";

// services/user.service.ts
export async function getUserById(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      profileUrl: true,
      createdAt: true,
    },
  });
}
