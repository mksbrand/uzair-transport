'use client';

import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { AuditLog } from '@/types';
import { formatDateTime } from '@/lib/utils';
import { ShieldCheck, User } from 'lucide-react';

export const AuditLogsTable: React.FC<{ logs: AuditLog[] }> = ({ logs }) => {
  return (
    <Card className="p-6 space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
          <thead className="text-xs uppercase bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold">
            <tr>
              <th className="px-4 py-3 rounded-l-xl">Timestamp</th>
              <th className="px-4 py-3">Actor / Admin</th>
              <th className="px-4 py-3">Action performed</th>
              <th className="px-4 py-3">Object Type & ID</th>
              <th className="px-4 py-3 rounded-r-xl">IP Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="px-4 py-3 text-xs font-mono">{formatDateTime(log.createdAt)}</td>
                <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-sky-500" />
                  {log.actor?.fullName || log.actorId}
                </td>
                <td className="px-4 py-3">
                  <Badge variant="info">{log.action}</Badge>
                </td>
                <td className="px-4 py-3 text-xs">
                  <span className="font-bold">{log.objectType}</span>: {log.objectId}
                </td>
                <td className="px-4 py-3 text-xs font-mono text-slate-400">{log.ipAddress || '127.0.0.1'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
