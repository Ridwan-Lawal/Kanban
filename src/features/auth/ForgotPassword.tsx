"use client";
import InputField from "@/components/ui/InputField";
import { requestPasswordRequestAction } from "@/features/auth/auth-action";
import { ForgotPasswordSchema, ForgotPasswordType } from "@/lib/schema/auth-zod-schema";
import Logo from "@/public/icon.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

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
  const [isSendingEmail, startTransition] = useTransition();

  const isEmailInputPopulated = !!email;

  const { errors } = formState;

  function handleSendingResetEmail(formData: ForgotPasswordType) {
    startTransition(async () => {
      const res = await requestPasswordRequestAction(formData);
      if (res.error) toast.error(res.error);
      if (res.success) {
        reset();
        toast.success(res.success);
      }
    });
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
              disabled={isSendingEmail}
              aria-invalid={!!errors?.email?.message}
              {...register("email")}
            />
          </InputField>

          <button
            disabled={!isEmailInputPopulated || isSendingEmail}
            aria-disabled={!isEmailInputPopulated || isSendingEmail}
            className="btn btn-primary-l mt-0 w-full rounded-lg px-4 py-3"
          >
            {isSendingEmail ? "Sending reset mail..." : " Send Password Reset Email"}
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
