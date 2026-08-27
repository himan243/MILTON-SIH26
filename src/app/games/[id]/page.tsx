'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Gamepad2,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Users,
  Trophy,
  Package,
  Calendar,
  Sparkles,
  ArrowLeft,
  Share2,
  ShieldAlert
} from 'lucide-react';

export default function GameDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { games, products, user, toggleSaveGame, addXP, createSession, t } = useApp();
  
  const game = games.find((g) => g.id === resolvedParams.id);
  if (!game) return notFound();

  // 4-Tier Progression State
  const [completedTiers, setCompletedTiers] = useState<string[]>(['Beginner']);
  const [isHostingModalOpen, setIsHostingModalOpen] = useState(false);
  const [sessionLocality, setSessionLocality] = useState('Guwahati Central Park');
  const [sessionDate, setSessionDate] = useState('Tomorrow, 5:00 PM');
  const [sessionNotes, setSessionNotes] = useState('Bringing equipment! All skill levels welcome.');

  const progressionTiers = [
    { level: 'Beginner', xp: 50, desc: 'Read game history and understand foundational rules.', perk: 'Unlocks Rules Badge' },
    { level: 'Explorer', xp: 100, desc: 'Practice 1 physical round or test toss with friends.', perk: 'Unlocks Match Host Role' },
    { level: 'Skilled', xp: 200, desc: 'Participate in 3 community games or tournament sessions.', perk: 'Unlocks Regional Leaderboard' },
    { level: 'Master', xp: 400, desc: 'Teach the game to next-gen players and log archival tips.', perk: 'Heritage Master Title' }
  ];

  const handleClaimTier = (tierName: string, xp: number) => {
    if (!completedTiers.includes(tierName)) {
      setCompletedTiers((prev) => [...prev, tierName]);
      addXP(xp, `Achieved ${tierName} rank in ${game.name}`);
    }
  };

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    createSession({
      gameId: game.id,
      gameTitle: game.name,
      locality: sessionLocality,
      state: game.region.split('&')[0].trim() || 'Northeast India',
      date: sessionDate,
      time: '5:00 PM - 6:30 PM',
      privacyMode: 'approximate',
      maxPlayers: 8,
      notes: sessionNotes
    });
    setIsHostingModalOpen(false);
  };

  const relatedProducts = products.filter(
    (p) => game.relatedMarketplaceItemIds && game.relatedMarketplaceItemIds.includes(p.id)
  );

  return (
    <div className="min-h-screen bg-[#fcf9f3] py-10 sm:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          href="/games"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#434843] hover:text-[#061b0e] mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Folk Games</span>
        </Link>

        {/* Hero Banner Card */}
        <div className="bg-[#f0eee8] rounded-3xl border border-[#c3c8c1] overflow-hidden shadow-xl mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-[#1b3022] text-[#fcf9f3] text-[11px] font-bold uppercase rounded-full">
                {game.historicalEra}
              </span>
              <span className="px-3 py-1 bg-[#fe997c]/30 text-[#772f1a] text-[11px] font-bold uppercase rounded-full">
                {game.region}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#061b0e] leading-tight">
              {game.name}
            </h1>

            {/* Vernacular Names */}
            <div className="p-3 bg-[#ffffff]/80 rounded-2xl border border-[#c3c8c1]/40 flex flex-wrap gap-x-4 gap-y-1 text-xs">
              <span className="font-bold text-[#737973] uppercase text-[10px]">Known locally as:</span>
              {Object.entries(game.vernacularNames).map(([lang, vName]) => (
                <span key={lang} className="text-[#1b3022] font-semibold">
                  <span className="uppercase text-[10px] text-[#974730] mr-1">{lang}:</span>
                  {vName}
                </span>
              ))}
            </div>

            <p className="text-sm text-[#434843] leading-relaxed">
              {game.story}
            </p>

            {/* Action Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsHostingModalOpen(true)}
                className="px-6 py-3 bg-[#974730] hover:bg-[#772f1a] text-[#fcf9f3] text-xs font-bold uppercase tracking-wider rounded-full shadow-md flex items-center gap-2 transition-transform hover:-translate-y-0.5"
              >
                <Users className="w-4 h-4" /> Host Revival Session
              </button>
              <button
                onClick={() => toggleSaveGame(game.id)}
                className="px-5 py-3 bg-[#ffffff] border border-[#c3c8c1] text-[#061b0e] hover:bg-[#f6f3ed] text-xs font-bold uppercase tracking-wider rounded-full shadow-sm flex items-center gap-2"
              >
                {user.savedGameIds.includes(game.id) ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-[#974730] fill-current" /> Saved in Collection
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" /> Save to Archive
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-[#e5e2dc]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={game.coverImage} alt={game.name} className="w-full h-full object-cover" />
          </div>

        </div>

        {/* Content Tabs / Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left Column: How to Play & Rules */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Step-by-Step How to Play */}
            <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-8 border border-[#c3c8c1] shadow-md">
              <div className="flex items-center gap-2 text-[#974730] text-xs font-bold uppercase tracking-wider mb-4">
                <Gamepad2 className="w-4 h-4" /> Step-by-Step Instructions
              </div>
              <h2 className="font-display text-2xl font-bold text-[#061b0e] mb-6">
                How to Play {game.name}
              </h2>
              <div className="space-y-4">
                {game.howToPlay.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-[#fcf9f3] border border-[#c3c8c1]/40">
                    <div className="w-7 h-7 rounded-full bg-[#1b3022] text-[#fcf9f3] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-[#1c1c18] leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules & Boundary Constraints */}
            <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-8 border border-[#c3c8c1] shadow-md">
              <div className="flex items-center gap-2 text-[#c08820] text-xs font-bold uppercase tracking-wider mb-4">
                <ShieldAlert className="w-4 h-4" /> Traditional Rules & Etiquette
              </div>
              <h2 className="font-display text-2xl font-bold text-[#061b0e] mb-6">
                Key Village Rules
              </h2>
              <ul className="space-y-3">
                {game.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#434843]">
                    <span className="w-2 h-2 rounded-full bg-[#974730] shrink-0 mt-1.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4-Tier Practice & Mastery Progression (Gamification) */}
            <div className="bg-[#1b3022] text-[#fcf9f3] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#fbbb51] flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-[#fbbb51]" /> Cultural Skill Progression
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#fcf9f3] mt-1">
                    Mastery Tiers & XP
                  </h3>
                </div>
                <div className="text-xs text-[#b4cdb8] font-bold">
                  {completedTiers.length}/4 Tiers Completed
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {progressionTiers.map((tier) => {
                  const isDone = completedTiers.includes(tier.level);
                  return (
                    <div
                      key={tier.level}
                      className={`p-4 rounded-2xl border transition-all ${
                        isDone
                          ? 'bg-[#061b0e] border-[#fbbb51]/40'
                          : 'bg-[#061b0e]/50 border-[#364c3c]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-display font-bold text-base text-[#fcf9f3]">
                          {tier.level}
                        </span>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#fbbb51]/20 text-[#fbbb51]">
                          +{tier.xp} XP
                        </span>
                      </div>
                      <p className="text-xs text-[#b4cdb8] mb-3 leading-relaxed">
                        {tier.desc}
                      </p>
                      <div className="flex items-center justify-between pt-2 border-t border-[#364c3c]">
                        <span className="text-[10px] text-[#819986] italic">{tier.perk}</span>
                        {isDone ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#fbbb51]">
                            <CheckCircle2 className="w-4 h-4" /> Achieved
                          </span>
                        ) : (
                          <button
                            onClick={() => handleClaimTier(tier.level, tier.xp)}
                            className="px-3 py-1 bg-[#974730] hover:bg-[#772f1a] text-[#fcf9f3] rounded-full text-xs font-bold uppercase transition-colors"
                          >
                            Mark Completed
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Requirements, Skills, Marketplace */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Spec Card */}
            <div className="bg-[#ffffff] rounded-3xl p-6 border border-[#c3c8c1] shadow-md space-y-4">
              <h3 className="font-display text-lg font-bold text-[#061b0e] pb-3 border-b border-[#f0eee8]">
                Match Specifications
              </h3>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#737973] block mb-1">
                  Required Equipment
                </span>
                <ul className="text-xs text-[#1c1c18] space-y-1">
                  {game.equipmentNeeded.map((eq, i) => (
                    <li key={i}>• {eq}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#737973] block mb-1">
                  Recommended Area
                </span>
                <p className="text-xs text-[#1c1c18]">{game.playingArea}</p>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#737973] block mb-1">
                  Skills Developed
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {game.skillsDeveloped.map((sk, i) => (
                    <span key={i} className="px-2.5 py-1 bg-[#f0eee8] text-[#061b0e] text-[11px] font-medium rounded-full">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Related Marketplace Products */}
            {relatedProducts.length > 0 && (
              <div className="bg-[#ffffff] rounded-3xl p-6 border border-[#c3c8c1] shadow-md space-y-4">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#974730]">
                  <Package className="w-4 h-4" /> Traditional Equipment
                </div>
                <h3 className="font-display text-base font-bold text-[#061b0e]">
                  Handmade by Verified Artisans
                </h3>

                {relatedProducts.map((p) => (
                  <div key={p.id} className="p-3 rounded-2xl bg-[#fcf9f3] border border-[#c3c8c1]/60 flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.imageUrl} alt={p.title} className="w-12 h-12 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-[#061b0e] truncate">{p.title}</div>
                      <div className="text-[11px] text-[#737973]">₹{p.priceInr} • By {p.artisanName}</div>
                    </div>
                    <Link
                      href={`/marketplace#${p.id}`}
                      className="px-3 py-1 bg-[#1b3022] text-[#fcf9f3] rounded-full text-xs font-bold shrink-0 hover:bg-[#061b0e]"
                    >
                      View
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {/* Community Matchmaking Radar Callout */}
            <div className="bg-[#fe997c]/20 border border-[#974730]/40 rounded-3xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#772f1a]">
                <Users className="w-4 h-4" /> {game.activePlayersNearbyCount} Players Looking for Match
              </div>
              <p className="text-xs text-[#434843] leading-relaxed">
                Connect with neighborhood players interested in playing {game.name} while respecting privacy zones.
              </p>
              <Link
                href="/community"
                className="block w-full py-2.5 bg-[#974730] hover:bg-[#772f1a] text-[#fcf9f3] text-center text-xs font-bold uppercase tracking-wider rounded-full shadow-sm transition-colors"
              >
                Join Nearby Lobby
              </Link>
            </div>

          </div>

        </div>

        {/* Host Session Modal */}
        {isHostingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#061b0e]/70 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-md bg-[#ffffff] rounded-3xl border border-[#c3c8c1] p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#f0eee8]">
                <h3 className="font-display text-xl font-bold text-[#061b0e]">
                  Host {game.name} Session
                </h3>
                <button
                  onClick={() => setIsHostingModalOpen(false)}
                  className="text-xs text-[#737973] hover:text-[#061b0e]"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateSession} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#737973] mb-1">
                    Locality / Park Name
                  </label>
                  <input
                    type="text"
                    required
                    value={sessionLocality}
                    onChange={(e) => setSessionLocality(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#f6f3ed] border border-[#c3c8c1] text-xs text-[#061b0e] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#737973] mb-1">
                    Date & Preferred Time
                  </label>
                  <input
                    type="text"
                    required
                    value={sessionDate}
                    onChange={(e) => setSessionDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#f6f3ed] border border-[#c3c8c1] text-xs text-[#061b0e] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#737973] mb-1">
                    Notes for Participants
                  </label>
                  <textarea
                    rows={2}
                    value={sessionNotes}
                    onChange={(e) => setSessionNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#f6f3ed] border border-[#c3c8c1] text-xs text-[#061b0e] outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsHostingModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold uppercase text-[#737973]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#974730] text-[#fcf9f3] text-xs font-bold uppercase rounded-full shadow-md"
                  >
                    Publish Session (+100 XP)
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
