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
  Flame,
  Radio,
  MapPin
} from 'lucide-react';

export default function HomePage() {
  const {
    t,
    games,
    crafts,
    foodStories,
    nostalgicBuilds,
    sessions,
    products,
    user,
    toggleSaveGame,
    toggleSaveCraft,
    toggleSaveFood,
    setIsPreserveModalOpen
  } = useApp();

  const [activeBuildIndex, setActiveBuildIndex] = useState(0);
  const featuredGame = games[0]; // Pittu (Seven Stones)

  return (
    <div className="flex flex-col w-full relative">
      
      {/* 1. HERO SECTION: Living Museum Discovery */}
      <section className="relative w-full min-h-[720px] lg:min-h-[820px] flex items-center justify-center pt-8 pb-20 overflow-hidden bg-[#f0eee8] border-b border-[#c3c8c1]/60">
        
        {/* Editorial Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center opacity-40 mix-blend-multiply scale-105 transition-transform duration-1000"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=2000&q=80')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f0eee8] via-[#f0eee8]/70 to-transparent" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d0e9d4]/30 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#ffddae]/30 rounded-full blur-[90px] pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffffff]/80 backdrop-blur-md border border-[#c3c8c1] shadow-sm mb-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <span className="w-2 h-2 rounded-full bg-[#974730] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#061b0e]">
              Living Museum & Archival Revival
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-[#061b0e] max-w-5xl mb-6 leading-[1.12] tracking-tight drop-shadow-sm">
            {t.heroHeadline}
          </h1>

          <p className="text-base sm:text-xl text-[#434843] max-w-3xl mb-10 leading-relaxed font-normal">
            {t.heroSubheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
            <Link
              href="#discover-today"
              className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 bg-[#061b0e] text-[#fcf9f3] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#1b3022] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              {t.startDiscovering}
            </Link>
            <Link
              href="/create-with-ai"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#fe997c]/30 border border-[#974730]/40 text-[#772f1a] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#fe997c]/50 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#974730]" /> {t.createSomething}
            </Link>
          </div>

          {/* Live Northeast Revival Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 w-full max-w-4xl pt-8 border-t border-[#c3c8c1]/60 text-left">
            <div className="p-4 bg-[#ffffff]/60 backdrop-blur-md rounded-2xl border border-[#c3c8c1]/40">
              <div className="font-display text-2xl font-bold text-[#061b0e]">7+ Folk Games</div>
              <div className="text-[11px] text-[#737973] uppercase font-semibold">Archived with Rules</div>
            </div>
            <div className="p-4 bg-[#ffffff]/60 backdrop-blur-md rounded-2xl border border-[#c3c8c1]/40">
              <div className="font-display text-2xl font-bold text-[#974730]">450+ Artisans</div>
              <div className="text-[11px] text-[#737973] uppercase font-semibold">Bamboo & Stone Guilds</div>
            </div>
            <div className="p-4 bg-[#ffffff]/60 backdrop-blur-md rounded-2xl border border-[#c3c8c1]/40">
              <div className="font-display text-2xl font-bold text-[#c08820]">100% Free & Open</div>
              <div className="text-[11px] text-[#737973] uppercase font-semibold">Zero-Cost Discovery</div>
            </div>
            <div className="p-4 bg-[#ffffff]/60 backdrop-blur-md rounded-2xl border border-[#c3c8c1]/40">
              <div className="font-display text-2xl font-bold text-[#1b3022]">5 Languages</div>
              <div className="text-[11px] text-[#737973] uppercase font-semibold">EN, AS, BN, HI, BODO</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TODAY'S NOSTALGIC DISCOVERY (FEATURED ARCHIVAL CARD 01) */}
      <section id="discover-today" className="py-20 lg:py-28 bg-[#fcf9f3]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#974730] flex items-center gap-2 mb-2">
                <Compass className="w-4 h-4" /> Daily Curated Spotlight
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#061b0e]">
                {t.todaysDiscovery}
              </h2>
            </div>
            <Link
              href="/games"
              className="text-xs font-bold uppercase tracking-wider text-[#061b0e] hover:text-[#974730] flex items-center gap-1 group"
            >
              <span>View All 7 Games</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Asymmetric Dual Column Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#f0eee8] rounded-3xl p-6 sm:p-10 border border-[#c3c8c1] shadow-xl relative overflow-hidden">
            
            {/* Background watermark index 01 */}
            <div className="absolute top-2 right-6 font-display text-[140px] font-bold text-[#1b3022]/5 select-none pointer-events-none">
              01
            </div>

            {/* Left Image Media */}
            <div className="lg:col-span-7 relative group rounded-2xl overflow-hidden shadow-lg aspect-[16/10] bg-[#e5e2dc]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featuredGame.coverImage}
                alt={featuredGame.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 bg-[#ffffff]/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase text-[#061b0e] shadow-sm">
                  Folk Street Heritage
                </span>
                <span className="px-3 py-1 bg-[#fbbb51]/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase text-[#281800] shadow-sm">
                  {featuredGame.playersCount}
                </span>
              </div>
              <button
                onClick={() => toggleSaveGame(featuredGame.id)}
                className="absolute top-4 right-4 p-2.5 bg-[#ffffff]/90 backdrop-blur-md rounded-full text-[#061b0e] hover:text-[#974730] shadow-md transition-colors"
                title="Save to Personal Archive"
              >
                {user.savedGameIds.includes(featuredGame.id) ? (
                  <BookmarkCheck className="w-4 h-4 text-[#974730] fill-current" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Right Story & Rules Details */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#974730] block mb-2">
                  {t.featuredGame}
                </span>
                <h3 className="font-display text-2xl sm:text-4xl font-bold text-[#061b0e] mb-3">
                  {featuredGame.name}
                </h3>
                <p className="text-xs text-[#772f1a] font-medium italic mb-4">
                  Vernacular names: {Object.values(featuredGame.vernacularNames).join(' • ')}
                </p>
                <p className="text-sm text-[#434843] leading-relaxed mb-6">
                  {featuredGame.story}
                </p>

                {/* Key Attributes Grid */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-[#ffffff]/70 rounded-2xl border border-[#c3c8c1]/40 mb-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#737973] block">Region</span>
                    <span className="text-xs font-bold text-[#061b0e]">{featuredGame.region}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#737973] block">Difficulty</span>
                    <div className="flex gap-1 items-center mt-1">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <span
                          key={lvl}
                          className={`w-2 h-2 rounded-full ${
                            lvl <= featuredGame.difficultyLevel ? 'bg-[#974730]' : 'bg-[#c3c8c1]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#737973] block">Era</span>
                    <span className="text-xs font-bold text-[#061b0e]">{featuredGame.historicalEra}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#737973] block">Active Nearby</span>
                    <span className="text-xs font-bold text-[#1b3022] flex items-center gap-1">
                      <Radio className="w-3 h-3 text-[#974730] animate-pulse" />
                      {featuredGame.activePlayersNearbyCount} players looking
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 items-center">
                <Link
                  href={`/games/${featuredGame.id}`}
                  className="px-6 py-3 bg-[#061b0e] text-[#fcf9f3] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#1b3022] transition-colors shadow-md flex items-center gap-2"
                >
                  <Gamepad2 className="w-4 h-4" /> {t.readFullStory}
                </Link>
                <Link
                  href="/community"
                  className="px-6 py-3 bg-[#ffffff] border border-[#061b0e]/20 text-[#061b0e] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#f6f3ed] transition-colors flex items-center gap-1.5"
                >
                  <Users className="w-4 h-4 text-[#974730]" /> Find Players Nearby
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. "REMEMBER THIS?" INTERACTIVE CHILDHOOD BUILDS & TOYS */}
      <section className="py-20 bg-[#f6f3ed] border-y border-[#c3c8c1]/60">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#974730] block mb-1">
                Tactile Nostalgia
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#061b0e]">
                {t.rememberThis}
              </h2>
              <p className="text-sm text-[#434843] mt-2 max-w-xl">
                Objects and playful inventions we made as children with discarded bottle caps, banana leaves, and bamboo twigs.
              </p>
            </div>

            {/* Build Tabs */}
            <div className="flex gap-2 p-1.5 bg-[#ffffff] rounded-full border border-[#c3c8c1]">
              {nostalgicBuilds.map((build, idx) => (
                <button
                  key={build.id}
                  onClick={() => setActiveBuildIndex(idx)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeBuildIndex === idx
                      ? 'bg-[#1b3022] text-[#fcf9f3] shadow-sm'
                      : 'text-[#434843] hover:text-[#061b0e]'
                  }`}
                >
                  {build.title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Active Build Feature */}
          {nostalgicBuilds[activeBuildIndex] && (
            <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-10 border border-[#c3c8c1] shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden bg-[#f0eee8] relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={nostalgicBuilds[activeBuildIndex].imageUrl}
                  alt={nostalgicBuilds[activeBuildIndex].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 bg-[#1b3022]/90 backdrop-blur-md text-[#fcf9f3] px-3.5 py-1.5 rounded-full text-[11px] font-bold">
                  ⏱️ {nostalgicBuilds[activeBuildIndex].estimatedTime} • {nostalgicBuilds[activeBuildIndex].difficulty}
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
                <div className="text-xs font-bold uppercase tracking-widest text-[#c08820]">
                  Childhood DIY Blueprint
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#061b0e]">
                  {nostalgicBuilds[activeBuildIndex].title}
                </h3>
                <p className="text-sm text-[#434843] leading-relaxed">
                  {nostalgicBuilds[activeBuildIndex].nostalgiaStory}
                </p>

                {/* Materials Needed */}
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#737973] block mb-1.5">
                    Materials Needed:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {nostalgicBuilds[activeBuildIndex].materials.map((m, i) => (
                      <span key={i} className="px-3 py-1 bg-[#f6f3ed] text-[#1b3022] rounded-full text-xs font-medium border border-[#c3c8c1]/40">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Step Preview */}
                <div className="p-4 bg-[#fcf9f3] rounded-2xl border border-[#c3c8c1]/60">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#974730] block mb-1">
                    Step 1:
                  </span>
                  <p className="text-xs text-[#061b0e] leading-relaxed">
                    {nostalgicBuilds[activeBuildIndex].steps[0]}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <Link
                    href="/create-with-ai"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#974730] text-[#fcf9f3] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#772f1a] transition-colors shadow-md"
                  >
                    <Sparkles className="w-4 h-4" /> Try Making with AI
                  </Link>
                  <span className="text-xs text-[#737973]">
                    Learns: {nostalgicBuilds[activeBuildIndex].skillsLearned.join(', ')}
                  </span>
                </div>
              </div>

            </div>
          )}

        </div>
      </section>

      {/* 4. FORGOTTEN GAMES CATALOG PREVIEW */}
      <section className="py-20 lg:py-28 bg-[#fcf9f3]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#974730] block mb-1">
                Folk Sports & Street Lore
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#061b0e]">
                {t.navGames}
              </h2>
            </div>
            <Link
              href="/games"
              className="text-xs font-bold uppercase tracking-wider text-[#061b0e] hover:text-[#974730] flex items-center gap-1"
            >
              <span>Explore All Folk Games</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.slice(0, 3).map((game) => (
              <div
                key={game.id}
                className="bg-[#ffffff] rounded-3xl border border-[#c3c8c1] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-[16/10] bg-[#e5e2dc] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={game.imageUrl}
                    alt={game.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-[#1b3022]/90 backdrop-blur-md text-[#fcf9f3] text-[10px] font-bold uppercase rounded-full">
                    {game.playersCount}
                  </div>
                  <button
                    onClick={() => toggleSaveGame(game.id)}
                    className="absolute top-3 right-3 p-2 bg-[#ffffff]/90 backdrop-blur-md rounded-full text-[#061b0e] hover:text-[#974730] shadow-sm transition-colors"
                  >
                    {user.savedGameIds.includes(game.id) ? (
                      <BookmarkCheck className="w-4 h-4 text-[#974730] fill-current" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#974730] mb-1">
                      {game.region}
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#061b0e] group-hover:text-[#974730] transition-colors">
                      {game.name}
                    </h3>
                    <p className="text-xs text-[#434843] line-clamp-2 mt-2 leading-relaxed">
                      {game.tagline}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#f0eee8] flex items-center justify-between">
                    <Link
                      href={`/games/${game.id}`}
                      className="text-xs font-bold uppercase tracking-wider text-[#061b0e] group-hover:text-[#974730] flex items-center gap-1"
                    >
                      <span>How to Play</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                    <span className="text-[11px] font-medium text-[#737973]">
                      {game.activePlayersNearbyCount} players nearby
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. "MADE BY OUR PEOPLE" VERIFIED ARTISANS */}
      <section className="py-20 bg-[#f0eee8] border-y border-[#c3c8c1]/60">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#974730] flex items-center gap-1.5 mb-1">
                <ShieldCheck className="w-4 h-4 text-[#819986]" /> Verified Indigenous Craftsmen
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#061b0e]">
                {t.madeByOurPeople}
              </h2>
              <p className="text-sm text-[#434843] mt-2 max-w-xl">
                Connecting genuine Northeast master weavers, bamboo sculptors, and black pottery artists directly with patrons.
              </p>
            </div>
            <Link
              href="/marketplace"
              className="text-xs font-bold uppercase tracking-wider text-[#061b0e] hover:text-[#974730] flex items-center gap-1"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="bg-[#ffffff] rounded-3xl border border-[#c3c8c1] p-4 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#e5e2dc] mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-[#1b3022]/90 backdrop-blur-md text-[#fcf9f3] text-[10px] font-bold uppercase rounded-full">
                      {product.craftName}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-[#061b0e] line-clamp-2 mb-1 group-hover:text-[#974730] transition-colors">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.artisanAvatar} alt={product.artisanName} className="w-5 h-5 rounded-full object-cover" />
                    <span className="text-xs text-[#737973] truncate">{product.artisanName} ({product.artisanLocation})</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#f0eee8] flex items-center justify-between">
                  <div className="font-display text-base font-bold text-[#061b0e]">
                    ₹{product.priceInr.toLocaleString('en-IN')}
                  </div>
                  <Link
                    href={`/marketplace#${product.id}`}
                    className="px-4 py-2 bg-[#f0eee8] hover:bg-[#1b3022] hover:text-[#fcf9f3] text-[#061b0e] text-xs font-bold uppercase rounded-full transition-colors"
                  >
                    Inquire
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. CREATE SOMETHING WITH AI CALLOUT */}
      <section className="py-20 lg:py-28 bg-[#1b3022] text-[#fcf9f3] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c08820]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#974730]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#364c3c] text-[#fbbb51] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> AI Multimodal Upcycling Engine
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold leading-tight">
                {t.createWithAICallout}
              </h2>
              <p className="text-base text-[#b4cdb8] leading-relaxed max-w-xl">
                {t.createWithAISub}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-[#061b0e]/70 border border-[#364c3c] rounded-2xl">
                  <div className="text-sm font-bold text-[#fbbb51] mb-1">1. Snap / Upload</div>
                  <div className="text-xs text-[#b4cdb8]">Photo of bottle, bamboo, or cardboard</div>
                </div>
                <div className="p-4 bg-[#061b0e]/70 border border-[#364c3c] rounded-2xl">
                  <div className="text-sm font-bold text-[#fbbb51] mb-1">2. AI Identifies</div>
                  <div className="text-xs text-[#b4cdb8]">Extracts materials & structural possibilities</div>
                </div>
                <div className="p-4 bg-[#061b0e]/70 border border-[#364c3c] rounded-2xl">
                  <div className="text-sm font-bold text-[#fbbb51] mb-1">3. Step Guide & XP</div>
                  <div className="text-xs text-[#b4cdb8]">Generates instructions & awards badges</div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/create-with-ai"
                  className="inline-flex items-center gap-2 px-10 py-4 bg-[#fbbb51] text-[#061b0e] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#ffddae] transition-all shadow-xl hover:-translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4" /> {t.uploadPictureCTA}
                </Link>
              </div>
            </div>

            {/* Visual Teaser Mockup */}
            <div className="lg:col-span-5 bg-[#061b0e]/80 border border-[#364c3c] rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#b4cdb8] flex items-center justify-between pb-3 border-b border-[#364c3c]">
                <span>Sample AI Generation</span>
                <span className="text-[#fbbb51]">+150 XP</span>
              </div>

              <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-[#1b3022]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80"
                  alt="Bottle Cap Top"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="text-xs font-bold text-[#fbbb51]">Generated Creation:</div>
                <div className="font-display text-lg font-bold text-[#fcf9f3]">Acoustic Bamboo Wind Chime & Cap Spinner</div>
                <p className="text-xs text-[#b4cdb8] mt-1">
                  &quot;You have 2 glass bottles and discarded twine. Here are 4 easy steps to create a resonant wind ornament...&quot;
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. TRADITIONAL FOOD STORIES HIGHLIGHT */}
      <section className="py-20 lg:py-28 bg-[#fcf9f3]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#974730] flex items-center gap-1.5 mb-1">
                <UtensilsCrossed className="w-4 h-4 text-[#974730]" /> Cultural & Culinary Archive
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#061b0e]">
                {t.traditionalFoodStories}
              </h2>
              <p className="text-sm text-[#434843] mt-2 max-w-xl">
                Ancient cooking rituals, wild herbs, and fermented wisdom passed down through generations—not a delivery app, but a living culinary chronicle.
              </p>
            </div>
            <Link
              href="/food-stories"
              className="text-xs font-bold uppercase tracking-wider text-[#061b0e] hover:text-[#974730] flex items-center gap-1"
            >
              <span>Read All Food Stories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {foodStories.map((food) => (
              <div
                key={food.id}
                className="bg-[#ffffff] rounded-3xl border border-[#c3c8c1] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-[16/11] bg-[#e5e2dc] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={food.imageUrl}
                    alt={food.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-[#1b3022]/90 backdrop-blur-md text-[#fcf9f3] text-[10px] font-bold uppercase rounded-full">
                    {food.state}
                  </span>
                  <button
                    onClick={() => toggleSaveFood(food.id)}
                    className="absolute top-3 right-3 p-2 bg-[#ffffff]/90 backdrop-blur-md rounded-full text-[#061b0e] hover:text-[#974730] shadow-sm transition-colors"
                  >
                    {user.savedFoodIds.includes(food.id) ? (
                      <BookmarkCheck className="w-4 h-4 text-[#974730] fill-current" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#061b0e] group-hover:text-[#974730] transition-colors mb-1">
                      {food.name}
                    </h3>
                    <p className="text-xs text-[#772f1a] font-medium mb-3">{food.indigenousName}</p>
                    <p className="text-xs text-[#434843] line-clamp-3 leading-relaxed">
                      {food.story}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#f0eee8] flex items-center justify-between">
                    <Link
                      href={`/food-stories/${food.id}`}
                      className="text-xs font-bold uppercase tracking-wider text-[#061b0e] group-hover:text-[#974730] flex items-center gap-1"
                    >
                      <span>Read Recipe & History</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. NEARBY PLAYERS RADAR & SESSIONS */}
      <section className="py-20 bg-[#f0eee8] border-t border-[#c3c8c1]/60">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#974730] flex items-center gap-2 mb-1">
                <Radio className="w-4 h-4 text-[#974730] animate-pulse" /> Live Neighborhood Radar
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#061b0e]">
                {t.peopleArePlaying}
              </h2>
              <p className="text-sm text-[#434843] mt-2 max-w-xl">
                Real game sessions happening in nearby parks and courtyards. Your exact GPS location is protected by default.
              </p>
            </div>
            <Link
              href="/community"
              className="px-6 py-3 bg-[#061b0e] text-[#fcf9f3] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#1b3022] transition-colors shadow-md flex items-center gap-2"
            >
              <Users className="w-4 h-4" /> {t.hostSession}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="bg-[#ffffff] rounded-3xl border border-[#c3c8c1] p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-[#fe997c]/20 text-[#772f1a] text-[11px] font-bold uppercase rounded-full">
                      {session.gameTitle}
                    </span>
                    <span className="text-xs font-semibold text-[#737973] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#974730]" /> {session.state}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#061b0e]">
                    {session.locality}
                  </h3>
                  <div className="text-xs text-[#737973] mt-1">
                    🗓️ {session.date} • {session.time}
                  </div>
                  <p className="text-xs text-[#434843] mt-3 bg-[#f6f3ed] p-3 rounded-xl leading-relaxed">
                    &quot;{session.notes}&quot;
                  </p>
                </div>

                <div className="pt-3 border-t border-[#f0eee8] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {session.participants.slice(0, 3).map((p, i) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={i}
                          src={p.avatar}
                          alt={p.name}
                          className="w-7 h-7 rounded-full border-2 border-[#ffffff] object-cover"
                        />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-[#061b0e]">
                      {session.currentPlayers}/{session.maxPlayers} Players
                    </span>
                  </div>

                  <Link
                    href={`/community?session=${session.id}`}
                    className="px-5 py-2 bg-[#1b3022] hover:bg-[#061b0e] text-[#fcf9f3] text-xs font-bold uppercase rounded-full transition-colors"
                  >
                    {t.joinSession}
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
