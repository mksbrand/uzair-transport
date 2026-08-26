'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { Bus, Bell, LogOut, User as UserIcon, ShieldAlert } from 'lucide-react';
import { Button } from '../ui/button';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
            <Bus className="w-6 h-6" />
          </div>
          <div>
            <span className="text-lg font-bold bg-gradient-to-r from-sky-600 to-navy-900 dark:from-sky-400 dark:to-sky-200 bg-clip-text text-transparent">
              UZAIR TRANSPORT
            </span>
            <span className="block text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
              University Portal
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              {user.role === 'STUDENT' && (
                <Link href="/student/notifications" className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
                </Link>
              )}
              
              <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-800">
                <div className="w-9 h-9 rounded-full bg-sky-100 dark:bg-sky-950 border border-sky-300 dark:border-sky-800 flex items-center justify-center text-sky-600 font-bold overflow-hidden">
                  {user.profilePicture ? (
                    <img src={user.profilePicture} alt={user.fullName} className="w-full h-full object-cover" />
                  ) : (
                    user.fullName?.charAt(0) || 'U'
                  )}
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{user.fullName}</p>
                  <span className="inline-block text-[10px] font-medium text-sky-600 dark:text-sky-400 uppercase">
                    {user.role}
                  </span>
                </div>
              </div>

              <Button variant="ghost" size="sm" onClick={logout} className="text-slate-500 hover:text-rose-600">
                <LogOut className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm">Student Login</Button>
              </Link>
              <Link href="/admin-login">
                <Button variant="primary" size="sm">
                  <ShieldAlert className="w-4 h-4 mr-1.5" />
                  Admin Portal
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
