'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { BookOpen, X, Sparkles, CheckCircle2 } from 'lucide-react';

export const PreserveModal: React.FC = () => {
  const { isPreserveModalOpen, setIsPreserveModalOpen, submitCommunityMemory, t } = useApp();
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
    setTimeout(() => {
      setIsSuccess(false);
      setIsPreserveModalOpen(false);
      setTitle('');
      setRegion('');
      setDescription('');
      setContact('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#061b0e]/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#fcf9f3] rounded-3xl border border-[#c3c8c1] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-6 bg-[#1b3022] text-[#fcf9f3] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#fbbb51] text-[#1b3022] flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-[#fcf9f3]">{t.helpPreserve}</h3>
              <p className="text-[11px] text-[#b4cdb8]">Contribute to the Living Archival Record</p>
            </div>
          </div>
          <button
            onClick={() => setIsPreserveModalOpen(false)}
            className="p-1.5 rounded-full text-[#b4cdb8] hover:text-[#fcf9f3] hover:bg-[#364c3c]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {isSuccess ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 bg-[#d0e9d4] text-[#1b3022] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="font-display text-2xl font-bold text-[#061b0e]">Cultural Memory Submitted!</h4>
            <p className="text-sm text-[#434843] max-w-md mx-auto">
              Thank you for keeping our heritage alive. Your submission has been queued for human curator verification before archival release.
            </p>
            <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#fbbb51]/20 text-[#281800] rounded-full text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#c08820]" /> +120 Heritage XP Awarded!
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <p className="text-xs text-[#434843] leading-relaxed">
              {t.helpPreserveSub}
            </p>

            {/* Category Selector */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#737973] mb-1.5">
                Category
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                {(['game', 'craft', 'food', 'build', 'correction'] as const).map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => setType(cat)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold capitalize transition-colors ${
                      type === cat
                        ? 'bg-[#1b3022] text-[#fcf9f3]'
                        : 'bg-[#f0eee8] text-[#434843] hover:bg-[#ebe8e2]'
                    }`}
                  >
                    {cat === 'build' ? 'Nostalgic Toy' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Title / Name */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#737973] mb-1.5">
                Title / Vernacular Name *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Insuknawti, Thekera Fish Stew, Bamboo Flute..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#ffffff] border border-[#c3c8c1] text-sm text-[#061b0e] focus:border-[#974730] outline-none"
              />
            </div>

            {/* Region / Tribe / State */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#737973] mb-1.5">
                Region / State / Community Origin
              </label>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="e.g. Majuli Island, Assam / Aizawl, Mizoram..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#ffffff] border border-[#c3c8c1] text-sm text-[#061b0e] focus:border-[#974730] outline-none"
              />
            </div>

            {/* Description / Story / Rules */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#737973] mb-1.5">
                Story, Rules, or Crafting Steps *
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe how it was played, crafted, or prepared, including any memories or traditions associated with it..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#ffffff] border border-[#c3c8c1] text-sm text-[#061b0e] focus:border-[#974730] outline-none"
              />
            </div>

            {/* Submitter Contact */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#737973] mb-1.5">
                Your Contact / Attribution Note (Optional)
              </label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Name or email for credit in our archival records"
                className="w-full px-4 py-2.5 rounded-xl bg-[#ffffff] border border-[#c3c8c1] text-sm text-[#061b0e] focus:border-[#974730] outline-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsPreserveModalOpen(false)}
                className="px-5 py-2.5 rounded-full text-xs font-bold uppercase text-[#434843] hover:bg-[#ebe8e2]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#974730] hover:bg-[#772f1a] text-[#fcf9f3] text-xs font-bold uppercase tracking-wider rounded-full shadow-md transition-transform hover:-translate-y-0.5"
              >
                Submit for Archival Review
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
