'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchApi } from '@/lib/api';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading';
import { ShieldCheck, XCircle, CheckCircle2, Bus, Calendar, User } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function PublicVerifyPage() {
  const params = useParams();
  const receiptId = params.receiptId as string;

  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function verify() {
      if (!receiptId) return;
      setIsLoading(true);
      try {
        const res = await fetchApi('/verify', {
          method: 'POST',
          body: JSON.stringify({ verificationCode: receiptId }),
        });
        setVerificationResult(res);
      } catch (err: any) {
        setVerificationResult({ success: false, error: err.message });
      } finally {
        setIsLoading(false);
      }
    }
    verify();
  }, [receiptId]);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow max-w-3xl mx-auto px-4 py-16 w-full">
        {isLoading ? (
          <LoadingSpinner message="Verifying Digital Transport Pass..." />
        ) : verificationResult?.isValid ? (
          <Card className="p-8 border-2 border-emerald-500/40 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <Badge variant="success" className="text-sm px-4 py-1">
                PASS VALID & AUTHENTIC
              </Badge>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                Official Transport Receipt Verified
              </h2>
              <p className="text-xs text-slate-500 mt-1">Verification Code: {receiptId}</p>
            </div>

            {verificationResult.receipt && (
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6 text-left space-y-3 border border-slate-100 dark:border-slate-800">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Student Name</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {verificationResult.receipt.student?.fullName}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Student ID</span>
                    <span className="font-mono font-bold text-sky-600">
                      {verificationResult.receipt.student?.studentProfile?.studentId}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Assigned Route</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {verificationResult.receipt.route?.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Valid Expiry</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {formatDate(verificationResult.receipt.validUntil)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ) : (
          <Card className="p-8 border-2 border-rose-500/40 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 mx-auto flex items-center justify-center">
              <XCircle className="w-10 h-10" />
            </div>

            <div>
              <Badge variant="danger" className="text-sm px-4 py-1">
                PASS INVALID OR EXPIRED
              </Badge>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                Verification Failed
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {verificationResult?.message || 'The provided verification code is invalid, revoked, or fake.'}
              </p>
            </div>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
}
