'use client';

import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { Button } from '../ui/button';

interface SendNotificationFormProps {
  onSubmit: (data: any) => Promise<void>;
}

export const SendNotificationForm: React.FC<SendNotificationFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    type: 'GENERAL',
    title: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(formData);
      setFormData({ type: 'GENERAL', title: '', message: '' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        label="Notification Type"
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        options={[
          { label: 'General Notification', value: 'GENERAL' },
          { label: 'Fee Deadline Reminder', value: 'FEE_REMINDER' },
          { label: 'Bus Schedule Delay Alert', value: 'BUS_DELAY' },
          { label: 'Holiday & Closure Notice', value: 'HOLIDAY' },
          { label: 'Emergency Safety Alert', value: 'EMERGENCY' },
        ]}
      />

      <Input
        label="Notification Headline / Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="e.g. Bus Delay Warning - Route 2"
        required
      />

      <div className="space-y-1.5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
          Detailed Message Content
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-200 h-28"
          placeholder="Write notification message broadcasted to all active students..."
          required
        />
      </div>

      <div className="pt-2 flex justify-end">
        <Button type="submit" variant="primary" isLoading={isLoading}>
          Broadcast Notification to Students
        </Button>
      </div>
    </form>
  );
};
