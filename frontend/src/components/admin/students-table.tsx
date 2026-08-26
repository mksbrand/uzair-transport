'use client';

import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { User } from '@/types';
import { Search, Edit, CheckCircle, XCircle } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface StudentsTableProps {
  students: User[];
  onToggleStatus: (studentId: string, currentStatus: boolean) => void;
}

export const StudentsTable: React.FC<StudentsTableProps> = ({ students, onToggleStatus }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = students.filter(
    (s) =>
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.studentProfile?.studentId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search students by name, email or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
          <thead className="text-xs uppercase bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold">
            <tr>
              <th className="px-4 py-3 rounded-l-xl">Student</th>
              <th className="px-4 py-3">Student ID</th>
              <th className="px-4 py-3">Dept & Sem</th>
              <th className="px-4 py-3">Assigned Route</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 rounded-r-xl text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="px-4 py-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-600 flex items-center justify-center font-bold">
                    {student.fullName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{student.fullName}</p>
                    <p className="text-xs text-slate-400">{student.email}</p>
                  </div>
                </td>
                <td className="px-4 py-3 font-mono font-bold text-sky-600 dark:text-sky-400">
                  {student.studentProfile?.studentId || 'N/A'}
                </td>
                <td className="px-4 py-3">
                  {student.studentProfile?.department || 'N/A'} (Sem {student.studentProfile?.semester || 1})
                </td>
                <td className="px-4 py-3 font-medium">
                  {student.studentProfile?.assignedRoute?.name || 'Unassigned'}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={student.isActive ? 'success' : 'danger'}>
                    {student.isActive ? 'Active' : 'Blocked'}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleStatus(student.id, student.isActive)}
                    className={student.isActive ? 'text-rose-500 hover:text-rose-600' : 'text-emerald-500 hover:text-emerald-600'}
                  >
                    {student.isActive ? 'Deactivate' : 'Activate'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
