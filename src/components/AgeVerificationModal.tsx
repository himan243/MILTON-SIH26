'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Shield, ShieldAlert, CheckCircle2, UserCheck, Lock, AlertTriangle, Calendar } from 'lucide-react';

export const AgeVerificationModal: React.FC = () => {
  const { isAgeVerifyModalOpen, setIsAgeVerifyModalOpen, verifyAge, triggerConfetti } = useApp();
  const [method, setMethod] = useState<'declaration' | 'gov_id' | 'guardian'>('declaration');
  const [ageInput, setAgeInput] = useState(21);
  const [govIdLast4, setGovIdLast4] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [declaredConsent, setDeclaredConsent] = useState(false);

  if (!isAgeVerifyModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (method === 'declaration' && !declaredConsent) {
      alert('Please confirm the legal declaration checkbox.');
      return;
    }

    const verificationMethodLabel =
      method === 'gov_id'
        ? `Govt ID (Ending in ${govIdLast4 || 'XXXX'})`
        : method === 'guardian'
        ? `Parental Consent (${guardianName || 'Guardian'})`
        : 'Official Self-Declaration (18+)';

    verifyAge(ageInput, verificationMethodLabel);
    triggerConfetti();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-lg card-retro bg-[#faf8f5] border-[2.5px] border-[#0c0f14] shadow-retro-xl p-6 sm:p-8 space-y-5 relative">
        <div className="pushpin-red" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-black/20 pr-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-display uppercase tracking-wider text-[#ef4444] font-bold">
              <Shield className="w-4 h-4" /> CHILD SAFETY & COMMUNITY PROTOCOL
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0c0f14]">
              AGE VERIFICATION REQUIRED
            </h3>
          </div>
          <button
            onClick={() => setIsAgeVerifyModalOpen(false)}
            className="w-7 h-7 rounded-full border border-black bg-white flex items-center justify-center text-xs font-bold hover:bg-zinc-100"
          >
            ✕
          </button>
        </div>

        {/* Safety Context Notice */}
        <div className="p-3.5 bg-[#fef08a] border-2 border-black rounded-xl text-xs space-y-1 shadow-retro-sm">
          <div className="flex items-center gap-1.5 font-display text-xs font-bold uppercase text-[#0c0f14]">
            <AlertTriangle className="w-4 h-4 text-[#ef4444]" /> Why is this required?
          </div>
          <p className="font-hand text-xs font-bold text-zinc-800 leading-snug">
            To safeguard minors and children, Nostalgic Hub restricts game meets to <strong>Saved Contacts Only</strong> by default. Participating in <strong>Open Stranger Matches</strong> requires age verification (18+) or verified guardian consent.
          </p>
        </div>

        {/* Method Switcher */}
        <div className="flex flex-wrap gap-2 p-1 bg-[#f4eee3] rounded-xl border-2 border-black">
          <button
            type="button"
            onClick={() => setMethod('declaration')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-display font-bold uppercase transition-all ${
              method === 'declaration' ? 'bg-[#0c0f14] text-[#fef08a] shadow-retro-sm' : 'text-zinc-700'
            }`}
          >
            18+ Declaration
          </button>
          <button
            type="button"
            onClick={() => setMethod('gov_id')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-display font-bold uppercase transition-all ${
              method === 'gov_id' ? 'bg-[#0c0f14] text-[#fef08a] shadow-retro-sm' : 'text-zinc-700'
            }`}
          >
            Gov ID / Aadhaar
          </button>
          <button
            type="button"
            onClick={() => setMethod('guardian')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-display font-bold uppercase transition-all ${
              method === 'guardian' ? 'bg-[#0c0f14] text-[#fef08a] shadow-retro-sm' : 'text-zinc-700'
            }`}
          >
            Guardian Consent
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-display text-xs uppercase tracking-wider text-zinc-700 mb-1 font-bold">
              Your Current Age
            </label>
            <input
              type="number"
              min={6}
              max={100}
              required
              value={ageInput}
              onChange={(e) => setAgeInput(parseInt(e.target.value) || 18)}
              className="w-full px-3 py-2 bg-white border-2 border-black rounded-xl text-sm font-bold text-[#0c0f14] outline-none shadow-retro-sm"
            />
          </div>

          {method === 'gov_id' && (
            <div>
              <label className="block font-display text-xs uppercase tracking-wider text-zinc-700 mb-1 font-bold">
                Aadhaar / Voter ID / Passport (Last 4 Digits)
              </label>
              <input
                type="text"
                maxLength={4}
                required
                value={govIdLast4}
                onChange={(e) => setGovIdLast4(e.target.value)}
                placeholder="e.g. 7894"
                className="w-full px-3 py-2 bg-white border-2 border-black rounded-xl text-sm font-bold text-[#0c0f14] outline-none shadow-retro-sm"
              />
              <p className="font-hand text-xs text-zinc-500 font-bold mt-1">
                *We never store full government IDs. Only verification hash status is preserved.
              </p>
            </div>
          )}

          {method === 'guardian' && (
            <div>
              <label className="block font-display text-xs uppercase tracking-wider text-zinc-700 mb-1 font-bold">
                Parent / Guardian Full Name & Contact
              </label>
              <input
                type="text"
                required
                value={guardianName}
                onChange={(e) => setGuardianName(e.target.value)}
                placeholder="e.g. Diganta Hazarika (+91 98640 11234)"
                className="w-full px-3 py-2 bg-white border-2 border-black rounded-xl text-xs font-bold text-[#0c0f14] outline-none shadow-retro-sm"
              />
            </div>
          )}

          {method === 'declaration' && (
            <div className="p-3 bg-white rounded-xl border-2 border-black space-y-2 shadow-retro-sm">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={declaredConsent}
                  onChange={(e) => setDeclaredConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-2 border-black accent-[#0c0f14]"
                />
                <span className="font-hand text-xs font-bold text-zinc-800 leading-snug">
                  I solemnly declare that I am 18 years of age or older, and I accept full responsibility for coordinating and attending open public community matches.
                </span>
              </label>
            </div>
          )}

          <div className="pt-2 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsAgeVerifyModalOpen(false)}
              className="px-4 py-2 text-xs font-display uppercase tracking-wider text-zinc-700 hover:bg-zinc-200 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-retro px-5 py-2.5 bg-[#ef4444] hover:bg-[#dc2626] text-white font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-retro flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" /> VERIFY & UNLOCK STRANGER MEETS
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
