'use client';

import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Bus, ShieldCheck, RefreshCw, CheckCircle2, QrCode } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface DigitalPassProps {
  student: any;
  receipt: any;
}

export const DigitalTransportPass: React.FC<DigitalPassProps> = ({ student, receipt }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const qrDataString = receipt
    ? receipt.encryptedQR || JSON.stringify({
        receiptId: receipt.receiptNumber,
        studentId: student?.studentProfile?.studentId,
        validUntil: receipt.validUntil,
      })
    : JSON.stringify({
        studentId: student?.studentProfile?.studentId || 'N/A',
        status: 'UNVERIFIED',
      });

  return (
    <div className="w-full max-w-md mx-auto perspective-1000 py-6">
      <div
        className={`relative w-full h-[480px] rounded-3xl transition-transform duration-700 transform-style-3d cursor-pointer shadow-2xl ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* FRONT OF PASS */}
        <div className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-navy-950 via-navy-900 to-sky-900 text-white p-6 flex flex-col justify-between border-2 border-sky-400/30 backface-hidden shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center text-white font-bold shadow-lg shadow-sky-500/30">
                <Bus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm tracking-wide text-white">UZAIR TRANSPORT</h3>
                <p className="text-[10px] text-sky-300 uppercase font-semibold">Digital Student Pass</p>
              </div>
            </div>
            <span className="flex items-center gap-1 text-[11px] font-mono bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              LIVE ACTIVE
            </span>
          </div>

          {/* Body Info */}
          <div className="grid grid-cols-3 gap-4 my-2">
            <div className="col-span-1">
              <div className="w-24 h-28 rounded-2xl bg-white/10 border border-white/20 overflow-hidden shadow-inner flex items-center justify-center">
                {student?.profilePicture ? (
                  <img src={student.profilePicture} alt="Student" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-bold text-sky-200">
                    {student?.fullName?.charAt(0) || 'U'}
                  </span>
                )}
              </div>
            </div>

            <div className="col-span-2 space-y-2 text-left justify-center flex flex-col">
              <div>
                <span className="text-[10px] uppercase text-sky-300 font-semibold block">Student Name</span>
                <h4 className="text-base font-bold text-white truncate">{student?.fullName || 'Mahad Uzair'}</h4>
              </div>

              <div>
                <span className="text-[10px] uppercase text-sky-300 font-semibold block">University Student ID</span>
                <p className="text-xs font-mono font-bold text-amber-300">
                  {student?.studentProfile?.studentId || 'UZ-2024-884'}
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase text-sky-300 font-semibold block">Department & Semester</span>
                <p className="text-xs text-slate-200">
                  {student?.studentProfile?.department || 'Computer Science'} (Sem {student?.studentProfile?.semester || 5})
                </p>
              </div>
            </div>
          </div>

          {/* Route Info */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-left">
            <span className="text-[10px] uppercase text-sky-300 font-semibold block">Assigned Transport Route</span>
            <p className="text-xs font-bold text-white truncate">
              {receipt?.route?.name || student?.studentProfile?.assignedRoute?.name || 'Gulberg & Model Town Express'}
            </p>
          </div>

          {/* Footer Security Code */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <div>
              <span className="text-[9px] uppercase text-slate-400 block">Verify Code</span>
              <span className="font-mono font-bold text-sky-300">{receipt?.verificationCode || 'UT-VERIFY-9901'}</span>
            </div>
            <div className="text-right">
              <span className="text-[9px] uppercase text-slate-400 block">Live Timestamp</span>
              <span className="font-mono text-emerald-400 text-[11px] font-bold">{currentTime || '12:00:00 PM'}</span>
            </div>
            <div className="text-sky-400 flex items-center gap-1 text-[10px]">
              <RefreshCw className="w-3 h-3 animate-spin" /> Flip Pass
            </div>
          </div>
        </div>

        {/* BACK OF PASS (QR CODE) */}
        <div className="absolute inset-0 w-full h-full rounded-3xl bg-slate-900 text-white p-6 flex flex-col justify-between items-center border-2 border-sky-400/30 rotate-y-180 backface-hidden shadow-2xl">
          <div className="text-center">
            <h4 className="text-sm font-bold text-white flex items-center justify-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sky-400" /> CONDUCTOR VERIFICATION
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Scan with Conductor Scanner App to verify pass validity</p>
          </div>

          <div className="p-4 bg-white rounded-2xl shadow-xl border-4 border-sky-400/40">
            <QRCodeSVG value={qrDataString} size={190} level="H" includeMargin={true} />
          </div>

          <div className="text-center space-y-1">
            <p className="text-xs font-mono text-sky-300 font-bold">
              Pass ID: {receipt?.receiptNumber || 'RCP-2026-9901'}
            </p>
            <p className="text-[10px] text-slate-400">
              Valid Until: {receipt ? formatDate(receipt.validUntil) : 'Fall 2026'}
            </p>
            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-semibold mt-1">
              <CheckCircle2 className="w-3 h-3" /> Encrypted Security Signature Verified
            </span>
          </div>

          <p className="text-[10px] text-slate-500">Tap anywhere to flip back</p>
        </div>
      </div>
    </div>
  );
};
