"use server";

import { getSession } from "@/features/auth/auth-service";
import { auth } from "@/lib/auth";
import {
  ForgotPasswordSchema,
  ForgotPasswordType,
  LoginSchema,
  LoginType,
  OnboardingSchema,
  OnboardingType,
  RegisterSchema,
  RegisterType,
  ResetPasswordSchema,
  ResetPasswordType,
} from "@/lib/schema/auth-zod-schema";
import { APIError } from "better-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod/v4-mini";

export async function resetPasswordAction(formData: ResetPasswordType, token: string | null) {
  const validationResult = ResetPasswordSchema.safeParse(formData);

  if (!validationResult.success) {
    const errorsProps = Object.keys(z.treeifyError(validationResult.error)?.properties ?? {});
    return { error: `Please check the highlighted fields. ${errorsProps.join(", ")}` };
  }

  const { password } = validationResult.data;

  if (!token) {
    return { error: "Invalid token. Please request a new password reset email." };
  }

  try {
    await auth.api.resetPassword({
      headers: await headers(),
      body: {
        token,
        newPassword: password,
      },
    });

    return { success: "Password reset successful. You can now log in with your new password." };
  } catch (error) {
    console.log(error);
    if (error instanceof APIError) {
      return { error: error.message };
    }

    return { error: "An unexpected error occurred. Please try again later." };
  }
}

export async function requestPasswordRequestAction(formData: ForgotPasswordType) {
  const validationResult = ForgotPasswordSchema.safeParse(formData);

  if (!validationResult.success) {
    const errorsProps = Object.keys(z.treeifyError(validationResult.error)?.properties ?? {});
    return { error: `Please check the highlighted fields. ${errorsProps.join(", ")}` };
  }

  const { email } = validationResult?.data;

  try {
    await auth.api.requestPasswordReset({
      headers: await headers(),
      body: {
        email,
        redirectTo: "/reset-password",
      },
    });

    return { success: "Password reset email sent. Please check your inbox." };
  } catch (error) {
    console.log(error);
    if (error instanceof APIError) {
      return { error: error.message };
    }

    return { error: "An unexpected error occurred. Please try again later." };
  }
}

export async function userOnboardingAction(formData: OnboardingType) {
  const isUserLoggedIn = await getSession();
  if (!isUserLoggedIn) redirect("/login");

  const validationResult = OnboardingSchema.safeParse(formData);
  if (!validationResult.success) {
    const errorsProps = Object.keys(z.treeifyError(validationResult.error)?.properties ?? {});
    return { error: `Please check the highlighted fields. ${errorsProps.join(", ")}` };
  }

  const { name } = validationResult?.data;

  try {
    await auth.api.updateUser({
      headers: await headers(),
      body: {
        name,
        isFirstLogin: false,
      },
    });

    return { success: `Welcome ${name}` };
  } catch (error) {
    console.log(error);
    if (error instanceof APIError) {
      return { error: error.message };
    }

    return { error: "An unexpected error occurred updating your profile. Please try again later." };
  }
}

export async function handleLoginAction(formData: LoginType) {
  const validationResult = LoginSchema.safeParse(formData);

  if (!validationResult.success) {
    const fieldsWithError = Object.keys(validationResult.error.flatten().fieldErrors);

    return {
      error: `Something went wrong validating inputs. Please check the highlighted fields. ${fieldsWithError.join(", ")}`,
    };
  }

  const { email, password } = validationResult?.data;

  try {
    await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email,
        password,
      },
    });

    return { success: "Welcome" };
  } catch (error) {
    console.log(error);
    if (error instanceof APIError) {
      if (error.statusCode === 403) {
        await triggerVerificationEmail(email);
      }
      return { error: error.message };
    }
    return { error: "An unexpected error occurred signing in. Please try again later." };
  }
}

export async function handleRegistrationAction(formData: RegisterType) {
  const validationResult = RegisterSchema.safeParse(formData);

  if (!validationResult.success) {
    const fieldsWithError = Object.keys(validationResult.error.flatten().fieldErrors);

    return {
      error: `Something went wrong validating inputs. Please check the highlighted fields. ${fieldsWithError.join(", ")}`,
    };
  }

  const { email, password } = validationResult?.data;

  try {
    await auth.api.signUpEmail({
      headers: await headers(),
      body: {
        name: "name",
        email,
        password,
      },
    });

    return { success: "Account created successfully! Please check your email to verify." };
  } catch (error) {
    // Log error safely
    if (error instanceof APIError) {
      return { error: error.message };
    }

    console.error(error);
    return { error: "An unexpected error occurred signing you up. Please try again later." };
  }
}

export const triggerVerificationEmail = async (email: string) => {
  if (!email) throw new Error("Email is required to send a verification email");

  try {
    await auth.api.sendVerificationEmail({
      headers: await headers(),
      body: {
        email,
        callbackURL: "/dashboard",
      },
    });
    return { success: true };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    if (error instanceof APIError) {
      throw new Error(error.message);
    }

    throw new Error("Something went wrong sending verification email. Please try again later.");
  }
};
