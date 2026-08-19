import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock, Loader2, CheckCircle2 } from "lucide-react";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Enter your email")
    .email("Enter a valid email address"),
  password: z
    .string()
    .min(1, "Enter your password")
    .min(8, "Password must be at least 8 characters"),
  remember: z.boolean().optional(),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | submitting | success

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    setStatus("submitting");
    // Simulated request — swap with your real auth call
    await new Promise((r) => setTimeout(r, 900));
    console.log("Login payload:", data);
    setStatus("success");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0B0C10] p-6">
      <div className="w-full max-w-sm">
        {/* Signature mark */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="h-8 w-8 rounded-md bg-[#E8B14C] flex items-center justify-center">
            <Lock className="h-4 w-4 text-[#0B0C10]" strokeWidth={2.5} />
          </div>
          <span className="text-[#F2F0EA] font-semibold tracking-tight text-lg">
            Threshold
          </span>
        </div>

        <div className="bg-[#14161C] border border-[#22242C] rounded-2xl p-7 shadow-2xl shadow-black/40">
          {status === "success" ? (
            <div className="flex flex-col items-center text-center py-6">
              <CheckCircle2 className="h-10 w-10 text-[#7FD9A6] mb-3" />
              <h2 className="text-[#F2F0EA] text-lg font-semibold">
                Signed in
              </h2>
              <p className="text-[#8B8E9B] text-sm mt-1">
                Welcome back — you're all set.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-5 text-sm text-[#E8B14C] hover:text-[#f0c874] transition-colors"
              >
                Sign in as someone else
              </button>
            </div>
          ) : (
            <>
              <h1 className="text-[#F2F0EA] text-xl font-semibold mb-1">
                Sign in
              </h1>
              <p className="text-[#8B8E9B] text-sm mb-6">
                Enter your details to continue.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium text-[#A5A8B5] mb-1.5"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5C6070]" />
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      {...register("email")}
                      aria-invalid={errors.email ? "true" : "false"}
                      className={`w-full bg-[#0F1116] text-[#F2F0EA] placeholder-[#5C6070] text-sm rounded-lg pl-9 pr-3 py-2.5 border outline-none transition-colors focus:ring-2 focus:ring-[#E8B14C]/40 ${
                        errors.email
                          ? "border-[#E5484D] focus:border-[#E5484D]"
                          : "border-[#22242C] focus:border-[#E8B14C]"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-[#F27B7F]">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="password"
                      className="block text-xs font-medium text-[#A5A8B5]"
                    >
                      Password
                    </label>
                    <a
                      href="#"
                      className="text-xs text-[#E8B14C] hover:text-[#f0c874] transition-colors"
                    >
                      Forgot?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5C6070]" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      {...register("password")}
                      aria-invalid={errors.password ? "true" : "false"}
                      className={`w-full bg-[#0F1116] text-[#F2F0EA] placeholder-[#5C6070] text-sm rounded-lg pl-9 pr-10 py-2.5 border outline-none transition-colors focus:ring-2 focus:ring-[#E8B14C]/40 ${
                        errors.password
                          ? "border-[#E5484D] focus:border-[#E5484D]"
                          : "border-[#22242C] focus:border-[#E8B14C]"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C6070] hover:text-[#A5A8B5] transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1.5 text-xs text-[#F27B7F]">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Remember me */}
                <label className="flex items-center gap-2 cursor-pointer select-none pt-1">
                  <input
                    type="checkbox"
                    {...register("remember")}
                    className="h-4 w-4 rounded border-[#22242C] bg-[#0F1116] accent-[#E8B14C]"
                  />
                  <span className="text-sm text-[#A5A8B5]">Keep me signed in</span>
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 bg-[#E8B14C] hover:bg-[#f0c874] disabled:opacity-70 disabled:cursor-not-allowed text-[#0B0C10] font-medium text-sm rounded-lg py-2.5 transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Signing in…
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-xs text-[#5C6070] mt-6">
          Don't have an account?{" "}
          <a href="#" className="text-[#E8B14C] hover:text-[#f0c874] transition-colors">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}