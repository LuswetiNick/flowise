import { Unplug } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <Unplug className="size-4" />
      </div>
      <span className="font-bold text-xl">Linky</span>
    </div>
  );
};
export default Logo;
