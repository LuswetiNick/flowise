"use client";
import { Loader } from "lucide-react";
import Image from "next/image";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import type { OAuthProvider } from "@/types";
import { Badge } from "../ui/badge";

const OAuthLoadingContext = createContext<{
  loadingProvider: OAuthProvider | null;
  setLoading: (provider: OAuthProvider | null) => void;
}>({
  loadingProvider: null,
  setLoading: () => {
    // Default no-op function
  },
});

const OAuthButton = ({ provider }: { provider: OAuthProvider }) => {
  const { loadingProvider, setLoading } = useContext(OAuthLoadingContext);
  const isLoading = loadingProvider === provider;
  const isDisabled = loadingProvider !== null;
  const [lastMethod, setLastMethod] = useState<OAuthProvider | null>(null);

  useEffect(() => {
    setLastMethod(authClient.getLastUsedLoginMethod() as OAuthProvider | null);
  }, []);

  async function handleOAuth() {
    setLoading(provider);
    await authClient.signIn.social({
      provider,
      callbackURL: "/dashboard",
      errorCallbackURL: "/error",
      fetchOptions: {
        onResponse: () => {
          setLoading(null);
        },
        onSuccess: () => {
          setLoading(null);
          toast.success("Success!");
        },
        onError: (ctx) => {
          setLoading(null);
          toast.error(ctx.error.message || "Something went wrong");
        },
      },
    });
  }
  const getButtonContent = () => {
    if (isLoading) {
      return (
        <>
          <Loader className="size-4 animate-spin" />
          Signing in...
        </>
      );
    }

    if (provider === "google") {
      return (
        <>
          <Image alt="Google" height={16} src="/google.svg" width={16} />
          Continue with Google
        </>
      );
    }

    return (
      <>
        <Image alt="GitHub" height={16} src="/github.svg" width={16} />
        Continue with GitHub
      </>
    );
  };

  return (
    <FieldGroup>
      <Field>
        <Button
          className="relative w-full"
          disabled={isDisabled}
          onClick={handleOAuth}
          variant="outline"
        >
          {getButtonContent()}
          {lastMethod === provider && (
            <Badge className="absolute -right-24 text-xs" variant="secondary">
              Last used
            </Badge>
          )}
        </Button>
      </Field>
    </FieldGroup>
  );
};

const OAuthButtons = () => {
  const [loadingProvider, setLoading] = useState<OAuthProvider | null>(null);

  return (
    <OAuthLoadingContext.Provider value={{ loadingProvider, setLoading }}>
      <div className="flex flex-col gap-4">
        <OAuthButton provider="google" />
        <OAuthButton provider="github" />
      </div>
    </OAuthLoadingContext.Provider>
  );
};

export default OAuthButtons;
