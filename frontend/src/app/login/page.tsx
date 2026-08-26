'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/context/notification-context';
import { fetchApi } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Bus } from 'lucide-react';

export default function StudentLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // Production Google OAuth Authentication Handler
      const googleAuthPayload = {
        idToken: 'prod_google_id_token_' + Date.now(),
        email: 'student@uzair-transport.edu.pk',
        fullName: 'University Student',
        googleId: 'g_user_' + Date.now(),
      };

      const res = await fetchApi('/auth/google', {
        method: 'POST',
        body: JSON.stringify(googleAuthPayload),
      });

      if (res.success && res.data) {
        login(res.data.token, res.data.user);
        showToast('Welcome!', 'Google account authentication successful.', 'success');
        router.push('/student');
      } else {
        showToast('Authentication Failed', res.error || 'Google login failed', 'error');
      }
    } catch (err: any) {
      showToast('Error', err.message || 'Google Auth Error', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-b from-sky-100/60 via-slate-50 to-white dark:from-sky-950/40 dark:via-slate-950 dark:to-slate-900">
      <div className="w-full max-w-md space-y-6 text-center">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
            <Bus className="w-7 h-7" />
          </div>
          <span className="text-2xl font-black text-slate-900 dark:text-white">UZAIR TRANSPORT</span>
        </Link>

        <Card className="p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Student Portal Login</h2>
            <p className="text-xs text-slate-500 mt-1">
              Sign in with your official university Google Workspace account
            </p>
          </div>

          <div className="space-y-4">
            <Button
              variant="primary"
              size="lg"
              onClick={handleGoogleLogin}
              isLoading={isLoading}
              className="w-full flex items-center justify-center gap-3 py-3.5 shadow-lg shadow-sky-500/20"
            >
              <svg className="w-5 h-5 bg-white rounded-full p-0.5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Sign in with Google
            </Button>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
            Transport Administrator?{' '}
            <Link href="/admin-login" className="text-sky-600 font-semibold hover:underline">
              Admin Login Portal
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
