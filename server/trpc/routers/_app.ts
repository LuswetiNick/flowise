import "server-only";
import { userRouter } from "@/server/domains/user/user.router";
import { workflowRouter } from "@/server/domains/workflow/workflow.router";
import { createTRPCRouter } from "../init";
export const appRouter = createTRPCRouter({
  user: userRouter,
  workflow: workflowRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
