import Header from "@/components/dashboard/header";
import { requireUser } from "@/server/domains/user/user.dal";
import { caller } from "@/server/trpc/server";

export default async function Dashboard() {
  await requireUser();
  const user = await caller.user.getUser();

  return (
    <div>
      <Header />
      {JSON.stringify(user)}
    </div>
  );
}
