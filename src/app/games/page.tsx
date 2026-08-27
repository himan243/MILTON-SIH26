'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Gamepad2, Search, Bookmark, BookmarkCheck, ChevronRight, Users, Trophy } from 'lucide-react';

export default function GamesPage() {
  const { games, user, toggleSaveGame, t } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | 'all'>('all');

  const filteredGames = games.filter((game) => {
    const matchesSearch =
      game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiff = selectedDifficulty === 'all' || game.difficultyLevel === selectedDifficulty;
    return matchesSearch && matchesDiff;
  });

  return (
    <div className="min-h-screen bg-[#fcf9f3] py-12 sm:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fe997c]/20 text-[#772f1a] text-xs font-bold uppercase tracking-wider mb-4">
            <Gamepad2 className="w-4 h-4" /> Folk Games Revival Archive
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#061b0e] leading-tight mb-4">
            {t.navGames} of Northeast India
          </h1>
          <p className="text-base text-[#434843] leading-relaxed">
            From the courtyards of the Brahmaputra valley to the misty hills of Meghalaya and Nagaland, rediscover the timeless games that forged community bonds before screens existed.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#f0eee8] rounded-3xl p-4 sm:p-6 border border-[#c3c8c1] mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-[#737973] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search games by name, region..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#ffffff] border border-[#c3c8c1] text-xs font-medium text-[#061b0e] focus:border-[#974730] outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <span className="text-xs font-bold uppercase tracking-wider text-[#737973] whitespace-nowrap">Difficulty:</span>
            <button
              onClick={() => setSelectedDifficulty('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                selectedDifficulty === 'all' ? 'bg-[#1b3022] text-[#fcf9f3]' : 'bg-[#ffffff] text-[#434843] hover:bg-[#e5e2dc]'
              }`}
            >
              All
            </button>
            {[2, 3, 4].map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDifficulty(d)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                  selectedDifficulty === d ? 'bg-[#1b3022] text-[#fcf9f3]' : 'bg-[#ffffff] text-[#434843] hover:bg-[#e5e2dc]'
                }`}
              >
                Level {d}
              </button>
            ))}
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="bg-[#ffffff] rounded-3xl border border-[#c3c8c1] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] bg-[#e5e2dc] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={game.imageUrl}
                    alt={game.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#974730]">
                      {game.region}
                    </span>
                    <div className="flex gap-1 items-center">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <span
                          key={lvl}
                          className={`w-1.5 h-1.5 rounded-full ${
                            lvl <= game.difficultyLevel ? 'bg-[#974730]' : 'bg-[#e5e2dc]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-[#061b0e] group-hover:text-[#974730] transition-colors">
                    {game.name}
                  </h3>

                  <p className="text-xs text-[#772f1a] font-medium italic">
                    {Object.values(game.vernacularNames)[0]}
                  </p>

                  <p className="text-xs text-[#434843] line-clamp-3 leading-relaxed">
                    {game.story}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {game.skillsDeveloped.slice(0, 2).map((skill, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 bg-[#f6f3ed] text-[#1b3022] text-[10px] font-semibold rounded-full border border-[#c3c8c1]/40">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#f0eee8] flex items-center justify-between">
                  <Link
                    href={`/games/${game.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#061b0e] group-hover:text-[#974730]"
                  >
                    <span>{t.learnGame}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/community"
                    className="text-[11px] font-medium text-[#737973] hover:text-[#974730] flex items-center gap-1"
                  >
                    <Users className="w-3 h-3" />
                    <span>{game.activePlayersNearbyCount} nearby</span>
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
