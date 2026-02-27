import { lastLoginMethodClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { clientEnv } from "@/config/env/client";

const baseURL =
  clientEnv.NEXT_PUBLIC_APP_URL ||
  clientEnv.NEXT_PUBLIC_BETTER_AUTH_URL ||
  "http://localhost:3000";

if (!baseURL) {
  throw new Error("Base URL not found");
}

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL,
  plugins: [lastLoginMethodClient()],
});
