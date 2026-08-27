'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Search, X, Gamepad2, Hammer, UtensilsCrossed, Package, Sparkles } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#061b0e]/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-[#fcf9f3] rounded-3xl border border-[#c3c8c1] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]">
        
        {/* Search Header */}
        <div className="p-4 sm:p-6 border-b border-[#c3c8c1]/60 flex items-center gap-3 bg-[#ffffff]">
          <Search className="w-5 h-5 text-[#974730]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search forgotten games, bamboo crafts, food stories, artisans..."
            className="flex-1 bg-transparent text-base sm:text-lg font-medium text-[#061b0e] placeholder-[#737973] outline-none"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 rounded-full text-[#737973] hover:text-[#061b0e]">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-3 py-1.5 bg-[#f0eee8] text-[#061b0e] rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#e5e2dc]"
          >
            Esc
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-6 py-3 bg-[#f6f3ed] border-b border-[#c3c8c1]/40 flex items-center gap-2 overflow-x-auto">
          {(['all', 'games', 'crafts', 'food', 'products', 'builds'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                activeFilter === filter
                  ? 'bg-[#1b3022] text-[#fcf9f3]'
                  : 'bg-[#ffffff] text-[#434843] hover:bg-[#ebe8e2]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Search Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {!query.trim() ? (
            <div className="text-center py-12">
              <Sparkles className="w-8 h-8 text-[#c08820] mx-auto mb-3 opacity-60" />
              <p className="font-display text-lg font-bold text-[#061b0e]">Explore the Living Museum</p>
              <p className="text-xs text-[#737973] mt-1 max-w-sm mx-auto">
                Type keywords like &quot;Pittu&quot;, &quot;Japi&quot;, &quot;Khar&quot;, &quot;Bamboo&quot;, or &quot;Gilli Danda&quot; to search the Northeast cultural archive.
              </p>
            </div>
          ) : !filteredResults || filteredResults.total === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm font-medium text-[#737973]">No archival records matched &quot;{query}&quot;</p>
              <p className="text-xs text-[#974730] mt-2 cursor-pointer hover:underline">
                Know about this? Submit it to our museum archive!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Games Matches */}
              {filteredResults.games.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#974730] flex items-center gap-2 mb-2">
                    <Gamepad2 className="w-4 h-4" /> Forgotten Games ({filteredResults.games.length})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {filteredResults.games.map((g) => (
                      <Link
                        key={g.id}
                        href={`/games/${g.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="p-3 bg-[#ffffff] rounded-2xl border border-[#c3c8c1]/50 hover:border-[#974730] transition-colors flex items-center gap-3"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#f0eee8] overflow-hidden shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={g.imageUrl} alt={g.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#061b0e]">{g.name}</div>
                          <div className="text-[11px] text-[#737973] truncate">{g.region}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Crafts Matches */}
              {filteredResults.crafts.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#c08820] flex items-center gap-2 mb-2">
                    <Hammer className="w-4 h-4" /> Traditional Crafts ({filteredResults.crafts.length})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {filteredResults.crafts.map((c) => (
                      <Link
                        key={c.id}
                        href={`/crafts/${c.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="p-3 bg-[#ffffff] rounded-2xl border border-[#c3c8c1]/50 hover:border-[#c08820] transition-colors flex items-center gap-3"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#f0eee8] overflow-hidden shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={c.imageUrl} alt={c.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#061b0e]">{c.name}</div>
                          <div className="text-[11px] text-[#737973] truncate">{c.category} • {c.state}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Food Stories Matches */}
              {filteredResults.foods.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#1b3022] flex items-center gap-2 mb-2">
                    <UtensilsCrossed className="w-4 h-4" /> Food Stories ({filteredResults.foods.length})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {filteredResults.foods.map((f) => (
                      <Link
                        key={f.id}
                        href={`/food-stories/${f.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="p-3 bg-[#ffffff] rounded-2xl border border-[#c3c8c1]/50 hover:border-[#1b3022] transition-colors flex items-center gap-3"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#f0eee8] overflow-hidden shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={f.imageUrl} alt={f.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#061b0e]">{f.name}</div>
                          <div className="text-[11px] text-[#737973] truncate">{f.region}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Marketplace Products Matches */}
              {filteredResults.products.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#772f1a] flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4" /> Verified Marketplace Items ({filteredResults.products.length})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {filteredResults.products.map((p) => (
                      <Link
                        key={p.id}
                        href={`/marketplace#${p.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="p-3 bg-[#ffffff] rounded-2xl border border-[#c3c8c1]/50 hover:border-[#772f1a] transition-colors flex items-center gap-3"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#f0eee8] overflow-hidden shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#061b0e]">{p.title}</div>
                          <div className="text-[11px] text-[#737973]">₹{p.priceInr} • By {p.artisanName}</div>
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
