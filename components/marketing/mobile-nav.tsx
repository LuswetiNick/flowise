import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Portal, PortalBackdrop } from "@/components/ui/portal";
import { cn } from "@/lib/utils";
import { navLinks } from "./header";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="md:hidden">
      <Button
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label="Toggle menu"
        className="md:hidden"
        onClick={() => setOpen(!open)}
        size="icon"
        variant="outline"
      >
        {open ? (
          <XIcon className="size-4.5" />
        ) : (
          <MenuIcon className="size-4.5" />
        )}
      </Button>
      {open && (
        <Portal className="top-14" id="mobile-menu">
          <PortalBackdrop />
          <div
            className={cn(
              "data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in",
              "size-full p-4"
            )}
            data-slot={open ? "open" : "closed"}
          >
            <div className="grid gap-y-4">
              {navLinks.map((link) => (
                <Link
                  className="w-full justify-start font-medium text-sm transition-colors duration-200 hover:text-primary"
                  href={link.href}
                  key={link.label}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-12 flex flex-col gap-2">
              <Link
                className={buttonVariants({
                  variant: "default",
                  size: "sm",
                  className: "w-full",
                })}
                href="/login"
              >
                Get Started
              </Link>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}
