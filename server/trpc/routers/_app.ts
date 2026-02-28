import "server-only";
import { userRouter } from "@/server/domains/user/user.router";
import { createTRPCRouter } from "../init";
export const appRouter = createTRPCRouter({
  user: userRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
