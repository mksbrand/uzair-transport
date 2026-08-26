'use client';

import React, { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { useToast } from '@/context/notification-context';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading';
import { Megaphone, Trash2, Pin } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AdminAnnouncementsPage() {
  const { showToast } = useToast();
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadAnnouncements = async () => {
    setIsLoading(true);
    const res = await fetchApi('/announcements');
    if (res.success) {
      setAnnouncements(res.data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetchApi('/admin/announcements', {
        method: 'POST',
        body: JSON.stringify({ title, content, isPinned }),
      });

      if (res.success) {
        showToast('Announcement Published', 'Public notice posted to portal home.', 'success');
        setTitle('');
        setContent('');
        setIsPinned(false);
        loadAnnouncements();
      } else {
        showToast('Error', res.error || 'Failed to post announcement', 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this announcement?')) return;
    const res = await fetchApi(`/admin/announcements/${id}`, { method: 'DELETE' });
    if (res.success) {
      showToast('Deleted', 'Announcement removed.', 'info');
      loadAnnouncements();
    } else {
      showToast('Error', res.error || 'Failed to delete', 'error');
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading Announcements..." />;
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Breadcrumb />

      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          Manage Campus Notices & Announcements
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Publish public news, pinned timetable updates, and terminal notices for students.
        </p>
      </div>

      <Card className="p-6">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Post New Notice</h3>
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Schedule Change for Midterm Week"
            required
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 h-24"
              placeholder="Detailed announcement content..."
              required
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={isPinned}
              onChange={(e) => setIsPinned(e.target.checked)}
              className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 w-4 h-4"
            />
            Pin to top of student dashboards
          </label>

          <div className="flex justify-end pt-2">
            <Button type="submit" variant="primary" isLoading={isSubmitting}>
              Publish Announcement
            </Button>
          </div>
        </form>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Active Announcements</h3>
        {announcements.map((item) => (
          <Card key={item.id} className="p-6 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-sky-500" />
                <h4 className="font-bold text-slate-900 dark:text-white text-base">{item.title}</h4>
                {item.isPinned && (
                  <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Pin className="w-3 h-3" /> Pinned
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">{item.content}</p>
              <p className="text-[10px] text-slate-400 font-mono mt-2">Posted on {formatDate(item.createdAt)}</p>
            </div>

            <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} className="text-rose-500">
              <Trash2 className="w-4 h-4" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
