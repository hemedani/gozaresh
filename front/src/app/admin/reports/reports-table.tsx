"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { update } from "@/app/actions/report/update";
import { remove } from "@/app/actions/report/remove";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, MoreHorizontal, Check, X, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ReportsTable({ reports }: { reports: any[] }) {
  const t = useTranslations("admin");
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleAll = () => {
    if (selectedIds.length === reports.length && reports.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(reports.map((r) => r._id));
    }
  };

  const toggleOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const updateStatus = async (id: string, status: "pending" | "approved" | "rejected") => {
    try {
      const res = await update({ _id: id, status }, { _id: 1 });
      if (res) {
        toast({
          title: t("success") || "Success",
          description: "Report status updated",
        });
        startTransition(() => {
          router.refresh();
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("error") || "Error",
        description: "Failed to update report",
      });
    }
  };

  const deleteReport = async (id: string) => {
    try {
      const res = await remove({ _id: id }, { _id: 1 });
      if (res) {
        toast({
          title: t("success") || "Success",
          description: "Report deleted",
        });
        startTransition(() => {
          router.refresh();
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("error") || "Error",
        description: "Failed to delete report",
      });
    }
  };

  const handleBulkUpdate = async (status: "pending" | "approved" | "rejected") => {
    if (!selectedIds.length) return;

    // Process sequentially to avoid rate limiting/overloading if there are many
    for (const id of selectedIds) {
      await update({ _id: id, status }, { _id: 1 });
    }

    toast({
      title: t("success") || "Success",
      description: `Updated ${selectedIds.length} reports to ${status}`,
    });
    setSelectedIds([]);
    startTransition(() => {
      router.refresh();
    });
  };

  const handleBulkDelete = async () => {
    if (!selectedIds.length) return;

    for (const id of selectedIds) {
      await remove({ _id: id }, { _id: 1 });
    }

    toast({
      title: t("success") || "Success",
      description: `Deleted ${selectedIds.length} reports`,
    });
    setSelectedIds([]);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className="space-y-4">
      {selectedIds.length > 0 && (
        <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50 border">
          <span className="text-sm font-medium ml-2">
            {selectedIds.length} selected
          </span>
          <div className="flex-1" />
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleBulkUpdate("approved")}
            disabled={isPending}
          >
            <Check className="mr-2 h-4 w-4 text-green-500" />
            {t("approve")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleBulkUpdate("rejected")}
            disabled={isPending}
          >
            <X className="mr-2 h-4 w-4 text-red-500" />
            {t("reject")}
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleBulkDelete}
            disabled={isPending}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {t("delete")}
          </Button>
        </div>
      )}

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px] pl-4">
                <Checkbox
                  checked={
                    reports.length > 0 && selectedIds.length === reports.length
                  }
                  onCheckedChange={toggleAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>{t("title")}</TableHead>
              <TableHead>{t("category")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead>{t("priority")}</TableHead>
              <TableHead>{t("date")}</TableHead>
              <TableHead className="text-right pr-4">{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  {t("noReports")}
                </TableCell>
              </TableRow>
            ) : (
              reports.map((report: any) => (
                <TableRow key={report._id}>
                  <TableCell className="pl-4">
                    <Checkbox
                      checked={selectedIds.includes(report._id)}
                      onCheckedChange={() => toggleOne(report._id)}
                      aria-label={`Select ${report.title}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{report.title}</TableCell>
                  <TableCell>{report.category?.name || "-"}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        report.status === "pending"
                          ? "outline"
                          : report.status === "approved"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {t(`status_${report.status || "pending"}`)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {t(`priority_${report.priority || "low"}`)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {report.createdAt
                      ? new Date(report.createdAt).toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right pr-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          {t("viewDetails")}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => updateStatus(report._id, "approved")}>
                          <Check className="mr-2 h-4 w-4" />
                          {t("approve")}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateStatus(report._id, "rejected")}>
                          <X className="mr-2 h-4 w-4" />
                          {t("reject")}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => deleteReport(report._id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {t("delete")}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
