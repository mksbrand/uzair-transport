'use client';

import React, { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { useToast } from '@/context/notification-context';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { BusesTable } from '@/components/admin/buses-table';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { AddBusForm } from '@/components/forms/add-bus-form';
import { LoadingSpinner } from '@/components/ui/loading';
import { Plus } from 'lucide-react';

export default function AdminBusesPage() {
  const { showToast } = useToast();
  const [buses, setBuses] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBus, setSelectedBus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadBuses = async () => {
    setIsLoading(true);
    const res = await fetchApi('/admin/buses');
    if (res.success) {
      setBuses(res.data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadBuses();
  }, []);

  const handleOpenAdd = () => {
    setSelectedBus(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (bus: any) => {
    setSelectedBus(bus);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this bus from the fleet?')) return;
    const res = await fetchApi(`/admin/buses/${id}`, { method: 'DELETE' });
    if (res.success) {
      showToast('Bus Removed', 'Shuttle has been removed from active fleet.', 'info');
      loadBuses();
    } else {
      showToast('Error', res.error || 'Failed to delete bus', 'error');
    }
  };

  const handleSubmit = async (formData: any) => {
    const endpoint = selectedBus ? `/admin/buses/${selectedBus.id}` : '/admin/buses';
    const method = selectedBus ? 'PATCH' : 'POST';

    const res = await fetchApi(endpoint, {
      method,
      body: JSON.stringify(formData),
    });

    if (res.success) {
      showToast('Success', `Bus ${selectedBus ? 'updated' : 'registered'} successfully.`, 'success');
      setIsModalOpen(false);
      loadBuses();
    } else {
      showToast('Error', res.error || 'Operation failed', 'error');
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading Fleet Buses..." />;
  }

  return (
    <div className="space-y-6">
      <Breadcrumb />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Manage Fleet Buses
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Register new shuttle buses, assign driver contact numbers, and monitor capacity.
          </p>
        </div>

        <Button variant="primary" onClick={handleOpenAdd} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Register Bus
        </Button>
      </div>

      <BusesTable buses={buses} onDelete={handleDelete} onEdit={handleOpenEdit} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedBus ? 'Edit Fleet Bus' : 'Register Shuttle Bus'}
        maxWidth="md"
      >
        <AddBusForm
          initialData={selectedBus}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
