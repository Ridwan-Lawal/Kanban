import { useEffect } from "react";
import { toast } from "sonner";

export function useDisplayError(error: Error | null) {
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);
}
