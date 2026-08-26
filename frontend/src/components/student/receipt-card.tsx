'use client';

import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Receipt } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Download, ShieldCheck, Calendar, Hash } from 'lucide-react';

interface ReceiptCardProps {
  receipt: Receipt;
  onDownloadPdf?: (receipt: Receipt) => void;
}

export const ReceiptCard: React.FC<ReceiptCardProps> = ({ receipt, onDownloadPdf }) => {
  return (
    <Card className="border border-sky-100 dark:border-sky-900/40 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1">
              <Hash className="w-3.5 h-3.5" />
              {receipt.receiptNumber}
            </span>
            <Badge variant={receipt.isRevoked ? 'danger' : 'success'}>
              {receipt.isRevoked ? 'Revoked' : 'Official Approved'}
            </Badge>
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
            {receipt.route?.name || 'Transport Fee Receipt'}
          </h3>

          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Issued: {formatDate(receipt.issuedAt)}
            </span>
            <span>Valid Until: {formatDate(receipt.validUntil)}</span>
            <span>Semester: {receipt.semester}</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 w-full sm:w-auto">
          <span className="text-xl font-extrabold text-slate-900 dark:text-white">
            {formatCurrency(receipt.amount)}
          </span>

          {onDownloadPdf && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDownloadPdf(receipt)}
              className="w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Download PDF Receipt
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
