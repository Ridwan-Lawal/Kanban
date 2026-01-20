"use client";

import { OnboardingSchema, OnboardingType } from "../../lib/schema/auth-zod-schema";
import InputField from "@/components/ui/InputField";
import { userOnboardingAction } from "@/features/auth/auth-action";
import Logo from "@/public/icon.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

export default function Onboarding() {
  const { handleSubmit, register, reset, formState, control } = useForm<OnboardingType>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: {
      name: "",
    },
  });
  const [isOnboardingUser, startTransition] = useTransition();
  const router = useRouter();

  const { errors } = formState;
  const { name } = useWatch({
    control,
  });

  const isNameInputFieldPopulated = !!name;

  function handleOnboardingProcess(formdata: OnboardingType) {
    startTransition(async () => {
      const res = await userOnboardingAction(formdata);
      if (res.error) {
        toast.error(res.error);
      }

      if (res.success) {
        toast.success("Onboarding Successful", { description: res.success });
        reset();
        router.push("/dashboard");
      }
    });
  }

  return (
    <div className="from-main-purple-hover/10 flex min-h-screen w-screen items-center justify-center bg-linear-to-r to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-100 px-4 py-8"
      >
        {/* header */}
        <div className="flex flex-col items-center justify-center gap-4">
          <Image src={Logo} alt="The kanban logo" quality={75} />
          <div className="space-y-2 text-center">
            <h1 className="heading-xl">What should we call you?</h1>
            <p className="body-l text-lines-dark">
              We&apos;ll use this to personalize your experience.
            </p>
          </div>
        </div>

        {/* form */}
        <form
          action=""
          autoComplete=""
          className="mt-6 flex flex-col gap-4"
          onSubmit={handleSubmit(handleOnboardingProcess)}
        >
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <InputField htmlFor="name" label="Name" error={errors?.name?.message}>
              <input
                type="text"
                id="name"
                defaultValue=""
                autoComplete="given-name"
                placeholder="e.g. Ridwan"
                className="input__field body-l"
                aria-invalid={!!errors?.name?.message}
                disabled={isOnboardingUser}
                {...register("name")}
              />
            </InputField>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <button
              disabled={!isNameInputFieldPopulated}
              aria-disabled={!isNameInputFieldPopulated}
              className="btn btn-primary-l mt-0 w-full rounded-lg px-4 py-3 transition-transform active:scale-95"
            >
              {isOnboardingUser ? "Onboarding you..." : "Continue"}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
