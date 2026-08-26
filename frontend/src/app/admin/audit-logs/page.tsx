'use client';

import React, { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { AuditLogsTable } from '@/components/admin/audit-logs-table';
import { LoadingSpinner } from '@/components/ui/loading';

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAuditLogs() {
      setIsLoading(true);
      const res = await fetchApi('/admin/audit-logs');
      if (res.success) {
        setLogs(res.data || []);
      }
      setIsLoading(false);
    }
    loadAuditLogs();
  }, []);

  if (isLoading) {
    return <LoadingSpinner message="Loading Security Audit Logs..." />;
  }

  return (
    <div className="space-y-6">
      <Breadcrumb />

      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          Security & Action Audit Logs
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Complete immutable log of all administrative actions, receipt approvals, and route edits.
        </p>
      </div>

      <AuditLogsTable logs={logs} />
    </div>
  );
}
