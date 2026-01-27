import { Suspense } from 'react';
import DashboardClient from './DashboardClient';
import DashboardLoading from './loading';

export const metadata = {
  title: 'Dashboard | Bilacert Admin Pro',
  description: 'Real-time overview of submissions and metrics.',
};

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardClient />
    </Suspense>
  );
}
