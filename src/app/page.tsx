'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Sparkles,
  Gamepad2,
  Hammer,
  UtensilsCrossed,
  Users,
  Compass,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  ShieldCheck,
  Radio,
  Clock,
  Folder,
  LayoutGrid,
  List,
  Wand2,
  Trophy
} from 'lucide-react';

export default function HomePage() {
  const {
    t,
    games,
    crafts,
    foodStories,
    nostalgicBuilds,
    user,
    toggleSaveGame,
    toggleSaveCraft,
    toggleSaveFood,
    setIsPreserveModalOpen
  } = useApp();

  const [activeBuildIndex, setActiveBuildIndex] = useState(0);
  const [gamesViewMode, setGamesViewMode] = useState<'compact' | 'gallery'>('compact');
  const featuredGame = games[0] || {
    id: 'pittu-seven-stones',
    name: 'Pittu (Seven Stones)',
    region: 'Assam & Northeast',
    vernacularNames: { as: 'Pithu', hi: 'Satoliya' },
    story: 'Played across courtyards using seven flat stones stacked carefully while dodging tennis balls.',
    coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    playersCount: '4-12 Players',
    difficultyLevel: 3,
    historicalEra: 'Ancient Street Game',
    activePlayersNearbyCount: 14
  };

  return (
    <div className="lg:pl-[354px] min-h-screen bg-[#faf8f5] bg-creased-paper flex flex-col transition-all">
      
      {/* ── 1. HERO SECTION: SCRAPBOOK NOTEBOOK CANVAS ───────────────────────── */}
      <section className="relative w-full pt-8 pb-16 px-4 sm:px-6 lg:px-10 border-b-2 border-[#0c0f14]/15 overflow-hidden">
        
        {/* Washi tape on hero banner */}
        <div className="max-w-[1320px] mx-auto relative">
          
          {/* Main Hero Scrapbook Card */}
          <div className="card-retro bg-[#f4eee3] p-6 sm:p-10 lg:p-12 relative border-[2.5px] border-[#0c0f14] shadow-retro-xl overflow-hidden">
            
            {/* Corner Pushpin from Template 1.0 */}
            <div className="pushpin-red" />
            
            {/* Top Badge Strip */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#fef08a] border-2 border-black rounded-full text-xs font-display tracking-wider uppercase shadow-retro-sm">
                <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-ping" />
                <span>LIVING CULTURAL MUSEUM</span>
              </div>
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-black rounded-full text-xs font-hand font-bold text-zinc-700">
                <Compass className="w-3.5 h-3.5 text-[#ef4444]" /> Northeast India Revival Archive
              </div>
            </div>

            {/* Headline with Red Marker Underline from Template 1.0 */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-[#0c0f14] leading-[1.05] tracking-tight max-w-4xl mb-4">
              DISCOVER WHAT WE <span className="marker-underline text-[#ef4444]">FORGOT</span>. PLAY WHAT WE GREW UP WITH.
            </h1>

            {/* Handwritten Subheading from Template 1.0 */}
            <p className="font-hand text-xl sm:text-2xl text-zinc-800 font-bold max-w-2xl mb-8 leading-snug">
              Rediscover traditional folk games, indigenous bamboo crafts, heirloom recipes, and nostalgic childhood creations.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
              <Link
                href="#discover-today"
                className="btn-retro px-7 py-3.5 bg-[#0c0f14] hover:bg-zinc-800 text-[#fef08a] font-display text-sm font-black uppercase tracking-wider rounded-xl shadow-retro"
              >
                START DISCOVERING
              </Link>
              <Link
                href="/create-with-ai"
                className="btn-retro px-6 py-3.5 bg-[#fef08a] hover:bg-[#fde047] text-[#0c0f14] font-display text-sm font-black uppercase tracking-wider rounded-xl shadow-retro flex items-center gap-2"
              >
                <Wand2 className="w-4 h-4 text-[#ef4444]" /> CREATE WITH AI
              </Link>
              <button
                onClick={() => setIsPreserveModalOpen(true)}
                className="btn-retro px-6 py-3.5 bg-white hover:bg-[#fed7aa] text-[#0c0f14] font-display text-sm font-black uppercase tracking-wider rounded-xl shadow-retro"
              >
                + PRESERVE MEMORY
              </button>
            </div>

            {/* 4 Stat Sticky Notes */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-8 border-t-2 border-dashed border-black/30">
              <div className="p-3 bg-white border-2 border-black rounded-xl shadow-retro-sm transform -rotate-1 hover:rotate-0 transition-transform">
                <div className="font-display text-2xl font-bold text-[#ef4444]">7+ FOLK GAMES</div>
                <div className="font-hand text-xs font-bold text-zinc-600">With verified rules</div>
              </div>
              <div className="p-3 bg-[#fef08a] border-2 border-black rounded-xl shadow-retro-sm transform rotate-1 hover:rotate-0 transition-transform">
                <div className="font-display text-2xl font-bold text-[#0c0f14]">450+ ARTISANS</div>
                <div className="font-hand text-xs font-bold text-zinc-700">Bamboo & Pottery</div>
              </div>
              <div className="p-3 bg-[#bbf7d0] border-2 border-black rounded-xl shadow-retro-sm transform -rotate-1 hover:rotate-0 transition-transform">
                <div className="font-display text-2xl font-bold text-[#059669]">100% FREE</div>
                <div className="font-hand text-xs font-bold text-zinc-700">Zero-cost knowledge</div>
              </div>
              <div className="p-3 bg-[#e9d5ff] border-2 border-black rounded-xl shadow-retro-sm transform rotate-1 hover:rotate-0 transition-transform">
                <div className="font-display text-2xl font-bold text-[#9333ea]">5 LANGUAGES</div>
                <div className="font-hand text-xs font-bold text-zinc-700">AS, BN, HI, BODO, EN</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. TODAY'S NOSTALGIC DISCOVERY (TEMPLATE 1.0 HERO CARD PATTERN) ── */}
      <section id="discover-today" className="py-14 px-4 sm:px-6 lg:px-10 border-b-2 border-[#0c0f14]/15">
        <div className="max-w-[1320px] mx-auto">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <div className="font-hand text-base font-bold text-[#ef4444] flex items-center gap-1.5 mb-1">
                <Compass className="w-4 h-4" /> Daily Curated Spotlight
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#0c0f14] tracking-tight">
                TODAY&apos;S NOSTALGIC <span className="marker-underline">DISCOVERY</span>
              </h2>
            </div>
            <Link
              href="/games"
              className="inline-flex items-center gap-1 font-display text-sm tracking-wider uppercase text-[#0c0f14] hover:text-[#ef4444] group"
            >
              <span>VIEW ALL FOLK GAMES</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Template 1.0 Archetype Hero Card */}
          <div className="card-retro bg-white p-5 sm:p-8 border-[2.5px] border-[#0c0f14] shadow-retro-lg relative">
            
            {/* Pushpin at top right */}
            <div className="pushpin-red" />

            {/* Top Metadata Strip: folder + category + dash + clock + date */}
            <div className="flex items-center gap-2 text-xs font-hand font-bold text-zinc-700 pb-3 mb-4 border-b-2 border-black/10">
              <Folder className="w-4 h-4 text-[#ef4444]" />
              <span className="font-sans font-bold text-xs uppercase text-[#0c0f14]">folk games</span>
              <span>—</span>
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
              <span className="text-zinc-600">{featuredGame.region} • {featuredGame.historicalEra}</span>
            </div>

            {/* Asymmetric Dual Column Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              
              {/* Left Image with rounded frame */}
              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border-2 border-black aspect-[16/10] bg-zinc-200 shadow-retro-sm group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredGame.coverImage || featuredGame.imageUrl}
                  alt={featuredGame.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-3 py-1 bg-white/95 border border-black rounded-full font-display text-xs uppercase text-[#0c0f14] shadow-retro-sm">
                    {featuredGame.playersCount}
                  </span>
                  <span className="px-3 py-1 bg-[#fef08a] border border-black rounded-full font-display text-xs uppercase text-[#0c0f14] shadow-retro-sm">
                    Folk Street Heritage
                  </span>
                </div>
                <button
                  onClick={() => toggleSaveGame(featuredGame.id)}
                  className="absolute top-3 right-3 p-2 bg-white/95 border-2 border-black rounded-full text-[#0c0f14] hover:bg-[#fed7aa] shadow-retro-sm transition-colors"
                  title="Save to Passport"
                >
                  {user.savedGameIds.includes(featuredGame.id) ? (
                    <BookmarkCheck className="w-4 h-4 text-[#ef4444] fill-current" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Right Story Details */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="font-hand text-sm font-bold text-[#ef4444] uppercase tracking-wider mb-1">
                    Featured Folk Lore
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#0c0f14] mb-2 leading-tight">
                    {featuredGame.name}
                  </h3>
                  <p className="font-hand text-base text-zinc-600 font-bold italic mb-3">
                    Vernacular names: {Object.values(featuredGame.vernacularNames).join(' • ')}
                  </p>
                  <p className="text-xs text-zinc-700 leading-relaxed font-medium mb-4">
                    {featuredGame.story}
                  </p>

                  {/* Attributes Grid on Graph Texture */}
                  <div className="grid grid-cols-2 gap-3 p-3.5 bg-graph-paper rounded-xl border-2 border-black mb-4">
                    <div>
                      <span className="font-display text-[11px] uppercase tracking-wider text-zinc-600 block">Region</span>
                      <span className="font-display text-sm font-bold text-[#0c0f14]">{featuredGame.region}</span>
                    </div>
                    <div>
                      <span className="font-display text-[11px] uppercase tracking-wider text-zinc-600 block">Difficulty</span>
                      <div className="flex gap-1 items-center mt-0.5">
                        {[1, 2, 3, 4, 5].map((lvl) => (
                          <span
                            key={lvl}
                            className={`w-2 h-2 rounded-full border border-black ${
                              lvl <= featuredGame.difficultyLevel ? 'bg-[#ef4444]' : 'bg-white'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="font-display text-[11px] uppercase tracking-wider text-zinc-600 block">Era</span>
                      <span className="font-display text-sm font-bold text-[#0c0f14]">{featuredGame.historicalEra}</span>
                    </div>
                    <div>
                      <span className="font-display text-[11px] uppercase tracking-wider text-zinc-600 block">Nearby Players</span>
                      <span className="font-display text-sm font-bold text-[#059669] flex items-center gap-1">
                        <Radio className="w-3.5 h-3.5 text-[#059669] animate-pulse" />
                        {featuredGame.activePlayersNearbyCount} looking to play
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2.5 items-center pt-2">
                  <Link
                    href={`/games/${featuredGame.id}`}
                    className="btn-retro px-5 py-2.5 bg-[#0c0f14] hover:bg-zinc-800 text-[#fef08a] font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-retro flex items-center gap-1.5"
                  >
                    <Gamepad2 className="w-4 h-4" /> LEARN RULES & HOW TO PLAY
                  </Link>
                  <Link
                    href="/community"
                    className="btn-retro px-4 py-2.5 bg-white hover:bg-[#fed7aa] text-[#0c0f14] font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-retro flex items-center gap-1.5"
                  >
                    <Users className="w-4 h-4 text-[#ef4444]" /> FIND PLAYERS
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── 3. "REMEMBER THIS?" CHILDHOOD BUILDS (TACTILE DIY NOTEBOOK) ──────── */}
      <section className="py-14 px-4 sm:px-6 lg:px-10 bg-[#e4e8ee] border-b-2 border-[#0c0f14]/15">
        <div className="max-w-[1320px] mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <div>
              <div className="font-hand text-base font-bold text-[#ef4444] mb-1">
                Tactile Nostalgia & DIY Inventions
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#0c0f14] tracking-tight">
                REMEMBER <span className="marker-yellow">THIS?</span>
              </h2>
              <p className="font-hand text-lg text-zinc-700 font-bold mt-1">
                Playful creations we made with bottle caps, leaves, and bamboo twigs.
              </p>
            </div>

            {/* Build File-Folder Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-white border-2 border-black rounded-xl shadow-retro-sm">
              {nostalgicBuilds.map((build, idx) => (
                <button
                  key={build.id}
                  onClick={() => setActiveBuildIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg font-display text-xs uppercase tracking-wider transition-all ${
                    activeBuildIndex === idx
                      ? 'bg-[#0c0f14] text-[#fef08a] shadow-retro-sm'
                      : 'text-zinc-700 hover:bg-zinc-100'
                  }`}
                >
                  {build.title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Active Build Blueprint Card */}
          {nostalgicBuilds[activeBuildIndex] && (
            <div className="card-retro bg-[#faf8f5] p-6 sm:p-8 border-[2.5px] border-[#0c0f14] shadow-retro-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
              
              <div className="lg:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden border-2 border-black relative group shadow-retro-sm bg-zinc-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={nostalgicBuilds[activeBuildIndex].imageUrl}
                  alt={nostalgicBuilds[activeBuildIndex].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 bg-[#0c0f14]/90 text-[#fef08a] px-3 py-1 rounded-full font-display text-xs border border-black shadow-retro-sm">
                  ⏱️ {nostalgicBuilds[activeBuildIndex].estimatedTime} • {nostalgicBuilds[activeBuildIndex].difficulty}
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="inline-block px-2.5 py-0.5 bg-[#fef08a] border border-black rounded-md font-display text-xs uppercase tracking-wider text-[#0c0f14]">
                  Childhood DIY Blueprint
                </div>
                <h3 className="font-display text-2xl sm:text-4xl font-bold text-[#0c0f14]">
                  {nostalgicBuilds[activeBuildIndex].title}
                </h3>
                <p className="font-hand text-base text-zinc-700 font-bold leading-relaxed">
                  {nostalgicBuilds[activeBuildIndex].nostalgiaStory}
                </p>

                {/* Materials List */}
                <div>
                  <span className="font-display text-xs uppercase tracking-wider text-zinc-600 block mb-1.5">
                    Materials Needed:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {nostalgicBuilds[activeBuildIndex].materials.map((m, i) => (
                      <span key={i} className="px-2.5 py-0.5 bg-white text-[#0c0f14] rounded-lg text-xs font-bold border border-black shadow-retro-sm">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Step Preview Note */}
                <div className="p-3.5 bg-[#f4eee3] rounded-xl border-2 border-black shadow-retro-sm">
                  <span className="font-display text-xs uppercase tracking-wider text-[#ef4444] block mb-0.5">
                    Step 1:
                  </span>
                  <p className="text-xs text-zinc-800 font-medium">
                    {nostalgicBuilds[activeBuildIndex].steps[0]}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href="/create-with-ai"
                    className="btn-retro px-5 py-2.5 bg-[#ef4444] hover:bg-[#dc2626] text-white font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-retro flex items-center gap-1.5"
                  >
                    <Wand2 className="w-4 h-4" /> GENERATE BLUEPRINT WITH AI
                  </Link>
                  <span className="font-hand text-sm text-zinc-600 font-bold">
                    Skills: {nostalgicBuilds[activeBuildIndex].skillsLearned.join(', ')}
                  </span>
                </div>
              </div>

            </div>
          )}

        </div>
      </section>

      {/* ── 4. TOP STORIES & FORGOTTEN GAMES (TEMPLATES 1.1 & 1.2 PATTERNS) ── */}
      <section className="py-14 px-4 sm:px-6 lg:px-10 border-b-2 border-[#0c0f14]/15">
        <div className="max-w-[1320px] mx-auto">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <div className="font-hand text-base font-bold text-[#ef4444] mb-1">
                Folk Sports & Living Street Lore
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#0c0f14] tracking-tight">
                TOP <span className="marker-underline">STORIES</span> & FORGOTTEN GAMES
              </h2>
            </div>

            {/* View Mode Toggle: Template 1.1 Compact vs Template 1.2 Gallery */}
            <div className="flex items-center gap-2">
              <div className="flex items-center p-1 bg-white border-2 border-black rounded-xl shadow-retro-sm">
                <button
                  onClick={() => setGamesViewMode('compact')}
                  className={`p-1.5 rounded-lg transition-all ${
                    gamesViewMode === 'compact' ? 'bg-[#0c0f14] text-[#fef08a]' : 'text-zinc-600 hover:bg-zinc-100'
                  }`}
                  title="Template 1.1 Circular List"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGamesViewMode('gallery')}
                  className={`p-1.5 rounded-lg transition-all ${
                    gamesViewMode === 'gallery' ? 'bg-[#0c0f14] text-[#fef08a]' : 'text-zinc-600 hover:bg-zinc-100'
                  }`}
                  title="Template 1.2 Grid Gallery"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
              <Link
                href="/games"
                className="btn-retro px-4 py-2 bg-white hover:bg-[#fed7aa] text-[#0c0f14] font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-retro"
              >
                VIEW ALL 7 GAMES →
              </Link>
            </div>
          </div>

          {/* Render Cards according to selected Template mode */}
          {gamesViewMode === 'compact' ? (
            /* Template 1.1 Archetype: Compact Card with Circular Thumbnail on Graph Paper */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {games.slice(0, 4).map((game) => (
                <div
                  key={game.id}
                  className="card-retro bg-white p-4 sm:p-5 border-[2.5px] border-[#0c0f14] shadow-retro-md hover:shadow-retro-lg transition-all flex flex-col justify-between"
                >
                  {/* Top Metadata Strip */}
                  <div className="flex items-center justify-between text-xs font-hand font-bold text-zinc-700 pb-2.5 mb-3 border-b border-black/10">
                    <div className="flex items-center gap-1.5">
                      <Folder className="w-3.5 h-3.5 text-[#ef4444]" />
                      <span className="font-sans uppercase text-[11px] font-bold text-[#0c0f14]">{game.region}</span>
                      <span>—</span>
                      <Clock className="w-3 h-3 text-zinc-500" />
                      <span>{game.historicalEra}</span>
                    </div>
                    <button
                      onClick={() => toggleSaveGame(game.id)}
                      className="p-1 rounded-full hover:bg-zinc-100 transition-colors"
                      title="Save"
                    >
                      {user.savedGameIds.includes(game.id) ? (
                        <BookmarkCheck className="w-4 h-4 text-[#ef4444] fill-current" />
                      ) : (
                        <Bookmark className="w-4 h-4 text-zinc-600" />
                      )}
                    </button>
                  </div>

                  {/* Card Body: Graph Paper Grid Box with Circular Thumbnail from Template 1.1 */}
                  <div className="p-3 bg-graph-paper rounded-2xl border-2 border-black flex items-center gap-4 mb-3">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-black overflow-hidden shrink-0 shadow-retro-sm bg-zinc-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={game.imageUrl} alt={game.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0c0f14] leading-tight truncate">
                        {game.name}
                      </h3>
                      <p className="font-hand text-xs text-zinc-600 font-bold truncate">
                        {Object.values(game.vernacularNames)[0]}
                      </p>
                      <p className="text-[11px] text-zinc-700 line-clamp-2 mt-1 font-medium">
                        {game.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-black/10">
                    <Link
                      href={`/games/${game.id}`}
                      className="font-display text-xs font-black uppercase tracking-wider text-[#0c0f14] hover:text-[#ef4444] flex items-center gap-1"
                    >
                      <span>LEARN RULES</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                    <span className="font-display text-[11px] text-zinc-600">
                      {game.activePlayersNearbyCount} PLAYERS NEARBY
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Template 1.2 Archetype: Vertical 3-Column Gallery Card Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.slice(0, 6).map((game) => (
                <div
                  key={game.id}
                  className="card-retro bg-white p-4 border-[2.5px] border-[#0c0f14] shadow-retro-md hover:shadow-retro-lg transition-all flex flex-col justify-between group"
                >
                  {/* Top Metadata Strip */}
                  <div className="flex items-center justify-between text-xs font-hand font-bold text-zinc-700 pb-2 mb-3 border-b border-black/10">
                    <div className="flex items-center gap-1.5 truncate">
                      <Folder className="w-3.5 h-3.5 text-[#ef4444]" />
                      <span className="font-sans uppercase text-[10px] font-bold text-[#0c0f14]">{game.region}</span>
                      <span>—</span>
                      <Clock className="w-3 h-3 text-zinc-500" />
                      <span className="truncate">{game.historicalEra}</span>
                    </div>
                    <button onClick={() => toggleSaveGame(game.id)}>
                      {user.savedGameIds.includes(game.id) ? (
                        <BookmarkCheck className="w-4 h-4 text-[#ef4444] fill-current" />
                      ) : (
                        <Bookmark className="w-4 h-4 text-zinc-600" />
                      )}
                    </button>
                  </div>

                  {/* Tall Image Frame with Black Border */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-black mb-3 bg-zinc-200 shadow-retro-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={game.imageUrl}
                      alt={game.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-0.5 bg-white/95 border border-black rounded-full font-display text-[10px] uppercase">
                      {game.playersCount}
                    </div>
                  </div>

                  {/* White Title Footer */}
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#0c0f14] group-hover:text-[#ef4444] transition-colors truncate">
                      {game.name}
                    </h3>
                    <p className="text-[11px] text-zinc-600 line-clamp-2 mt-1 font-medium">
                      {game.tagline}
                    </p>
                    <div className="pt-3 mt-3 border-t border-black/10 flex items-center justify-between">
                      <Link
                        href={`/games/${game.id}`}
                        className="font-display text-xs font-black uppercase text-[#0c0f14] hover:text-[#ef4444] flex items-center gap-1"
                      >
                        <span>EXPLORE</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                      <span className="text-[10px] font-hand font-bold text-zinc-600">
                        {game.skillsDeveloped[0]}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ── 5. "MADE BY OUR PEOPLE" VERIFIED ARTISANS & CRAFTS ──────────────── */}
      <section className="py-14 px-4 sm:px-6 lg:px-10 bg-[#f4eee3] border-b-2 border-[#0c0f14]/15">
        <div className="max-w-[1320px] mx-auto">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <div className="font-hand text-base font-bold text-[#d97706] flex items-center gap-1.5 mb-1">
                <ShieldCheck className="w-4 h-4 text-[#059669]" /> Verified Indigenous Guilds
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#0c0f14] tracking-tight">
                MADE BY OUR <span className="marker-yellow">PEOPLE</span>
              </h2>
              <p className="font-hand text-lg text-zinc-700 font-bold mt-1">
                Living craft traditions: Bamboo weaving, Longpi black pottery & golden silk.
              </p>
            </div>
            <Link
              href="/crafts"
              className="btn-retro px-4 py-2 bg-white hover:bg-[#fed7aa] text-[#0c0f14] font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-retro"
            >
              EXPLORE CRAFTS ARCHIVE →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {crafts.slice(0, 3).map((craft) => (
              <div
                key={craft.id}
                className="card-retro bg-white p-5 border-[2.5px] border-[#0c0f14] shadow-retro-md hover:shadow-retro-lg transition-all flex flex-col justify-between relative"
              >
                <div className="pushpin-red" />

                <div>
                  <div className="flex items-center justify-between text-xs font-hand font-bold text-zinc-600 mb-2">
                    <span className="font-sans font-bold uppercase text-[10px] text-[#0c0f14]">{craft.category}</span>
                    <span className="mr-6">{craft.state}</span>
                  </div>

                  <div className="aspect-[16/10] rounded-xl overflow-hidden border-2 border-black mb-3 bg-zinc-200 shadow-retro-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={craft.imageUrl} alt={craft.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-display text-2xl font-bold text-[#0c0f14]">{craft.name}</h3>
                    <span className="rubber-stamp rubber-stamp-green text-[10px] py-0.5">
                      {craft.preservationStatus}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-700 line-clamp-2 font-medium mb-3">
                    {craft.culturalSignificance}
                  </p>
                </div>

                <div className="pt-3 border-t border-black/10 flex items-center justify-between">
                  <Link
                    href={`/crafts/${craft.id}`}
                    className="font-display text-xs font-black uppercase text-[#0c0f14] hover:text-[#d97706] flex items-center gap-1"
                  >
                    <span>VIEW HERITAGE STORY</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                  <span className="text-[10px] font-hand font-bold text-zinc-600">
                    {craft.artisanCountInRegion} Master Artisans
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 6. TRADITIONAL FOOD STORIES ─────────────────────────────────────── */}
      <section className="py-14 px-4 sm:px-6 lg:px-10 border-b-2 border-[#0c0f14]/15">
        <div className="max-w-[1320px] mx-auto">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <div className="font-hand text-base font-bold text-[#059669] mb-1">
                Culinary Heritage & Heirloom Recipes
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#0c0f14] tracking-tight">
                TRADITIONAL FOOD <span className="marker-underline text-[#059669]">STORIES</span>
              </h2>
            </div>
            <Link
              href="/food-stories"
              className="btn-retro px-4 py-2 bg-white hover:bg-[#bbf7d0] text-[#0c0f14] font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-retro"
            >
              ALL RECIPE STORIES →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {foodStories.slice(0, 3).map((food) => (
              <div
                key={food.id}
                className="card-retro bg-white p-5 border-[2.5px] border-[#0c0f14] shadow-retro-md hover:shadow-retro-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-hand font-bold text-zinc-700 mb-2">
                    <span className="font-sans font-bold uppercase text-[10px] text-[#059669]">{food.flavorProfile[0] || 'Ancestral Flavor'}</span>
                    <span>{food.region}</span>
                  </div>

                  <div className="aspect-[16/10] rounded-xl overflow-hidden border-2 border-black mb-3 bg-zinc-200 shadow-retro-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={food.imageUrl} alt={food.name} className="w-full h-full object-cover" />
                  </div>

                  <h3 className="font-display text-2xl font-bold text-[#0c0f14] mb-1">{food.name}</h3>
                  <p className="text-xs text-zinc-700 line-clamp-2 font-medium mb-3">
                    {food.story}
                  </p>
                </div>

                <div className="pt-3 border-t border-black/10 flex items-center justify-between">
                  <Link
                    href={`/food-stories/${food.id}`}
                    className="font-display text-xs font-black uppercase text-[#0c0f14] hover:text-[#059669] flex items-center gap-1"
                  >
                    <span>RECIPE & GRANDMA&apos;S NOTE</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                  <span className="text-[10px] font-hand font-bold text-zinc-600">
                    🌱 {food.culturalOccasions[0] || 'Heirloom Lore'}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
