'use client';

import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ReceiptRequest } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

interface ReceiptsTableProps {
  requests: ReceiptRequest[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export const AdminReceiptsTable: React.FC<ReceiptsTableProps> = ({ requests, onApprove, onReject }) => {
  return (
    <Card className="p-6 space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
          <thead className="text-xs uppercase bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold">
            <tr>
              <th className="px-4 py-3 rounded-l-xl">Student Name</th>
              <th className="px-4 py-3">Route Requested</th>
              <th className="px-4 py-3">Semester & Amount</th>
              <th className="px-4 py-3">Requested Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 rounded-r-xl text-right">Approval Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {requests.map((req) => {
              const isPending = req.status === 'PENDING';
              return (
                <tr key={req.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3">
                    <p className="font-bold text-slate-900 dark:text-white">{req.student?.fullName || 'Student'}</p>
                    <p className="text-xs text-slate-400">{req.student?.email}</p>
                  </td>
                  <td className="px-4 py-3 font-medium">{req.route?.name || 'Transport Route'}</td>
                  <td className="px-4 py-3">
                    <span className="block font-extrabold text-sky-600 dark:text-sky-400">
                      {formatCurrency(req.amount)}
                    </span>
                    <span className="text-xs text-slate-400">{req.semester}</span>
                  </td>
                  <td className="px-4 py-3 text-xs">{formatDate(req.requestedAt)}</td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={
                        req.status === 'APPROVED'
                          ? 'success'
                          : req.status === 'REJECTED'
                          ? 'danger'
                          : 'warning'
                      }
                    >
                      {req.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {isPending ? (
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => onApprove(req.id)}
                          className="flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => onReject(req.id)}
                          className="flex items-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Reject
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 italic">Decision Recorded</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
