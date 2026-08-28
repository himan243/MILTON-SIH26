'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Search, X, Gamepad2, Hammer, UtensilsCrossed, Package, Sparkles, Wand2 } from 'lucide-react';
import type { TraditionalGame, TraditionalCraft, FoodStory, ArtisanProduct, NostalgicBuild } from '@/types';

interface SearchResults {
  games: TraditionalGame[];
  crafts: TraditionalCraft[];
  foods: FoodStory[];
  products: ArtisanProduct[];
  builds: NostalgicBuild[];
  total: number;
}

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, games, crafts, products, foodStories, nostalgicBuilds } = useApp();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'games' | 'crafts' | 'food' | 'products' | 'builds'>('all');

  const filteredResults = useMemo((): SearchResults | null => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();

    const matchedGames = (activeFilter === 'all' || activeFilter === 'games')
      ? games.filter(g => g.name.toLowerCase().includes(q) || g.region.toLowerCase().includes(q) || g.tagline.toLowerCase().includes(q))
      : [];

    const matchedCrafts = (activeFilter === 'all' || activeFilter === 'crafts')
      ? crafts.filter(c => c.name.toLowerCase().includes(q) || c.region.toLowerCase().includes(q) || c.category.toLowerCase().includes(q))
      : [];

    const matchedFoods = (activeFilter === 'all' || activeFilter === 'food')
      ? foodStories.filter(f => f.name.toLowerCase().includes(q) || f.region.toLowerCase().includes(q) || f.story.toLowerCase().includes(q))
      : [];

    const matchedProducts = (activeFilter === 'all' || activeFilter === 'products')
      ? products.filter(p => p.title.toLowerCase().includes(q) || p.artisanName.toLowerCase().includes(q))
      : [];

    const matchedBuilds = (activeFilter === 'all' || activeFilter === 'builds')
      ? nostalgicBuilds.filter(b => b.title.toLowerCase().includes(q) || b.subhead.toLowerCase().includes(q))
      : [];

    return {
      games: matchedGames,
      crafts: matchedCrafts,
      foods: matchedFoods,
      products: matchedProducts,
      builds: matchedBuilds,
      total: matchedGames.length + matchedCrafts.length + matchedFoods.length + matchedProducts.length + matchedBuilds.length
    };
  }, [query, activeFilter, games, crafts, foodStories, products, nostalgicBuilds]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-3xl card-retro bg-[#faf8f5] border-[2.5px] border-[#0c0f14] shadow-retro-xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[85vh] relative">
        
        {/* Washi Tape at Top */}
        <div className="washi-tape" />

        {/* Search Header */}
        <div className="p-4 sm:p-5 border-b-2 border-[#0c0f14] flex items-center gap-3 bg-[#f4eee3]">
          <div className="w-9 h-9 rounded-xl border-2 border-black bg-[#fef08a] flex items-center justify-center shadow-retro-sm">
            <Search className="w-4 h-4 text-[#0c0f14]" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search folk games, bamboo crafts, recipes, memories..."
            className="flex-1 bg-transparent text-base sm:text-lg font-bold text-[#0c0f14] placeholder-zinc-500 outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1.5 rounded-lg text-zinc-600 hover:text-black hover:bg-black/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-3 py-1.5 bg-[#0c0f14] text-white rounded-xl text-xs font-display tracking-wider uppercase shadow-retro-sm hover:bg-zinc-800"
          >
            ESC
          </button>
        </div>

        {/* Category Filter Badges */}
        <div className="px-5 py-3 bg-[#e4e8ee] border-b-2 border-[#0c0f14] flex items-center gap-2 overflow-x-auto">
          {(['all', 'games', 'crafts', 'food', 'products', 'builds'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 rounded-xl text-xs font-display uppercase tracking-wider border-2 transition-all ${
                activeFilter === filter
                  ? 'bg-[#0c0f14] text-[#fef08a] border-black shadow-retro-sm'
                  : 'bg-white text-[#0c0f14] border-black hover:bg-[#fed7aa]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Search Results Area */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-creased-paper">
          {!query.trim() ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-2xl border-2 border-black bg-[#fef08a] flex items-center justify-center mx-auto shadow-retro">
                <Sparkles className="w-6 h-6 text-[#d97706]" />
              </div>
              <p className="font-display text-2xl font-bold text-[#0c0f14] tracking-wide">
                SEARCH THE LIVING MUSEUM
              </p>
              <p className="font-hand text-base sm:text-lg text-zinc-700 font-bold max-w-sm mx-auto leading-tight">
                Try searching &quot;Pittu&quot;, &quot;Japi&quot;, &quot;Khar&quot;, &quot;Bamboo&quot;, &quot;Longpi&quot; or &quot;Gilli Danda&quot;!
              </p>
            </div>
          ) : !filteredResults || filteredResults.total === 0 ? (
            <div className="text-center py-12 space-y-2">
              <p className="font-display text-xl font-bold text-[#0c0f14]">No archival records found for &quot;{query}&quot;</p>
              <p className="font-hand text-base text-[#ef4444] font-bold">
                Know something about this? Use the &quot;PRESERVE&quot; button to submit it!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Games Matches */}
              {filteredResults.games.length > 0 && (
                <div className="space-y-2">
                  <div className="font-display text-sm font-bold uppercase tracking-wider text-[#ef4444] flex items-center gap-1.5">
                    <Gamepad2 className="w-4 h-4" /> FORGOTTEN GAMES ({filteredResults.games.length})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {filteredResults.games.map((g) => (
                      <Link
                        key={g.id}
                        href={`/games/${g.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="p-3 bg-white rounded-2xl border-2 border-black hover:bg-[#fef08a] transition-all shadow-retro-sm flex items-center gap-3 group"
                      >
                        <div className="w-12 h-12 rounded-xl border border-black overflow-hidden shrink-0 bg-zinc-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={g.imageUrl} alt={g.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-display text-base font-bold text-[#0c0f14] truncate">{g.name}</div>
                          <div className="text-[11px] font-hand font-bold text-zinc-600 truncate">{g.region} • Level {g.difficultyLevel}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Crafts Matches */}
              {filteredResults.crafts.length > 0 && (
                <div className="space-y-2">
                  <div className="font-display text-sm font-bold uppercase tracking-wider text-[#d97706] flex items-center gap-1.5">
                    <Hammer className="w-4 h-4" /> TRADITIONAL CRAFTS ({filteredResults.crafts.length})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {filteredResults.crafts.map((c) => (
                      <Link
                        key={c.id}
                        href={`/crafts/${c.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="p-3 bg-white rounded-2xl border-2 border-black hover:bg-[#fed7aa] transition-all shadow-retro-sm flex items-center gap-3 group"
                      >
                        <div className="w-12 h-12 rounded-xl border border-black overflow-hidden shrink-0 bg-zinc-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={c.imageUrl} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-display text-base font-bold text-[#0c0f14] truncate">{c.name}</div>
                          <div className="text-[11px] font-hand font-bold text-zinc-600 truncate">{c.category} • {c.state}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Food Stories Matches */}
              {filteredResults.foods.length > 0 && (
                <div className="space-y-2">
                  <div className="font-display text-sm font-bold uppercase tracking-wider text-[#059669] flex items-center gap-1.5">
                    <UtensilsCrossed className="w-4 h-4" /> FOOD STORIES ({filteredResults.foods.length})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {filteredResults.foods.map((f) => (
                      <Link
                        key={f.id}
                        href={`/food-stories/${f.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="p-3 bg-white rounded-2xl border-2 border-black hover:bg-[#bbf7d0] transition-all shadow-retro-sm flex items-center gap-3 group"
                      >
                        <div className="w-12 h-12 rounded-xl border border-black overflow-hidden shrink-0 bg-zinc-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={f.imageUrl} alt={f.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-display text-base font-bold text-[#0c0f14] truncate">{f.name}</div>
                          <div className="text-[11px] font-hand font-bold text-zinc-600 truncate">{f.region}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Marketplace Products Matches */}
              {filteredResults.products.length > 0 && (
                <div className="space-y-2">
                  <div className="font-display text-sm font-bold uppercase tracking-wider text-[#9333ea] flex items-center gap-1.5">
                    <Package className="w-4 h-4" /> VERIFIED MARKETPLACE ({filteredResults.products.length})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {filteredResults.products.map((p) => (
                      <Link
                        key={p.id}
                        href={`/marketplace#${p.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="p-3 bg-white rounded-2xl border-2 border-black hover:bg-[#e9d5ff] transition-all shadow-retro-sm flex items-center gap-3 group"
                      >
                        <div className="w-12 h-12 rounded-xl border border-black overflow-hidden shrink-0 bg-zinc-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-display text-base font-bold text-[#0c0f14] truncate">{p.title}</div>
                          <div className="text-[11px] font-hand font-bold text-zinc-700 truncate">₹{p.priceInr} • By {p.artisanName}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
};
