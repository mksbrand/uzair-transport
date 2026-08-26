'use client';

import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Bus } from '@/types';
import { Bus as BusIcon, Trash2, Edit, User, Phone } from 'lucide-react';

interface BusesTableProps {
  buses: Bus[];
  onDelete: (id: string) => void;
  onEdit: (bus: Bus) => void;
}

export const BusesTable: React.FC<BusesTableProps> = ({ buses, onDelete, onEdit }) => {
  return (
    <Card className="p-6 space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
          <thead className="text-xs uppercase bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold">
            <tr>
              <th className="px-4 py-3 rounded-l-xl">Bus Number</th>
              <th className="px-4 py-3">Registration Plate</th>
              <th className="px-4 py-3">Driver Info</th>
              <th className="px-4 py-3">Capacity</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 rounded-r-xl text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {buses.map((bus) => (
              <tr key={bus.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="px-4 py-3 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BusIcon className="w-4 h-4 text-sky-500" />
                  {bus.busNumber}
                </td>
                <td className="px-4 py-3 font-mono font-semibold">{bus.registrationNumber}</td>
                <td className="px-4 py-3 text-xs">
                  <p className="font-bold text-slate-800 dark:text-slate-200">{bus.driverName || 'N/A'}</p>
                  <p className="text-slate-400">{bus.driverPhone || 'No Phone'}</p>
                </td>
                <td className="px-4 py-3 font-semibold">{bus.totalSeats} Seats</td>
                <td className="px-4 py-3">
                  <Badge variant={bus.isActive ? 'success' : 'danger'}>
                    {bus.isActive ? 'In Service' : 'Maintenance'}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right flex items-center justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(bus)}>
                    <Edit className="w-4 h-4 text-sky-500" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(bus.id)}>
                    <Trash2 className="w-4 h-4 text-rose-500" />
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
