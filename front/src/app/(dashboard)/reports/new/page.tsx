"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createReport } from "@/app/actions/report/actions";
import { Link } from "@/i18n/routing";

const reportSchema = z.object({
  title: z.string().min(1, "report.titleRequired"),
  description: z.string().min(1, "report.descriptionRequired"),
  address: z.string().optional(),
  priority: z.enum(["Low", "Medium", "High"]).optional(),
});

type ReportFormData = z.infer<typeof reportSchema>;

export default function NewReportPage() {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
  });

  const onSubmit = async (data: ReportFormData) => {
    setLoading(true);
    setError(null);

    const result = await createReport({
      ...data,
    });

    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error || t("report.reportFailed"));
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md rounded-xl border p-8 text-center shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-green-600">
            {t("common.success")}
          </h2>
          <p className="mb-6">{t("report.reportSubmitted")}</p>
          <Link
            href="/"
            className="inline-block rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground"
          >
            {t("common.back")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8 rounded-xl border p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold">{t("report.newReport")}</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t("report.reportTitle")}</label>
            <input
              {...register("title")}
              className="w-full rounded-md border px-3 py-2 text-sm"
            />
            {errors.title && (
              <p className="text-sm text-destructive">
                {t(errors.title.message as string)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{t("report.description")}</label>
            <textarea
              {...register("description")}
              rows={5}
              className="w-full rounded-md border px-3 py-2 text-sm"
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {t(errors.description.message as string)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{t("report.address")}</label>
            <input
              {...register("address")}
              className="w-full rounded-md border px-3 py-2 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{t("report.priority")}</label>
            <select
              {...register("priority")}
              className="w-full rounded-md border px-3 py-2 text-sm"
            >
              <option value="">{t("common.optional")}</option>
              <option value="Low">{t("report.priorityLow")}</option>
              <option value="Medium">{t("report.priorityMedium")}</option>
              <option value="High">{t("report.priorityHigh")}</option>
            </select>
          </div>

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

          <div className="flex gap-4">
            <Link
              href="/"
              className="flex-1 rounded-md border px-4 py-2 text-center text-sm font-medium transition-colors hover:bg-muted"
            >
              {t("common.cancel")}
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? t("common.loading") : t("report.submitReport")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
