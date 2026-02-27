"use client";

import Link from "next/link";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import Logo from "../logo";
import { buttonVariants } from "../ui/button";
import { MobileNav } from "./mobile-nav";

export const navLinks = [
  {
    label: "Features",
    href: "#",
  },
  {
    label: "Pricing",
    href: "#",
  },
  {
    label: "About",
    href: "#",
  },
];
const Header = () => {
  const scrolled = useScroll(10);
  return (
    <header
      className={cn("sticky top-0 z-50 w-full border-transparent border-b", {
        "border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50":
          scrolled,
      })}
    >
      <nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
        <Link href="/">
          <Logo />
        </Link>
        <div className="hidden items-center gap-4 md:flex">
          {navLinks.map((link) => (
            <Link
              className="font-medium text-sm transition-colors duration-200 hover:text-primary"
              href={link.href}
              key={link.label}
            >
              {link.label}
            </Link>
          ))}
          <Link
            className={buttonVariants({ variant: "default" })}
            href="/login"
          >
            Get Started
          </Link>
        </div>
        <MobileNav />
      </nav>
    </header>
  );
};
export default Header;
