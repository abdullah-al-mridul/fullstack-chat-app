import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  User,
  Mail,
  Camera,
  Calendar,
  Shield,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      setSelectedImage(reader.result);
      await updateProfile({ profilePic: reader.result });
    };
  };

  return (
    <div className="flex min-h-screen pt-16">
      <div className="flex-1 bg-gradient-to-b from-base-300/50 to-base-100">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10 bg-[size:40px_40px] [mask-image:radial-gradient(white,transparent_90%)]" />
          <div className="absolute -top-40 -right-40 size-80 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 size-80 rounded-full bg-secondary/20 blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto p-4 py-8">
          {/* Header Section with Glowing Effect */}
          <div className="relative text-center mb-12">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <h1 className="text-4xl font-bold mt-8 inline-flex items-center gap-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary animate-gradient">
              <Sparkles className="size-8 text-primary animate-pulse" />
              Profile Dashboard
            </h1>
            <p className="mt-2 pb-2 text-base-content/60">
              Customize your profile and manage your account settings
            </p>
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>

          {/* Main Content with Glass Effect */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="backdrop-blur-xl bg-base-100/50 rounded-3xl p-8 border border-base-content/5 shadow-xl transition-all duration-300">
                <div className="relative group">
                  <div className="relative size-48 mx-auto">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary to-secondary opacity-20 blur-xl group-hover:opacity-30 transition-opacity" />
                    <div className="relative size-full rounded-3xl overflow-hidden ring-2 ring-base-content/5 shadow-2xl">
                      <img
                        src={
                          selectedImage || authUser.profilePic || "/avatar.png"
                        }
                        alt="profile"
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <label
                      htmlFor="avatar"
                      className={`absolute -bottom-4 right-0 btn btn-circle btn-primary btn-md glass
                      ${isUpdatingProfile ? "loading" : "hover:scale-110"} 
                      transition-all duration-300 shadow-lg hover:shadow-primary/50`}
                    >
                      <Camera className="size-5" />
                      <input
                        type="file"
                        name="avatar"
                        id="avatar"
                        accept="image/*"
                        disabled={isUpdatingProfile}
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                  <div className="text-center mt-6 space-y-2">
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                      {authUser?.fullName}
                    </h2>
                    <p className="text-base-content/60 font-medium">
                      {authUser?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="lg:col-span-2 space-y-8">
              {/* Personal Info Card */}
              <div className="backdrop-blur-xl bg-base-100/50 rounded-3xl p-8 border border-base-content/5 shadow-xl transition-all duration-300">
                <h3 className="text-xl font-bold flex items-center gap-3 mb-6">
                  <div className="size-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <User className="size-5 text-primary" />
                  </div>
                  Personal Information
                </h3>
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-base-content/70">
                      Full Name
                    </label>
                    <div className="input input-bordered bg-base-100/50 backdrop-blur flex items-center gap-3">
                      <User className="size-5 text-primary/60" />
                      <span className="font-medium">{authUser?.fullName}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-base-content/70">
                      Email Address
                    </label>
                    <div className="input input-bordered bg-base-100/50 backdrop-blur flex items-center gap-3">
                      <Mail className="size-5 text-primary/60" />
                      <span className="font-medium">{authUser?.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Details Card */}
              <div className="backdrop-blur-xl bg-base-100/50 rounded-3xl p-8 border border-base-content/5 shadow-xl transition-all duration-300">
                <h3 className="text-xl font-bold flex items-center gap-3 mb-6">
                  <div className="size-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Shield className="size-5 text-primary" />
                  </div>
                  Account Details
                </h3>
                <div className="grid gap-6">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-base-100/30 backdrop-blur">
                    <div className="flex items-center gap-3">
                      <Calendar className="size-5 text-primary/60" />
                      <span className="font-medium">Member Since</span>
                    </div>
                    <span className="font-medium text-primary">
                      {new Date(authUser.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-base-100/30 backdrop-blur">
                    <div className="flex items-center gap-3">
                      <Shield className="size-5 text-primary/60" />
                      <span className="font-medium">Account Status</span>
                    </div>
                    <div className="flex items-center gap-2 text-success">
                      <span className="size-2 bg-success rounded-full animate-pulse" />
                      <span className="font-medium">Active</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-base-100/30 backdrop-blur">
                    <div className="flex items-center gap-3">
                      <MapPin className="size-5 text-primary/60" />
                      <span className="font-medium">Last Active</span>
                    </div>
                    <span className="font-medium text-primary">Just Now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
