import { FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";

const LoginForm = ({ className, ...props }: React.ComponentProps<"form">) => {
  return (
    <form className={cn("flex flex-col gap-4", className)} {...props}>
      <FieldGroup>Social Auth Buttons</FieldGroup>
    </form>
  );
};
export default LoginForm;
