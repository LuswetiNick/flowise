import "server-only";
import { userRouter } from "@/server/domains/user/user.router";
import { workflowRouter } from "@/server/domains/workflow/workflow.router";
import { inngest } from "@/server/inngest/client";
import { createTRPCRouter, protectedProcedure } from "../init";
export const appRouter = createTRPCRouter({
  user: userRouter,
  workflow: workflowRouter,
  testAI: protectedProcedure.mutation(async () => {
    await inngest.send({ name: "test/ai" });
    return { success: true };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
