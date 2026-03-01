"use client";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";

import Link from "next/link";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AuthErrorPage() {
  return (
    <section className="flex h-screen w-full items-center justify-center md:overflow-hidden">
      <div className="flex w-full flex-col justify-center px-8">
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
          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-destructive/10">
                <AlertTriangle className="size-6 text-destructive" />
              </div>
              <CardTitle className="text-xl">Authentication Error</CardTitle>
              <CardDescription>
                Something went wrong during the sign in process
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-muted-foreground text-sm">
                <p className="mb-2">
                  We encountered an issue while trying to sign you in. This
                  could be due to:
                </p>
                <ul className="list-inside list-disc space-y-1 text-xs">
                  <li>Invalid credentials or expired session</li>
                  <li>Network connectivity issues</li>
                  <li>Temporary server problems</li>
                  <li>OAuth provider errors</li>
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <Button className="w-full" render={<Link href="/login" />}>
                  <RefreshCw className="size-4" />
                  Try Again
                </Button>
                <Button className="w-full" render={<Link href="/" />} variant="outline">
                  <ArrowLeft className="size-4" />
                  Back to Home
                </Button>
              </div>
              <div className="text-center text-muted-foreground text-xs">
                <p>
                  If the problem persists, please contact our{" "}
                  <Link
                    className="text-primary underline hover:text-primary/80"
                    href="/support"
                  >
                    support team
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
