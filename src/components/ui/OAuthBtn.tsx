import GoogleLogo from "@/public/google.svg";
import Image from "next/image";
import { PropsWithChildren } from "react";

interface OAuthBtnProp extends PropsWithChildren {
  onClick: () => void;
}

export default function OAuthBtn({ children, onClick }: OAuthBtnProp) {
  return (
    <button
      className="btn body-l text-medium-grey flex w-full items-center justify-center gap-4 bg-gray-100 py-2.5 text-base font-medium"
      onClick={onClick}
    >
      <Image alt="google icon" src={GoogleLogo} quality={75} className="size-5" />
      <span>{children}</span>
    </button>
  );
}
