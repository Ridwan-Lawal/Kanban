import { authClient } from "@/lib/auth-client";
import GoogleLogo from "@/public/google.svg";
import Image from "next/image";
import { PropsWithChildren, useState } from "react";
import { toast } from "sonner";

interface OAuthBtnProp extends PropsWithChildren {
  onClick: () => void;
}

export default function OAuthBtn({ children, onClick }: OAuthBtnProp) {
  const [isSigningIn, setIsSigningIn] = useState(false);

  async function handleGoogleSignIn() {
    const data = await authClient.signIn.social(
      {
        provider: "google",
        callbackURL: "/dashboard",
      },
      {
        onRequest: () => setIsSigningIn(true),
        onResponse: () => setIsSigningIn(false),
        onError: (ctx) => {
          toast.error(ctx.error.message);
          setIsSigningIn(false);
        },
      },
    );
  }

  return (
    <button
      className="btn body-l text-medium-grey dark:bg-dark-grey flex w-full items-center justify-center gap-4 bg-gray-100 py-2.5 text-base font-medium dark:text-white"
      onClick={handleGoogleSignIn}
    >
      <Image alt="google icon" src={GoogleLogo} quality={75} className="size-5" />
      <span>{isSigningIn ? "Signing in with Google..." : children}</span>
    </button>
  );
}
