'use client';

import {
  DollarSign,
  BarChart as BarChartIcon,
  Clock,
  Users,
} from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import { useSubmissions } from '@/hooks/useSubmissions';
import { useContacts } from '@/hooks/useContacts';
import { useServices } from '@/hooks/useServices';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useMemo } from 'react';
import { format, isValid, parseISO } from 'date-fns';
import { Submission, Contact, Service } from '@/lib/types';
import Icon from '@/components/Icon';
import Link from 'next/link';

const safeFormatDate = (date: string | Date | undefined, fallback = 'Invalid date') => {
    if (!date) return fallback;
    const d = typeof date === 'string' ? parseISO(date) : date;
    return isValid(d) ? format(d, 'dd MMM yyyy, HH:mm') : fallback;
};

export default function DashboardClient() {
  const { data: submissions, loading: submissionsLoading, error: submissionsError } = useSubmissions();
  const { data: contacts, loading: contactsLoading, error: contactsError } = useContacts();
  const { data: services, loading: servicesLoading, error: servicesError } = useServices();

  const loading = submissionsLoading || contactsLoading || servicesLoading;
  const error = submissionsError || contactsError || servicesError;

  const stats = useMemo(() => {
    if (!submissions || !contacts || !services) {
      return { total: 0, newCount: 0, totalContacts: 0, totalRevenue: 0 };
    }
    const total = submissions.length;
    const newCount = submissions.filter(s => s.status === 'pending').length;
    const totalContacts = contacts.length;

    const totalRevenue = submissions
      .filter(s => s.status === 'completed')
      .reduce((acc, submission) => {
        const service = services.find(s => s.id === submission.serviceId || s.slug === submission.serviceName);
        return acc + (service?.pricing || 0);
      }, 0);

    return { total, newCount, totalContacts, totalRevenue, totalSubmissions: total };
  }, [submissions, contacts, services]);

  const submissionsByService = useMemo(() => {
    if (!submissions || !services) return [];
    return services
      .map(service => {
        const count = submissions.filter(s => s.serviceName === service.name).length;
        return { ...service, submissions: count };
      })
      .filter(service => service.submissions > 0);
  }, [submissions, services]);

  const recentActivity = useMemo(() => {
    if (!submissions || !contacts) return [];

    const combined = [
      ...submissions.map(s => ({ ...s, type: 'submission', date: s.createdAt })),
      ...contacts.map(c => ({ ...c, type: 'contact', date: c.submitted_at }))
    ];

    return combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
  }, [submissions, contacts]);

  if (error) {
    return <div className="text-destructive">Error loading dashboard data: {error.message}</div>;
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Submissions" value={loading ? '...' : `${stats.total}`} icon={<Icon name="Package" className="h-4 w-4" />} />
        <StatCard title="New Applications" value={loading ? '...' : `${stats.newCount}`} icon={<BarChartIcon className="h-4 w-4" />} description="Awaiting review" />
        <StatCard title="Total Contacts" value={loading ? '...' : `${stats.totalContacts}`} icon={<Users className="h-4 w-4" />} />
        <StatCard 
            title="Total Revenue" 
            value={loading ? '...' : `R ${stats.totalRevenue.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            icon={<DollarSign className="h-4 w-4" />} 
            description="From completed submissions" 
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Submissions by Service</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="space-y-4">
              {submissionsByService.length > 0 ? (
                (() => {
                  const progressColorClasses = [
                    "[&>div]:bg-chart-1",
                    "[&>div]:bg-chart-2",
                    "[&>div]:bg-chart-3",
                    "[&>div]:bg-chart-4",
                    "[&>div]:bg-chart-5",
                  ];
                  return submissionsByService
                    .sort((a, b) => b.submissions - a.submissions)
                    .map((item, index) => (
                      <div key={item.id} className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
                        <div className='flex items-center gap-3'>
                            <Icon name={item.icon as any} className="h-5 w-5 text-muted-foreground" />
                            <span className="truncate text-sm font-medium">{item.name}</span>
                        </div>
                        <Progress
                          value={(item.submissions / stats.totalSubmissions) * 100}
                          className={`h-2 ${progressColorClasses[index % progressColorClasses.length]}`}
                        />
                        <span className="font-mono text-sm font-medium">{item.submissions}</span>
                      </div>
                    ));
                })()
              ) : (
                <div className="text-center text-muted-foreground pt-4">No submissions yet.</div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
                <Clock className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                {recentActivity.length > 0 ? (
                    recentActivity.map(activity => (
                        <Link 
                            key={activity.id}
                            href={activity.type === 'submission' ? `/admin/form_submissions/${activity.id}` : `/admin/contacts/${activity.id}`}
                            className="block rounded-lg transition-colors hover:bg-muted/50"
                        >
                            <div className="flex items-start gap-4 p-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                                    <Icon name={activity.type === 'submission' ? 'Package' : 'MessageSquare'} className="h-5 w-5" />
                                </div>
                                <div className="grid gap-0.5 flex-1">
                                    <p className="text-sm font-medium">{activity.fullName || activity.name}</p>
                                    <p className="text-xs text-muted-foreground">{activity.email}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {activity.type === 'submission' 
                                            ? (activity as Submission).serviceName || (activity as Submission).formType 
                                            : 'Contact Form'}
                                    </p>
                                </div>
                                <div className="ml-auto text-xs text-muted-foreground whitespace-nowrap">
                                    {safeFormatDate(activity.date)}
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="text-center text-muted-foreground pt-4">No recent activity.</div>
                )}
                </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
