import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { auth } from "@/lib/auth";
import "server-only";

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
