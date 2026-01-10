"use client";
import Divider from "@/components/ui/Divider";
import InputField, { PasswordInputField } from "@/components/ui/InputField";
import OAuthBtn from "@/components/ui/OAuthBtn";
import Logo from "@/public/icon.svg";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <div className="from-main-purple-hover/10 flex min-h-screen w-screen items-center justify-center bg-linear-to-r to-white">
      <div className="w-full max-w-100 px-4 py-8">
        {/* header */}
        <div className="flex flex-col items-center justify-center gap-4">
          <Image src={Logo} alt="The kanban logo" quality={75} />
          <div className="space-y-2 text-center">
            <h1 className="heading-xl">Welcome back</h1>
            <p className="body-l text-lines-dark">Sign in to your account to continue</p>
          </div>
        </div>

        {/* form */}
        <form action="" autoComplete="" className="mt-6 flex flex-col gap-4">
          <InputField htmlFor="email" label="Email" error="">
            <input
              type="text"
              name="email"
              id="email"
              defaultValue=""
              autoComplete="email"
              placeholder="name@example.com "
              className="input__field body-l"
            />
          </InputField>

          <PasswordInputField htmlFor="password" label="Password" error="">
            <input
              type="password"
              name="password"
              id="password"
              defaultValue=""
              autoComplete="password"
              placeholder="********"
              className="input__field body-l"
            />
          </PasswordInputField>

          <button className="btn btn-primary-l mt-3 w-full rounded-lg px-4 py-3">Sign in</button>
        </form>

        <Divider />

        {/* Social login */}

        <OAuthBtn onClick={() => {}}> Continue with Google</OAuthBtn>

        <p className="text-medium-grey body-l mt-4 text-center">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-main-purple font-semibold">
            {" "}
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
