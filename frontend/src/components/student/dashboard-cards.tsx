'use client';

import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Bus, MapPin, CreditCard, ShieldCheck, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

interface DashboardCardsProps {
  user: any;
  receipts: any[];
  requests: any[];
}

export const StudentDashboardCards: React.FC<DashboardCardsProps> = ({ user, receipts, requests }) => {
  const assignedRoute = user?.studentProfile?.assignedRoute;
  const latestApprovedReceipt = receipts && receipts.length > 0 ? receipts[0] : null;
  const pendingRequest = requests?.find((r) => r.status === 'PENDING');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Card 1: Assigned Route */}
      <Card className="relative overflow-hidden group border-sky-200/50">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Current Assigned Route</p>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
              {assignedRoute ? assignedRoute.name : 'No Route Selected'}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            {assignedRoute ? `Fee: ${formatCurrency(assignedRoute.price)}` : 'Select your route in profile'}
          </span>
          <Link href="/student/routes" className="text-sky-600 font-semibold hover:underline flex items-center gap-0.5">
            View Routes <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Card>

      {/* Card 2: Transport Fee & Receipt Status */}
      <Card className="relative overflow-hidden group border-emerald-200/50">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Semester Pass Status</p>
            <div className="mt-1">
              {latestApprovedReceipt ? (
                <Badge variant="success" className="text-sm px-3 py-1">Active Pass Verified</Badge>
              ) : pendingRequest ? (
                <Badge variant="warning" className="text-sm px-3 py-1">Receipt Request Pending</Badge>
              ) : (
                <Badge variant="danger" className="text-sm px-3 py-1">Fee Receipt Required</Badge>
              )}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            {latestApprovedReceipt ? `Receipt #${latestApprovedReceipt.receiptNumber}` : 'No active pass'}
          </span>
          <Link href="/student/receipts" className="text-sky-600 font-semibold hover:underline flex items-center gap-0.5">
            Manage Receipts <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Card>

      {/* Card 3: Digital QR Pass Shortcut */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-navy-900 to-sky-900 text-white shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-sky-300">Digital Conductor Pass</p>
            <h3 className="text-lg font-bold text-white mt-1">QR Code Pass</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/10 text-sky-200 flex items-center justify-center backdrop-blur-md">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
          <span className="text-sky-200">Show to Bus Driver</span>
          <Link
            href="/student/pass"
            className="bg-sky-500 hover:bg-sky-400 text-white font-medium px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
          >
            Open Pass <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Card>
    </div>
  );
};
