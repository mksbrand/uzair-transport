'use client';

import React from 'react';
import { Bus, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center text-white">
              <Bus className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-white">UZAIR TRANSPORT</span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            A state-of-the-art digital transportation portal powering seamless university route tracking, digital passes, and PDF receipt management.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Quick Navigation</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="/login" className="hover:text-sky-400">Student Portal Login</a></li>
            <li><a href="/admin-login" className="hover:text-sky-400">Admin Control Center</a></li>
            <li><a href="/student/routes" className="hover:text-sky-400">Routes & Fee Table</a></li>
            <li><a href="/student/pass" className="hover:text-sky-400">Digital Transport Pass</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Transport Office</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>Central Transport Terminal, Building B</li>
            <li>Email: transport@uzair.edu.pk</li>
            <li>Helpline: +92 42 111 UZAIR (89247)</li>
            <li>Timing: Mon - Fri (07:00 AM - 05:00 PM)</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Security & Compliance</h4>
          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-slate-800/60 p-3 rounded-xl border border-slate-800">
            <Shield className="w-5 h-5 flex-shrink-0" />
            <span>Encrypted AES-256 digital passes with active QR code verification.</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-800/60 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Uzair Transport Management System. All rights reserved.
      </div>
    </footer>
  );
};
