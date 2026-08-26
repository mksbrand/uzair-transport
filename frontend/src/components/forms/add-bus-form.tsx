'use client';

import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Bus } from '@/types';

interface AddBusFormProps {
  initialData?: Bus | null;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

export const AddBusForm: React.FC<AddBusFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    busNumber: initialData?.busNumber || '',
    registrationNumber: initialData?.registrationNumber || '',
    driverName: initialData?.driverName || '',
    driverPhone: initialData?.driverPhone || '',
    totalSeats: initialData?.totalSeats || 50,
    notes: initialData?.notes || '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Bus Number / Identifier"
          value={formData.busNumber}
          onChange={(e) => setFormData({ ...formData, busNumber: e.target.value })}
          placeholder="LES-2026-05"
          required
        />
        <Input
          label="Registration License Plate"
          value={formData.registrationNumber}
          onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
          placeholder="REG-UT-105"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Driver Full Name"
          value={formData.driverName}
          onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
          placeholder="Muhammad Aslam"
        />
        <Input
          label="Driver Contact Phone"
          value={formData.driverPhone}
          onChange={(e) => setFormData({ ...formData, driverPhone: e.target.value })}
          placeholder="+92 300 9876543"
        />
      </div>

      <Input
        label="Total Passenger Seats"
        type="number"
        value={formData.totalSeats}
        onChange={(e) => setFormData({ ...formData, totalSeats: Number(e.target.value) })}
        required
      />

      <Input
        label="Operational Notes"
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        placeholder="Air-conditioned express coaster"
      />

      <div className="pt-4 flex items-center justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={isLoading}>
          {initialData ? 'Update Bus' : 'Register Bus'}
        </Button>
      </div>
    </form>
  );
};
