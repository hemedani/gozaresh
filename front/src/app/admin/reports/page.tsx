import { getTranslations } from "next-intl/server";
import { gets as getReports } from "@/app/actions/report/gets";
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
import { Eye, MoreHorizontal, Check, X, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function AdminReportsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const t = await getTranslations("admin");
  const page = Number(searchParams.page) || 1;

  // Fetch reports
  const response = await getReports(
    { page, limit: 10 },
    {
      _id: 1,
      title: 1,
      status: 1,
      priority: 1,
      createdAt: 1,
      category: { _id: 1, name: 1 },
    }
  );

  const reports = response?.list || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("reportsManagement")}</h1>
          <p className="text-muted-foreground">{t("reportsManagementDescription")}</p>
        </div>
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
                    <Badge variant={report.status === "pending" ? "outline" : report.status === "approved" ? "default" : "destructive"}>
                      {t(`status_${report.status || 'pending'}`)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {t(`priority_${report.priority || 'low'}`)}
                    </Badge>
                  </TableCell>
                  <TableCell>{report.createdAt ? new Date(report.createdAt).toLocaleDateString() : "-"}</TableCell>
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
    </div>
  );
}
