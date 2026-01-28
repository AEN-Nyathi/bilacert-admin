
'use client';

import {
  CreditCard,
  DollarSign,
  BarChart as BarChartIcon,
  Clock,
} from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import { useSubmissions } from '@/hooks/useSubmissions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useMemo } from 'react';
import { format } from 'date-fns';
import { Submission } from '@/lib/types';
import Icon from '@/components/Icon';
import Link from 'next/link';

const serviceTypeToIconNameMap: Record<string, string> = {
    'Class ECS/ECNS Licensing': 'Shield',
    'ICASA Type Approvals': 'CheckSquare',
    'License Exemptions': 'FileText',
    'NRCS LOA Applications': 'FileText',
    'Radio Dealer Licensing': 'Radio',
    'Ski Boat VHF Licensing': 'Sailboat',
    'contact': 'MessageSquare',
    'default': 'Package',
};
  
const getIconForServiceType = (submission: Submission, props?: { className: string }) => {
      const type = submission.serviceName || submission.formType;
      const iconName = serviceTypeToIconNameMap[type] || serviceTypeToIconNameMap['default'];
      return <Icon name={iconName} {...props} />;
};

export default function DashboardClient() {
  const { submissions, loading, error } = useSubmissions();

  const stats = useMemo(() => {
    const total = submissions.length;
    const newCount = submissions.filter(s => s.status === 'pending').length;
    const inProgress = submissions.filter(s => s.status === 'in-progress').length;
    const completed = submissions.filter(s => s.status === 'completed').length;
    return { total, newCount, inProgress, completed };
  }, [submissions]);

  const recentSubmissions = useMemo(() => {
    return submissions.slice(0, 5);
  }, [submissions]);

  const submissionsByType = useMemo(() => {
    const typeMap = submissions.reduce((acc, sub) => {
        const key = sub.serviceName || sub.formType;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    return Object.entries(typeMap).map(([name, value]) => ({ name, submissions: value }));
  }, [submissions]);
  
  if (error) {
    return <div className="text-destructive">Error loading submissions: {error.message}</div>;
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Submissions" value={loading ? '...' : `${stats.total}`} icon={<Icon name="Package" className="h-4 w-4" />} />
        <StatCard title="New Applications" value={loading ? '...' : `${stats.newCount}`} icon={<BarChartIcon className="h-4 w-4" />} description="Awaiting review" />
        <StatCard title="In Progress" value={loading ? '...' : `${stats.inProgress}`} icon={<CreditCard className="h-4 w-4" />} />
        <StatCard title="Total Revenue (Mock)" value={loading ? '...' : '$45,231.89'} icon={<DollarSign className="h-4 w-4" />} description="+20.1% from last month" />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Submissions by Type</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="space-y-4">
              {submissionsByType.length > 0 ? (
                (() => {
                  const maxSubmissions = Math.max(...submissionsByType.map((s) => s.submissions), 0);
                  const progressColorClasses = [
                    "[&>div]:bg-chart-1",
                    "[&>div]:bg-chart-2",
                    "[&>div]:bg-chart-3",
                    "[&>div]:bg-chart-4",
                    "[&>div]:bg-chart-5",
                  ];
                  return submissionsByType
                    .sort((a, b) => b.submissions - a.submissions)
                    .map((item, index) => (
                      <div key={item.name} className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
                        <div className='flex items-center gap-3'>
                            {getIconForServiceType({ formType: item.name, serviceName: item.name } as Submission, { className: "h-5 w-5 text-muted-foreground"})}
                            <span className="truncate text-sm font-medium">{item.name}</span>
                        </div>
                        <Progress
                          value={maxSubmissions > 0 ? (item.submissions / maxSubmissions) * 100 : 0}
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
                <CardTitle className="text-lg font-medium">Recent Submissions</CardTitle>
                <Clock className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                {recentSubmissions.length > 0 ? (
                    recentSubmissions.map(submission => (
                        <Link 
                            key={submission.id}
                            href={`/admin/form_submissions/${submission.id}`}
                            className="block rounded-lg transition-colors hover:bg-muted/50"
                        >
                            <div className="flex items-start gap-4 p-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                                    {getIconForServiceType(submission, { className: "h-5 w-5"})}
                                </div>
                                <div className="grid gap-0.5 flex-1">
                                    <p className="text-sm font-medium">{submission.fullName}</p>
                                    <p className="text-xs text-muted-foreground">{submission.email}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{submission.serviceName || submission.formType}</p>
                                </div>
                                <div className="ml-auto text-xs text-muted-foreground whitespace-nowrap">
                                    {format(new Date(submission.createdAt), 'dd MMM yyyy, HH:mm')}
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="text-center text-muted-foreground pt-4">No recent submissions.</div>
                )}
                </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
