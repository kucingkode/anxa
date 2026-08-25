import { toast } from "sonner";
import { getErrorMessage, isApiError } from "./errors";

/**
 * Shows an error toast for a mutation. When the error is an optimistic-lock
 * conflict (`412`), it offers a "Muat ulang" action that triggers `onRefresh`
 * so the caller can refetch the latest version.
 */
export function notifyMutationError(error: unknown, fallback: string, onRefresh?: () => void): void {
  if (isApiError(error, 412)) {
    toast.error("Data telah berubah di tempat lain. Muat ulang untuk melihat versi terbaru.", {
      action: onRefresh ? { label: "Muat ulang", onClick: onRefresh } : undefined,
    });
    return;
  }
  toast.error(getErrorMessage(error, fallback));
}
