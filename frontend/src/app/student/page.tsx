'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { fetchApi } from '@/lib/api';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { StudentDashboardCards } from '@/components/student/dashboard-cards';
import { BusScheduleList } from '@/components/student/bus-schedule';
import { AnnouncementsList } from '@/components/student/announcements-list';
import { LoadingSpinner } from '@/components/ui/loading';

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState<{
    profile?: any;
    receipts?: any[];
    requests?: any[];
    schedules?: any[];
    announcements?: any[];
  }>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const [profileRes, receiptRes, scheduleRes, notifRes] = await Promise.all([
        fetchApi('/student/profile'),
        fetchApi('/receipts'),
        fetchApi('/student/schedules'),
        fetchApi('/student/notifications'),
      ]);

      setData({
        profile: profileRes.data,
        receipts: receiptRes.data?.receipts || [],
        requests: receiptRes.data?.requests || [],
        schedules: scheduleRes.data || [],
        announcements: notifRes.data?.announcements || [],
      });
      setIsLoading(false);
    }
    loadData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner message="Loading Dashboard..." />;
  }

  const currentUser = data.profile || user;

  return (
    <div className="space-y-6">
      <Breadcrumb />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Welcome back, {currentUser?.fullName || 'Student'}! 👋
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Department of {currentUser?.studentProfile?.department || 'Computer Science'} • Student ID:{' '}
            <span className="font-mono font-bold text-sky-600">
              {currentUser?.studentProfile?.studentId || 'UZ-2024-884'}
            </span>
          </p>
        </div>
      </div>

      {/* DASHBOARD CARDS */}
      <StudentDashboardCards
        user={currentUser}
        receipts={data.receipts || []}
        requests={data.requests || []}
      />

      {/* TWO COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Today's Bus Schedule */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Today's Shuttle Schedules
          </h2>
          <BusScheduleList schedules={data.schedules || []} />
        </div>

        {/* Right Column: Campus Announcements */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Portal Notices & Alerts
          </h2>
          <AnnouncementsList announcements={data.announcements || []} />
        </div>
      </div>
    </div>
  );
}
