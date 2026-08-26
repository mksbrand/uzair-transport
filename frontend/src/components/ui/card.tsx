'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, glass = true, ...props }) => {
  return (
    <div
      className={cn(
        'rounded-2xl p-6 transition-all duration-200',
        glass
          ? 'glass-card shadow-glass'
          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
