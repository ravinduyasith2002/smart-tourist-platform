/**
 * SmartTouristPlatform - Register Page
 */

import { useLocation } from "wouter";
import { RegisterForm } from "@/features/auth/components/RegisterForms/RegisterForm";
import { ROUTES } from "@/config/routes";

export default function Register() {
  const [, navigate] = useLocation();

  const handleRegisterSuccess = () => {
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-card rounded-lg border border-border shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Join SmartTourist
            </h1>
            <p className="text-muted-foreground">
              Create your account and start exploring
            </p>
          </div>

          {/* Form */}
          <RegisterForm onSuccess={handleRegisterSuccess} />

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">
                Already have an account?
              </span>
            </div>
          </div>

          {/* Login Link */}
          <button
            onClick={() => navigate(ROUTES.LOGIN)}
            className="w-full py-2 px-4 border border-border rounded-lg hover:bg-accent transition-colors text-foreground font-medium"
          >
            Sign In
          </button>
        </div>

        {/* Footer Text */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          By creating an account, you agree to our{" "}
          <a href="#" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
