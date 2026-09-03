'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Sparkles, Heart, Shield, BookOpen, Compass, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, setIsPreserveModalOpen } = useApp();

  return (
    <footer className="lg:pl-[290px] bg-[#faf8f5] border-t-2 border-[#0c0f14] relative overflow-hidden transition-all">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top Callout: Preserve What We Forgot — Styled as a Kraft Paper Postcard with Pushpin */}
        <div className="card-retro bg-[#f4eee3] p-6 sm:p-10 mb-14 relative border-[2.5px] border-[#0c0f14] shadow-retro-lg">
          {/* Pushpin at top right */}
          <div className="pushpin-red" />
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#fef08a] border border-black rounded-full text-xs font-display tracking-wider uppercase shadow-retro-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#d97706]" /> {t.helpPreserve}
              </div>
              <h3 className="font-display text-2xl sm:text-4xl font-bold text-[#0c0f14] tracking-tight">
                Know a forgotten game, family recipe, or local craft?
              </h3>
              <p className="font-hand text-base sm:text-lg text-zinc-700 font-bold leading-relaxed">
                Every village elder holds wisdom that risks fading away. Submit your childhood memory or local craft to our verified Living Museum archive.
              </p>
            </div>

            <button
              onClick={() => setIsPreserveModalOpen(true)}
              className="btn-retro px-6 py-3.5 bg-[#ef4444] hover:bg-[#dc2626] text-white font-display text-sm font-black uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-retro whitespace-nowrap"
            >
              <BookOpen className="w-4 h-4" /> {t.submitMemory}
            </button>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b-2 border-dashed border-black/30">
          
          {/* Brand Philosophy */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="retro-3d-text text-3xl font-display font-black tracking-tight">
                NOSTALGIC
              </span>
              <span className="font-display text-xl font-black text-[#1c1917] tracking-wider">
                HUB
              </span>
            </div>
            <p className="font-display text-xs uppercase tracking-widest text-[#c2410c] font-bold">
              Northeast India Cultural Living Museum & Revival Platform
            </p>
            <p className="text-xs text-zinc-700 leading-relaxed max-w-md font-medium">
              A digital haven dedicated to rediscovering, preserving, creating, and experiencing the timeless games, bamboo crafts, indigenous recipes, and memories of Northeast India.
            </p>
            <div className="flex items-center gap-2 pt-2 text-zinc-900 font-display text-xs">
              <Compass className="w-4 h-4 text-[#ef4444]" />
              <span>Assam • Meghalaya • Nagaland • Manipur • Mizoram • Arunachal • Tripura • Sikkim</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-2 sm:col-span-4 space-y-2">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[#0c0f14]">Explore</h4>
            <div className="flex flex-col space-y-1 text-xs font-bold text-zinc-700">
              <Link href="/" className="hover:text-[#ef4444] transition-colors">Living Museum</Link>
              <Link href="/games" className="hover:text-[#ef4444] transition-colors">Forgotten Games</Link>
              <Link href="/create-with-ai" className="hover:text-[#ef4444] transition-colors">Create with AI</Link>
              <Link href="/crafts" className="hover:text-[#ef4444] transition-colors">Bamboo & Crafts</Link>
              <Link href="/food-stories" className="hover:text-[#ef4444] transition-colors">Food Stories</Link>
            </div>
          </div>

          {/* Community & Artisans */}
          <div className="md:col-span-2 sm:col-span-4 space-y-2">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[#0c0f14]">Connect</h4>
            <div className="flex flex-col space-y-1 text-xs font-bold text-zinc-700">
              <Link href="/community" className="hover:text-[#ef4444] transition-colors">Nearby Players</Link>
              <Link href="/marketplace" className="hover:text-[#ef4444] transition-colors">Verified Marketplace</Link>
              <Link href="/challenges" className="hover:text-[#ef4444] transition-colors">Cultural Quests</Link>
              <Link href="/artisan-dashboard" className="hover:text-[#ef4444] transition-colors">Artisan Portal</Link>
              <Link href="/profile" className="hover:text-[#ef4444] transition-colors">Nostalgia Passport</Link>
            </div>
          </div>

          {/* Preservation & Trust */}
          <div className="md:col-span-3 sm:col-span-4 space-y-2">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[#0c0f14]">Preservation Trust</h4>
            <div className="text-xs text-zinc-700 flex items-start gap-2 leading-relaxed font-medium">
              <Shield className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
              <span>All cultural submissions & artisan listings undergo human curator verification before archival release.</span>
            </div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-xs font-display tracking-wider text-[#ef4444] hover:underline pt-2"
            >
              <span>CURATOR ADMIN ACCESS</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-zinc-600">
          <p>© 2026 Nostalgic Hub. Preserving memories with reverence and open innovation.</p>
          <div className="flex items-center gap-2">
            <span>Built with love for Northeast India</span>
            <Heart className="w-4 h-4 text-[#ef4444] fill-current" />
          </div>
        </div>
      </div>
    </footer>
  );
};
