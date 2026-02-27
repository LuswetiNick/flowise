import { FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import OAuthButtons from "./oauth-buttons";

const LoginForm = ({ className, ...props }: React.ComponentProps<"form">) => {
  return (
    <form className={cn("flex flex-col gap-4", className)} {...props}>
      <FieldGroup>
        <OAuthButtons />
      </FieldGroup>
    </form>
  );
};
export default LoginForm;
