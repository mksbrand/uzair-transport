'use client';

import React from 'react';
import { Card } from '../ui/card';
import { Users, Route, Bus, FileText, DollarSign, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface StatsProps {
  stats: {
    totalStudents: number;
    activeRoutes: number;
    activeBuses: number;
    pendingReceipts: number;
    approvedReceipts: number;
    totalRevenue: number;
  };
}

export const AdminDashboardStats: React.FC<StatsProps> = ({ stats }) => {
  const cards = [
    {
      title: 'Total Students',
      value: stats.totalStudents,
      icon: Users,
      color: 'bg-sky-500/10 text-sky-600',
    },
    {
      title: 'Active Routes',
      value: stats.activeRoutes,
      icon: Route,
      color: 'bg-emerald-500/10 text-emerald-600',
    },
    {
      title: 'Fleet Buses',
      value: stats.activeBuses,
      icon: Bus,
      color: 'bg-indigo-500/10 text-indigo-600',
    },
    {
      title: 'Pending Receipts',
      value: stats.pendingReceipts,
      icon: FileText,
      color: 'bg-amber-500/10 text-amber-600',
      badge: stats.pendingReceipts > 0 ? 'Requires Action' : null,
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      color: 'bg-teal-500/10 text-teal-600',
    },
    {
      title: 'Approved Passes',
      value: stats.approvedReceipts,
      icon: CheckCircle2,
      color: 'bg-blue-500/10 text-blue-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {cards.map((card, i) => {
        const IconComponent = card.icon;
        return (
          <Card key={i} className="flex items-center justify-between p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{card.title}</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{card.value}</h3>
              {card.badge && (
                <span className="inline-block text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-full mt-2 border border-amber-200">
                  {card.badge}
                </span>
              )}
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${card.color}`}>
              <IconComponent className="w-6 h-6" />
            </div>
          </Card>
        );
      })}
    </div>
  );
};
