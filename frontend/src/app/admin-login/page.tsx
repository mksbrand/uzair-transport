'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/context/notification-context';
import { fetchApi } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetchApi('/auth/admin/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (res.success && res.data) {
        login(res.data.token, res.data.user);
        showToast('Authenticated', 'Welcome to Uzair Transport Administration Hub', 'success');
        router.push('/admin');
      } else {
        showToast('Access Denied', res.error || 'Invalid administrator credentials', 'error');
      }
    } catch (err: any) {
      showToast('Error', err.message || 'Login authentication error', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-slate-900 text-white">
      <div className="w-full max-w-md space-y-6 text-center">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-500 flex items-center justify-center text-white shadow-lg shadow-sky-500/30">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <span className="text-2xl font-black text-white">ADMIN PORTAL</span>
        </Link>

        <Card className="p-8 space-y-6 bg-slate-800/90 border-slate-700 text-left">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">Administrator Sign-In</h2>
            <p className="text-xs text-slate-400 mt-1">Authorized campus transportation management</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Admin Email Address"
              type="email"
              placeholder="admin@uzair.edu.pk"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" variant="primary" size="lg" isLoading={isLoading} className="w-full">
              Login to Admin Dashboard
            </Button>
          </form>

          <div className="pt-4 border-t border-slate-700 text-center text-xs text-slate-400">
            Student portal account?{' '}
            <Link href="/login" className="text-sky-400 font-semibold hover:underline">
              Student Login Here
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
