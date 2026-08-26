'use client';

import React, { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading';
import { Bell, CheckCheck, Clock, ShieldAlert } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

export default function StudentNotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadNotifs() {
      setIsLoading(true);
      const res = await fetchApi('/student/notifications');
      if (res.success && res.data) {
        setNotifications(res.data.notifications || []);
      }
      setIsLoading(false);
    }
    loadNotifs();
  }, []);

  const markAllRead = async () => {
    await fetchApi('/student/notifications/read', { method: 'PATCH' });
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading Notifications..." />;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Breadcrumb />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Notifications & Broadcasts
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            System announcements, receipt approval notices, and shuttle updates.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={markAllRead} className="flex items-center gap-2">
          <CheckCheck className="w-4 h-4" /> Mark All as Read
        </Button>
      </div>

      <div className="space-y-4">
        {notifications.map((n) => (
          <Card
            key={n.id}
            className={`p-6 transition-all ${
              !n.isRead ? 'border-sky-300 dark:border-sky-800 bg-sky-50/30 dark:bg-sky-950/30 font-semibold' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{n.title}</h3>
                    <Badge variant={n.type === 'EMERGENCY' ? 'danger' : 'info'}>{n.type}</Badge>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" /> {formatDateTime(n.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 pl-13 leading-relaxed font-normal">
              {n.message}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
