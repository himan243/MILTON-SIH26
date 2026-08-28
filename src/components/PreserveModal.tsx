'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { BookOpen, X, Sparkles, CheckCircle2 } from 'lucide-react';

export const PreserveModal: React.FC = () => {
  const { isPreserveModalOpen, setIsPreserveModalOpen, submitCommunityMemory, t, triggerConfetti } = useApp();
  const [type, setType] = useState<'game' | 'craft' | 'food' | 'build' | 'correction'>('game');
  const [title, setTitle] = useState('');
  const [region, setRegion] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isPreserveModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    submitCommunityMemory({
      type,
      title,
      region: region.trim() || 'Northeast India',
      description,
      submitterContact: contact.trim() || undefined
    });

    setIsSuccess(true);
    triggerConfetti();
    setTimeout(() => {
      setIsSuccess(false);
      setIsPreserveModalOpen(false);
      setTitle('');
      setRegion('');
      setDescription('');
      setContact('');
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-xl card-retro bg-[#faf8f5] border-[2.5px] border-[#0c0f14] shadow-retro-xl overflow-hidden animate-in zoom-in-95 duration-150 relative">
        
        {/* Pushpin at top-right */}
        <div className="pushpin-red" />

        {/* Modal Header */}
        <div className="p-5 bg-[#f4eee3] border-b-2 border-[#0c0f14] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl border-2 border-black bg-[#ef4444] text-white flex items-center justify-center shadow-retro-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-[#0c0f14] tracking-wide">{t.helpPreserve}</h3>
              <p className="font-hand text-sm font-bold text-zinc-600">Contribute to the Living Archival Record</p>
            </div>
          </div>
          <button
            onClick={() => setIsPreserveModalOpen(false)}
            className="w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center hover:bg-[#fed7aa] transition-colors shadow-retro-sm mr-6"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-[#0c0f14]" />
          </button>
        </div>

        {/* Modal Body */}
        {isSuccess ? (
          <div className="p-8 sm:p-10 text-center space-y-4 bg-creased-paper">
            <div className="w-16 h-16 bg-[#bbf7d0] border-2 border-black text-[#0c0f14] rounded-2xl flex items-center justify-center mx-auto shadow-retro">
              <CheckCircle2 className="w-9 h-9 text-[#059669]" />
            </div>
            <div className="rubber-stamp rubber-stamp-green text-sm">ARCHIVED RECORD SUBMITTED</div>
            <h4 className="font-display text-3xl font-bold text-[#0c0f14]">CULTURAL MEMORY SAVED!</h4>
            <p className="font-hand text-lg text-zinc-700 font-bold max-w-md mx-auto leading-relaxed">
              Thank you for keeping our heritage alive! Your entry has been recorded in the Living Museum review ledger.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#fef08a] border-2 border-black rounded-xl text-xs font-display tracking-wider shadow-retro-sm">
              <Sparkles className="w-4 h-4 text-[#d97706]" /> +120 HERITAGE XP AWARDED!
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-creased-paper">
            <p className="font-hand text-base text-zinc-800 font-bold leading-tight">
              {t.helpPreserveSub}
            </p>

            {/* Category Selector */}
            <div>
              <label className="block font-display text-xs uppercase tracking-wider text-[#0c0f14] mb-1.5 font-bold">
                Category
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                {(['game', 'craft', 'food', 'build', 'correction'] as const).map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => setType(cat)}
                    className={`py-2 px-2 rounded-xl text-xs font-display uppercase tracking-wider border-2 transition-all ${
                      type === cat
                        ? 'bg-[#0c0f14] text-[#fef08a] border-black shadow-retro-sm'
                        : 'bg-white text-[#0c0f14] border-black hover:bg-[#fed7aa]'
                    }`}
                  >
                    {cat === 'build' ? 'Nostalgic Toy' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Title / Name */}
            <div>
              <label className="block font-display text-xs uppercase tracking-wider text-[#0c0f14] mb-1 font-bold">
                Title / Vernacular Name *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Insuknawti, Thekera Fish Stew, Bamboo Flute..."
                className="w-full px-3.5 py-2 rounded-xl bg-white border-2 border-black text-sm font-bold text-[#0c0f14] placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-black shadow-retro-sm"
              />
            </div>

            {/* Region / Tribe / State */}
            <div>
              <label className="block font-display text-xs uppercase tracking-wider text-[#0c0f14] mb-1 font-bold">
                Region / State / Community Origin
              </label>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="e.g. Majuli Island, Assam / Aizawl, Mizoram..."
                className="w-full px-3.5 py-2 rounded-xl bg-white border-2 border-black text-sm font-bold text-[#0c0f14] placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-black shadow-retro-sm"
              />
            </div>

            {/* Description / Story / Rules */}
            <div>
              <label className="block font-display text-xs uppercase tracking-wider text-[#0c0f14] mb-1 font-bold">
                Story, Rules, or Crafting Steps *
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe how it was played, crafted, or prepared, and any memories associated with it..."
                className="w-full px-3.5 py-2 rounded-xl bg-white border-2 border-black text-sm font-bold text-[#0c0f14] placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-black shadow-retro-sm"
              />
            </div>

            {/* Submitter Contact */}
            <div>
              <label className="block font-display text-xs uppercase tracking-wider text-[#0c0f14] mb-1 font-bold">
                Your Name or Contact (Optional)
              </label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="For attribution credit in our Living Museum records"
                className="w-full px-3.5 py-2 rounded-xl bg-white border-2 border-black text-sm font-bold text-[#0c0f14] placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-black shadow-retro-sm"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t-2 border-dashed border-black/30">
              <button
                type="button"
                onClick={() => setIsPreserveModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-display uppercase tracking-wider text-zinc-700 hover:bg-zinc-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-retro px-5 py-2.5 bg-[#ef4444] hover:bg-[#dc2626] text-white font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-retro"
              >
                SUBMIT FOR ARCHIVAL REVIEW
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
