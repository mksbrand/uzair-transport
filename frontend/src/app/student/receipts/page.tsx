'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchApi } from '@/lib/api';
import { useToast } from '@/context/notification-context';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { ReceiptCard } from '@/components/student/receipt-card';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading';
import { Plus, Receipt as ReceiptIcon, FileText, Clock } from 'lucide-react';
import { formatDate, formatCurrency } from '@/lib/utils';
import jsPDF from 'jspdf';

export default function StudentReceiptsPage() {
  const { showToast } = useToast();
  const [receipts, setReceipts] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadReceipts() {
      setIsLoading(true);
      const res = await fetchApi('/receipts');
      if (res.success && res.data) {
        setReceipts(res.data.receipts || []);
        setRequests(res.data.requests || []);
      }
      setIsLoading(false);
    }
    loadReceipts();
  }, []);

  const handleDownloadPdf = (receipt: any) => {
    try {
      const doc = new jspdf('p', 'mm', 'a4');

      // Title & Header
      doc.setFillColor(14, 165, 233); // Sky-500
      doc.rect(0, 0, 210, 40, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text('UZAIR TRANSPORT MANAGEMENT', 15, 22);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Official University Student Fee Receipt & Digital Transit Pass', 15, 30);

      // Receipt Box Details
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`Receipt #: ${receipt.receiptNumber}`, 15, 55);
      doc.text(`Verification Code: ${receipt.verificationCode}`, 130, 55);

      doc.setDrawColor(226, 232, 240);
      doc.line(15, 60, 195, 60);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Student Name: ${receipt.student?.fullName || 'N/A'}`, 15, 72);
      doc.text(`Student ID: ${receipt.student?.studentProfile?.studentId || 'N/A'}`, 15, 80);
      doc.text(`Semester: ${receipt.semester}`, 15, 88);

      doc.text(`Route Name: ${receipt.route?.name || 'N/A'}`, 110, 72);
      doc.text(`Issue Date: ${formatDate(receipt.issuedAt)}`, 110, 80);
      doc.text(`Valid Until: ${formatDate(receipt.validUntil)}`, 110, 88);

      // Fee Table
      doc.setFillColor(241, 245, 249);
      doc.rect(15, 100, 180, 10, 'F');
      doc.setFont('helvetica', 'bold');
      doc.text('Description', 20, 106);
      doc.text('Amount (PKR)', 150, 106);

      doc.setFont('helvetica', 'normal');
      doc.text(`Semester Fee Subscription - ${receipt.route?.name || 'Route'}`, 20, 118);
      doc.text(`${formatCurrency(receipt.amount)}`, 150, 118);

      doc.line(15, 125, 195, 125);
      doc.setFont('helvetica', 'bold');
      doc.text('Total Paid:', 110, 133);
      doc.text(`${formatCurrency(receipt.amount)}`, 150, 133);

      // Footer stamp
      doc.setFillColor(236, 253, 245);
      doc.rect(15, 150, 180, 25, 'F');
      doc.setTextColor(5, 150, 105);
      doc.setFontSize(11);
      doc.text('STATUS: OFFICIAL APPROVED & VERIFIED IN SYSTEM', 25, 165);

      doc.save(`Uzair_Transport_Receipt_${receipt.receiptNumber}.pdf`);
      showToast('PDF Downloaded', 'Official receipt PDF generated successfully.', 'success');
    } catch (err: any) {
      showToast('PDF Error', 'Failed to generate PDF document', 'error');
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading Fee Receipts..." />;
  }

  return (
    <div className="space-y-6">
      <Breadcrumb />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Fee Receipts & Approval Requests
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            View approved transit fee receipts or request a new semester pass approval.
          </p>
        </div>

        <Link href="/student/receipts/request">
          <Button variant="primary" className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Request New Receipt
          </Button>
        </Link>
      </div>

      {/* APPROVED RECEIPTS SECTION */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ReceiptIcon className="w-5 h-5 text-sky-500" />
          Official Approved Receipts ({receipts.length})
        </h2>

        {receipts.length === 0 ? (
          <Card className="p-8 text-center text-slate-500 text-sm">
            No approved receipts found yet. Click "Request New Receipt" to submit your transport fee approval request.
          </Card>
        ) : (
          <div className="space-y-4">
            {receipts.map((r) => (
              <ReceiptCard key={r.id} receipt={r} onDownloadPdf={handleDownloadPdf} />
            ))}
          </div>
        )}
      </div>

      {/* PENDING / PAST REQUESTS SECTION */}
      {requests.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500" />
            Submitted Request History ({requests.length})
          </h2>

          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
                <thead className="text-xs uppercase bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold">
                  <tr>
                    <th className="px-4 py-3 rounded-l-xl">Requested Route</th>
                    <th className="px-4 py-3">Semester & Fee</th>
                    <th className="px-4 py-3">Date Submitted</th>
                    <th className="px-4 py-3 rounded-r-xl">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {requests.map((req) => (
                    <tr key={req.id}>
                      <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                        {req.route?.name || 'Transport Route'}
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-bold text-sky-600 dark:text-sky-400">
                          {formatCurrency(req.amount)}
                        </span>{' '}
                        ({req.semester})
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
