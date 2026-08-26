'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumb: React.FC = () => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
      <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-100 flex items-center gap-1">
        <Home className="w-3.5 h-3.5" />
        Home
      </Link>
      {segments.map((segment, index) => {
        const url = `/${segments.slice(0, index + 1).join('/')}`;
        const isLast = index === segments.length - 1;
        const formattedSegment = segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ');

        return (
          <React.Fragment key={url}>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            {isLast ? (
              <span className="font-semibold text-slate-900 dark:text-slate-100 capitalize">
                {formattedSegment}
              </span>
            ) : (
              <Link href={url} className="hover:text-slate-900 dark:hover:text-slate-100 capitalize">
                {formattedSegment}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
