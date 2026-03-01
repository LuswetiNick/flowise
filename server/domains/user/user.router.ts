import "server-only";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "@/server/trpc/init";
import { getUserById } from "./user.dal";
import { PublicUserSchema } from "./user.dto";

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure
    .output(PublicUserSchema)
    .query(async ({ ctx }) => {
      // pull the id from the session and fail fast if there is none
      const userId = ctx.session?.user.id;
      if (!userId) {
        // no session -> unauthorized instead of pretending the user was missing
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in.",
        });
      }

      const user = await getUserById(userId);
      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found." });
      }
      return user;
    }),
});
