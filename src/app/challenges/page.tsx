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
  const { challenges, badges, user, addXP, t } = useApp();

  const handleCompleteChallenge = (id: string, xp: number, name: string) => {
    addXP(xp, `Completed Cultural Quest: ${name}`);
  };

  return (
    <div className="min-h-screen bg-[#fcf9f3] py-12 sm:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fbbb51]/20 text-[#281800] text-xs font-bold uppercase tracking-wider mb-4">
            <Trophy className="w-4 h-4 text-[#c08820]" /> Meaningful Retention & Cultural Quests
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#061b0e] leading-tight mb-4">
            Daily & Weekly Cultural Quests
          </h1>
          <p className="text-base text-[#434843] leading-relaxed">
            Gamification designed to inspire physical revival, learning, and craft preservation. Earn Heritage XP, maintain streaks, and unlock verifiable badges.
          </p>
        </div>

        {/* Streak & User Tier Summary Banner */}
        <div className="bg-[#1b3022] text-[#fcf9f3] rounded-3xl p-6 sm:p-10 shadow-xl mb-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#fbbb51]">Your Heritage Standing</span>
            <h3 className="font-display text-3xl font-bold text-[#fcf9f3]">Level {user.level} Archivist</h3>
            <p className="text-xs text-[#b4cdb8]">{user.xp} Total Heritage XP Earned</p>
          </div>

          <div className="flex items-center gap-4 p-4 bg-[#061b0e]/60 rounded-2xl border border-[#364c3c]">
            <div className="w-12 h-12 rounded-full bg-[#fe997c]/20 flex items-center justify-center text-[#fe997c]">
              <Flame className="w-7 h-7 fill-current" />
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-[#fcf9f3]">{user.streakDays} Days Active</div>
              <div className="text-[11px] text-[#b4cdb8]">Daily Exploration Streak</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-[#061b0e]/60 rounded-2xl border border-[#364c3c]">
            <div className="w-12 h-12 rounded-full bg-[#fbbb51]/20 flex items-center justify-center text-[#fbbb51]">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-[#fcf9f3]">{user.badges.length} Badges</div>
              <div className="text-[11px] text-[#b4cdb8]">Cultural Achievements</div>
            </div>
          </div>
        </div>

        {/* Active Quests Grid */}
        <div className="space-y-8 mb-16">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#061b0e]">
            Active Revival Missions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {challenges.map((chal) => (
              <div
                key={chal.id}
                className="bg-[#ffffff] rounded-3xl border border-[#c3c8c1] p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-[#fe997c]/20 text-[#772f1a] text-[10px] font-bold uppercase rounded-full">
                      {chal.frequency} Mission
                    </span>
                    <span className="text-xs font-bold text-[#c08820] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> +{chal.xpReward} XP
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#061b0e] leading-snug">
                    {chal.title}
                  </h3>

                  <p className="text-xs text-[#434843] mt-2 leading-relaxed">
                    {chal.description}
                  </p>

                  {chal.badgeRewardName && (
                    <div className="mt-4 p-3 bg-[#fcf9f3] rounded-xl border border-[#c3c8c1]/40 flex items-center gap-2 text-xs">
                      <Award className="w-4 h-4 text-[#c08820]" />
                      <span className="font-bold text-[#061b0e]">Reward: {chal.badgeRewardName}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#f0eee8] flex items-center justify-between">
                  <span className="text-[11px] text-[#737973]">
                    {chal.participantsCount} archivists participating
                  </span>
                  <button
                    onClick={() => handleCompleteChallenge(chal.id, chal.xpReward, chal.title)}
                    className="px-4 py-2 bg-[#1b3022] hover:bg-[#061b0e] text-[#fcf9f3] text-xs font-bold uppercase rounded-full transition-colors"
                  >
                    Claim Quest
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges Showcase */}
        <div className="bg-[#f0eee8] rounded-3xl p-6 sm:p-10 border border-[#c3c8c1] shadow-lg space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#974730]">
              Unlockable Milestones
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#061b0e]">
              Heritage Badges of Honor
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {badges.map((b) => {
              const isUnlocked = user.badges.includes(b.id);
              return (
                <div
                  key={b.id}
                  className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-between space-y-2 transition-all ${
                    isUnlocked
                      ? 'bg-[#ffffff] border-[#fbbb51] shadow-md'
                      : 'bg-[#f6f3ed]/60 border-[#c3c8c1]/60 opacity-60'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isUnlocked ? 'bg-[#fbbb51]/20 text-[#974730]' : 'bg-[#e5e2dc] text-[#737973]'
                  }`}>
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#061b0e]">{b.name}</div>
                    <div className="text-[10px] text-[#737973] line-clamp-2 mt-0.5">{b.description}</div>
                  </div>
                  <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#f0eee8] text-[#061b0e]">
                    {isUnlocked ? '✓ Unlocked' : 'Locked'}
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
