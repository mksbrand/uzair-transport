'use client';

import React from 'react';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { Card } from '@/components/ui/card';
import { HelpCircle, Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

export default function StudentHelpPage() {
  const faqs = [
    {
      q: 'How do I obtain my official Digital Transport Pass?',
      a: 'Select your bus route in the Routes section, submit your fee receipt request, and once approved by the Transport Admin, your Digital Pass with active QR code will instantly appear on your portal.',
    },
    {
      q: 'What should I do if my bus is delayed?',
      a: 'All bus schedule changes or unexpected delays are broadcasted live under your Notifications tab and Today’s Shuttle Schedule section.',
    },
    {
      q: 'Can I change my assigned bus route mid-semester?',
      a: 'Yes! Navigate to your Profile or Routes tab and select your new preferred route. If fee differences apply, visit the Transport Office.',
    },
    {
      q: 'How does the conductor verify my digital pass?',
      a: 'The conductor scans the encrypted QR code on your Digital Pass screen using the Uzair Verification App or scans the verification code printed on your PDF receipt.',
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Breadcrumb />

      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          Help & Support Center
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Frequently asked questions, transport guidelines, and helpline contact details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-600 mx-auto flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white">Email Support</h3>
          <p className="text-xs text-slate-500">transport@uzair.edu.pk</p>
        </Card>

        <Card className="p-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 mx-auto flex items-center justify-center">
            <Phone className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white">Campus Helpline</h3>
          <p className="text-xs text-slate-500">+92 42 111 UZAIR (89247)</p>
        </Card>

        <Card className="p-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 mx-auto flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white">Terminal Office</h3>
          <p className="text-xs text-slate-500">Transport Hub, Building B</p>
        </Card>
      </div>

      <div className="space-y-4 pt-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Frequently Asked Questions (FAQ)
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Card key={i} className="p-6 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-sky-500" />
                {faq.q}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-6">
                {faq.a}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
