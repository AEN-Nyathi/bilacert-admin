'use client';

import { BarChart as BarChartIcon, CreditCard, DollarSign, Package } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import { useSubmissions } from '@/hooks/useSubmissions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useMemo } from 'react';
import { format, subDays } from 'date-fns';
import type { Submission } from '@/lib/types';

const chartConfig = {
  submissions: {
    label: 'Submissions',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export default function DashboardClient() {
  const { submissions, loading, error } = useSubmissions();

  const stats = useMemo(() => {
    const total = submissions.length;
    const newCount = submissions.filter(s => s.status === 'new').length;
    const inProgress = submissions.filter(s => s.status === 'in-progress').length;
    const completed = submissions.filter(s => s.status === 'completed').length;
    return { total, newCount, inProgress, completed };
  }, [submissions]);

  const chartData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => subDays(new Date(), i)).reverse();
    return last7Days.map(day => ({
      date: format(day, 'MMM d'),
      submissions: submissions.filter(s => {
        const subDate = (s.submittedAt as any).toDate ? (s.submittedAt as any).toDate() : s.submittedAt;
        return format(subDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
      }).length,
    }));
  }, [submissions]);

  const submissionsByType = useMemo(() => {
    const typeMap = submissions.reduce((acc, sub) => {
        acc[sub.serviceType] = (acc[sub.serviceType] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    return Object.entries(typeMap).map(([name, value]) => ({ name, submissions: value }));
  }, [submissions]);
  
  const typeChartConfig = useMemo(() => {
    const config: ChartConfig = {};
    submissionsByType.forEach((item, index) => {
      config[item.name] = {
        label: item.name,
        color: `hsl(var(--chart-${(index % 2) + 1}))`,
      };
    });
    return config;
  }, [submissionsByType]);


  if (error) {
    return <div className="text-destructive">Error loading submissions: {error.message}</div>;
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Submissions" value={loading ? '...' : `${stats.total}`} icon={<Package className="h-4 w-4" />} />
        <StatCard title="New Applications" value={loading ? '...' : `${stats.newCount}`} icon={<BarChartIcon className="h-4 w-4" />} description="Awaiting review" />
        <StatCard title="In Progress" value={loading ? '...' : `${stats.inProgress}`} icon={<CreditCard className="h-4 w-4" />} />
        <StatCard title="Total Revenue (Mock)" value={loading ? '...' : '$45,231.89'} icon={<DollarSign className="h-4 w-4" />} description="+20.1% from last month" />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Submissions Over Last 7 Days</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis allowDecimals={false} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="submissions" fill="var(--color-submissions)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Submissions by Type</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={typeChartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={submissionsByType} layout="vertical" margin={{ top: 20, right: 20, bottom: 20, left: 40 }}>
                        <CartesianGrid horizontal={false} />
                        <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tickMargin={8} width={80}/>
                        <XAxis type="number" allowDecimals={false} />
                        <Tooltip cursor={{fill: 'hsl(var(--muted))'}} content={<ChartTooltipContent />} />
                        <Bar dataKey="submissions" layout="vertical" fill="var(--color-submissions)" radius={4} />
                    </BarChart>
                </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
