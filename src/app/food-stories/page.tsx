'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { UtensilsCrossed, Search, Bookmark, BookmarkCheck, ChevronRight, BookOpen, Clock, Folder, Sparkles } from 'lucide-react';

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
        
        {/* Header with Spring Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 20 }}
          className="max-w-3xl mb-10"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#bbf7d0] border-2 border-black rounded-full font-display text-xs uppercase tracking-wider shadow-retro-sm mb-3">
            <UtensilsCrossed className="w-4 h-4 text-[#059669]" /> Culinary History & Herbal Wisdom
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#0c0f14] leading-[1.05] tracking-tight mb-3">
            TRADITIONAL FOOD <span className="marker-underline text-[#059669]">STORIES</span>
          </h1>
          <p className="font-hand text-xl text-zinc-700 font-bold leading-relaxed">
            A cultural chronicle celebrating fermented bamboo shoots, alkaline banana ash extracts (Khar), medicinal forest herbs, and slow hearth stews.
          </p>
        </motion.div>

        {/* Action & Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="card-retro bg-[#f4eee3] p-4 sm:p-5 border-[2.5px] border-[#0c0f14] shadow-retro-md mb-10 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-zinc-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes, ingredients, regions..."
              className="w-full pl-10 pr-4 py-2 bg-white border-2 border-black rounded-xl text-xs font-bold text-[#0c0f14] placeholder-zinc-500 outline-none shadow-retro-sm focus:ring-2 focus:ring-[#059669]"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsPreserveModalOpen(true)}
            className="btn-retro w-full md:w-auto px-5 py-2.5 bg-[#059669] hover:bg-[#047857] text-white font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-retro flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4" /> SUBMIT A FAMILY RECIPE (+120 XP)
          </motion.button>
        </motion.div>

        {/* Stories Grid with Framer Motion Layout */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredFoods.map((food, idx) => (
              <motion.div
                key={food.id}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                whileHover={{ y: -7, scale: 1.015 }}
                className={`card-retro bg-white p-5 border-[2.5px] border-[#0c0f14] shadow-retro-md hover:shadow-retro-lg flex flex-col justify-between group relative ${
                  idx % 2 === 0 ? 'tilt-subtle-right' : 'tilt-subtle-left'
                }`}
              >
                {idx % 3 === 0 && <div className="washi-tape-mint" />}
                {idx % 3 === 1 && <div className="washi-tape-coral" />}
                {idx % 3 === 2 && <div className="washi-tape-lavender" />}

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
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      onClick={() => { toggleSaveFood(food.id); triggerConfetti(); }}
                      className="p-1 rounded-full hover:bg-zinc-100 transition-colors"
                      title="Save Recipe"
                    >
                      {user.savedFoodIds.includes(food.id) ? (
                        <BookmarkCheck className="w-4 h-4 text-[#ef4444] fill-current" />
                      ) : (
                        <Bookmark className="w-4 h-4 text-zinc-600" />
                      )}
                    </motion.button>
                  </div>

                  {/* Photo */}
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden border-2 border-black mb-3 bg-zinc-200 shadow-retro-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={food.imageUrl}
                      alt={food.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-0.5 bg-white/95 border border-black rounded-md font-display text-[10px] uppercase shadow-retro-sm">
                      {food.region}
                    </div>
                    <div className="absolute bottom-2 right-2 px-2.5 py-0.5 bg-[#fef08a] border border-black rounded-md font-display text-[10px] uppercase text-[#0c0f14] shadow-retro-sm">
                      {food.flavorProfile}
                    </div>
                  </div>

                  {/* Title & Lore */}
                  <h3 className="font-display text-2xl font-bold text-[#0c0f14] group-hover:text-[#059669] transition-colors leading-tight mb-1">
                    {food.name}
                  </h3>
                  <p className="text-xs text-zinc-700 line-clamp-3 font-medium leading-relaxed mb-3">
                    {food.story}
                  </p>
                </div>

                <div className="pt-3 border-t border-black/10 flex items-center justify-between">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href={`/food-stories/${food.id}`}
                      className="btn-retro px-3.5 py-1.5 bg-[#0c0f14] hover:bg-zinc-800 text-[#fef08a] font-display text-xs font-black uppercase tracking-wider rounded-lg shadow-retro-sm flex items-center gap-1 group/btn"
                    >
                      <span>RECIPE & LORE</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                  <span className="text-[10px] font-hand font-bold text-zinc-600">
                    🌱 {food.culturalOccasions[0] || 'Heirloom Lore'}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}

