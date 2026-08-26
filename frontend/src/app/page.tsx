'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import {
  Bus,
  ShieldCheck,
  Receipt,
  QrCode,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  Users,
  CheckCircle2,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-b from-sky-100/60 via-slate-50 to-white dark:from-sky-950/40 dark:via-slate-950 dark:to-slate-900 py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-semibold">
                  <Sparkles className="w-4 h-4" /> Next-Generation University Transport Portal
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight">
                  University Commute, <br />
                  <span className="bg-gradient-to-r from-sky-500 to-navy-900 dark:from-sky-400 dark:to-sky-200 bg-clip-text text-transparent">
                    Digitized & Seamless.
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                  Uzair Transport simplifies student transit with live bus schedules, encrypted QR conductor passes, instant PDF fee receipts, and full administrative oversight.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                  <Link href="/login" className="w-full sm:w-auto">
                    <Button variant="primary" size="lg" className="w-full shadow-lg shadow-sky-500/25">
                      Student Portal Login <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/admin-login" className="w-full sm:w-auto">
                    <Button variant="outline" size="lg" className="w-full">
                      Admin Access
                    </Button>
                  </Link>
                </div>
              </div>

              {/* BUS SVG ILLUSTRATION */}
              <div className="relative flex justify-center">
                <div className="w-full max-w-md p-8 glass-card rounded-3xl shadow-glass border border-sky-200 dark:border-sky-800 text-center relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-400/20 rounded-full blur-2xl"></div>
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-sky-500 to-sky-400 mx-auto flex items-center justify-center text-white shadow-xl shadow-sky-500/30 mb-6 animate-bounce">
                    <Bus className="w-14 h-14" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Active Transport Hub</h3>
                  <p className="text-xs text-slate-500 mt-1 mb-6">Fall 2026 Academic Session Live</p>

                  <div className="grid grid-cols-2 gap-3 text-left">
                    <div className="p-3 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-100 dark:border-slate-700">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Active Fleet</span>
                      <span className="text-sm font-bold text-sky-600 dark:text-sky-400">12 Shuttles</span>
                    </div>
                    <div className="p-3 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-100 dark:border-slate-700">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Ridership</span>
                      <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">1,250+ Students</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="py-20 bg-white dark:bg-slate-900 border-t border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3">Designed for Students & Admins</h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto mb-16">
              Complete digital infrastructure tailored specifically for university transportation requirements.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-left space-y-4 hover:shadow-xl transition-all">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-600 flex items-center justify-center">
                  <QrCode className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Encrypted Digital Pass</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Interactive 3D-flip digital student pass with live timestamp verification and encrypted QR codes for instant conductor check-ins.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-left space-y-4 hover:shadow-xl transition-all">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <Receipt className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Instant PDF Fee Receipts</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Request semester fee verification online and generate downloadable, official PDF receipts stamped with security tokens.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-left space-y-4 hover:shadow-xl transition-all">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Admin Oversight Suite</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Manage routes, buses, daily departure times, student subscriptions, audit logs, and broadcast urgent notifications seamlessly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20 bg-slate-50 dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3">How Uzair Transport Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
              {[
                { step: '01', title: 'Google Sign-In', desc: 'Students authenticate with their university Google account.' },
                { step: '02', title: 'Select Route', desc: 'Choose from active transport routes and view semester fees.' },
                { step: '03', title: 'Fee Verification', desc: 'Request receipt approval from the transport administration.' },
                { step: '04', title: 'Board Bus', desc: 'Show your digital QR pass to the bus conductor upon entry.' },
              ].map((s, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left">
                  <span className="text-2xl font-black text-sky-500 font-mono">{s.step}</span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mt-2 mb-1">{s.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
