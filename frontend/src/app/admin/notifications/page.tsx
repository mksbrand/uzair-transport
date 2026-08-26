'use client';

import React from 'react';
import { fetchApi } from '@/lib/api';
import { useToast } from '@/context/notification-context';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { SendNotificationForm } from '@/components/forms/send-notification-form';
import { Card } from '@/components/ui/card';

export default function AdminNotificationsPage() {
  const { showToast } = useToast();

  const handleSendBroadcast = async (formData: any) => {
    const res = await fetchApi('/admin/notifications/send', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    if (res.success) {
      showToast('Notification Sent', 'Broadcast successfully dispatched to all active student portals.', 'success');
    } else {
      showToast('Error', res.error || 'Failed to send notification broadcast', 'error');
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Breadcrumb />

      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          Broadcast System Notifications
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Send urgent warnings, delay notifications, or fee reminders directly to student student portals.
        </p>
      </div>

      <Card className="p-8">
        <SendNotificationForm onSubmit={handleSendBroadcast} />
      </Card>
    </div>
  );
}
