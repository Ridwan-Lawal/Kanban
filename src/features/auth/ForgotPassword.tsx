"use client";
import InputField from "@/components/ui/InputField";
import { ForgotPasswordSchema, ForgotPasswordType } from "@/lib/schema/auth-schema";
import Logo from "@/public/icon.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";

export default function ForgotPassword() {
  const { register, handleSubmit, control, reset, formState } = useForm<ForgotPasswordType>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const { email } = useWatch({
    control,
  });

  const isEmailInputPopulated = !!email;

  const { errors } = formState;

  function handleSendingResetEmail(formData: ForgotPasswordType) {
    console.log(formData);
  }

  return (
    <div className="from-main-purple-hover/10 flex min-h-screen w-screen items-center justify-center bg-linear-to-r to-white">
      <div className="w-full max-w-100 px-4 py-8">
        {/* header */}
        <div className="flex flex-col items-center justify-center gap-4">
          <Image src={Logo} alt="The kanban logo" quality={75} />
          <div className="space-y-2 text-center">
            <h1 className="heading-xl">Forgot password?</h1>
            <p className="body-l text-lines-dark">
              Enter your email below and we will send you a link to reset your password.
            </p>
          </div>
        </div>

        {/* form */}
        <form
          action=""
          autoComplete=""
          className="mt-6 flex flex-col gap-4"
          onSubmit={handleSubmit(handleSendingResetEmail)}
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

          <button
            disabled={!isEmailInputPopulated}
            aria-disabled={!isEmailInputPopulated}
            className="btn btn-primary-l mt-0 w-full rounded-lg px-4 py-3"
          >
            Send Password Reset Email
          </button>

          <div className="mt-5 flex items-center">
            <Link
              href="/login"
              className="text-medium-grey hover:text-main-purple w-full text-center text-[13px] font-medium underline"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
