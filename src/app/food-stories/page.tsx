'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { UtensilsCrossed, Search, Bookmark, BookmarkCheck, ChevronRight, Sparkles, BookOpen } from 'lucide-react';

export default function FoodStoriesPage() {
  const { foodStories, user, toggleSaveFood, setIsPreserveModalOpen, t } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFoods = foodStories.filter(
    (food) =>
      food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fcf9f3] py-12 sm:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fe997c]/20 text-[#772f1a] text-xs font-bold uppercase tracking-wider mb-4">
            <UtensilsCrossed className="w-4 h-4 text-[#974730]" /> Culinary History & Herbal Wisdom
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#061b0e] leading-tight mb-4">
            Traditional Food Stories of the Northeast
          </h1>
          <p className="text-base text-[#434843] leading-relaxed">
            A cultural chronicle celebrating fermented bamboo shoots, alkaline banana ash extracts (Khar), medicinal forest herbs, and seasonal hearth stews. We document memory and technique—not fast delivery.
          </p>
        </div>

        {/* Action & Search Bar */}
        <div className="bg-[#f0eee8] rounded-3xl p-4 sm:p-6 border border-[#c3c8c1] mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-[#737973] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes, ingredients, regions..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#ffffff] border border-[#c3c8c1] text-xs font-medium text-[#061b0e] focus:border-[#974730] outline-none"
            />
          </div>

          <button
            onClick={() => setIsPreserveModalOpen(true)}
            className="w-full md:w-auto px-6 py-2.5 bg-[#974730] hover:bg-[#772f1a] text-[#fcf9f3] text-xs font-bold uppercase tracking-wider rounded-full shadow-md transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4" /> Submit a Family Recipe
          </button>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredFoods.map((food) => (
            <div
              key={food.id}
              className="bg-[#ffffff] rounded-3xl border border-[#c3c8c1] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/11] bg-[#e5e2dc] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={food.imageUrl}
                    alt={food.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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

                <div className="p-6 space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#974730]">
                    {food.region}
                  </span>

                  <h3 className="font-display text-2xl font-bold text-[#061b0e] group-hover:text-[#974730] transition-colors">
                    {food.name}
                  </h3>

                  <p className="text-xs text-[#772f1a] font-semibold italic">
                    {food.indigenousName}
                  </p>

                  <p className="text-xs text-[#434843] line-clamp-3 leading-relaxed">
                    {food.story}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {food.flavorProfile.slice(0, 2).map((flv, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 bg-[#f6f3ed] text-[#1b3022] text-[10px] font-semibold rounded-full border border-[#c3c8c1]/40">
                      {flv}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#f0eee8] flex items-center justify-between">
                  <Link
                    href={`/food-stories/${food.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#061b0e] group-hover:text-[#974730]"
                  >
                    <span>Read Recipe & Occasions</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
