'use client';

import React, { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { useToast } from '@/context/notification-context';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { AdminDashboardStats } from '@/components/admin/dashboard-stats';
import { AdminAnalyticsCharts } from '@/components/admin/analytics-charts';
import { AdminReceiptsTable } from '@/components/admin/receipts-table';
import { AuditLogsTable } from '@/components/admin/audit-logs-table';
import { LoadingSpinner } from '@/components/ui/loading';

export default function AdminDashboardPage() {
  const { showToast } = useToast();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [receiptRequests, setReceiptRequests] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAllAdminData = async () => {
    setIsLoading(true);
    const [dashRes, analRes, recRes, auditRes] = await Promise.all([
      fetchApi('/admin/dashboard'),
      fetchApi('/admin/analytics'),
      fetchApi('/admin/receipts'),
      fetchApi('/admin/audit-logs'),
    ]);

    if (dashRes.success) setDashboardData(dashRes.data);
    if (analRes.success) setAnalyticsData(analRes.data);
    if (recRes.success) setReceiptRequests(recRes.data || []);
    if (auditRes.success) setAuditLogs(auditRes.data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    loadAllAdminData();
  }, []);

  const handleApproveReceipt = async (id: string) => {
    const res = await fetchApi(`/admin/receipts/${id}/approve`, { method: 'PATCH' });
    if (res.success) {
      showToast('Receipt Approved', 'Student pass has been created and verified.', 'success');
      loadAllAdminData();
    } else {
      showToast('Error', res.error || 'Failed to approve receipt', 'error');
    }
  };

  const handleRejectReceipt = async (id: string) => {
    const reason = prompt('Enter rejection reason for student:') || 'Invalid payment receipt upload';
    const res = await fetchApi(`/admin/receipts/${id}/reject`, {
      method: 'PATCH',
      body: JSON.stringify({ rejectionReason: reason }),
    });

    if (res.success) {
      showToast('Receipt Rejected', 'Notification sent to student.', 'info');
      loadAllAdminData();
    } else {
      showToast('Error', res.error || 'Failed to reject receipt', 'error');
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading Admin Operations Overview..." />;
  }

  const stats = dashboardData?.stats || {
    totalStudents: 0,
    activeRoutes: 0,
    activeBuses: 0,
    pendingReceipts: 0,
    approvedReceipts: 0,
    totalRevenue: 0,
  };

  return (
    <div className="space-y-8">
      <Breadcrumb />

      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          Admin Control Hub
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Monitor system ridership, approve receipt requests, manage transit fleet, and inspect audit trails.
        </p>
      </div>

      {/* DASHBOARD STATS */}
      <AdminDashboardStats stats={stats} />

      {/* ANALYTICS CHARTS */}
      {analyticsData?.routeRidership && (
        <AdminAnalyticsCharts routeRidership={analyticsData.routeRidership} />
      )}

      {/* PENDING RECEIPTS TABLE */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Recent Receipt Approval Queue ({receiptRequests.filter(r => r.status === 'PENDING').length} Pending)
        </h2>
        <AdminReceiptsTable
          requests={receiptRequests}
          onApprove={handleApproveReceipt}
          onReject={handleRejectReceipt}
        />
      </div>

      {/* RECENT AUDIT LOGS */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Recent Security Audit Logs
        </h2>
        <AuditLogsTable logs={auditLogs.slice(0, 5)} />
      </div>
    </div>
  );
}
