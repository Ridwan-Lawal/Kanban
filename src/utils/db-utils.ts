export interface DBError extends Error {
  code?: string;
  detail?: string;
  table?: string;
  constraint?: string;
}

export function isDBError(error: unknown): error is DBError {
  return error instanceof Error && ("code" in error || "constraint" in error);
}

export function getActionError(error: unknown, customMessage?: string) {
  let errorMessage = "An unexpected error occurred. Please try again later.";

  if (isDBError(error)) {
    const networkCodes = ["ENOTFOUND", "ECONNREFUSED", "ETIMEDOUT"];

    if (error.code && networkCodes.includes(error.code)) {
      errorMessage = "Network error: Please check your internet connection and try again.";
    } else if (error.code === "23505") {
      errorMessage = `A ${customMessage?.includes("column") ? "column" : "board"} with this name already exists.`;
    } else if (customMessage) {
      errorMessage = customMessage;
    }
  }

  console.error("[Action Error]:", error);
  return { status: "error", message: errorMessage };
}

export function getFetchError(error: unknown, customMessage?: string) {
  let message = customMessage;

  if (isDBError(error)) {
    const networkCodes = ["ENOTFOUND", "ECONNREFUSED", "ETIMEDOUT"];
    if (error.code && networkCodes.includes(error.code)) {
      message = "Network error: Please check your internet connection and try again.";
    }
  }

  if (process.env.NODE_ENV === "development") {
    console.log(error);
  }

  return { error: message };
}
