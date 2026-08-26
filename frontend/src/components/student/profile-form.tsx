'use client';

import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { Button } from '../ui/button';
import { TransportRoute } from '@/types';
import { useToast } from '@/context/notification-context';
import { User, Phone, MapPin, Building, ShieldAlert } from 'lucide-react';

interface ProfileFormProps {
  user: any;
  routes: TransportRoute[];
  onSave: (data: any) => Promise<void>;
}

export const StudentProfileForm: React.FC<ProfileFormProps> = ({ user, routes, onSave }) => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const profile = user?.studentProfile || {};

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    phone: profile.phone || '',
    emergencyContact: profile.emergencyContact || '',
    address: profile.address || '',
    department: profile.department || 'Computer Science',
    semester: profile.semester || 5,
    assignedRouteId: profile.assignedRouteId || (routes[0]?.id || ''),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSave(formData);
      showToast('Profile Updated', 'Your profile preferences have been saved successfully.', 'success');
    } catch (err: any) {
      showToast('Error', err.message || 'Failed to update profile', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const routeOptions = routes.map((r) => ({
    label: `${r.name} (${r.semester} - PKR ${r.price})`,
    value: r.id,
  }));

  return (
    <Card className="p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="w-16 h-16 rounded-2xl bg-sky-500/10 text-sky-600 flex items-center justify-center text-2xl font-bold overflow-hidden border border-sky-200">
            {user?.profilePicture ? (
              <img src={user.profilePicture} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              user?.fullName?.charAt(0) || 'U'
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{user?.fullName}</h3>
            <p className="text-xs text-slate-500">{user?.email}</p>
            <span className="inline-block text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400 mt-1">
              ID: {profile.studentId || 'UZ-2024-884'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
          />

          <Input
            label="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+92 300 1234567"
          />

          <Input
            label="Department"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            required
          />

          <Select
            label="Semester"
            value={formData.semester}
            onChange={(e) => setFormData({ ...formData, semester: Number(e.target.value) })}
            options={[1, 2, 3, 4, 5, 6, 7, 8].map((s) => ({ label: `Semester ${s}`, value: s }))}
          />

          <Input
            label="Emergency Contact"
            value={formData.emergencyContact}
            onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
            placeholder="+92 333 9998877"
          />

          <Select
            label="Assigned Bus Route"
            value={formData.assignedRouteId}
            onChange={(e) => setFormData({ ...formData, assignedRouteId: e.target.value })}
            options={routeOptions}
          />
        </div>

        <Input
          label="Residential Address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="House/Street, Block, City"
        />

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <Button type="submit" variant="primary" isLoading={isLoading}>
            Save Profile Preferences
          </Button>
        </div>
      </form>
    </Card>
  );
};
