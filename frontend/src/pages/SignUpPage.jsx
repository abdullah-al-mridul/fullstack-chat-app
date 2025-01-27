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
  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email address");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 8 characters");
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    signUp(formData);
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className=" flex flex-col justify-center items-center p-6 sm:p-12">
        <div className=" w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className=" text-center mb-8">
            <div className=" flex flex-col items-center gap-2 group">
              <div className=" size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className=" size-6 text-primary" />
              </div>
              <h1 className=" text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get Started with your free account
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className=" space-y-6">
            <div className=" form-control">
              <label htmlFor="fullName" className=" label">
                <span className=" label-text font-medium">Full Name</span>
              </label>
              <div className=" relative">
                <div className=" absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
                  <User className=" size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="John Doe"
                  className=" input input-bordered pl-10 w-full"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className=" form-control">
              <label htmlFor="email" className=" label">
                <span className=" label-text font-medium">Email</span>
              </label>
              <div className=" relative">
                <div className=" absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
                  <Mail className=" size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="john@example.com"
                  className=" input input-bordered pl-10 w-full"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className=" form-control">
              <label htmlFor="password" className=" label">
                <span className=" label-text font-medium">Password</span>
              </label>
              <div className=" relative">
                <div className=" absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
                  <Lock className=" size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="********"
                  className=" input input-bordered pl-10 w-full"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className=" absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className=" size-5 text-base-content/40" />
                  ) : (
                    <EyeOff className=" size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className=" btn btn-primary w-full "
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className=" size-5 animate-spin" /> Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
            <div className=" text-center font-medium">
              <p className="text-base-content/60">
                Already have an account?{" "}
                <Link to="/login" className="link link-primary">
                  Login
                </Link>
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