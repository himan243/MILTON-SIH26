'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Hammer,
  Search,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  ShieldCheck,
  Folder,
  Clock,
  MapPin
} from 'lucide-react';

export default function CraftsPage() {
  const { crafts, user, toggleSaveCraft, t } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', 'Bamboo & Cane', 'Pottery & Clay', 'Handloom & Weaving', 'Household Tools'];

  const filteredCrafts = crafts.filter((craft) => {
    const matchesCat = selectedCategory === 'all' || craft.category === selectedCategory;
    const matchesSearch =
      craft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      craft.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      craft.state.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="lg:pl-[354px] min-h-screen bg-[#faf8f5] bg-creased-paper py-10 sm:py-14 px-4 sm:px-6 lg:px-10 transition-all">
      <div className="max-w-[1320px] mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#fef08a] border-2 border-black rounded-full font-display text-xs uppercase tracking-wider shadow-retro-sm mb-3">
            <Hammer className="w-4 h-4 text-[#d97706]" /> Indigenous Craft & Bamboo Guilds
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#0c0f14] leading-[1.05] tracking-tight mb-3">
            TRADITIONAL <span className="marker-yellow">CRAFTS</span> OF NORTHEAST INDIA
          </h1>
          <p className="font-hand text-xl text-zinc-700 font-bold leading-relaxed">
            Centuries of sustainable ecology — turning wild mountain bamboo, clay, and golden silk into timeless heritage marvels.
          </p>
        </div>

        {/* Filter & Category Bar on Kraft Card */}
        <div className="card-retro bg-[#f4eee3] p-4 sm:p-5 border-[2.5px] border-[#0c0f14] shadow-retro-md mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-zinc-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search crafts by name, state, material..."
              className="w-full pl-10 pr-4 py-2 bg-white border-2 border-black rounded-xl text-xs font-bold text-[#0c0f14] placeholder-zinc-500 outline-none shadow-retro-sm"
            />
          </div>

          {/* Category Badges */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-display text-xs uppercase tracking-wider border-2 whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0c0f14] text-[#fef08a] border-black shadow-retro-sm'
                    : 'bg-white text-[#0c0f14] border-black hover:bg-[#fed7aa]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Crafts 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCrafts.map((craft) => (
            <div
              key={craft.id}
              className="card-retro bg-white p-5 sm:p-6 border-[2.5px] border-[#0c0f14] shadow-retro-md hover:shadow-retro-lg transition-all grid grid-cols-1 sm:grid-cols-12 gap-5 group relative"
            >
              <div className="pushpin-red" />

              {/* Left Image Media */}
              <div className="sm:col-span-5 relative aspect-square sm:aspect-auto rounded-xl overflow-hidden border-2 border-black bg-zinc-200 shadow-retro-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={craft.imageUrl}
                  alt={craft.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 bg-white/95 border border-black rounded-md font-display text-[10px] uppercase">
                  {craft.category}
                </span>
              </div>

              {/* Right Content */}
              <div className="sm:col-span-7 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1 pr-6">
                    <span className="font-display text-xs uppercase text-[#ef4444] font-bold">
                      {craft.region}, {craft.state}
                    </span>
                    <span className="rubber-stamp rubber-stamp-green text-[9px] py-0.5">
                      {craft.preservationStatus}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0c0f14] group-hover:text-[#d97706] transition-colors leading-tight">
                    {craft.name}
                  </h3>

                  {craft.indigenousName && (
                    <p className="font-hand text-xs text-zinc-600 font-bold italic mt-0.5">
                      Local name: {craft.indigenousName}
                    </p>
                  )}

                  <p className="text-xs text-zinc-700 line-clamp-3 mt-2 font-medium leading-relaxed">
                    {craft.culturalSignificance}
                  </p>
                </div>

                <div className="pt-3 border-t border-black/10 flex items-center justify-between">
                  <Link
                    href={`/crafts/${craft.id}`}
                    className="btn-retro px-3 py-1.5 bg-[#0c0f14] hover:bg-zinc-800 text-[#fef08a] font-display text-xs font-black uppercase tracking-wider rounded-lg shadow-retro-sm flex items-center gap-1"
                  >
                    <span>EXPLORE TECHNIQUE</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>

                  <button
                    onClick={() => toggleSaveCraft(craft.id)}
                    className="p-1.5 rounded-lg hover:bg-zinc-100 transition-colors"
                  >
                    {user.savedCraftIds.includes(craft.id) ? (
                      <BookmarkCheck className="w-4 h-4 text-[#ef4444] fill-current" />
                    ) : (
                      <Bookmark className="w-4 h-4 text-zinc-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
