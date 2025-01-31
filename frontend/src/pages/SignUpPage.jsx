import React from "react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  MessageSquare,
  User,
  Mail,
  Eye,
  EyeOff,
  Lock,
  Loader2,
  X,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import { toast } from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signUp, isSigningUp } = useAuthStore();

  const showCustomToast = (message) => {
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
                <div className="h-10 w-10 rounded-full bg-error/10 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-error" />
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-base-content">
                  Validation Error
                </p>
                <p className="mt-1 text-sm text-base-content/60">{message}</p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-base-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-xl p-4 flex items-center justify-center text-sm font-medium text-primary hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      ),
      { duration: 3000 }
    );
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      showCustomToast("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      showCustomToast("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      showCustomToast("Invalid email address");
      return false;
    }
    if (!formData.password.trim()) {
      showCustomToast("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      showCustomToast("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    signUp(formData);
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-base-100">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 transform group-hover:scale-105">
                <MessageSquare className="size-7 text-primary group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <h1 className="text-3xl font-bold mt-2 bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
                Create Account
              </h1>
              <p className="text-base-content/60 text-sm">
                Join our community and start connecting
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label htmlFor="fullName" className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <User className="size-4" /> Full Name
                </span>
              </label>
              <div className="relative transition-all duration-300 focus-within:scale-[1.02]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="John Doe"
                  className="input input-bordered pl-10 w-full transition-all duration-300 hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <Mail className="size-4" /> Email
                </span>
              </label>
              <div className="relative transition-all duration-300 focus-within:scale-[1.02]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Mail className="size-5 text-primary/40" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="john@example.com"
                  className="input input-bordered pl-10 w-full transition-all duration-300 hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label htmlFor="password" className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <Lock className="size-4" /> Password
                </span>
              </label>
              <div className="relative transition-all duration-300 focus-within:scale-[1.02]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Lock className="size-5 text-primary/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="********"
                  className="input input-bordered pl-10 w-full transition-all duration-300 hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer hover:text-primary transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className="size-5 hover:scale-110 transition-transform" />
                  ) : (
                    <EyeOff className="size-5 hover:scale-110 transition-transform" />
                  )}
                </button>
              </div>
              <label className="label">
                <span className="label-text-alt text-base-content/60">
                  Must be at least 6 characters
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full hover:scale-[1.02] transition-transform duration-300 shadow-lg shadow-primary/20"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" /> Creating
                  account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            <div className="text-center space-y-4">
              <p className="text-base-content/60 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="link link-primary font-semibold hover:text-primary/80 transition-colors"
                >
                  Login here
                </Link>
              </p>
              <p className="text-xs text-base-content/50">
                By creating an account, you agree to our{" "}
                <span className="hover:text-primary transition-colors">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="hover:text-primary transition-colors">
                  Privacy Policy
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
      <AuthImagePattern
        title="Join the community"
        subtitle="Connect with friends, share moments, and stay connected"
      />
    </div>
  );
};

export default SignUpPage;
