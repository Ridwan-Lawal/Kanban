"use client";
import Divider from "@/components/ui/Divider";
import InputField, { PasswordInputField } from "@/components/ui/InputField";
import OAuthBtn from "@/components/ui/OAuthBtn";
import PasswordRequirements from "@/components/ui/PasswordRequirements";
import { usePassword } from "@/hooks/usePassword";
import { RegisterSchema, RegisterType } from "@/lib/schema/auth-schema";
import Logo from "@/public/icon.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";

export default function Register() {
  const { register, handleSubmit, reset, formState, control } = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const formValues = useWatch({
    control,
  });
  const password = usePassword(formValues?.password ?? "");

  const { errors } = formState;
  const areAllInputsFilled = Object.values(formValues).every((input) => input);

  function handleRegister(formData: RegisterType) {
    console.log(formData);
  }

  return (
    <div className="from-main-purple-hover/10 flex min-h-screen w-screen items-center justify-center bg-linear-30 to-white">
      <div className="w-full max-w-100 px-4 py-8">
        {/* header */}
        <div className="flex flex-col items-center justify-center gap-4">
          <Image src={Logo} alt="The kanban logo" quality={75} />
          <div className="space-y-2 text-center">
            <h1 className="heading-xl">Create an account</h1>
            <p className="body-l text-lines-dark">Get started with your free account </p>
          </div>
        </div>

        {/* form */}
        <form
          action=""
          autoComplete=""
          className="mt-6 flex flex-col gap-4"
          onSubmit={handleSubmit(handleRegister)}
        >
          <InputField htmlFor="email" label="Email" error={errors?.email?.message}>
            <input
              type="text"
              id="email"
              onFocus={password.handleClosePasswordReqList}
              defaultValue=""
              autoComplete="email"
              placeholder="name@example.com "
              className="input__field body-l"
              aria-invalid={!!errors?.email?.message}
              {...register("email")}
            />
          </InputField>

          <div className="space-y-3">
            <PasswordInputField
              htmlFor="password"
              label="Password"
              error={errors?.password?.message}
              isPasswordShown={password.isPasswordShown}
              onPasswordVisiblity={password.handlePasswordVisibility}
            >
              <input
                type={password.isPasswordShown ? "text" : "password"}
                id="password"
                defaultValue=""
                onFocus={password.handleOpenPasswordReqList}
                autoComplete="password"
                placeholder="********"
                className="input__field body-l"
                aria-invalid={!!errors?.password?.message}
                {...register("password")}
              />
            </PasswordInputField>

            <PasswordRequirements
              isPasswordReqListOpen={password.isPasswordReqListOpen}
              passwordReqs={password.passwordReqs}
            />
          </div>

          <PasswordInputField
            htmlFor="confirmPassword"
            label="Confirm Password"
            error={errors?.confirmPassword?.message}
            isPasswordShown={password.isPasswordShown}
            onPasswordVisiblity={password.handlePasswordVisibility}
          >
            <input
              type={password.isPasswordShown ? "text" : "password"}
              id="confirmPassword"
              defaultValue=""
              onFocus={password.handleClosePasswordReqList}
              autoComplete="confirmPassword"
              placeholder="********"
              className="input__field body-l"
              aria-invalid={!!errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
          </PasswordInputField>

          <button
            className="btn btn-primary-l mt-3 w-full rounded-lg px-4 py-3"
            disabled={!areAllInputsFilled}
          >
            Sign up
          </button>
        </form>

        <Divider />

        {/* Social login */}
        <OAuthBtn onClick={() => {}}> Sign up with Google</OAuthBtn>

        <p className="text-medium-grey body-l mt-4 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-main-purple font-semibold">
            {" "}
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
