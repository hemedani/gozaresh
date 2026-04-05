'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useParams, Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  FileText,
  Calendar,
  MapPin,
  Tag,
  Paperclip,
  ArrowLeft,
  Download,
} from 'lucide-react';
import { format } from 'date-fns';

interface Report {
  _id: string;
  title: string;
  description: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'InReview';
  priority: 'Low' | 'Medium' | 'High';
  address?: string;
  location?: {
    address: string;
    latitude?: number;
    longitude?: number;
  };
  tags?: string[];
  category?: string;
  attachments?: Array<{
    _id: string;
    filename: string;
    url: string;
    type: string;
    size: number;
  }>;
  createdAt: string;
  updatedAt: string;
}

export default function ReportDetailPage() {
  const t = useTranslations('report');
  const params = useParams();
  const reportId = params.id as string;

  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch report details
    // For now, using mock data
    setReport({
      _id: reportId,
      title: 'Sample Report - Street Light Not Working',
      description: 'The street light at the main road intersection has not been working for the past 3 days. This is causing safety concerns for pedestrians and drivers. The area becomes very dark at night, making it difficult to see. Requesting immediate attention to this issue.',
      status: 'Pending',
      priority: 'Medium',
      address: '123 Main Street, City Center',
      location: {
        address: '123 Main Street, City Center',
        latitude: 35.6892,
        longitude: 51.3890,
      },
      tags: ['Infrastructure', 'Lighting', 'Safety'],
      category: 'Public Works',
      attachments: [
        {
          _id: '1',
          filename: 'street-light.jpg',
          url: '#',
          type: 'image/jpeg',
          size: 2048000,
        },
      ],
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
    });
    setLoading(false);
  }, [reportId]);

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

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const isImage = (type: string) => type.startsWith('image/');

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t('common.loading', 'Loading...')}</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>{t('reportNotFound', 'Report not found')}</CardTitle>
            <CardDescription>
              {t('reportNotFoundDescription', 'The report you are looking for does not exist.')}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-6">
            <Button asChild>
              <Link href="/reports/my">{t('backToReports', 'Back to Reports')}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Back button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/reports/my" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          {t('backToReports', 'Back to Reports')}
        </Link>
      </Button>

      {/* Report Header */}
      <Card className="mb-6">
        <CardHeader>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge variant={getStatusColor(report.status)} className="text-sm">
              {t(`status${report.status}`, report.status)}
            </Badge>
            <Badge variant={getPriorityColor(report.priority)} className="text-sm">
              {t(`priority${report.priority}`, report.priority)}
            </Badge>
          </div>
          <CardTitle className="text-3xl">{report.title}</CardTitle>
          <CardDescription className="mt-2 flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {format(new Date(report.createdAt), 'MMM dd, yyyy')}
            </span>
            {report.category && (
              <span className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                {report.category}
              </span>
            )}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Description */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t('description', 'Description')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground whitespace-pre-wrap">{report.description}</p>
        </CardContent>
      </Card>

      {/* Location */}
      {(report.address || report.location) && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {t('location', 'Location')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{report.address || report.location?.address}</p>
            {/* Map placeholder */}
            <div className="mt-4 h-48 rounded-lg bg-muted flex items-center justify-center">
              <p className="text-sm text-muted-foreground">
                {t('mapPlaceholder', 'Map will be displayed here')}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tags */}
      {report.tags && report.tags.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              {t('tags', 'Tags')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {report.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Attachments */}
      {report.attachments && report.attachments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Paperclip className="h-5 w-5" />
              {t('attachments', 'Attachments')} ({report.attachments.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {report.attachments.map((file) => (
                <div
                  key={file._id}
                  className="flex items-center gap-3 rounded-lg border p-4"
                >
                  {isImage(file.type) ? (
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                      <img
                        src={file.url}
                        alt={file.filename}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-md bg-muted">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{file.filename}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" asChild>
                    <a href={file.url} download={file.filename}>
                      <Download className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
