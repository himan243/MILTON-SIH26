'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Sparkles, Heart, Shield, BookOpen, Compass, Mail, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, setIsPreserveModalOpen } = useApp();

  return (
    <footer className="bg-[#1b3022] text-[#fcf9f3] pt-20 pb-12 border-t border-[#364c3c] relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#819986]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#fe997c]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Callout: Preserve What We Forgot */}
        <div className="bg-[#061b0e]/60 border border-[#364c3c] rounded-3xl p-8 sm:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#fbbb51] flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#fbbb51]" /> {t.helpPreserve}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#fcf9f3] mb-3">
              Know a forgotten game, family recipe, or local craft?
            </h3>
            <p className="text-sm text-[#b4cdb8] leading-relaxed">
              Every village elder holds wisdom that risks fading away. Submit your childhood memory or local craft to our verified Living Museum archive.
            </p>
          </div>
          <button
            onClick={() => setIsPreserveModalOpen(true)}
            className="whitespace-nowrap px-8 py-4 bg-[#974730] text-[#fcf9f3] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#772f1a] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" /> {t.submitMemory}
          </button>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-[#364c3c]/60">
          
          {/* Brand Philosophy */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#fbbb51] text-[#1b3022] flex items-center justify-center font-display font-bold text-lg">
                N
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-[#fcf9f3]">
                Nostalgic Hub
              </span>
            </div>
            <p className="text-xs uppercase tracking-widest text-[#fbbb51] font-semibold">
              Northeast India Cultural Living Museum & Revival Platform
            </p>
            <p className="text-xs text-[#b4cdb8] leading-relaxed max-w-md">
              A digital haven dedicated to rediscovering, preserving, creating, and experiencing the timeless games, bamboo crafts, indigenous recipes, and memories of Northeast India.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[#fbbb51] text-xs">
              <Compass className="w-4 h-4" />
              <span>Assam • Meghalaya • Nagaland • Manipur • Mizoram • Arunachal • Tripura • Sikkim</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-2 sm:col-span-4 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#fbbb51]">Explore</h4>
            <Link href="/" className="text-xs text-[#b4cdb8] hover:text-[#fcf9f3] transition-colors">Living Museum</Link>
            <Link href="/games" className="text-xs text-[#b4cdb8] hover:text-[#fcf9f3] transition-colors">Forgotten Games</Link>
            <Link href="/create-with-ai" className="text-xs text-[#b4cdb8] hover:text-[#fcf9f3] transition-colors">Create with AI</Link>
            <Link href="/crafts" className="text-xs text-[#b4cdb8] hover:text-[#fcf9f3] transition-colors">Bamboo & Crafts</Link>
            <Link href="/food-stories" className="text-xs text-[#b4cdb8] hover:text-[#fcf9f3] transition-colors">Food Stories</Link>
          </div>

          {/* Community & Artisans */}
          <div className="md:col-span-2 sm:col-span-4 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#fbbb51]">Connect</h4>
            <Link href="/community" className="text-xs text-[#b4cdb8] hover:text-[#fcf9f3] transition-colors">Nearby Players</Link>
            <Link href="/marketplace" className="text-xs text-[#b4cdb8] hover:text-[#fcf9f3] transition-colors">Verified Marketplace</Link>
            <Link href="/challenges" className="text-xs text-[#b4cdb8] hover:text-[#fcf9f3] transition-colors">Cultural Quests</Link>
            <Link href="/artisan-dashboard" className="text-xs text-[#b4cdb8] hover:text-[#fcf9f3] transition-colors">Artisan Portal</Link>
            <Link href="/profile" className="text-xs text-[#b4cdb8] hover:text-[#fcf9f3] transition-colors">Your Journey</Link>
          </div>

          {/* Preservation & Trust */}
          <div className="md:col-span-3 sm:col-span-4 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#fbbb51]">Preservation Trust</h4>
            <div className="text-xs text-[#b4cdb8] flex items-start gap-2 leading-relaxed">
              <Shield className="w-4 h-4 text-[#819986] shrink-0 mt-0.5" />
              <span>All cultural submissions & artisan listings undergo human curator verification before archival release.</span>
            </div>
            <Link href="/admin" className="text-xs text-[#fbbb51] hover:underline pt-2 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> Curator Administrative Access
            </Link>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#819986]">
          <p>© 2026 Nostalgic Hub. Preserving memories with reverence and open innovation.</p>
          <div className="flex items-center gap-2">
            <span>Built with care for Northeast India</span>
            <Heart className="w-3.5 h-3.5 text-[#fe997c] fill-current" />
          </div>
        </div>
      </div>
    </footer>
  );
};
