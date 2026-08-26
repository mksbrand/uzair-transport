'use client';

import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { DailyBusSchedule } from '@/types';
import { Bus, Clock, User, CheckCircle2, AlertTriangle } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

export const BusScheduleList: React.FC<{ schedules: DailyBusSchedule[] }> = ({ schedules }) => {
  return (
    <div className="space-y-4">
      {schedules.map((schedule) => {
        const isLive = schedule.status === 'IN_PROGRESS';
        const isDelayed = schedule.status === 'DELAYED';

        return (
          <Card key={schedule.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white ${
                isLive ? 'bg-emerald-500 shadow-md shadow-emerald-500/20' : isDelayed ? 'bg-amber-500' : 'bg-sky-500'
              }`}>
                <Bus className="w-6 h-6" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    Bus {schedule.bus?.busNumber || 'Express Shuttle'}
                  </h4>
                  <Badge variant={isLive ? 'success' : isDelayed ? 'warning' : 'info'}>
                    {schedule.status}
                  </Badge>
                </div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                  Route: {schedule.route?.name || 'Central Campus Route'}
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-sky-500" />
                    Departs: {formatDateTime(schedule.departureTime)}
                  </span>
                  {schedule.bus?.driverName && (
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      Driver: {schedule.bus.driverName} ({schedule.bus.driverPhone})
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="sm:text-right w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Capacity</span>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {schedule.occupiedSeats} / {schedule.bus?.totalSeats || 50} Seats Occupied
              </span>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
