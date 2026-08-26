'use client';

import React, { useState } from 'react';
import { fetchApi } from '@/lib/api';
import { useToast } from '@/context/notification-context';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AdminSettingsPage() {
  const { showToast } = useToast();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast('Error', 'New passwords do not match', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetchApi('/admin/password/change', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (res.success) {
        showToast('Password Updated', 'Admin password changed successfully.', 'success');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        showToast('Error', res.error || 'Failed to change password', 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Breadcrumb />

      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          Admin Account Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Update your administrator credentials and security preferences.
        </p>
      </div>

      <Card className="p-8">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6">Change Security Password</h3>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />

          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <Input
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <div className="pt-4 flex justify-end">
            <Button type="submit" variant="primary" isLoading={isLoading}>
              Update Password
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
