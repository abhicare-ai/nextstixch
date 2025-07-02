import { wixBrawsorClient } from "@/lib/wix-client.brawosor";
import {
  createBackInStockNotificationRequest,
  createBackInStockNotificationRequestValue,
} from "@/wix-api/backInStockNotifications";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateBackInStockNotificationRequest() {
  return useMutation({
    mutationFn: (value: createBackInStockNotificationRequestValue) =>
      createBackInStockNotificationRequest(wixBrawsorClient, value),
    onError(error) {
      console.error(error);
      if (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error as any).details.applicationError.code ===
        "BACK_IN_STOCK_NOTIFICATION_REQUEST_ALREADY_EXISTS"
      ) {
        toast.error("You are already subscribed to this product.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });
}
