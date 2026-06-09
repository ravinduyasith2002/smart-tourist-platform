/**
 * LoginForm component for Smart Tourist Platform
 * Uses react-hook-form and zod for validation, styled to match the register UI.
 */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils"; // Adjust path if necessary
import { authStore } from "@/store/auth.store";
import { apiClient } from "@/services/apiClient";
import type { User } from "@/types/common";

interface LoginFormProps {
  /** Callback invoked after a successful login */
  onSuccess: () => void;
}

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type FormValues = z.infer<typeof schema>;

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setAuthError(null);
    try {
      const res = await apiClient.post<{ user: User; token: string }>(
        "auth/login",
        data
      );
      authStore.setAuth(res.user, res.token);
      console.log("Login data:", data);

      onSuccess();
    } catch (err) {
      setAuthError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100 font-sans">
      {/* Header section matching the design */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-tr from-cyan-400 to-teal-400 rounded-xl flex items-center justify-center text-white text-2xl font-bold mb-3 shadow-sm">
          S
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
        <p className="text-gray-400 text-sm mt-1">
          Sign in to your SmartTourist account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Global Error handling */}
        {authError && (
          <p className="text-sm text-red-500 bg-red-50 p-2 rounded border border-red-200">
            {authError}
          </p>
        )}

        {/* Email Address Field */}
        <div>
          <label
            className="block text-sm font-semibold text-gray-700 mb-1"
            htmlFor="email"
          >
            Email Address
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              {/* Mail Icon SVG */}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              className={cn(
                "w-full rounded-lg border border-gray-200 pl-10 pr-3 py-2.5 text-gray-700 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all",
                errors.email && "border-red-400 focus:ring-red-400"
              )}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label
              className="text-sm font-semibold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <a
              href="#forgot"
              className="text-xs font-medium text-blue-500 hover:underline"
            >
              Forgot Password?
            </a>
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              {/* Lock Icon SVG */}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password")}
              className={cn(
                "w-full rounded-lg border border-gray-200 pl-10 pr-10 py-2.5 text-gray-700 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all",
                errors.password && "border-red-400 focus:ring-red-400"
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            >
              {/* Eye Icon SVG */}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            "Signing in…"
          ) : (
            <>
              {/* Checkmark icon inside the button */}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              SIGN IN
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
