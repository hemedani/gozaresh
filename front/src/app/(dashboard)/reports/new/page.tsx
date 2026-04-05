"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createReport } from "@/app/actions/report/actions";
import { Link, useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUploadField } from "@/components/form/file-upload-field";
import { TagSelector } from "@/components/form/tag-selector";
import { LocationPicker } from "@/components/form/location-picker";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle2 } from "lucide-react";

const reportSchema = z.object({
  title: z.string().min(1, "report.titleRequired"),
  description: z.string().min(1, "report.descriptionRequired"),
  address: z.string().optional(),
  priority: z.enum(["Low", "Medium", "High"]).optional(),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
  location: z
    .object({
      address: z.string(),
      latitude: z.number().optional(),
      longitude: z.number().optional(),
    })
    .optional(),
  attachments: z.array(z.instanceof(File)).optional(),
});

type ReportFormData = z.infer<typeof reportSchema>;

export default function NewReportPage() {
  const t = useTranslations();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      title: "",
      description: "",
      address: "",
      priority: "Low",
      tags: [],
      category: "",
      location: { address: "" },
      attachments: [],
    },
  });

  const onSubmit = async (data: ReportFormData) => {
    setLoading(true);

    const result = await createReport({
      title: data.title,
      description: data.description,
      address: data.address,
      priority: data.priority,
      tags: data.tags,
      category: data.category,
      location: data.location,
      attachments: data.attachments,
    });

    if (result.success) {
      setSuccess(true);
      toast({
        title: t("common.success", "Success"),
        description: t("report.reportSubmitted", "Report submitted successfully"),
      });
    } else {
      toast({
        variant: "destructive",
        title: t("common.error", "Error"),
        description: result.error || t("report.reportFailed", "Failed to submit report"),
      });
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-center text-2xl">{t("common.success", "Success")}</CardTitle>
            <CardDescription className="text-center">
              {t("report.reportSubmitted", "Your report has been submitted successfully")}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/reports/my">{t("report.myReports", "My Reports")}</Link>
            </Button>
            <Button asChild>
              <Link href="/">{t("common.back", "Back to Home")}</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{t("report.newReport", "New Report")}</CardTitle>
          <CardDescription>
            {t(
              "report.newReportDescription",
              "Fill in the details below to submit a new report. All fields marked with * are required.",
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("report.reportTitle", "Report Title")}{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t(
                          "report.reportTitlePlaceholder",
                          "Brief description of the issue",
                        )}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("report.description", "Description")}{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder={t(
                          "report.descriptionPlaceholder",
                          "Provide detailed information about the issue",
                        )}
                        rows={5}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormDescription>
                      {field.value?.length || 0} / 1000 {t("common.characters", "characters")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Priority */}
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("report.priority", "Priority")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={loading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("report.selectPriority", "Select priority")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Low">{t("report.priorityLow", "Low")}</SelectItem>
                        <SelectItem value="Medium">{t("report.priorityMedium", "Medium")}</SelectItem>
                        <SelectItem value="High">{t("report.priorityHigh", "High")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tags */}
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <TagSelector
                      label={t("report.tags", "Tags")}
                      availableTags={[]}
                      selectedTags={(field.value || []).map((id) => ({ id, name: id }))}
                      onChange={(tags) => field.onChange(tags.map((t) => t.id))}
                      creatable={true}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <LocationPicker
                      label={t("report.location", "Location")}
                      value={field.value}
                      onChange={field.onChange}
                      showMap={false}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Attachments */}
              <FormField
                control={form.control}
                name="attachments"
                render={({ field }) => (
                  <FormItem>
                    <FileUploadField
                      label={t("report.attachments", "Attachments")}
                      maxFiles={10}
                      maxSize={10 * 1024 * 1024}
                      accept="image/*,.pdf,.doc,.docx"
                      value={field.value || []}
                      onChange={field.onChange}
                    />
                    <FormDescription>
                      {t(
                        "report.attachmentsDescription",
                        "Upload images, PDFs, or documents (max 10MB each)",
                      )}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Actions */}
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1" asChild>
                  <Link href="/">{t("common.cancel", "Cancel")}</Link>
                </Button>
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading
                    ? t("common.loading", "Loading...")
                    : t("report.submitReport", "Submit Report")}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
