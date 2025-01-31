import toast from "react-hot-toast";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export const showCustomToast = (message, type = "error") => {
  const isError = type === "error";

  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-base-100 shadow-lg rounded-xl pointer-events-auto flex ring-1 ring-primary/10`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <div
                className={`h-10 w-10 rounded-full ${
                  isError ? "bg-error/10" : "bg-success/10"
                } flex items-center justify-center`}
              >
                {isError ? (
                  <AlertCircle className="h-5 w-5 text-error" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-success" />
                )}
              </div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-base-content">
                {isError ? "Error" : "Success"}
              </p>
              <p className="mt-1 text-sm text-base-content/60">{message}</p>
            </div>
          </div>
        </div>
      </div>
    ),
    { duration: 3000 }
  );
};
