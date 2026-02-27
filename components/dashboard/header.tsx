"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const Header = () => {
  const router = useRouter();
  return (
    <div>
      {" "}
      <Button
        onClick={async () =>
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/login"); // redirect to login page
              },
            },
          })
        }
      >
        Logout
      </Button>
    </div>
  );
};
export default Header;
