'use client';

import React, { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { useToast } from '@/context/notification-context';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { RoutesTable } from '@/components/admin/routes-table';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { AddRouteForm } from '@/components/forms/add-route-form';
import { LoadingSpinner } from '@/components/ui/loading';
import { Plus } from 'lucide-react';

export default function AdminRoutesPage() {
  const { showToast } = useToast();
  const [routes, setRoutes] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadRoutes = async () => {
    setIsLoading(true);
    const res = await fetchApi('/admin/routes');
    if (res.success) {
      setRoutes(res.data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadRoutes();
  }, []);

  const handleOpenAdd = () => {
    setSelectedRoute(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (route: any) => {
    setSelectedRoute(route);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this transport route?')) return;
    const res = await fetchApi(`/admin/routes/${id}`, { method: 'DELETE' });
    if (res.success) {
      showToast('Route Deleted', 'Transport route has been removed.', 'info');
      loadRoutes();
    } else {
      showToast('Error', res.error || 'Failed to delete route', 'error');
    }
  };

  const handleSubmit = async (formData: any) => {
    const endpoint = selectedRoute ? `/admin/routes/${selectedRoute.id}` : '/admin/routes';
    const method = selectedRoute ? 'PATCH' : 'POST';

    const res = await fetchApi(endpoint, {
      method,
      body: JSON.stringify(formData),
    });

    if (res.success) {
      showToast('Success', `Route ${selectedRoute ? 'updated' : 'created'} successfully.`, 'success');
      setIsModalOpen(false);
      loadRoutes();
    } else {
      showToast('Error', res.error || 'Operation failed', 'error');
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading Transport Routes..." />;
  }

  return (
    <div className="space-y-6">
      <Breadcrumb />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Manage Transport Routes
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Create, edit, or configure university route pricing and pickup stops.
          </p>
        </div>

        <Button variant="primary" onClick={handleOpenAdd} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add New Route
        </Button>
      </div>

      <RoutesTable routes={routes} onDelete={handleDelete} onEdit={handleOpenEdit} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedRoute ? 'Edit Transport Route' : 'Create New Route'}
        maxWidth="lg"
      >
        <AddRouteForm
          initialData={selectedRoute}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
