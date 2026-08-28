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
  Sparkles,
  ArrowLeft,
  ShieldAlert,
  Folder,
  Clock,
  Radio,
  MapPin,
  Flame,
  Check
} from 'lucide-react';

export default function GameDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { games, products, user, toggleSaveGame, addXP, createSession, t, triggerConfetti } = useApp();
  
  const game = games.find((g) => g.id === resolvedParams.id);
  if (!game) return notFound();

  // 4-Tier Progression State
  const [completedTiers, setCompletedTiers] = useState<string[]>(['Beginner']);
  const [isHostingModalOpen, setIsHostingModalOpen] = useState(false);
  const [sessionLocality, setSessionLocality] = useState('Guwahati Central Park');
  const [sessionDate, setSessionDate] = useState('Tomorrow, 5:00 PM');
  const [sessionNotes, setSessionNotes] = useState('Bringing equipment! All skill levels welcome.');

  const progressionTiers = [
    { level: 'Beginner', xp: 50, desc: 'Read game history and understand foundational village rules.', perk: 'Unlocks Rules Badge' },
    { level: 'Explorer', xp: 100, desc: 'Practice 1 physical round or test toss with friends.', perk: 'Unlocks Match Host Role' },
    { level: 'Skilled', xp: 200, desc: 'Participate in 3 community games or tournament sessions.', perk: 'Unlocks Regional Leaderboard' },
    { level: 'Master', xp: 400, desc: 'Teach the game to next-gen players and log archival tips.', perk: 'Heritage Master Title' }
  ];

  const handleClaimTier = (tierName: string, xp: number) => {
    if (!completedTiers.includes(tierName)) {
      setCompletedTiers((prev) => [...prev, tierName]);
      addXP(xp, `Achieved ${tierName} rank in ${game.name}`);
      triggerConfetti();
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
    triggerConfetti();
  };

  const relatedProducts = products.filter(
    (p) => game.relatedMarketplaceItemIds && game.relatedMarketplaceItemIds.includes(p.id)
  );

  return (
    <div className="lg:pl-[354px] min-h-screen bg-[#faf8f5] bg-creased-paper py-10 sm:py-14 px-4 sm:px-6 lg:px-10 transition-all">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Back Button */}
        <Link
          href="/games"
          className="inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-wider text-zinc-700 hover:text-[#ef4444] mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO FOLK GAMES REPERTORY</span>
        </Link>

        {/* Hero Scrapbook Banner Card */}
        <div className="card-retro bg-[#f4eee3] p-6 sm:p-8 lg:p-10 border-[2.5px] border-[#0c0f14] shadow-retro-xl mb-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
          
          {/* Pushpin at top right */}
          <div className="pushpin-red" />

          {/* Left Details */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Top Tag Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-0.5 bg-[#0c0f14] text-[#fef08a] font-display text-xs uppercase rounded-lg border border-black shadow-retro-sm">
                {game.historicalEra}
              </span>
              <span className="px-3 py-0.5 bg-[#fef08a] text-[#0c0f14] font-display text-xs uppercase rounded-lg border border-black shadow-retro-sm">
                {game.region}
              </span>
              <span className="px-2.5 py-0.5 bg-white border border-black rounded-lg font-hand text-xs font-bold text-zinc-700">
                {game.playersCount}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#0c0f14] leading-[1.05] tracking-tight">
              {game.name}
            </h1>

            {/* Vernacular Names Sticky Box */}
            <div className="p-3 bg-white rounded-xl border-2 border-black shadow-retro-sm flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="font-display text-xs uppercase text-zinc-500 font-bold">KNOWN AS:</span>
              {Object.entries(game.vernacularNames).map(([lang, vName]) => (
                <span key={lang} className="font-hand text-base font-bold text-[#0c0f14]">
                  <span className="font-display text-xs uppercase text-[#ef4444] mr-1">{lang}:</span>
                  {vName}
                </span>
              ))}
            </div>

            <p className="font-hand text-lg text-zinc-800 font-bold leading-relaxed">
              {game.story}
            </p>

            {/* Action Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsHostingModalOpen(true)}
                className="btn-retro px-5 py-2.5 bg-[#ef4444] hover:bg-[#dc2626] text-white font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-retro flex items-center gap-2"
              >
                <Users className="w-4 h-4" /> HOST REVIVAL MATCH (+100 XP)
              </button>
              <button
                onClick={() => toggleSaveGame(game.id)}
                className="btn-retro px-4 py-2.5 bg-white hover:bg-[#fef08a] text-[#0c0f14] font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-retro flex items-center gap-2"
              >
                {user.savedGameIds.includes(game.id) ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-[#ef4444] fill-current" /> SAVED IN PASSPORT
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4 text-zinc-700" /> SAVE TO ARCHIVE
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Image Frame */}
          <div className="lg:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden border-2 border-black shadow-retro-md bg-zinc-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={game.coverImage || game.imageUrl} alt={game.name} className="w-full h-full object-cover" />
          </div>

        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
          
          {/* Left 8 Cols: Step-by-Step Instructions & Traditional Village Rules */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Step-by-Step How to Play */}
            <div className="card-retro bg-white p-6 sm:p-8 border-[2.5px] border-[#0c0f14] shadow-retro-md relative">
              <div className="flex items-center gap-2 text-[#ef4444] font-display text-sm uppercase tracking-wider mb-2 font-bold">
                <Gamepad2 className="w-4 h-4" /> TRADITIONAL PLAYBOOK
              </div>
              <h2 className="font-display text-3xl font-bold text-[#0c0f14] mb-6">
                HOW TO PLAY {game.name}
              </h2>
              <div className="space-y-3.5">
                {game.howToPlay.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-4 rounded-xl bg-[#faf8f5] border-2 border-black shadow-retro-sm"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#0c0f14] text-[#fef08a] font-display text-sm font-bold flex items-center justify-center shrink-0 border border-black shadow-retro-sm">
                      {idx + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-800 font-medium leading-relaxed mt-0.5">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Traditional Village Rules */}
            <div className="card-retro bg-[#f4eee3] p-6 sm:p-8 border-[2.5px] border-[#0c0f14] shadow-retro-md">
              <div className="flex items-center gap-2 text-[#d97706] font-display text-sm uppercase tracking-wider mb-2 font-bold">
                <ShieldAlert className="w-4 h-4" /> LOCAL ETIQUETTE & BOUNDARIES
              </div>
              <h2 className="font-display text-3xl font-bold text-[#0c0f14] mb-4">
                KEY VILLAGE RULES
              </h2>
              <ul className="space-y-2.5">
                {game.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-800 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] shrink-0 mt-1 border border-black" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4-Tier Cultural Skill Progression Tree */}
            <div className="card-retro bg-[#0c0f14] text-white p-6 sm:p-8 border-[2.5px] border-[#0c0f14] shadow-retro-lg space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-display text-xs uppercase tracking-wider text-[#fef08a] flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-[#fef08a]" /> CULTURAL SKILL PROGRESSION
                  </div>
                  <h3 className="font-display text-3xl font-bold text-white mt-1">
                    MASTERY TIERS & XP
                  </h3>
                </div>
                <div className="px-3 py-1 bg-white/10 border border-white/20 rounded-full font-display text-xs text-[#fef08a]">
                  {completedTiers.length}/4 TIERS COMPLETED
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {progressionTiers.map((tier) => {
                  const isDone = completedTiers.includes(tier.level);
                  return (
                    <div
                      key={tier.level}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        isDone
                          ? 'bg-[#1e293b] border-[#fef08a] shadow-retro-yellow'
                          : 'bg-black/50 border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-display text-lg font-bold text-white">
                          {tier.level}
                        </span>
                        <span className="font-display text-xs px-2.5 py-0.5 rounded-md bg-[#fef08a] text-[#0c0f14] font-bold">
                          +{tier.xp} XP
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 mb-3 leading-relaxed font-medium">
                        {tier.desc}
                      </p>
                      <div className="flex items-center justify-between pt-2 border-t border-zinc-700">
                        <span className="text-[11px] font-hand text-zinc-400 font-bold">{tier.perk}</span>
                        {isDone ? (
                          <span className="inline-flex items-center gap-1 font-display text-xs font-bold text-[#fef08a]">
                            <CheckCircle2 className="w-4 h-4 text-[#fef08a]" /> ACHIEVED
                          </span>
                        ) : (
                          <button
                            onClick={() => handleClaimTier(tier.level, tier.xp)}
                            className="btn-retro px-3 py-1 bg-[#ef4444] hover:bg-[#dc2626] text-white rounded-lg font-display text-xs uppercase"
                          >
                            CLAIM
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right 4 Cols: Specs, Equipment, Nearby Radar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Match Specs */}
            <div className="card-retro bg-white p-6 border-[2.5px] border-[#0c0f14] shadow-retro-md space-y-4">
              <h3 className="font-display text-xl font-bold text-[#0c0f14] pb-2 border-b-2 border-dashed border-black/20">
                MATCH SPECIFICATIONS
              </h3>

              <div>
                <span className="font-display text-xs uppercase tracking-wider text-zinc-500 block mb-1">
                  Required Equipment
                </span>
                <ul className="text-xs font-bold text-zinc-800 space-y-1">
                  {game.equipmentNeeded.map((eq, i) => (
                    <li key={i}>• {eq}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-display text-xs uppercase tracking-wider text-zinc-500 block mb-1">
                  Recommended Ground
                </span>
                <p className="text-xs font-bold text-zinc-800">{game.playingArea}</p>
              </div>

              <div>
                <span className="font-display text-xs uppercase tracking-wider text-zinc-500 block mb-1">
                  Skills Developed
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {game.skillsDeveloped.map((sk, i) => (
                    <span key={i} className="px-2.5 py-0.5 bg-[#f4eee3] text-[#0c0f14] text-xs font-bold rounded-lg border border-black shadow-retro-sm">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Related Marketplace Products */}
            {relatedProducts.length > 0 && (
              <div className="card-retro bg-white p-6 border-[2.5px] border-[#0c0f14] shadow-retro-md space-y-3">
                <div className="flex items-center gap-1.5 font-display text-xs uppercase text-[#ef4444] font-bold">
                  <Package className="w-4 h-4" /> TRADITIONAL EQUIPMENT
                </div>
                <h3 className="font-display text-lg font-bold text-[#0c0f14]">
                  Handmade by Verified Artisans
                </h3>

                {relatedProducts.map((p) => (
                  <div key={p.id} className="p-3 rounded-xl bg-[#faf8f5] border-2 border-black flex items-center gap-3 shadow-retro-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.imageUrl} alt={p.title} className="w-12 h-12 rounded-lg object-cover border border-black" />
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-sm font-bold text-[#0c0f14] truncate">{p.title}</div>
                      <div className="text-[10px] font-hand font-bold text-zinc-600">₹{p.priceInr} • By {p.artisanName}</div>
                    </div>
                    <Link
                      href={`/marketplace#${p.id}`}
                      className="btn-retro px-3 py-1 bg-[#0c0f14] text-[#fef08a] rounded-lg font-display text-xs font-bold shrink-0"
                    >
                      VIEW
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {/* Matchmaking Callout Card */}
            <div className="card-retro bg-[#fef08a] p-6 border-[2.5px] border-[#0c0f14] shadow-retro-md space-y-3">
              <div className="flex items-center gap-1.5 font-display text-xs uppercase text-[#0c0f14] font-bold">
                <Users className="w-4 h-4 text-[#ef4444]" /> {game.activePlayersNearbyCount} PLAYERS WAITING
              </div>
              <h4 className="font-display text-xl font-bold text-[#0c0f14]">
                JOIN A LOCAL MATCH
              </h4>
              <p className="font-hand text-sm font-bold text-zinc-800 leading-snug">
                Connect with neighborhood players looking to play {game.name} this weekend.
              </p>
              <Link
                href="/community"
                className="btn-retro block w-full py-2.5 bg-[#0c0f14] hover:bg-zinc-800 text-[#fef08a] text-center font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-retro"
              >
                OPEN RADAR & JOIN LOBBY
              </Link>
            </div>

          </div>

        </div>

        {/* Host Session Modal */}
        {isHostingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="w-full max-w-md card-retro bg-[#faf8f5] border-[2.5px] border-[#0c0f14] p-6 shadow-retro-xl space-y-4 relative">
              <div className="pushpin-red" />

              <div className="flex items-center justify-between pb-3 border-b-2 border-black/20">
                <h3 className="font-display text-2xl font-bold text-[#0c0f14]">
                  HOST {game.name.toUpperCase()}
                </h3>
                <button
                  onClick={() => setIsHostingModalOpen(false)}
                  className="w-7 h-7 rounded-full border border-black bg-white flex items-center justify-center text-xs font-bold mr-6"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateSession} className="space-y-3">
                <div>
                  <label className="block font-display text-xs uppercase tracking-wider text-zinc-700 mb-1">
                    Locality / Park Name
                  </label>
                  <input
                    type="text"
                    required
                    value={sessionLocality}
                    onChange={(e) => setSessionLocality(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-xs font-bold text-[#0c0f14] outline-none shadow-retro-sm"
                  />
                </div>

                <div>
                  <label className="block font-display text-xs uppercase tracking-wider text-zinc-700 mb-1">
                    Date & Preferred Time
                  </label>
                  <input
                    type="text"
                    required
                    value={sessionDate}
                    onChange={(e) => setSessionDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-xs font-bold text-[#0c0f14] outline-none shadow-retro-sm"
                  />
                </div>

                <div>
                  <label className="block font-display text-xs uppercase tracking-wider text-zinc-700 mb-1">
                    Notes for Players
                  </label>
                  <textarea
                    rows={2}
                    value={sessionNotes}
                    onChange={(e) => setSessionNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-xs font-bold text-[#0c0f14] outline-none shadow-retro-sm"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t-2 border-dashed border-black/20">
                  <button
                    type="button"
                    onClick={() => setIsHostingModalOpen(false)}
                    className="px-4 py-2 text-xs font-display uppercase tracking-wider text-zinc-700 hover:bg-zinc-200 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-retro px-5 py-2.5 bg-[#ef4444] text-white font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-retro"
                  >
                    PUBLISH SESSION (+100 XP)
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

