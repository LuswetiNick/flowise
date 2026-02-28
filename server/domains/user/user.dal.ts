import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { auth } from "@/lib/auth";
import "server-only";
import prisma from "@/server/db";

/**
 * Get current user
 */
export const getCurrentUser = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  if (!user) {
    throw new Error("User not found");
  }
  return {
    id: user.id,
    email: user.email ?? "",
    name: user.name ?? "",
    image: user.image ?? "",
  };
});

// Require User
export const requireUser = cache(async () => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
});

// Get User By ID
export const getUserById = cache(async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });
  return user;
});
