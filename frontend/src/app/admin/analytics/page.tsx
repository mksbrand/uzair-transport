'use client';

import React, { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { AdminAnalyticsCharts } from '@/components/admin/analytics-charts';
import { LoadingSpinner } from '@/components/ui/loading';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      setIsLoading(true);
      const res = await fetchApi('/admin/analytics');
      if (res.success) {
        setData(res.data);
      }
      setIsLoading(false);
    }
    loadAnalytics();
  }, []);

  if (isLoading) {
    return <LoadingSpinner message="Generating Ridership Analytics..." />;
  }

  const overview = data?.overview || { totalRevenue: 0, totalReceipts: 0, totalStudents: 0 };
  const routeRidership = data?.routeRidership || [];

  return (
    <div className="space-y-6">
      <Breadcrumb />

      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          System Analytics & Ridership Insights
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Detailed metrics breakdown on route capacity utilization and revenue collections.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="p-6 text-center">
          <span className="text-xs uppercase font-semibold text-slate-400">Total System Revenue</span>
          <h3 className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {formatCurrency(overview.totalRevenue)}
          </h3>
        </Card>

        <Card className="p-6 text-center">
          <span className="text-xs uppercase font-semibold text-slate-400">Approved Digital Receipts</span>
          <h3 className="text-2xl font-black text-sky-600 dark:text-sky-400 mt-1">
            {overview.totalReceipts}
          </h3>
        </Card>

        <Card className="p-6 text-center">
          <span className="text-xs uppercase font-semibold text-slate-400">Enrolled Transit Students</span>
          <h3 className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
            {overview.totalStudents}
          </h3>
        </Card>
      </div>

      <AdminAnalyticsCharts routeRidership={routeRidership} />
    </div>
  );
}
