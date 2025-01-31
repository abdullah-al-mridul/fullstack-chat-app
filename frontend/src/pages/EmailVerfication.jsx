import React from "react";
import { Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useVerificationStore } from "../store/useVerificationStore";
import AuthImagePattern from "../components/AuthImagePattern";

const EmailVerfication = () => {
  const { authUser } = useAuthStore();
  const {
    isCodeSent,
    isSendingCode,
    isVerifying,
    verificationCode,
    sendVerificationCode,
    verifyCode,
    handleCodeChange,
    handleKeyDown,
  } = useVerificationStore();

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    await verifyCode();
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-base-100">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="relative">
                <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 transform group-hover:scale-105">
                  <Mail className="size-8 text-primary group-hover:rotate-12 transition-transform duration-300" />
                </div>
                {/* Animated rings */}
                <div className="absolute inset-0 rounded-2xl border-2 border-primary/20 animate-ping" />
                <div className="absolute inset-0 rounded-2xl border-2 border-primary/10 animate-pulse" />
              </div>
              <h1 className="text-3xl font-bold mt-4 bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
                Verify Your Email
              </h1>
              <p className="text-base-content/60 text-sm max-w-sm">
                We've sent a verification code to your email address. Please
                check your inbox.
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-base-content/70 bg-base-200 py-2 px-4 rounded-lg">
                <Mail className="size-4" />
                <span className="font-medium">{authUser?.email}</span>
              </div>
            </div>

            {!isCodeSent ? (
              <div className="space-y-4">
                <button
                  onClick={sendVerificationCode}
                  disabled={isSendingCode}
                  className="btn btn-primary w-full hover:scale-[1.02] transition-transform duration-300 shadow-lg shadow-primary/20 h-14"
                >
                  {isSendingCode ? (
                    <>
                      <Loader2 className="size-5 animate-spin" /> Sending
                      Code...
                    </>
                  ) : (
                    <>
                      <Mail className="size-5" /> Send Verification Code
                    </>
                  )}
                </button>
                <p className="text-center text-sm text-base-content/60">
                  Click the button above to receive your verification code
                </p>
              </div>
            ) : (
              <form onSubmit={handleVerifyCode} className="space-y-8">
                <div className="space-y-6">
                  <label className="text-sm font-medium text-base-content/70 block text-center">
                    Enter the 6-digit code sent to your email
                  </label>
                  <div className="flex justify-center gap-3">
                    {verificationCode.map((digit, index) => (
                      <input
                        key={index}
                        id={`code-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) =>
                          handleCodeChange(index, e.target.value)
                        }
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-12 h-14 text-center input input-bordered focus:input-primary text-lg font-semibold  duration-300 hover:border-primary focus:scale-110"
                      />
                    ))}
                  </div>
                  <div className="text-center text-sm text-base-content/60">
                    Didn't receive the code?{" "}
                    <button
                      type="button"
                      onClick={sendVerificationCode}
                      disabled={isSendingCode}
                      className="btn btn-link btn-sm text-primary hover:text-primary/80 p-0"
                    >
                      {isSendingCode ? (
                        <>
                          <Loader2 className="size-3 animate-spin" /> Sending...
                        </>
                      ) : (
                        "Resend"
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={
                    verificationCode.join("").length !== 6 || isVerifying
                  }
                  className="btn btn-primary w-full hover:scale-[1.02] transition-transform duration-300 shadow-lg shadow-primary/20 h-14 relative overflow-hidden"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="size-5 animate-spin" /> Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="size-5" /> Verify Code
                    </>
                  )}
                  {/* Progress bar animation */}
                  {isVerifying && (
                    <div className="absolute bottom-0 left-0 h-1 bg-white/20 animate-progress w-full" />
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Security Note */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-base-content/60">
              <AlertCircle className="size-4" />
              <p>For your security, the code will expire in 10 minutes</p>
            </div>
          </div>
        </div>
      </div>
      <AuthImagePattern
        title="Verify Your Account"
        subtitle="Complete the verification process to access all features"
      />
    </div>
  );
};

export default EmailVerfication;
