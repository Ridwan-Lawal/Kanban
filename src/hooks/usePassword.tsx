import { checkPasswordStrength } from "@/utils/password-checker";
import { useState } from "react";

export function usePassword(passwordValue?: string) {
  const [isPasswordReqListOpen, setIsPasswordReqListOpen] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const handlePasswordVisibility = () => setIsPasswordShown((cs) => !cs);
  const handleClosePasswordReqList = () => setIsPasswordReqListOpen(false);
  const handleOpenPasswordReqList = () => setIsPasswordReqListOpen(true);
  const passwordReqs = checkPasswordStrength(passwordValue ?? "");

  return {
    isPasswordReqListOpen,
    isPasswordShown,
    handlePasswordVisibility,
    handleClosePasswordReqList,
    handleOpenPasswordReqList,
    passwordReqs,
  };
}
