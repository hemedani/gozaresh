import { getTranslations } from "next-intl/server";
import { gets as getReports } from "@/app/actions/report/gets";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal, Check, X, Trash2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default async function AdminReportsPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string; status?: string; priority?: string };
}) {
  const t = await getTranslations("admin");
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || "";
  const status = searchParams.status || "all";
  const priority = searchParams.priority || "all";

  const setQuery: any = { page, limit: 10 };
  if (search) setQuery.search = search;
  if (status !== "all") setQuery.status = status;
  if (priority !== "all") setQuery.priority = priority;

  // Fetch reports
  const response = await getReports(setQuery, {
    _id: 1,
    title: 1,
    status: 1,
    priority: 1,
    createdAt: 1,
    category: { _id: 1, name: 1 },
  });

  const reports = response?.list || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("reportsManagement")}</h1>
          <p className="text-muted-foreground">{t("reportsManagementDescription")}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <form
          method="GET"
          className="flex flex-col sm:flex-row gap-4 w-full items-start sm:items-center"
        >
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              name="search"
              placeholder={t("searchPlaceholder") || "Search..."}
              defaultValue={search}
              className="pl-8"
            />
          </div>
          <div className="w-full sm:w-48">
            <Select name="status" defaultValue={status}>
              <SelectTrigger>
                <SelectValue placeholder={t("status")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("allStatuses") || "All Statuses"}</SelectItem>
                <SelectItem value="pending">{t("status_pending")}</SelectItem>
                <SelectItem value="approved">{t("status_approved")}</SelectItem>
                <SelectItem value="rejected">{t("status_rejected")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-48">
            <Select name="priority" defaultValue={priority}>
              <SelectTrigger>
                <SelectValue placeholder={t("priority")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("allPriorities") || "All Priorities"}</SelectItem>
                <SelectItem value="low">{t("priority_low")}</SelectItem>
                <SelectItem value="medium">{t("priority_medium")}</SelectItem>
                <SelectItem value="high">{t("priority_high")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" variant="secondary">
            {t("applyFilters") || "Filter"}
          </Button>
        </form>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("title")}</TableHead>
              <TableHead>{t("category")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead>{t("priority")}</TableHead>
              <TableHead>{t("date")}</TableHead>
              <TableHead className="text-right">{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  {t("noReports")}
                </TableCell>
              </TableRow>
            ) : (
              reports.map((report: any) => (
                <TableRow key={report._id}>
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
                    <Badge variant="secondary">{t(`priority_${report.priority || "low"}`)}</Badge>
                  </TableCell>
                  <TableCell>
                    {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : "-"}
                  </TableCell>
                  <TableCell className="text-right">
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
                        <DropdownMenuItem>
                          <Check className="mr-2 h-4 w-4" />
                          {t("approve")}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <X className="mr-2 h-4 w-4" />
                          {t("reject")}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
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

      <div className="flex items-center justify-end space-x-2 py-4">
        {page > 1 ? (
          <Button variant="outline" size="sm" asChild>
            <Link
              href={`/admin/reports?page=${page - 1}${search ? `&search=${search}` : ""}${status !== "all" ? `&status=${status}` : ""}${priority !== "all" ? `&priority=${priority}` : ""}`}
            >
              {t("previous") || "Previous"}
            </Link>
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled>
            {t("previous") || "Previous"}
          </Button>
        )}
        {reports.length >= 10 ? (
          <Button variant="outline" size="sm" asChild>
            <Link
              href={`/admin/reports?page=${page + 1}${search ? `&search=${search}` : ""}${status !== "all" ? `&status=${status}` : ""}${priority !== "all" ? `&priority=${priority}` : ""}`}
            >
              {t("next") || "Next"}
            </Link>
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled>
            {t("next") || "Next"}
          </Button>
        )}
      </div>
    </div>
  );
}
