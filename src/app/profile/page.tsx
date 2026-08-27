'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  User,
  Sparkles,
  Flame,
  Award,
  Gamepad2,
  Hammer,
  UtensilsCrossed,
  Layers,
  ChevronRight,
  Shield
} from 'lucide-react';

export default function ProfileJourneyPage() {
  const { user, games, crafts, foodStories, savedProjects, badges, role, setRole, t } = useApp();
  const [activeTab, setActiveTab] = useState<'games' | 'crafts' | 'foods' | 'ai'>('games');

  const savedGamesList = games.filter((g) => user.savedGameIds.includes(g.id));
  const savedCraftsList = crafts.filter((c) => user.savedCraftIds.includes(c.id));
  const savedFoodsList = foodStories.filter((f) => user.savedFoodIds.includes(f.id));

  const currentLevelMinXP = (user.level - 1) * 300;
  const nextLevelXP = user.level * 300;
  const progressPercent = Math.min(100, Math.max(0, ((user.xp - currentLevelMinXP) / 300) * 100));

  return (
    <div className="min-h-screen bg-[#fcf9f3] py-12 sm:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Identity Card */}
        <div className="bg-[#1b3022] text-[#fcf9f3] rounded-3xl p-6 sm:p-10 shadow-xl mb-12 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-[#c08820]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 relative z-10">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-24 h-24 rounded-full border-4 border-[#fbbb51] object-cover shadow-lg"
              />
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#fbbb51] flex items-center justify-center sm:justify-start gap-1.5">
                  <Shield className="w-3.5 h-3.5" /> Role: {user.role.toUpperCase()}
                </span>
                <h1 className="font-display text-3xl font-bold text-[#fcf9f3]">
                  {user.name}
                </h1>
                <p className="text-xs text-[#b4cdb8]">📍 {user.region} • {user.email}</p>
                <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                  <span className="px-3 py-1 bg-[#061b0e] text-[#fbbb51] rounded-full text-xs font-bold">
                    Level {user.level} Cultural Archivist
                  </span>
                  <span className="px-3 py-1 bg-[#061b0e] text-[#fe997c] rounded-full text-xs font-bold flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-current" /> {user.streakDays} Day Streak
                  </span>
                </div>
              </div>
            </div>

            {/* Quick XP Bar */}
            <div className="w-full md:w-72 bg-[#061b0e]/70 p-5 rounded-2xl border border-[#364c3c] space-y-2 text-left">
              <div className="flex justify-between text-xs font-bold text-[#fcf9f3]">
                <span>Level {user.level}</span>
                <span className="text-[#fbbb51]">{user.xp} / {nextLevelXP} XP</span>
              </div>
              <div className="w-full h-2.5 bg-[#364c3c] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#c08820] to-[#fbbb51] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="text-[10px] text-[#819986] text-right">
                {nextLevelXP - user.xp} XP to Level {user.level + 1}
              </div>
            </div>
          </div>
        </div>

        {/* Collections Tabs Navigation */}
        <div className="flex gap-2 p-1.5 bg-[#f0eee8] rounded-full border border-[#c3c8c1] mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('games')}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'games' ? 'bg-[#1b3022] text-[#fcf9f3]' : 'text-[#434843] hover:text-[#061b0e]'
            }`}
          >
            <Gamepad2 className="w-4 h-4" /> Saved Games ({savedGamesList.length})
          </button>
          <button
            onClick={() => setActiveTab('crafts')}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'crafts' ? 'bg-[#1b3022] text-[#fcf9f3]' : 'text-[#434843] hover:text-[#061b0e]'
            }`}
          >
            <Hammer className="w-4 h-4" /> Saved Crafts ({savedCraftsList.length})
          </button>
          <button
            onClick={() => setActiveTab('foods')}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'foods' ? 'bg-[#1b3022] text-[#fcf9f3]' : 'text-[#434843] hover:text-[#061b0e]'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" /> Food Diary ({savedFoodsList.length})
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'ai' ? 'bg-[#1b3022] text-[#fcf9f3]' : 'text-[#434843] hover:text-[#061b0e]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#c08820]" /> AI Builds ({savedProjects.length})
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="space-y-6 mb-16">
          
          {/* Games Tab */}
          {activeTab === 'games' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedGamesList.length > 0 ? (
                savedGamesList.map((g) => (
                  <div key={g.id} className="p-4 bg-[#ffffff] rounded-3xl border border-[#c3c8c1] shadow-md flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={g.imageUrl} alt={g.name} className="w-16 h-16 rounded-2xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] uppercase font-bold text-[#974730]">{g.region}</div>
                      <h4 className="font-display font-bold text-sm text-[#061b0e] truncate">{g.name}</h4>
                      <Link href={`/games/${g.id}`} className="text-xs font-bold text-[#1b3022] hover:underline flex items-center gap-1 mt-1">
                        View Game Rules <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 p-10 bg-[#ffffff] rounded-3xl border border-[#c3c8c1] text-center text-xs text-[#737973]">
                  No games saved yet. Explore the archive and bookmark your favorite traditional games!
                </div>
              )}
            </div>
          )}

          {/* Crafts Tab */}
          {activeTab === 'crafts' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedCraftsList.length > 0 ? (
                savedCraftsList.map((c) => (
                  <div key={c.id} className="p-4 bg-[#ffffff] rounded-3xl border border-[#c3c8c1] shadow-md flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.imageUrl} alt={c.name} className="w-16 h-16 rounded-2xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] uppercase font-bold text-[#c08820]">{c.category}</div>
                      <h4 className="font-display font-bold text-sm text-[#061b0e] truncate">{c.name}</h4>
                      <Link href={`/crafts/${c.id}`} className="text-xs font-bold text-[#1b3022] hover:underline flex items-center gap-1 mt-1">
                        View Crafting Method <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 p-10 bg-[#ffffff] rounded-3xl border border-[#c3c8c1] text-center text-xs text-[#737973]">
                  No traditional crafts saved yet. Bookmark bamboo or pottery heritage items!
                </div>
              )}
            </div>
          )}

          {/* Foods Tab */}
          {activeTab === 'foods' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedFoodsList.length > 0 ? (
                savedFoodsList.map((f) => (
                  <div key={f.id} className="p-4 bg-[#ffffff] rounded-3xl border border-[#c3c8c1] shadow-md flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.imageUrl} alt={f.name} className="w-16 h-16 rounded-2xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] uppercase font-bold text-[#1b3022]">{f.state}</div>
                      <h4 className="font-display font-bold text-sm text-[#061b0e] truncate">{f.name}</h4>
                      <Link href={`/food-stories/${f.id}`} className="text-xs font-bold text-[#1b3022] hover:underline flex items-center gap-1 mt-1">
                        View Recipe <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 p-10 bg-[#ffffff] rounded-3xl border border-[#c3c8c1] text-center text-xs text-[#737973]">
                  No traditional recipes saved yet.
                </div>
              )}
            </div>
          )}

          {/* AI Builds Tab */}
          {activeTab === 'ai' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProjects.length > 0 ? (
                savedProjects.map((p) => (
                  <div key={p.id} className="p-4 bg-[#ffffff] rounded-3xl border border-[#c3c8c1] shadow-md flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.uploadedImageUrl} alt={p.idea.title} className="w-16 h-16 rounded-2xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] uppercase font-bold text-[#fbbb51] bg-[#1b3022] px-2 py-0.5 rounded-full inline-block mb-1">
                        +{p.idea.xpReward} XP
                      </div>
                      <h4 className="font-display font-bold text-sm text-[#061b0e] truncate">{p.idea.title}</h4>
                      <div className="text-[11px] text-[#737973]">Saved {p.savedAt}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 p-10 bg-[#ffffff] rounded-3xl border border-[#c3c8c1] text-center text-xs text-[#737973]">
                  No AI creations generated yet. Visit &quot;Create with AI&quot; and transform household items!
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
