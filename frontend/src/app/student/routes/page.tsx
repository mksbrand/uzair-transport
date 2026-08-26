'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/context/notification-context';
import { fetchApi } from '@/lib/api';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { StudentRoutesList } from '@/components/student/routes-list';
import { LoadingSpinner } from '@/components/ui/loading';

export default function StudentRoutesPage() {
  const { user, refreshUser } = useAuth();
  const { showToast } = useToast();
  const [routes, setRoutes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRoutes() {
      setIsLoading(true);
      const res = await fetchApi('/student/routes');
      if (res.success) {
        setRoutes(res.data || []);
      }
      setIsLoading(false);
    }
    loadRoutes();
  }, []);

  const handleSelectRoute = async (routeId: string) => {
    const res = await fetchApi('/student/profile', {
      method: 'PATCH',
      body: JSON.stringify({ assignedRouteId: routeId }),
    });

    if (res.success) {
      showToast('Route Selected', 'Your assigned transport route has been updated.', 'success');
      await refreshUser();
    } else {
      showToast('Error', res.error || 'Failed to select route', 'error');
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading Transport Routes..." />;
  }

  const assignedRouteId = user?.studentProfile?.assignedRouteId;

  return (
    <div className="space-y-6">
      <Breadcrumb />

      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          Active Transport Routes & Fee Schedule
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Explore all official university bus routes, pickup stops, and semester fee pricing.
        </p>
      </div>

      <StudentRoutesList
        routes={routes}
        assignedRouteId={assignedRouteId}
        onSelectRoute={handleSelectRoute}
      />
    </div>
  );
}
