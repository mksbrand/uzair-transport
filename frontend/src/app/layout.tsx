import React from 'react';
import '@/styles/globals.css';
import { AuthProvider } from '@/context/auth-context';
import { NotificationProvider } from '@/context/notification-context';
import { ToastContainer } from '@/components/ui/toast';

export const metadata = {
  title: 'Uzair Transport | University Transport Management System',
  description: 'Production-ready university student transport management portal for routes, digital passes, and PDF receipts.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col">
        <AuthProvider>
          <NotificationProvider>
            {children}
            <ToastContainer />
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
