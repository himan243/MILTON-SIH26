'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Hammer, Search, Bookmark, BookmarkCheck, ChevronRight, ShieldCheck, Layers } from 'lucide-react';

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
    <div className="min-h-screen bg-[#fcf9f3] py-12 sm:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fe997c]/20 text-[#772f1a] text-xs font-bold uppercase tracking-wider mb-4">
            <Hammer className="w-4 h-4 text-[#974730]" /> Indigenous Craft & Bamboo Archive
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#061b0e] leading-tight mb-4">
            Traditional Crafts of Northeast India
          </h1>
          <p className="text-base text-[#434843] leading-relaxed">
            Northeast craft traditions represent centuries of sustainable ecology—turning wild bamboo, mountain clays, and golden silk into everyday marvels. Explore documented cultural history and connect with living artisans.
          </p>
        </div>

        {/* Filter / Category Bar */}
        <div className="bg-[#f0eee8] rounded-3xl p-4 sm:p-6 border border-[#c3c8c1] mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-[#737973] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search crafts by name, state, material..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#ffffff] border border-[#c3c8c1] text-xs font-medium text-[#061b0e] focus:border-[#974730] outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#1b3022] text-[#fcf9f3]'
                    : 'bg-[#ffffff] text-[#434843] hover:bg-[#e5e2dc]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Crafts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCrafts.map((craft) => (
            <div
              key={craft.id}
              className="bg-[#ffffff] rounded-3xl border border-[#c3c8c1] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 grid grid-cols-1 sm:grid-cols-12 group"
            >
              <div className="sm:col-span-5 relative aspect-square sm:aspect-auto bg-[#e5e2dc] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={craft.imageUrl}
                  alt={craft.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-[#1b3022]/90 backdrop-blur-md text-[#fcf9f3] text-[10px] font-bold uppercase rounded-full">
                  {craft.category}
                </span>
              </div>

              <div className="sm:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#974730]">
                      {craft.region}, {craft.state}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#d0e9d4] text-[#0b2013]">
                      {craft.preservationStatus}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-[#061b0e] group-hover:text-[#974730] transition-colors">
                    {craft.name}
                  </h3>

                  {craft.indigenousName && (
                    <p className="text-xs text-[#772f1a] font-medium italic mt-0.5">
                      {craft.indigenousName}
                    </p>
                  )}

                  <p className="text-xs text-[#434843] line-clamp-3 mt-3 leading-relaxed">
                    {craft.culturalSignificance}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#f0eee8] flex items-center justify-between">
                  <Link
                    href={`/crafts/${craft.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#061b0e] group-hover:text-[#974730]"
                  >
                    <span>Read History & Technique</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => toggleSaveCraft(craft.id)}
                    className="p-2 rounded-full text-[#434843] hover:text-[#974730]"
                  >
                    {user.savedCraftIds.includes(craft.id) ? (
                      <BookmarkCheck className="w-4 h-4 text-[#974730] fill-current" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
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
