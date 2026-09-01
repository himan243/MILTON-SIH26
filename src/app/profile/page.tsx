'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  User,
  Sparkles,
  Flame,
  Gamepad2,
  Hammer,
  UtensilsCrossed,
  ChevronRight,
  Shield,
  ShieldCheck,
  ShieldAlert,
  UserPlus,
  Trash2,
  Phone,
  Mail,
  UserCheck,
  Lock,
  LogOut,
  Calendar,
  Layers
} from 'lucide-react';

export default function ProfileJourneyPage() {
  const {
    user,
    contacts,
    removeContact,
    games,
    crafts,
    foodStories,
    savedProjects,
    badges,
    isLoggedIn,
    logout,
    toggleChildSafetyMode,
    setIsAddContactModalOpen,
    setIsAgeVerifyModalOpen,
    setIsAuthModalOpen,
    t,
    triggerConfetti
  } = useApp();

  const [activeTab, setActiveTab] = useState<'contacts' | 'games' | 'crafts' | 'foods' | 'ai'>('contacts');

  const savedGamesList = games.filter((g) => user.savedGameIds.includes(g.id));
  const savedCraftsList = crafts.filter((c) => user.savedCraftIds.includes(c.id));
  const savedFoodsList = foodStories.filter((f) => user.savedFoodIds.includes(f.id));

  const currentLevelMinXP = (user.level - 1) * 300;
  const nextLevelXP = user.level * 300;
  const progressPercent = Math.min(100, Math.max(0, ((user.xp - currentLevelMinXP) / 300) * 100));

  if (!isLoggedIn) {
    return (
      <div className="lg:pl-[354px] min-h-screen bg-[#faf8f5] bg-creased-paper py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[800px] mx-auto text-center card-retro bg-white p-8 sm:p-12 border-[2.5px] border-[#0c0f14] shadow-retro-xl space-y-4">
          <div className="pushpin-red" />
          <div className="w-16 h-16 rounded-2xl bg-[#fef08a] border-2 border-black flex items-center justify-center mx-auto shadow-retro-sm">
            <User className="w-8 h-8 text-[#0c0f14]" />
          </div>
          <h1 className="font-display text-4xl font-bold text-[#0c0f14]">
            ARCHIVIST PASSPORT LOCKED
          </h1>
          <p className="font-hand text-lg text-zinc-700 font-bold max-w-md mx-auto">
            Please log in or create an archivist profile to view your personal heritage collections, child safety contacts, and streak rewards.
          </p>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="btn-retro px-6 py-3 bg-[#0c0f14] text-[#fef08a] font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-retro"
          >
            LOG IN OR SIGN UP →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-[354px] min-h-screen bg-[#faf8f5] bg-creased-paper py-10 sm:py-14 px-4 sm:px-6 lg:px-10 transition-all">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Profile Identity Passport Card */}
        <div className="card-retro bg-[#f4eee3] p-6 sm:p-8 lg:p-10 border-[2.5px] border-[#0c0f14] shadow-retro-xl mb-10 relative">
          <div className="pushpin-red" />

          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
            
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-black object-cover shadow-retro-sm bg-zinc-200"
              />
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#0c0f14] text-[#fef08a] border border-black rounded-md font-display text-xs uppercase shadow-retro-sm">
                    <Shield className="w-3 h-3 text-[#ef4444]" /> ROLE: {user.role.toUpperCase()}
                  </span>

                  {user.ageVerified ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#bbf7d0] text-[#065f46] border border-black rounded-md font-display text-xs uppercase shadow-retro-sm">
                      <ShieldCheck className="w-3.5 h-3.5" /> AGE VERIFIED ({user.age} YRS)
                    </span>
                  ) : (
                    <button
                      onClick={() => setIsAgeVerifyModalOpen(true)}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#fed7aa] text-[#9a3412] border border-black rounded-md font-display text-xs uppercase shadow-retro-sm hover:bg-[#fdba74]"
                    >
                      <ShieldAlert className="w-3.5 h-3.5" /> UNVERIFIED AGE (VERIFY 18+)
                    </button>
                  )}

                  {user.childSafetyMode && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#fee2e2] text-[#dc2626] border border-black rounded-md font-display text-xs uppercase shadow-retro-sm">
                      🛡️ CHILD SAFETY MODE ACTIVE
                    </span>
                  )}
                </div>

                <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#0c0f14] leading-tight">
                  {user.name}
                </h1>
                <p className="font-hand text-base font-bold text-zinc-700">
                  📍 {user.region} • ✉️ {user.email}
                </p>

                <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                  <span className="px-3 py-1 bg-white text-[#0c0f14] rounded-lg text-xs font-display uppercase border border-black shadow-retro-sm">
                    LEVEL {user.level} CULTURAL ARCHIVIST
                  </span>
                  <span className="px-3 py-1 bg-[#ef4444] text-white rounded-lg text-xs font-display uppercase border border-black shadow-retro-sm flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-current" /> {user.streakDays} DAY STREAK
                  </span>
                  <button
                    onClick={logout}
                    className="px-3 py-1 bg-[#fee2e2] text-[#991b1b] rounded-lg text-xs font-display uppercase border border-black shadow-retro-sm hover:bg-red-200 flex items-center gap-1"
                  >
                    <LogOut className="w-3 h-3" /> Log Out
                  </button>
                </div>
              </div>
            </div>

            {/* Quick XP Ledger Box */}
            <div className="w-full md:w-72 bg-white p-5 rounded-2xl border-2 border-black shadow-retro-sm space-y-2 text-left">
              <div className="flex justify-between font-display text-xs font-bold text-[#0c0f14]">
                <span>LEVEL {user.level} PROGRESS</span>
                <span className="text-[#ef4444]">{user.xp} / {nextLevelXP} XP</span>
              </div>
              <div className="w-full h-3 bg-zinc-200 border border-black rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#ef4444] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="font-hand text-xs font-bold text-zinc-600 text-right">
                {nextLevelXP - user.xp} XP until Level {user.level + 1}
              </div>
            </div>

          </div>
        </div>

        {/* Child Safety Control Card */}
        <div className="card-retro bg-white p-6 sm:p-7 border-[2.5px] border-[#0c0f14] shadow-retro-md mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#fef08a] border-2 border-black flex items-center justify-center shrink-0 shadow-retro-sm">
              <ShieldCheck className="w-6 h-6 text-[#0c0f14]" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-display text-lg font-bold uppercase text-[#0c0f14]">
                  Child Safety & Meets Protection
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-display uppercase border border-black ${
                  user.childSafetyMode ? 'bg-[#bbf7d0] text-[#065f46]' : 'bg-zinc-200 text-zinc-700'
                }`}>
                  {user.childSafetyMode ? 'ENFORCED: SAVED CONTACTS ONLY' : 'FLEXIBLE (STRANGERS ALLOWED IF 18+)'}
                </span>
              </div>
              <p className="font-hand text-sm text-zinc-600 font-bold max-w-2xl">
                When Child Safety is active, children and minors can only coordinate or join game sessions hosted by trusted people in their <strong>Safe Contacts Directory</strong>. Stranger matches are blocked.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              onClick={toggleChildSafetyMode}
              className={`btn-retro px-4 py-2 text-xs font-display font-black uppercase rounded-xl border-2 border-black shadow-retro-sm ${
                user.childSafetyMode
                  ? 'bg-[#ef4444] text-white'
                  : 'bg-[#f4eee3] text-[#0c0f14] hover:bg-[#fed7aa]'
              }`}
            >
              {user.childSafetyMode ? 'DISABLE PROTECTION' : 'ENABLE CHILD SAFETY MODE'}
            </button>
            <button
              onClick={() => setIsAgeVerifyModalOpen(true)}
              className="btn-retro px-4 py-2 bg-[#0c0f14] text-[#fef08a] text-xs font-display font-bold uppercase rounded-xl shadow-retro-sm flex items-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5" /> AGE VERIFY
            </button>
          </div>
        </div>

        {/* Passport Navigation Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-[#f4eee3] rounded-2xl border-2 border-black mb-8 shadow-retro-sm">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-2 rounded-xl font-display text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              activeTab === 'contacts'
                ? 'bg-[#0c0f14] text-[#fef08a] border border-black shadow-retro-sm'
                : 'text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> SAFE CONTACTS ({contacts.length})
          </button>
          <button
            onClick={() => setActiveTab('games')}
            className={`px-4 py-2 rounded-xl font-display text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              activeTab === 'games'
                ? 'bg-[#0c0f14] text-[#fef08a] border border-black shadow-retro-sm'
                : 'text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            <Gamepad2 className="w-4 h-4" /> SAVED GAMES ({savedGamesList.length})
          </button>
          <button
            onClick={() => setActiveTab('crafts')}
            className={`px-4 py-2 rounded-xl font-display text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              activeTab === 'crafts'
                ? 'bg-[#0c0f14] text-[#fef08a] border border-black shadow-retro-sm'
                : 'text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            <Hammer className="w-4 h-4" /> SAVED CRAFTS ({savedCraftsList.length})
          </button>
          <button
            onClick={() => setActiveTab('foods')}
            className={`px-4 py-2 rounded-xl font-display text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              activeTab === 'foods'
                ? 'bg-[#0c0f14] text-[#fef08a] border border-black shadow-retro-sm'
                : 'text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" /> FOOD DIARY ({savedFoodsList.length})
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2 rounded-xl font-display text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              activeTab === 'ai'
                ? 'bg-[#0c0f14] text-[#fef08a] border border-black shadow-retro-sm'
                : 'text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#ef4444]" /> AI BUILDS ({savedProjects.length})
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="space-y-6 mb-14">
          
          {/* Contacts Directory Tab */}
          {activeTab === 'contacts' && (
            <div className="card-retro bg-white p-6 sm:p-8 border-[2.5px] border-[#0c0f14] shadow-retro-lg space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b-2 border-dashed border-black/20">
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0c0f14]">
                    SAFE MEET CONTACTS DIRECTORY
                  </h3>
                  <p className="font-hand text-sm font-bold text-zinc-600">
                    Trusted circle for neighborhood meets, parent-supervised play sessions, and schoolmate invites.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddContactModalOpen(true)}
                  className="btn-retro px-4 py-2.5 bg-[#ef4444] hover:bg-[#dc2626] text-white font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-retro flex items-center gap-1.5"
                >
                  <UserPlus className="w-4 h-4" /> ADD TRUSTED CONTACT
                </button>
              </div>

              {contacts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="p-4 rounded-2xl bg-[#faf8f5] border-2 border-black shadow-retro-sm flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={contact.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'}
                          alt={contact.name}
                          className="w-12 h-12 rounded-xl object-cover border border-black shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-display font-bold text-base text-[#0c0f14] truncate">
                              {contact.name}
                            </span>
                            <span className="px-2 py-0.5 bg-[#fef08a] text-[#0c0f14] text-[9px] font-display uppercase rounded border border-black font-bold shrink-0">
                              {contact.relationship}
                            </span>
                          </div>
                          <div className="font-hand text-xs font-bold text-zinc-600 flex items-center gap-2 mt-0.5">
                            <Phone className="w-3 h-3 text-[#ef4444]" /> {contact.phone}
                            {contact.email && <span>• ✉️ {contact.email}</span>}
                          </div>
                          <div className="text-[10px] text-zinc-500 font-bold uppercase mt-0.5">
                            Tier: {contact.safetyTier.replace('_', ' ').toUpperCase()} • {contact.addedAt}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => removeContact(contact.id)}
                        className="p-2 rounded-xl text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
                        title="Remove Contact"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 bg-[#faf8f5] rounded-2xl border-2 border-black text-center font-hand text-lg text-zinc-700 font-bold shadow-retro-sm">
                  No contacts saved yet. Add guardians, neighbors, or verified classmates to organize safe kids meets!
                </div>
              )}
            </div>
          )}

          {/* Games Tab */}
          {activeTab === 'games' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedGamesList.length > 0 ? (
                savedGamesList.map((g) => (
                  <div key={g.id} className="card-retro bg-white p-4 border-2 border-black shadow-retro-md flex items-center gap-3.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={g.imageUrl} alt={g.name} className="w-16 h-16 rounded-xl object-cover border border-black shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-[10px] uppercase text-[#ef4444]">{g.region}</div>
                      <h4 className="font-display font-bold text-lg text-[#0c0f14] truncate">{g.name}</h4>
                      <Link href={`/games/${g.id}`} className="font-display text-xs uppercase text-[#0c0f14] hover:text-[#ef4444] flex items-center gap-1 mt-0.5">
                        LEARN RULES <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 p-10 card-retro bg-white text-center font-hand text-lg text-zinc-600 font-bold">
                  No games saved in passport yet. Explore the archive and bookmark your favorite folk games!
                </div>
              )}
            </div>
          )}

          {/* Crafts Tab */}
          {activeTab === 'crafts' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedCraftsList.length > 0 ? (
                savedCraftsList.map((c) => (
                  <div key={c.id} className="card-retro bg-white p-4 border-2 border-black shadow-retro-md flex items-center gap-3.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.imageUrl} alt={c.name} className="w-16 h-16 rounded-xl object-cover border border-black shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-[10px] uppercase text-[#d97706]">{c.category}</div>
                      <h4 className="font-display font-bold text-lg text-[#0c0f14] truncate">{c.name}</h4>
                      <Link href={`/crafts/${c.id}`} className="font-display text-xs uppercase text-[#0c0f14] hover:text-[#d97706] flex items-center gap-1 mt-0.5">
                        VIEW TECHNIQUE <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 p-10 card-retro bg-white text-center font-hand text-lg text-zinc-600 font-bold">
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
                  <div key={f.id} className="card-retro bg-white p-4 border-2 border-black shadow-retro-md flex items-center gap-3.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.imageUrl} alt={f.name} className="w-16 h-16 rounded-xl object-cover border border-black shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-[10px] uppercase text-[#059669]">{f.state}</div>
                      <h4 className="font-display font-bold text-lg text-[#0c0f14] truncate">{f.name}</h4>
                      <Link href={`/food-stories/${f.id}`} className="font-display text-xs uppercase text-[#0c0f14] hover:text-[#059669] flex items-center gap-1 mt-0.5">
                        VIEW RECIPE <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 p-10 card-retro bg-white text-center font-hand text-lg text-zinc-600 font-bold">
                  No traditional recipes saved yet in your culinary diary.
                </div>
              )}
            </div>
          )}

          {/* AI Builds Tab */}
          {activeTab === 'ai' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProjects.length > 0 ? (
                savedProjects.map((p) => (
                  <div key={p.id} className="card-retro bg-white p-4 border-2 border-black shadow-retro-md flex items-center gap-3.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.uploadedImageUrl} alt={p.idea.title} className="w-16 h-16 rounded-xl object-cover border border-black shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-[10px] uppercase text-[#0c0f14] bg-[#fef08a] px-2 py-0.5 rounded border border-black inline-block mb-0.5">
                        +{p.idea.xpReward} XP
                      </div>
                      <h4 className="font-display font-bold text-base text-[#0c0f14] truncate">{p.idea.title}</h4>
                      <div className="font-hand text-xs font-bold text-zinc-600">Saved {p.savedAt}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 p-10 card-retro bg-white text-center font-hand text-lg text-zinc-600 font-bold">
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
