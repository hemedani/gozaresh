"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { register as registerUser } from "@/app/actions/auth/actions";
import { Link, useRouter } from "@/i18n/routing";

const registerSchema = z.object({
  first_name: z.string().min(1, "auth.firstNameRequired"),
  last_name: z.string().min(1, "auth.lastNameRequired"),
  email: z.string().email("auth.emailInvalid"),
  password: z.string().min(6, "validation.minLength"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const t = useTranslations();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setError(null);

    const result = await registerUser(
      data.first_name,
      data.last_name,
      data.email,
      data.password,
    );

    if (result.success) {
      router.push("/auth/login");
    } else {
      setError(result.error || "Registration failed");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl border p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold">{t("auth.registerTitle")}</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("auth.firstName")}
              </label>
              <input
                {...register("first_name")}
                className="w-full rounded-md border px-3 py-2 text-sm"
              />
              {errors.first_name && (
                <p className="text-sm text-destructive">
                  {t(errors.first_name.message as string)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("auth.lastName")}
              </label>
              <input
                {...register("last_name")}
                className="w-full rounded-md border px-3 py-2 text-sm"
              />
              {errors.last_name && (
                <p className="text-sm text-destructive">
                  {t(errors.last_name.message as string)}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{t("auth.email")}</label>
            <input
              {...register("email")}
              type="email"
              className="w-full rounded-md border px-3 py-2 text-sm"
              placeholder="email@example.com"
            />
            {errors.email && (
              <p className="text-sm text-destructive">
                {t(errors.email.message as string)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{t("auth.password")}</label>
            <input
              {...register("password")}
              type="password"
              className="w-full rounded-md border px-3 py-2 text-sm"
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {t(errors.password.message as string)}
              </p>
            )}
          </div>

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? t("common.loading") : t("auth.registerButton")}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          {t("auth.hasAccount")}{" "}
          <Link href="/auth/login" className="text-primary hover:underline">
            {t("auth.loginButton")}
          </Link>
        </p>
      </div>
    </div>
  );
}
