'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchApi } from '@/lib/api';
import { useToast } from '@/context/notification-context';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TransportRoute } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { UploadCloud, FileText } from 'lucide-react';

export default function RequestReceiptPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [routes, setRoutes] = useState<TransportRoute[]>([]);
  const [selectedRouteId, setSelectedRouteId] = useState('');
  const [semester, setSemester] = useState('Fall 2026');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadRoutes() {
      const res = await fetchApi('/student/routes');
      if (res.success && res.data) {
        setRoutes(res.data);
        if (res.data.length > 0) {
          setSelectedRouteId(res.data[0].id);
        }
      }
    }
    loadRoutes();
  }, []);

  const selectedRoute = routes.find((r) => r.id === selectedRouteId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRouteId || !selectedRoute) return;

    setIsLoading(true);
    try {
      let res;
      if (file) {
        // Multipart Form Data for File Upload
        const formData = new FormData();
        formData.append('routeId', selectedRouteId);
        formData.append('semester', semester);
        formData.append('amount', String(selectedRoute.price));
        formData.append('paymentProof', file);

        const token = typeof window !== 'undefined' ? localStorage.getItem('uzair_transport_token') : '';
        const rawRes = await fetch('http://localhost:3001/api/v1/receipts/request', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        res = await rawRes.json();
      } else {
        res = await fetchApi('/receipts/request', {
          method: 'POST',
          body: JSON.stringify({
            routeId: selectedRouteId,
            semester,
            amount: selectedRoute.price,
          }),
        });
      }

      if (res.success) {
        showToast('Request Submitted', 'Your receipt request has been sent for admin verification.', 'success');
        router.push('/student/receipts');
      } else {
        showToast('Request Failed', res.error || 'Failed to submit request', 'error');
      }
    } catch (err: any) {
      showToast('Error', err.message || 'Error submitting request', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const routeOptions = routes.map((r) => ({
    label: `${r.name} - ${formatCurrency(r.price)}`,
    value: r.id,
  }));

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Breadcrumb />

      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          Request Semester Pass Receipt
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Select your transport route, academic semester, and upload your bank fee deposit receipt.
        </p>
      </div>

      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Select
            label="Select Bus Route"
            value={selectedRouteId}
            onChange={(e) => setSelectedRouteId(e.target.value)}
            options={routeOptions}
          />

          <Input
            label="Semester Academic Session"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            required
          />

          {/* PAYMENT PROOF UPLOAD */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Upload Bank Deposit Receipt / Payment Proof (JPEG, PNG, PDF)
            </label>
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center bg-slate-50/50 dark:bg-slate-900/50 hover:border-sky-500 transition-colors">
              <input
                type="file"
                id="paymentProofInput"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
              />
              <label htmlFor="paymentProofInput" className="cursor-pointer flex flex-col items-center gap-2">
                <UploadCloud className="w-8 h-8 text-sky-500" />
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {file ? file.name : 'Click to select or drag and drop receipt file'}
                </span>
                <span className="text-xs text-slate-400">Maximum file size: 5MB</span>
              </label>
            </div>
          </div>

          {selectedRoute && (
            <div className="bg-sky-50 dark:bg-sky-950/50 p-4 rounded-xl border border-sky-100 dark:border-sky-900 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400 font-medium">Selected Route:</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedRoute.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400 font-medium">Stops:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {selectedRoute.origin} → {selectedRoute.destination}
                </span>
              </div>
              <div className="flex justify-between text-base pt-2 border-t border-sky-200 dark:border-sky-800">
                <span className="font-bold text-slate-900 dark:text-white">Total Semester Fee:</span>
                <span className="font-extrabold text-sky-600 dark:text-sky-400">
                  {formatCurrency(selectedRoute.price)}
                </span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={isLoading}>
              Submit Receipt Request
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
