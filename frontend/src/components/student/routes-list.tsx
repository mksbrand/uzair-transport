'use client';

import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { TransportRoute } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { MapPin, Bus, Search, CheckCircle } from 'lucide-react';

interface RoutesListProps {
  routes: TransportRoute[];
  assignedRouteId?: string;
  onSelectRoute?: (routeId: string) => void;
}

export const StudentRoutesList: React.FC<RoutesListProps> = ({
  routes,
  assignedRouteId,
  onSelectRoute,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRoutes = routes.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by route name, origin, or stop..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRoutes.map((route) => {
          const stopsArray: string[] = typeof route.stops === 'string' ? JSON.parse(route.stops) : route.stops;
          const isAssigned = route.id === assignedRouteId;

          return (
            <Card
              key={route.id}
              className={`relative flex flex-col justify-between transition-all duration-200 ${
                isAssigned ? 'ring-2 ring-sky-500 border-sky-500 bg-sky-50/20 dark:bg-sky-950/20' : ''
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                      {route.semester}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">{route.name}</h3>
                  </div>
                  {isAssigned && (
                    <Badge variant="success" className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Assigned
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400 mb-4 bg-slate-100 dark:bg-slate-800/60 p-3 rounded-xl">
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase">From</span>
                    <span className="font-semibold">{route.origin}</span>
                  </div>
                  <div className="text-sky-500 font-bold">→</div>
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase">To</span>
                    <span className="font-semibold">{route.destination}</span>
                  </div>
                </div>

                <div className="space-y-1.5 mb-4">
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Route Stops:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {stopsArray.map((stop, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        {stop}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-slate-400 font-semibold block">Semester Fee</span>
                  <span className="text-lg font-extrabold text-sky-600 dark:text-sky-400">
                    {formatCurrency(route.price)}
                  </span>
                </div>

                {onSelectRoute && (
                  <Button
                    variant={isAssigned ? 'secondary' : 'primary'}
                    size="sm"
                    onClick={() => onSelectRoute(route.id)}
                    disabled={isAssigned}
                  >
                    {isAssigned ? 'Current Route' : 'Select Route'}
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
