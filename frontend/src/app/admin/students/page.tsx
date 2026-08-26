'use client';

import React, { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { useToast } from '@/context/notification-context';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { StudentsTable } from '@/components/admin/students-table';
import { LoadingSpinner } from '@/components/ui/loading';

export default function AdminStudentsPage() {
  const { showToast } = useToast();
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadStudents = async () => {
    setIsLoading(true);
    const res = await fetchApi('/admin/students');
    if (res.success) {
      setStudents(res.data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleToggleStatus = async (studentId: string, currentStatus: boolean) => {
    const res = await fetchApi(`/admin/students/${studentId}`, {
      method: 'PATCH',
      body: JSON.stringify({ isActive: !currentStatus }),
    });

    if (res.success) {
      showToast('Student Updated', `Student status changed to ${!currentStatus ? 'Active' : 'Blocked'}.`, 'success');
      loadStudents();
    } else {
      showToast('Error', res.error || 'Failed to update student status', 'error');
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading Students Roster..." />;
  }

  return (
    <div className="space-y-6">
      <Breadcrumb />

      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          Registered Students Directory
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage enrolled student accounts, inspect department assignments, and toggle account access.
        </p>
      </div>

      <StudentsTable students={students} onToggleStatus={handleToggleStatus} />
    </div>
  );
}
