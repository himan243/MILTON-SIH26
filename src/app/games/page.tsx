'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Gamepad2,
  Search,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  Users,
  Folder,
  Clock,
  LayoutGrid,
  List
} from 'lucide-react';

export default function GamesPage() {
  const { games, user, toggleSaveGame, t, triggerConfetti } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | 'all'>('all');
  const [viewMode, setViewMode] = useState<'gallery' | 'compact'>('gallery');

  const filteredGames = games.filter((game) => {
    const matchesSearch =
      game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiff = selectedDifficulty === 'all' || game.difficultyLevel === selectedDifficulty;
    return matchesSearch && matchesDiff;
  });

  // Subtle archival paper variations for notebook realism
  const cardPaperTints = [
    'bg-[#ffffff]',
    'bg-[#faf7f0]',
    'bg-[#fdfbf7]',
    'bg-[#f7f9f7]',
    'bg-[#faf5f0]',
    'bg-[#f8f7fa]'
  ];

  const tagPillTints = [
    'bg-[#fef08a] text-[#0c0f14]',
    'bg-[#bbf7d0] text-[#065f46]',
    'bg-[#fed7aa] text-[#9a3412]',
    'bg-[#e9d5ff] text-[#581c87]',
    'bg-[#fecdd3] text-[#9f1239]',
    'bg-[#bae6fd] text-[#0369a1]'
  ];

  return (
    <div className="lg:pl-[354px] min-h-screen bg-[#faf8f5] bg-creased-paper py-10 sm:py-14 pr-4 sm:pr-8 lg:pr-12 pl-4 sm:pl-8 transition-all">
      <div className="w-full max-w-[1680px] mx-auto">
        
        {/* ── Visual Hierarchy 1: Archive Label ────────────────────── */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#fef08a] border-2 border-[#0c0f14] rounded-full font-display text-xs uppercase tracking-wider shadow-[2px_2px_0px_#0c0f14]">
            <Gamepad2 className="w-4 h-4 text-[#ef4444]" />
            <span className="font-bold text-[#0c0f14]">Folk Games Revival Archive</span>
          </div>
        </div>

        {/* ── Visual Hierarchy 2: Authoritative Headline ──────────── */}
        <div className="mb-5 sm:mb-6">
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black text-[#0c0f14] tracking-tight leading-[0.93] uppercase">
            FORGOTTEN <span className="text-[#ef4444] marker-underline">GAMES</span> OF NORTHEAST INDIA
          </h1>
        </div>

        {/* ── Visual Hierarchy 3: Handwritten Editorial Description ── */}
        <div className="mb-8 sm:mb-10 max-w-4xl">
          <p className="font-hand text-xl sm:text-2xl text-zinc-800 font-bold leading-relaxed">
            From the courtyards of the Brahmaputra valley to the misty hills of Meghalaya and Nagaland, rediscover timeless indigenous games that forged community bonds before screens existed.
          </p>
        </div>

        {/* ── Visual Hierarchy 4: Pill-Shaped Search & Filter Bar ── */}
        <div className="card-retro bg-[#f4eee3] p-4 sm:p-5 border-[2.5px] border-[#0c0f14] shadow-[4px_4px_0px_#0c0f14] mb-10 sm:mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Pill Search Input */}
          <div className="relative w-full md:w-[420px]">
            <Search className="w-4 h-4 text-zinc-600 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search archival games by name, region, tags..."
              className="w-full pl-11 pr-4 py-2.5 bg-white border-2 border-[#0c0f14] rounded-full text-xs font-bold text-[#0c0f14] placeholder-zinc-500 outline-none shadow-[2px_2px_0px_#0c0f14] focus:ring-2 focus:ring-[#ef4444]"
            />
          </div>

          {/* Difficulty Filter & View Switcher */}
          <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 w-full md:w-auto">
            
            <div className="flex items-center gap-1.5">
              <span className="font-display text-xs uppercase tracking-wider text-zinc-700 font-bold mr-1">
                Difficulty:
              </span>
              <button
                onClick={() => setSelectedDifficulty('all')}
                className={`px-3.5 py-1.5 rounded-full font-display text-xs uppercase tracking-wider border-2 transition-all ${
                  selectedDifficulty === 'all'
                    ? 'bg-[#0c0f14] text-[#fef08a] border-[#0c0f14] shadow-[2px_2px_0px_#0c0f14]'
                    : 'bg-white text-[#0c0f14] border-[#0c0f14] hover:bg-[#fed7aa]'
                }`}
              >
                All
              </button>
              {[2, 3, 4].map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDifficulty(d)}
                  className={`px-3.5 py-1.5 rounded-full font-display text-xs uppercase tracking-wider border-2 transition-all ${
                    selectedDifficulty === d
                      ? 'bg-[#0c0f14] text-[#fef08a] border-[#0c0f14] shadow-[2px_2px_0px_#0c0f14]'
                    : 'bg-white text-[#0c0f14] border-[#0c0f14] hover:bg-[#fed7aa]'
                  }`}
                >
                  Level {d}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 bg-white border-2 border-[#0c0f14] rounded-full shadow-[2px_2px_0px_#0c0f14]">
              <button
                onClick={() => setViewMode('gallery')}
                className={`p-1.5 rounded-full transition-all ${
                  viewMode === 'gallery' ? 'bg-[#0c0f14] text-[#fef08a]' : 'text-zinc-600 hover:bg-zinc-100'
                }`}
                title="Gallery Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`p-1.5 rounded-full transition-all ${
                  viewMode === 'compact' ? 'bg-[#0c0f14] text-[#fef08a]' : 'text-zinc-600 hover:bg-zinc-100'
                }`}
                title="Compact Ledger View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* ── Visual Hierarchy 5: Archival Game Cards Grid ─────────── */}
        {filteredGames.length === 0 ? (
          <div className="text-center py-16 card-retro bg-white p-8 border-[2.5px] border-[#0c0f14] shadow-[4px_4px_0px_#0c0f14]">
            <p className="font-display text-3xl text-[#0c0f14]">NO ARCHIVAL RECORDS MATCHED</p>
            <p className="font-hand text-lg text-zinc-600 font-bold mt-1">Try broadening your search query or reset difficulty filter.</p>
          </div>
        ) : viewMode === 'gallery' ? (
          /* High-Fidelity 3/4-Column Physical Archival Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
            {filteredGames.map((game, idx) => {
              const paperBg = cardPaperTints[idx % cardPaperTints.length];
              const pillStyle = tagPillTints[idx % tagPillTints.length];
              const accessionRef = `REF: #NE-GM-0${idx + 1}`;

              return (
                <div
                  key={game.id}
                  className={`card-retro ${paperBg} p-5 sm:p-6 border-[2.5px] border-[#0c0f14] shadow-[4px_4px_0px_#0c0f14] hover:shadow-[7px_7px_0px_#0c0f14] transition-all flex flex-col justify-between group relative`}
                >
                  {/* Subtle Red Pushpin Accent */}
                  <div className="pushpin-red" />

                  <div>
                    {/* Top Archival Ledger Header */}
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-zinc-700 pb-2.5 mb-3 border-b-2 border-dashed border-[#0c0f14]/20 pr-5">
                      <span className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest">
                        {accessionRef}
                      </span>
                      <button
                        onClick={() => { toggleSaveGame(game.id); triggerConfetti(); }}
                        className="p-1 rounded-md hover:bg-black/5 transition-colors"
                        title="Bookmark to Passport"
                      >
                        {user.savedGameIds.includes(game.id) ? (
                          <BookmarkCheck className="w-4 h-4 text-[#ef4444] fill-current" />
                        ) : (
                          <Bookmark className="w-4 h-4 text-zinc-500 hover:text-[#0c0f14]" />
                        )}
                      </button>
                    </div>

                    {/* Media Frame */}
                    <div className="relative aspect-[16/11] rounded-xl overflow-hidden border-2 border-[#0c0f14] mb-4 bg-zinc-200 shadow-[2px_2px_0px_#0c0f14]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={game.imageUrl}
                        alt={game.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-white/95 border border-[#0c0f14] rounded-md font-display text-[10px] uppercase shadow-[1px_1px_0px_#0c0f14]">
                        {game.playersCount}
                      </div>
                      <div className={`absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded-md font-display text-[10px] uppercase border border-[#0c0f14] shadow-[1px_1px_0px_#0c0f14] ${pillStyle}`}>
                        Level {game.difficultyLevel} Mastery
                      </div>
                    </div>

                    {/* Metadata Badges */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="px-2 py-0.5 bg-[#0c0f14] text-[#fef08a] rounded font-display text-[10px] uppercase tracking-wider">
                        {game.region}
                      </span>
                      <span className="font-hand text-xs font-bold text-zinc-600 truncate">
                        • {game.historicalEra}
                      </span>
                    </div>

                    {/* Game Title & Vernacular Name */}
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0c0f14] group-hover:text-[#ef4444] transition-colors leading-[1.05] tracking-tight mb-1">
                      {game.name}
                    </h3>
                    <p className="font-hand text-sm text-[#ef4444] font-bold italic mb-2.5">
                      &quot;{Object.values(game.vernacularNames)[0]}&quot;
                    </p>

                    {/* Archival Snippet */}
                    <p className="text-xs text-zinc-700 line-clamp-3 font-medium leading-relaxed mb-4">
                      {game.story}
                    </p>
                  </div>

                  {/* Card Bottom CTA & Radar Counter */}
                  <div className="pt-3.5 border-t-2 border-dashed border-[#0c0f14]/20 flex items-center justify-between">
                    <Link
                      href={`/games/${game.id}`}
                      className="btn-retro px-4 py-2 bg-[#0c0f14] hover:bg-zinc-800 text-[#fef08a] font-display text-xs font-black uppercase tracking-wider rounded-lg shadow-[2px_2px_0px_#0c0f14] flex items-center gap-1.5"
                    >
                      <span>{t.learnGame}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href="/community"
                      className="text-[11px] font-display uppercase tracking-wider text-zinc-700 hover:text-[#ef4444] flex items-center gap-1 font-bold"
                      title="View active players in nearby radar"
                    >
                      <Users className="w-3.5 h-3.5 text-[#ef4444]" />
                      <span>{game.activePlayersNearbyCount} NEARBY</span>
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          /* Template 1.1 Compact Notebook Ledger View */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
            {filteredGames.map((game, idx) => (
              <div
                key={game.id}
                className="card-retro bg-white p-5 border-[2.5px] border-[#0c0f14] shadow-[4px_4px_0px_#0c0f14] hover:shadow-[6px_6px_0px_#0c0f14] transition-all flex flex-col justify-between relative"
              >
                <div className="pushpin-red" />

                <div>
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-zinc-700 pb-2 mb-3 border-b-2 border-dashed border-[#0c0f14]/20 pr-6">
                    <div className="flex items-center gap-1.5">
                      <Folder className="w-3.5 h-3.5 text-[#ef4444]" />
                      <span className="font-sans uppercase text-[10px] font-bold text-[#0c0f14]">{game.region}</span>
                      <span>—</span>
                      <Clock className="w-3 h-3 text-zinc-500" />
                      <span>{game.historicalEra}</span>
                    </div>
                    <button onClick={() => { toggleSaveGame(game.id); triggerConfetti(); }}>
                      {user.savedGameIds.includes(game.id) ? (
                        <BookmarkCheck className="w-4 h-4 text-[#ef4444] fill-current" />
                      ) : (
                        <Bookmark className="w-4 h-4 text-zinc-500" />
                      )}
                    </button>
                  </div>

                  <div className="p-3.5 bg-graph-paper rounded-2xl border-2 border-[#0c0f14] flex items-center gap-4 mb-3 shadow-[2px_2px_0px_#0c0f14]">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#0c0f14] overflow-hidden shrink-0 shadow-[2px_2px_0px_#0c0f14] bg-zinc-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={game.imageUrl} alt={game.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-2xl font-bold text-[#0c0f14] leading-tight truncate">
                        {game.name}
                      </h3>
                      <p className="font-hand text-sm text-[#ef4444] font-bold truncate">
                        {Object.values(game.vernacularNames)[0]}
                      </p>
                      <p className="text-xs text-zinc-700 line-clamp-2 mt-1 font-medium">
                        {game.tagline}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2.5 border-t-2 border-dashed border-[#0c0f14]/20">
                  <Link
                    href={`/games/${game.id}`}
                    className="font-display text-xs font-black uppercase tracking-wider text-[#0c0f14] hover:text-[#ef4444] flex items-center gap-1"
                  >
                    <span>{t.learnGame}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="font-display text-[11px] text-zinc-600 font-bold">
                    {game.activePlayersNearbyCount} PLAYERS IN RADAR
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
