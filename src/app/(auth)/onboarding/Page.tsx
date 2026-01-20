import Onboarding from "@/features/auth/Onboarding";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding",
};

export default function Page() {
  return (
    <div>
      <Onboarding />
    </div>
  );
}
