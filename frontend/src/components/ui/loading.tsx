'use client';

import React from 'react';

export const LoadingSpinner: React.FC<{ message?: string }> = ({ message = 'Loading Uzair Transport...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative w-12 h-12">
        <div className="w-12 h-12 rounded-full border-4 border-sky-200 dark:border-sky-900 border-t-sky-500 animate-spin"></div>
      </div>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{message}</p>
    </div>
  );
};
