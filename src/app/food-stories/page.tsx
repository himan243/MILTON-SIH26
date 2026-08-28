'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { UtensilsCrossed, Search, Bookmark, BookmarkCheck, ChevronRight, BookOpen, Clock, Folder } from 'lucide-react';

export default function FoodStoriesPage() {
  const { foodStories, user, toggleSaveFood, setIsPreserveModalOpen, t, triggerConfetti } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFoods = foodStories.filter(
    (food) =>
      food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="lg:pl-[354px] min-h-screen bg-[#faf8f5] bg-creased-paper py-10 sm:py-14 px-4 sm:px-6 lg:px-10 transition-all">
      <div className="max-w-[1320px] mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#bbf7d0] border-2 border-black rounded-full font-display text-xs uppercase tracking-wider shadow-retro-sm mb-3">
            <UtensilsCrossed className="w-4 h-4 text-[#059669]" /> Culinary History & Herbal Wisdom
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#0c0f14] leading-[1.05] tracking-tight mb-3">
            TRADITIONAL FOOD <span className="marker-underline text-[#059669]">STORIES</span>
          </h1>
          <p className="font-hand text-xl text-zinc-700 font-bold leading-relaxed">
            A cultural chronicle celebrating fermented bamboo shoots, alkaline banana ash extracts (Khar), medicinal forest herbs, and slow hearth stews.
          </p>
        </div>

        {/* Action & Search Bar */}
        <div className="card-retro bg-[#f4eee3] p-4 sm:p-5 border-[2.5px] border-[#0c0f14] shadow-retro-md mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-zinc-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes, ingredients, regions..."
              className="w-full pl-10 pr-4 py-2 bg-white border-2 border-black rounded-xl text-xs font-bold text-[#0c0f14] placeholder-zinc-500 outline-none shadow-retro-sm"
            />
          </div>

          <button
            onClick={() => setIsPreserveModalOpen(true)}
            className="btn-retro w-full md:w-auto px-5 py-2.5 bg-[#059669] hover:bg-[#047857] text-white font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-retro flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4" /> SUBMIT A FAMILY RECIPE (+120 XP)
          </button>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoods.map((food) => (
            <div
              key={food.id}
              className="card-retro bg-white p-5 border-[2.5px] border-[#0c0f14] shadow-retro-md hover:shadow-retro-lg transition-all flex flex-col justify-between group relative"
            >
              <div className="pushpin-red" />

              <div>
                {/* Top Metadata */}
                <div className="flex items-center justify-between text-xs font-hand font-bold text-zinc-700 pb-2 mb-3 border-b border-black/10">
                  <div className="flex items-center gap-1.5 truncate pr-6">
                    <Folder className="w-3.5 h-3.5 text-[#059669]" />
                    <span className="font-sans uppercase text-[10px] font-bold text-[#0c0f14]">{food.state}</span>
                    <span>—</span>
                    <Clock className="w-3 h-3 text-zinc-500" />
                    <span>{food.culturalOccasions[0] || 'Seasonal Occasion'}</span>
                  </div>
                  <button
                    onClick={() => { toggleSaveFood(food.id); triggerConfetti(); }}
                    className="p-1 rounded-full hover:bg-zinc-100 transition-colors"
                  >
                    {user.savedFoodIds.includes(food.id) ? (
                      <BookmarkCheck className="w-4 h-4 text-[#ef4444] fill-current" />
                    ) : (
                      <Bookmark className="w-4 h-4 text-zinc-600" />
                    )}
                  </button>
                </div>

                {/* Photo */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden border-2 border-black mb-3 bg-zinc-200 shadow-retro-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={food.imageUrl}
                    alt={food.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-0.5 bg-white/95 border border-black rounded-md font-display text-[10px] uppercase">
                    {food.region}
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold text-[#0c0f14] group-hover:text-[#059669] transition-colors leading-tight">
                  {food.name}
                </h3>
                <p className="font-hand text-xs text-zinc-600 font-bold italic mb-2">
                  {food.indigenousName}
                </p>

                <p className="text-xs text-zinc-700 line-clamp-3 font-medium leading-relaxed mb-3">
                  {food.story}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {food.flavorProfile.slice(0, 2).map((flv, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-[#f4eee3] text-[#0c0f14] text-[10px] font-bold rounded-md border border-black">
                      {flv}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-black/10 flex items-center justify-between">
                  <Link
                    href={`/food-stories/${food.id}`}
                    className="btn-retro px-3.5 py-1.5 bg-[#0c0f14] hover:bg-zinc-800 text-[#fef08a] font-display text-xs font-black uppercase tracking-wider rounded-lg shadow-retro-sm flex items-center gap-1"
                  >
                    <span>RECIPE & LORE</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                  <span className="font-hand text-xs font-bold text-zinc-600">
                    Grandma&apos;s Secret Notes
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
