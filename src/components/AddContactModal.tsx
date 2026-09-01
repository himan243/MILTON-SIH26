'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { UserPlus, ShieldCheck, Phone, Mail, User, HeartHandshake } from 'lucide-react';

export const AddContactModal: React.FC = () => {
  const { isAddContactModalOpen, setIsAddContactModalOpen, addNewContact } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [email, setEmail] = useState('');
  const [relationship, setRelationship] = useState('Parent/Guardian');
  const [safetyTier, setSafetyTier] = useState<'family' | 'verified_peer' | 'trusted'>('family');

  if (!isAddContactModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    addNewContact({
      name,
      phone,
      email: email || undefined,
      relationship,
      isVerified: true,
      safetyTier,
      avatarUrl: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 1000000)}?auto=format&fit=crop&w=120&q=80`
    });

    setName('');
    setPhone('+91 ');
    setEmail('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-md card-retro bg-[#faf8f5] border-[2.5px] border-[#0c0f14] shadow-retro-xl p-6 sm:p-8 space-y-4 relative">
        <div className="pushpin-red" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-black/20 pr-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-display uppercase tracking-wider text-[#ef4444] font-bold">
              <ShieldCheck className="w-4 h-4 text-[#059669]" /> SAFE MEET CIRCLE
            </div>
            <h3 className="font-display text-2xl font-bold text-[#0c0f14]">
              ADD TRUSTED CONTACT
            </h3>
          </div>
          <button
            onClick={() => setIsAddContactModalOpen(false)}
            className="w-7 h-7 rounded-full border border-black bg-white flex items-center justify-center text-xs font-bold hover:bg-zinc-100"
          >
            ✕
          </button>
        </div>

        <p className="font-hand text-xs font-bold text-zinc-600">
          Saved contacts can coordinate, host, and invite children to verified neighborhood game sessions safely.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block font-display text-[11px] uppercase tracking-wider text-zinc-700 mb-1 font-bold">
              Contact Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Diganta Hazarika (Uncle)"
                className="w-full pl-9 pr-3 py-2 bg-white border-2 border-black rounded-xl text-xs font-bold text-[#0c0f14] outline-none shadow-retro-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-display text-[11px] uppercase tracking-wider text-zinc-700 mb-1 font-bold">
                Relationship
              </label>
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full px-2.5 py-2 bg-white border-2 border-black rounded-xl text-xs font-bold text-[#0c0f14] outline-none shadow-retro-sm"
              >
                <option value="Parent/Guardian">Parent/Guardian</option>
                <option value="Schoolmate">Schoolmate</option>
                <option value="Neighbor">Neighbor</option>
                <option value="Cousin">Cousin</option>
                <option value="Family Friend">Family Friend</option>
                <option value="Coach / Teacher">Coach / Teacher</option>
              </select>
            </div>
            <div>
              <label className="block font-display text-[11px] uppercase tracking-wider text-zinc-700 mb-1 font-bold">
                Safety Tier
              </label>
              <select
                value={safetyTier}
                onChange={(e) => setSafetyTier(e.target.value as any)}
                className="w-full px-2.5 py-2 bg-white border-2 border-black rounded-xl text-xs font-bold text-[#0c0f14] outline-none shadow-retro-sm"
              >
                <option value="family">Family (Highest Trust)</option>
                <option value="verified_peer">Verified Peer</option>
                <option value="trusted">Trusted Friend</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-display text-[11px] uppercase tracking-wider text-zinc-700 mb-1 font-bold">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98640 11234"
                className="w-full pl-9 pr-3 py-2 bg-white border-2 border-black rounded-xl text-xs font-bold text-[#0c0f14] outline-none shadow-retro-sm"
              />
            </div>
          </div>

          <div>
            <label className="block font-display text-[11px] uppercase tracking-wider text-zinc-700 mb-1 font-bold">
              Email Address (Optional)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@family.in"
                className="w-full pl-9 pr-3 py-2 bg-white border-2 border-black rounded-xl text-xs font-bold text-[#0c0f14] outline-none shadow-retro-sm"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsAddContactModalOpen(false)}
              className="px-4 py-2 text-xs font-display uppercase tracking-wider text-zinc-700 hover:bg-zinc-200 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-retro px-5 py-2 bg-[#0c0f14] hover:bg-zinc-800 text-[#fef08a] font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-retro flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" /> SAVE TRUSTED CONTACT
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
