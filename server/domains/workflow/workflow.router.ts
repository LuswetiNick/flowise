import prisma from "@/server/db";
import { inngest } from "@/server/inngest/client";
import { createTRPCRouter, protectedProcedure } from "@/server/trpc/init";

export const workflowRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(async () => {
    return await prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async ({ ctx }) => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: ctx.session.user.email,
      },
    });
    return { success: true, message: "Workflow created successfully" };
  }),
});
