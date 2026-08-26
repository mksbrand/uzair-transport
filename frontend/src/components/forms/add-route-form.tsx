'use client';

import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { TransportRoute } from '@/types';

interface AddRouteFormProps {
  initialData?: TransportRoute | null;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

export const AddRouteForm: React.FC<AddRouteFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    origin: initialData?.origin || '',
    destination: initialData?.destination || '',
    stops: initialData?.stops
      ? typeof initialData.stops === 'string'
        ? JSON.parse(initialData.stops).join(', ')
        : initialData.stops.join(', ')
      : '',
    semester: initialData?.semester || 'Fall 2026',
    price: initialData?.price || 6500,
    busCount: initialData?.busCount || 2,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const stopsArray = formData.stops.split(',').map((s) => s.trim()).filter(Boolean);
      await onSubmit({ ...formData, stops: stopsArray });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Route Title"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="e.g. Route 4: Johar Town Express"
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Starting Point / Origin"
          value={formData.origin}
          onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
          placeholder="Johar Town G-1"
          required
        />
        <Input
          label="Destination Terminal"
          value={formData.destination}
          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
          placeholder="University Campus Gate 1"
          required
        />
      </div>

      <Input
        label="Stops (Comma Separated)"
        value={formData.stops}
        onChange={(e) => setFormData({ ...formData, stops: e.target.value })}
        placeholder="Stop 1, Stop 2, Stop 3"
        required
      />

      <div className="grid grid-cols-3 gap-4">
        <Input
          label="Semester Session"
          value={formData.semester}
          onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
          required
        />
        <Input
          label="Fee Price (PKR)"
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
          required
        />
        <Input
          label="Number of Buses"
          type="number"
          value={formData.busCount}
          onChange={(e) => setFormData({ ...formData, busCount: Number(e.target.value) })}
          required
        />
      </div>

      <div className="pt-4 flex items-center justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={isLoading}>
          {initialData ? 'Update Route' : 'Create Route'}
        </Button>
      </div>
    </form>
  );
};
