import { AxiosError } from "axios";
import { toast } from "sonner";


export function handleApiError(error: unknown, defaultMessage = "Something went wrong. Please try again.") {
  const axiosError = error as AxiosError<{ message?: string; error?: string }>;

  const message =
    axiosError.response?.data?.message ||
    axiosError.response?.data?.error ||
    defaultMessage;

  toast.error(message);

  if (process.env.NODE_ENV === "development") {
    console.error("API Error:", axiosError);
  }
}
