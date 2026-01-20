"use client";
import { PasswordInputField } from "@/components/ui/InputField";
import PasswordRequirements from "@/components/ui/PasswordRequirements";
import { resetPasswordAction } from "@/features/auth/auth-action";
import { usePassword } from "@/hooks/usePassword";
import { ResetPasswordSchema, ResetPasswordType } from "@/lib/schema/auth-zod-schema";
import Logo from "@/public/icon.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

export default function ResetPassword() {
  const { register, handleSubmit, reset, formState, control } = useForm<ResetPasswordType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const formValues = useWatch({
    control,
  });
  const [isResettingPassword, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();
  const resetToken = searchParams.get("token");

  const password = usePassword(formValues?.password ?? "");

  const { errors } = formState;
  const areAllInputsFilled = Object.values(formValues).every((input) => input);

  function handlePasswordReset(formData: ResetPasswordType) {
    startTransition(async () => {
      const res = await resetPasswordAction(formData, resetToken);
      if (res.error) {
        toast.error(res.error);
      }
      if (res.success) {
        toast.success(res.success);
        reset();
        router.push("/login");
      }
    });
  }

  return (
    <div className="from-main-purple-hover/10 flex min-h-screen w-screen items-center justify-center bg-linear-30 to-white">
      <div className="w-full max-w-100 px-4 py-8">
        {/* header */}
        <div className="flex flex-col items-center justify-center gap-4">
          <Image src={Logo} alt="The kanban logo" quality={75} />
          <div className="space-y-2 text-center">
            <h1 className="heading-xl">Create new password</h1>
            <p className="body-l text-lines-dark">
              Your new password must be different from previous used passwords.{" "}
            </p>
          </div>
        </div>

        {/* form */}
        <form
          action=""
          autoComplete=""
          className="mt-6 flex flex-col gap-4"
          onSubmit={handleSubmit(handlePasswordReset)}
        >
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
                disabled={isResettingPassword}
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
              disabled={isResettingPassword}
              className="input__field body-l"
              aria-invalid={!!errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
          </PasswordInputField>

          <button
            className="btn btn-primary-l mt-3 w-full rounded-lg px-4 py-3"
            disabled={!areAllInputsFilled || isResettingPassword}
          >
            {isResettingPassword ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div className="mt-5 flex items-center">
          <Link
            href="/login"
            className="text-medium-grey hover:text-main-purple w-full text-center text-[13px] font-medium underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
