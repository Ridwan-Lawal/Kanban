"use client";
import Divider from "@/components/ui/Divider";
import InputField, { PasswordInputField } from "@/components/ui/InputField";
import OAuthBtn from "@/components/ui/OAuthBtn";
import { usePassword } from "@/hooks/usePassword";
import { LoginSchema, LoginType } from "@/lib/schema/auth-schema";
import Logo from "@/public/icon.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";

export default function Login() {
  const { register, handleSubmit, control, reset, formState } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const values = useWatch({
    control,
  });
  const { isPasswordShown, handlePasswordVisibility } = usePassword();

  const areAllInputsPopulated = Object.values(values).every((input) => input);

  const { errors } = formState;

  function handleLogin(formData: LoginType) {
    console.log(formData);
  }

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
        <form
          action=""
          autoComplete=""
          className="mt-6 flex flex-col gap-4"
          onSubmit={handleSubmit(handleLogin)}
        >
          <InputField htmlFor="email" label="Email" error={errors?.email?.message}>
            <input
              type="text"
              id="email"
              defaultValue=""
              autoComplete="email"
              placeholder="name@example.com "
              className="input__field body-l"
              aria-invalid={!!errors?.email?.message}
              {...register("email")}
            />
          </InputField>

          <PasswordInputField
            htmlFor="password"
            label="Password"
            error={errors?.password?.message}
            isPasswordShown={isPasswordShown}
            onPasswordVisiblity={handlePasswordVisibility}
          >
            <input
              type={isPasswordShown ? "text" : "password"}
              id="password"
              defaultValue=""
              autoComplete="password"
              placeholder="********"
              className="input__field body-l"
              aria-invalid={!!errors?.password?.message}
              {...register("password")}
            />
          </PasswordInputField>
          <Link
            href="/forgot-password"
            className="text-medium-grey hover: hover:text-main-purple -mt-2 text-right text-[11px] font-medium underline"
          >
            Forgot password?
          </Link>

          <button
            disabled={!areAllInputsPopulated}
            aria-disabled={!areAllInputsPopulated}
            className="btn btn-primary-l mt-0 w-full rounded-lg px-4 py-3"
          >
            Sign in
          </button>
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
