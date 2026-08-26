'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { fetchApi } from '@/lib/api';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { DigitalTransportPass } from '@/components/student/digital-pass';
import { LoadingSpinner } from '@/components/ui/loading';
import { Card } from '@/components/ui/card';
import { ShieldCheck, Info } from 'lucide-react';

export default function DigitalPassPage() {
  const { user } = useAuth();
  const [data, setData] = useState<{ profile?: any; receipts?: any[] }>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const [profileRes, receiptRes] = await Promise.all([
        fetchApi('/student/profile'),
        fetchApi('/receipts'),
      ]);
      setData({
        profile: profileRes.data,
        receipts: receiptRes.data?.receipts || [],
      });
      setIsLoading(false);
    }
    load();
  }, []);

  if (isLoading) {
    return <LoadingSpinner message="Loading Digital Conductor Pass..." />;
  }

  const currentUser = data.profile || user;
  const activeReceipt = data.receipts && data.receipts.length > 0 ? data.receipts[0] : null;

  return (
    <div className="space-y-6">
      <Breadcrumb />

      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          Digital Transport Pass
        </h1>
        <p className="text-xs text-slate-500">
          Tap card to flip and display your encrypted conductor QR verification code.
        </p>
      </div>

      <DigitalTransportPass student={currentUser} receipt={activeReceipt} />

      <Card className="max-w-md mx-auto p-4 border border-sky-100 dark:border-sky-900 bg-sky-50/50 dark:bg-sky-950/40 text-xs text-sky-900 dark:text-sky-300 space-y-2">
        <div className="flex items-center gap-2 font-bold">
          <Info className="w-4 h-4 text-sky-500" /> Pass Verification Guidance
        </div>
        <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
          <li>Keep your device brightness high when displaying QR code to conductor.</li>
          <li>Pass is cryptographically locked with system AES-256 key.</li>
          <li>For route changes or seat issues, contact the Transport Office.</li>
        </ul>
      </Card>
    </div>
  );
}
