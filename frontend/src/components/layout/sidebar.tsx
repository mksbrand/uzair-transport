'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  MapPin,
  Bus,
  Receipt,
  QrCode,
  Bell,
  User as UserIcon,
  HelpCircle,
  Users,
  Route,
  FileText,
  Send,
  Megaphone,
  BarChart3,
  ShieldCheck,
  Settings,
} from 'lucide-react';

interface SidebarProps {
  role: 'STUDENT' | 'ADMIN';
}

const iconMap: Record<string, any> = {
  LayoutDashboard,
  MapPin,
  Bus,
  Receipt,
  QrCode,
  Bell,
  User: UserIcon,
  HelpCircle,
  Users,
  Route,
  FileText,
  Send,
  Megaphone,
  BarChart3,
  ShieldCheck,
  Settings,
};

export const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const pathname = usePathname();

  const links = role === 'STUDENT'
    ? [
        { label: 'Dashboard', href: '/student', icon: 'LayoutDashboard' },
        { label: 'Routes & Fees', href: '/student/routes', icon: 'MapPin' },
        { label: 'Daily Buses', href: '/student/transport', icon: 'Bus' },
        { label: 'Receipts', href: '/student/receipts', icon: 'Receipt' },
        { label: 'Digital Pass', href: '/student/pass', icon: 'QrCode' },
        { label: 'Notifications', href: '/student/notifications', icon: 'Bell' },
        { label: 'Profile', href: '/student/profile', icon: 'User' },
        { label: 'Help & Support', href: '/student/help', icon: 'HelpCircle' },
      ]
    : [
        { label: 'Overview', href: '/admin', icon: 'LayoutDashboard' },
        { label: 'Students', href: '/admin/students', icon: 'Users' },
        { label: 'Routes', href: '/admin/routes', icon: 'Route' },
        { label: 'Buses Fleet', href: '/admin/buses', icon: 'Bus' },
        { label: 'Receipt Requests', href: '/admin/receipts', icon: 'FileText' },
        { label: 'Broadcasts', href: '/admin/notifications', icon: 'Send' },
        { label: 'Announcements', href: '/admin/announcements', icon: 'Megaphone' },
        { label: 'Analytics', href: '/admin/analytics', icon: 'BarChart3' },
        { label: 'Audit Logs', href: '/admin/audit-logs', icon: 'ShieldCheck' },
        { label: 'Settings', href: '/admin/settings', icon: 'Settings' },
      ];

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between hidden md:flex">
      <div className="space-y-1">
        <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
          {role} Navigation
        </p>
        {links.map((link) => {
          const IconComponent = iconMap[link.icon] || LayoutDashboard;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
              )}
            >
              <IconComponent className="w-4 h-4" />
              {link.label}
            </Link>
          );
        })}
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="bg-sky-50 dark:bg-sky-950/50 rounded-xl p-3 text-center border border-sky-100 dark:border-sky-900">
          <p className="text-xs font-semibold text-sky-900 dark:text-sky-200">Uzair Transport v1.0</p>
          <p className="text-[10px] text-sky-600 dark:text-sky-400">Campus Transport System</p>
        </div>
      </div>
    </aside>
  );
};
