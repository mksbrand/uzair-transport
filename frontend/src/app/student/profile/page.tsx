'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { fetchApi } from '@/lib/api';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { StudentProfileForm } from '@/components/student/profile-form';
import { LoadingSpinner } from '@/components/ui/loading';

export default function StudentProfilePage() {
  const { user, refreshUser } = useAuth();
  const [routes, setRoutes] = useState<any[]>([]);
  const [profileData, setProfileData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const [profileRes, routesRes] = await Promise.all([
        fetchApi('/student/profile'),
        fetchApi('/student/routes'),
      ]);

      if (profileRes.success) setProfileData(profileRes.data);
      if (routesRes.success) setRoutes(routesRes.data || []);
      setIsLoading(false);
    }
    loadData();
  }, []);

  const handleSaveProfile = async (formData: any) => {
    const res = await fetchApi('/student/profile', {
      method: 'PATCH',
      body: JSON.stringify(formData),
    });

    if (!res.success) {
      throw new Error(res.error || 'Failed to save profile');
    }
    await refreshUser();
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading Student Profile..." />;
  }

  const currentUser = profileData || user;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Breadcrumb />

      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          Student Profile Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your contact numbers, residential address, emergency contacts, and assigned route.
        </p>
      </div>

      <StudentProfileForm user={currentUser} routes={routes} onSave={handleSaveProfile} />
    </div>
  );
}
