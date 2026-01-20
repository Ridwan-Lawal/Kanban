"use client";

import { triggerVerificationEmail } from "@/features/auth/auth-action";
import { getAuthState } from "@/lib/redux/auth-slice";
import { useAppSelector } from "@/lib/redux/hooks";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export default function VerifyEmail() {
  const [timeLeft, setTimeLeft] = useState(30);
  const [isResendingEmail, startTransition] = useTransition();
  const { emailToVerify } = useAppSelector(getAuthState);

  // 2. Setup the countdown logic
  useEffect(() => {
    if (timeLeft === 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handleResend = async () => {
    startTransition(async () => {
      const res = await triggerVerificationEmail(emailToVerify);
      if (res.success) toast.success("Verification email sent. Please check your inbox.");
      if (!res.success) toast.error("Failed to send verification email. Please try again later.");
    });

    setTimeLeft(30);
  };
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-xl border border-gray-100 bg-white p-8 text-center shadow-lg">
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f3f3fd]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-main-purple h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        {/* Text Content */}
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Verify your email</h2>
        <p className="mb-6 text-gray-500">
          We&apos;ve sent a verification link to your email address. Please click the link to
          confirm your account.
        </p>

        {/* Timer Display */}
        <div className="mb-6 text-sm font-medium">
          {timeLeft > 0 ? (
            <span className="text-gray-400">
              Resend available in: <span className="text-gray-700">{formatTime(timeLeft)}</span>
            </span>
          ) : (
            <span className="text-green-600">You can now resend the email.</span>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={handleResend}
          disabled={timeLeft > 0}
          // The CSS below handles the specific color logic requested
          className={`w-full rounded-md px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 ${
            timeLeft > 0
              ? "cursor-not-allowed opacity-50"
              : "bg-main-purple hover:bg-main-purple-hover cursor-pointer shadow-md"
          } `}
        >
          {timeLeft > 0
            ? "Wait to Resend"
            : isResendingEmail
              ? "Resending email..."
              : "Resend Verification Email"}
        </button>

        <p className="mt-6 text-xs text-gray-400">
          Did not receive the email? Check your spam filter.
        </p>
      </div>
    </div>
  );
}
