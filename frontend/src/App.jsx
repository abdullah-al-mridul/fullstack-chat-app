import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/HomePage";
import Signup from "./pages/SignUpPage";
import Login from "./pages/LoginPage";
import Profile from "./pages/ProfilePage";
import Settings from "./pages/SettingsPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";
import EmailVerfication from "./pages/EmailVerfication";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();
  // console.log({ onlineUsers });
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  // Helper function to handle protected routes with verification check
  const ProtectedRoute = ({ children }) => {
    if (!authUser) return <Navigate to="/login" />;
    if (!authUser.isVerified) return <Navigate to="/verification" />;
    return children;
  };

  // Helper function to handle auth routes (login/signup)
  const AuthRoute = ({ children }) => {
    if (!authUser) return children;
    if (!authUser.isVerified) return <Navigate to="/verification" />;
    return <Navigate to="/" />;
  };

  // Helper function to handle verification route
  const VerificationRoute = ({ children }) => {
    if (!authUser) return <Navigate to="/login" />;
    if (authUser.isVerified) return <Navigate to="/" />;
    return children;
  };

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        {/* Protected routes that require verification */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Auth routes */}
        <Route
          path="/signup"
          element={
            <AuthRoute>
              <Signup />
            </AuthRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />

        {/* Verification route */}
        <Route
          path="/verification"
          element={
            <VerificationRoute>
              <EmailVerfication />
            </VerificationRoute>
          }
        />

        {/* Settings can be accessed regardless of verification */}
        <Route
          path="/settings"
          element={authUser ? <Settings /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default App;
