'use client';

import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Announcement } from '@/types';
import { Megaphone, Pin, Calendar, User } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const AnnouncementsList: React.FC<{ announcements: Announcement[] }> = ({ announcements }) => {
  return (
    <div className="space-y-4">
      {announcements.map((item) => (
        <Card
          key={item.id}
          className={`p-6 border transition-all ${
            item.isPinned ? 'border-sky-300 dark:border-sky-800 bg-sky-50/20 dark:bg-sky-950/20' : ''
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-sky-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{item.title}</h3>
            </div>
            {item.isPinned && (
              <Badge variant="warning" className="flex items-center gap-1">
                <Pin className="w-3 h-3" /> Pinned Notice
              </Badge>
            )}
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
            {item.content}
          </p>

          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(item.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              Posted by {item.createdBy}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
};
