'use client';

import React, { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { useToast } from '@/context/notification-context';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { AdminReceiptsTable } from '@/components/admin/receipts-table';
import { LoadingSpinner } from '@/components/ui/loading';

export default function AdminReceiptsPage() {
  const { showToast } = useToast();
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadRequests = async () => {
    setIsLoading(true);
    const res = await fetchApi('/admin/receipts');
    if (res.success) {
      setRequests(res.data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleApprove = async (id: string) => {
    const res = await fetchApi(`/admin/receipts/${id}/approve`, { method: 'PATCH' });
    if (res.success) {
      showToast('Approved', 'Student receipt approved and digital pass issued.', 'success');
      loadRequests();
    } else {
      showToast('Error', res.error || 'Failed to approve receipt', 'error');
    }
  };

  const handleReject = async (id: string) => {
    const reason = prompt('Reason for rejection:') || 'Payment proof non-verifiable';
    const res = await fetchApi(`/admin/receipts/${id}/reject`, {
      method: 'PATCH',
      body: JSON.stringify({ rejectionReason: reason }),
    });

    if (res.success) {
      showToast('Rejected', 'Request rejected and student notified.', 'info');
      loadRequests();
    } else {
      showToast('Error', res.error || 'Failed to reject receipt', 'error');
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading Receipt Queue..." />;
  }

  return (
    <div className="space-y-6">
      <Breadcrumb />

      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          Fee Receipts Approval Queue
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review student semester fee payments and issue official cryptographically signed digital passes.
        </p>
      </div>

      <AdminReceiptsTable requests={requests} onApprove={handleApprove} onReject={handleReject} />
    </div>
  );
}
