'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Trophy,
  Flame,
  CheckCircle2,
  Sparkles,
  Award,
  Calendar,
  Gamepad2,
  Hammer,
  ArrowRight
} from 'lucide-react';

export default function ChallengesPage() {
  const { challenges, badges, user, addXP, t, triggerConfetti } = useApp();

  const handleCompleteChallenge = (id: string, xp: number, name: string) => {
    addXP(xp, `Completed Cultural Quest: ${name}`);
    triggerConfetti();
  };

  return (
    <div className="lg:pl-[354px] min-h-screen bg-[#faf8f5] bg-creased-paper py-10 sm:py-14 px-4 sm:px-6 lg:px-10 transition-all">
      <div className="max-w-[1320px] mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#fef08a] border-2 border-black rounded-full font-display text-xs uppercase tracking-wider shadow-retro-sm mb-3">
            <Trophy className="w-4 h-4 text-[#d97706]" /> Cultural Quests & Verifiable Mastery
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#0c0f14] leading-[1.05] tracking-tight mb-3">
            HERITAGE <span className="marker-underline text-[#d97706]">QUESTS</span> & CHALLENGES
          </h1>
          <p className="font-hand text-xl text-zinc-700 font-bold leading-relaxed">
            Gamified cultural preservation: Play traditional matches, cook heirloom recipes, support verified artisans, and earn archival badges.
          </p>
        </div>

        {/* Streak & User Standing Banner */}
        <div className="card-retro bg-[#0c0f14] text-white p-6 sm:p-8 border-[2.5px] border-[#0c0f14] shadow-retro-xl mb-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          <div className="space-y-1">
            <span className="font-display text-xs uppercase tracking-wider text-[#fef08a]">YOUR PASSPORT STANDING</span>
            <h3 className="font-display text-3xl font-bold text-white">LEVEL {user.level} ARCHIVIST</h3>
            <p className="font-hand text-sm text-zinc-300 font-bold">{user.xp} Total Heritage XP Earned</p>
          </div>

          <div className="flex items-center gap-4 p-4 bg-[#1e293b] rounded-2xl border-2 border-[#fef08a] shadow-retro-yellow">
            <div className="w-12 h-12 rounded-xl bg-[#ef4444] border-2 border-black flex items-center justify-center text-white shadow-retro-sm">
              <Flame className="w-6 h-6 fill-current" />
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-white">{user.streakDays} DAYS ACTIVE</div>
              <div className="font-hand text-xs font-bold text-zinc-300">Daily Heritage Streak</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-[#1e293b] rounded-2xl border-2 border-[#fef08a] shadow-retro-yellow">
            <div className="w-12 h-12 rounded-xl bg-[#fef08a] border-2 border-black flex items-center justify-center text-[#0c0f14] shadow-retro-sm">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-white">{user.badges.length} BADGES</div>
              <div className="font-hand text-xs font-bold text-zinc-300">Unlocked Milestones</div>
            </div>
          </div>

        </div>

        {/* Active Quests Grid */}
        <div className="space-y-6 mb-14">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-3xl font-bold text-[#0c0f14]">
              ACTIVE REVIVAL MISSIONS
            </h2>
            <span className="font-hand text-base font-bold text-zinc-600">Updated Daily</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {challenges.map((chal) => (
              <div
                key={chal.id}
                className="card-retro bg-white p-6 border-[2.5px] border-[#0c0f14] shadow-retro-md hover:shadow-retro-lg transition-all flex flex-col justify-between space-y-4 relative"
              >
                <div className="pushpin-red" />

                <div>
                  <div className="flex items-center justify-between mb-2 pr-6">
                    <span className="px-2.5 py-0.5 bg-[#fef08a] text-[#0c0f14] font-display text-[10px] font-bold uppercase rounded border border-black shadow-retro-sm">
                      {chal.frequency} MISSION
                    </span>
                    <span className="font-display text-xs font-bold text-[#ef4444] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> +{chal.xpReward} XP
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-[#0c0f14] leading-tight">
                    {chal.title}
                  </h3>

                  <p className="text-xs text-zinc-700 mt-2 font-medium leading-relaxed">
                    {chal.description}
                  </p>

                  {chal.badgeRewardName && (
                    <div className="mt-4 p-3 bg-[#f4eee3] rounded-xl border-2 border-black flex items-center gap-2 text-xs shadow-retro-sm">
                      <Award className="w-4 h-4 text-[#d97706]" />
                      <span className="font-display text-xs uppercase font-bold text-[#0c0f14]">REWARD: {chal.badgeRewardName}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-black/10 flex items-center justify-between">
                  <span className="font-hand text-xs font-bold text-zinc-600">
                    {chal.participantsCount} archivists on quest
                  </span>
                  <button
                    onClick={() => handleCompleteChallenge(chal.id, chal.xpReward, chal.title)}
                    className="btn-retro px-4 py-2 bg-[#0c0f14] hover:bg-zinc-800 text-[#fef08a] font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-retro-sm"
                  >
                    CLAIM QUEST
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges Showcase on Kraft Card */}
        <div className="card-retro bg-[#f4eee3] p-6 sm:p-8 border-[2.5px] border-[#0c0f14] shadow-retro-lg space-y-6">
          <div>
            <span className="font-display text-xs uppercase tracking-wider text-[#ef4444] font-bold">
              UNLOCKABLE MILESTONES
            </span>
            <h2 className="font-display text-3xl font-bold text-[#0c0f14]">
              HERITAGE BADGES OF HONOR
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {badges.map((b) => {
              const isUnlocked = user.badges.includes(b.id);
              return (
                <div
                  key={b.id}
                  className={`p-4 rounded-xl border-2 text-center flex flex-col items-center justify-between space-y-2 transition-all ${
                    isUnlocked
                      ? 'bg-white border-black shadow-retro-sm'
                      : 'bg-zinc-200/60 border-zinc-400 opacity-60'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl border-2 border-black flex items-center justify-center shadow-retro-sm ${
                    isUnlocked ? 'bg-[#fef08a] text-[#ef4444]' : 'bg-zinc-300 text-zinc-600'
                  }`}>
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-display text-sm font-bold text-[#0c0f14]">{b.name}</div>
                    <div className="font-hand text-[11px] font-bold text-zinc-600 line-clamp-2 mt-0.5">{b.description}</div>
                  </div>
                  <span className={`text-[9px] font-display uppercase px-2 py-0.5 rounded border border-black ${
                    isUnlocked ? 'bg-[#bbf7d0] text-[#059669]' : 'bg-zinc-300 text-zinc-700'
                  }`}>
                    {isUnlocked ? '✓ UNLOCKED' : 'LOCKED'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
