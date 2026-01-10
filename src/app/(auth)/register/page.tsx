import Register from "@/features/auth/Register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

export default function Page() {
  return (
    <div>
      <Register />
    </div>
  );
}
