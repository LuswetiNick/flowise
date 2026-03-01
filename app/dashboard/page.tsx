import Header from "@/components/dashboard/header";
import Testing from "@/components/dashboard/test";
import { requireUser } from "@/server/domains/user/user.dal";
import { caller } from "@/server/trpc/server";

export default async function Dashboard() {
  await requireUser();
  const user = await caller.user.getUser();

  return (
    <div>
      <Header />
      <p>Hello, {user.name}!</p>
      <Testing />
    </div>
  );
}
