import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/components/auth/login-form";
import Logo from "@/components/logo";
import { FloatingPaths } from "@/components/ui/floating-paths";

export const metadata: Metadata = {
  title: "Sign In | Flowise",
  description: "Sign in to your Flowise account to access your dashboard.",
  keywords: ["login", "signin", "authentication", "Flowise", "account"],
  openGraph: {
    title: "Sign In | Flowise",
    description: "Sign in to your Flowise account to access your dashboard.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sign In | Flowise",
    description: "Sign in to your Flowise account to access your dashboard.",
  },
};

export default function LoginPage() {
  return (
    <section className="relative md:h-screen md:overflow-hidden lg:grid lg:grid-cols-2">
      <div className="relative hidden h-full flex-col border-r bg-secondary p-10 lg:flex dark:bg-secondary/20">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background" />
        <Logo />
        <div className="z-10 mt-auto">
          <blockquote className="space-y-2">
            <p className="font-serif text-xl">
              &ldquo;This Platform has helped me to save time and serve my
              clients faster than ever before.&rdquo;
            </p>
            <footer className="font-mono font-semibold text-sm">
              ~ Ali Hassan
            </footer>
          </blockquote>
        </div>
        <div className="absolute inset-0">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>
      </div>
      <div className="relative flex min-h-screen flex-col justify-center px-8">
        {/* Top Shades */}
        <div
          aria-hidden
          className="absolute inset-0 isolate -z-10 opacity-60 contain-strict"
        >
          <div className="absolute top-0 right-0 h-320 w-140 -translate-y-87.5 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,--theme(--color-foreground/.06)_0,hsla(0,0%,55%,.02)_50%,--theme(--color-foreground/.01)_80%)]" />
          <div className="absolute top-0 right-0 h-320 w-60 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="absolute top-0 right-0 h-320 w-60 -translate-y-87.5 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)]" />
        </div>
        <Link
          className="absolute top-7 left-5 flex items-center gap-2"
          href="/"
        >
          <ArrowLeft className="size-4" />
          Home
        </Link>
        <div className="mx-auto space-y-4 sm:w-sm">
          <div className="lg:hidden">
            <Logo />
          </div>
          <div className="flex flex-col space-y-1">
            <h1 className="font-bold text-2xl tracking-wide">Join Now!</h1>
            <p className="text-base text-muted-foreground">
              login or create your Linky account.
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
