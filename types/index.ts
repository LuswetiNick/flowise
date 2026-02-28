import type { auth } from "@/lib/auth";
import type { Context } from "@/server/trpc/init";

export type OAuthProvider = "github" | "google";
export type Session = typeof auth.$Infer.Session;

export type TRPCContext = Context;
