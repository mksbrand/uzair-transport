'use client';

import React, { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { BusScheduleList } from '@/components/student/bus-schedule';
import { LoadingSpinner } from '@/components/ui/loading';

export default function StudentTransportPage() {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSchedules() {
      setIsLoading(true);
      const res = await fetchApi('/student/schedules');
      if (res.success) {
        setSchedules(res.data || []);
      }
      setIsLoading(false);
    }
    loadSchedules();
  }, []);

  if (isLoading) {
    return <LoadingSpinner message="Loading Daily Bus Schedules..." />;
  }

  return (
    <div className="space-y-6">
      <Breadcrumb />

      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          Daily Bus Timings & Live Status
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Real-time updates on scheduled departures, occupied capacity, and driver contacts.
        </p>
      </div>

      <BusScheduleList schedules={schedules} />
    </div>
  );
}
