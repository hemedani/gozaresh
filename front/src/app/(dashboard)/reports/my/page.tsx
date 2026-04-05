'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getMyReports } from '@/app/actions/report/actions';
import { FileText, Plus, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

interface Report {
  _id: string;
  title: string;
  description: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'InReview';
  priority: 'Low' | 'Medium' | 'High';
  createdAt: string;
}

export default function MyReportsPage() {
  const t = useTranslations('report');
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      const result = await getMyReports(page, 10);
      if (result.success && result.body) {
        setReports(result.body.reports || []);
        setTotalPages(result.body.totalPages || 1);
      }
      setLoading(false);
    };

    fetchReports();
  }, [page, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'secondary';
      case 'Approved':
        return 'default';
      case 'Rejected':
        return 'destructive';
      case 'InReview':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'destructive';
      case 'Medium':
        return 'secondary';
      case 'Low':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const filteredReports = statusFilter === 'all'
    ? reports
    : reports.filter(r => r.status === statusFilter);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t('common.loading', 'Loading...')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('myReports', 'My Reports')}</h1>
          <p className="text-muted-foreground">
            {t('myReportsDescription', 'View and track all your submitted reports')}
          </p>
        </div>
        <Button asChild>
          <Link href="/reports/new" className="gap-2">
            <Plus className="h-4 w-4" />
            {t('newReport', 'New Report')}
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">{t('filterByStatus', 'Filter by status')}:</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder={t('allStatuses', 'All statuses')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allStatuses', 'All statuses')}</SelectItem>
                <SelectItem value="Pending">{t('statusPending', 'Pending')}</SelectItem>
                <SelectItem value="InReview">{t('statusInReview', 'In Review')}</SelectItem>
                <SelectItem value="Approved">{t('statusApproved', 'Approved')}</SelectItem>
                <SelectItem value="Rejected">{t('statusRejected', 'Rejected')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      {filteredReports.length === 0 ? (
        <Card>
          <CardHeader className="text-center">
            <FileText className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
            <CardTitle>{t('noReports', 'No reports found')}</CardTitle>
            <CardDescription>
              {t('noReportsDescription', 'You haven\'t submitted any reports yet. Create your first report to get started.')}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-6">
            <Button asChild>
              <Link href="/reports/new">{t('createFirstReport', 'Create Report')}</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <Card key={report._id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Badge variant={getStatusColor(report.status)}>
                        {t(`status${report.status}`, report.status)}
                      </Badge>
                      <Badge variant={getPriorityColor(report.priority)}>
                        {t(`priority${report.priority}`, report.priority)}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{report.title}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-1">
                      {report.description}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(report.createdAt), 'MMM dd, yyyy')}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/reports/${report._id}`}>
                      {t('viewDetails', 'View Details')}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                {t('previous', 'Previous')}
              </Button>
              <span className="text-sm text-muted-foreground">
                {t('pageOf', 'Page {current} of {total}', { current: page, total: totalPages })}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                {t('next', 'Next')}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
