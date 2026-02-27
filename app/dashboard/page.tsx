import Header from "@/components/dashboard/header";
import { getCurrentUser, requireUser } from "@/server/domains/user/user.dal";

export default async function Dashboard() {
  await requireUser();
  const user = await getCurrentUser();

  return (
    <div>
      <Header />
      {JSON.stringify(user)}
    </div>
  );
}
