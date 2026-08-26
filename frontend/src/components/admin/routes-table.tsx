'use client';

import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { TransportRoute } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Trash2, Edit, Route } from 'lucide-react';

interface RoutesTableProps {
  routes: TransportRoute[];
  onDelete: (id: string) => void;
  onEdit: (route: TransportRoute) => void;
}

export const RoutesTable: React.FC<RoutesTableProps> = ({ routes, onDelete, onEdit }) => {
  return (
    <Card className="p-6 space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
          <thead className="text-xs uppercase bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold">
            <tr>
              <th className="px-4 py-3 rounded-l-xl">Route Name</th>
              <th className="px-4 py-3">Origin - Destination</th>
              <th className="px-4 py-3">Semester</th>
              <th className="px-4 py-3">Fee (PKR)</th>
              <th className="px-4 py-3">Bus Count</th>
              <th className="px-4 py-3 rounded-r-xl text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {routes.map((route) => (
              <tr key={route.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="px-4 py-3 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Route className="w-4 h-4 text-sky-500" />
                  {route.name}
                </td>
                <td className="px-4 py-3 text-xs">
                  {route.origin} → {route.destination}
                </td>
                <td className="px-4 py-3">
                  <Badge variant="info">{route.semester}</Badge>
                </td>
                <td className="px-4 py-3 font-extrabold text-sky-600 dark:text-sky-400">
                  {formatCurrency(route.price)}
                </td>
                <td className="px-4 py-3 font-semibold">{route.busCount} Buses</td>
                <td className="px-4 py-3 text-right flex items-center justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(route)}>
                    <Edit className="w-4 h-4 text-sky-500" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(route.id)}>
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
