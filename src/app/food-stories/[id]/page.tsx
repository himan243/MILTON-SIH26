'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { UtensilsCrossed, Bookmark, BookmarkCheck, ArrowLeft, HeartPulse, Calendar, Flame, Check } from 'lucide-react';

export default function FoodStoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { foodStories, user, toggleSaveFood, triggerConfetti } = useApp();

  const food = foodStories.find((f) => f.id === resolvedParams.id);
  if (!food) return notFound();

  return (
    <div className="lg:pl-[354px] min-h-screen bg-[#faf8f5] bg-creased-paper py-10 sm:py-14 px-4 sm:px-6 lg:px-10 transition-all">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Back Link */}
        <Link
          href="/food-stories"
          className="inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-wider text-zinc-700 hover:text-[#ef4444] mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO FOOD STORIES ARCHIVE</span>
        </Link>

        {/* Hero Scrapbook Card */}
        <div className="card-retro bg-[#f4eee3] p-6 sm:p-8 lg:p-10 border-[2.5px] border-[#0c0f14] shadow-retro-xl mb-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
          <div className="pushpin-red" />

          {/* Left Details */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-0.5 bg-[#059669] text-white font-display text-xs uppercase rounded-lg border border-black shadow-retro-sm">
                {food.state}
              </span>
              <span className="px-3 py-0.5 bg-[#fef08a] text-[#0c0f14] font-display text-xs uppercase rounded-lg border border-black shadow-retro-sm">
                {food.region}
              </span>
              <span className="px-2.5 py-0.5 bg-white border border-black rounded-lg font-hand text-xs font-bold text-zinc-700">
                🌱 {food.ingredients.length} Indigenous Ingredients
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#0c0f14] leading-[1.05] tracking-tight">
              {food.name}
            </h1>

            <div className="p-2.5 bg-white rounded-xl border-2 border-black inline-block shadow-retro-sm">
              <span className="font-display text-xs uppercase text-[#059669] mr-1.5 font-bold">VERNACULAR NAME:</span>
              <span className="font-hand text-base font-bold text-[#0c0f14]">{food.indigenousName}</span>
            </div>

            <p className="font-hand text-lg text-zinc-800 font-bold leading-relaxed">
              {food.story}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => { toggleSaveFood(food.id); triggerConfetti(); }}
                className="btn-retro px-5 py-2.5 bg-[#0c0f14] hover:bg-zinc-800 text-[#fef08a] font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-retro flex items-center gap-2"
              >
                {user.savedFoodIds.includes(food.id) ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-[#ef4444] fill-current" /> SAVED IN PASSPORT
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4 text-[#fef08a]" /> SAVE RECIPE STORY
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden border-2 border-black shadow-retro-md bg-zinc-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={food.imageUrl} alt={food.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* 2-Column Recipe & Ritual Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
          
          {/* Left 8 Cols: Ingredients & Cooking Ritual */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Ingredients Pantry */}
            <div className="card-retro bg-white p-6 sm:p-8 border-[2.5px] border-[#0c0f14] shadow-retro-md space-y-5">
              <div className="flex items-center gap-2 text-[#059669] font-display text-sm uppercase tracking-wider font-bold">
                <UtensilsCrossed className="w-4 h-4" /> INDIGENOUS PANTRY
              </div>
              <h2 className="font-display text-3xl font-bold text-[#0c0f14]">
                AUTHENTIC INGREDIENTS
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {food.ingredients.map((ing, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#faf8f5] border-2 border-black flex items-center justify-between shadow-retro-sm"
                  >
                    <span className="font-display text-base font-bold text-[#0c0f14]">{ing.name}</span>
                    <span className="font-hand text-sm font-bold text-[#059669]">{ing.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Preparation Steps */}
            <div className="card-retro bg-white p-6 sm:p-8 border-[2.5px] border-[#0c0f14] shadow-retro-md space-y-5">
              <div className="flex items-center gap-2 text-[#ef4444] font-display text-sm uppercase tracking-wider font-bold">
                <Flame className="w-4 h-4" /> HEARTH PREPARATION TECHNIQUE
              </div>
              <h2 className="font-display text-3xl font-bold text-[#0c0f14]">
                STEP-BY-STEP COOKING RITUAL
              </h2>
              <div className="space-y-3.5">
                {food.preparationSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-4 rounded-xl bg-[#faf8f5] border-2 border-black shadow-retro-sm"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#059669] text-white font-display text-sm font-bold flex items-center justify-center shrink-0 border border-black shadow-retro-sm">
                      {idx + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-800 font-medium leading-relaxed mt-0.5">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right 4 Cols: Health & Occasions Sticky Notes */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Ancestral Health Note */}
            <div className="card-retro bg-[#bbf7d0] p-6 border-[2.5px] border-[#0c0f14] shadow-retro-md space-y-3">
              <div className="flex items-center gap-2 font-display text-xs uppercase text-[#0c0f14] font-bold">
                <HeartPulse className="w-4 h-4 text-[#059669]" /> ANCESTRAL HEALTH WISDOM
              </div>
              <h3 className="font-display text-xl font-bold text-[#0c0f14]">
                DIGESTIVE & MEDICINAL LORE
              </h3>
              <p className="font-hand text-base font-bold text-zinc-800 leading-snug">
                {food.healthAndWisdom}
              </p>
            </div>

            {/* Cultural Occasions Note */}
            <div className="card-retro bg-[#fef08a] p-6 border-[2.5px] border-[#0c0f14] shadow-retro-md space-y-3">
              <div className="flex items-center gap-2 font-display text-xs uppercase text-[#0c0f14] font-bold">
                <Calendar className="w-4 h-4 text-[#d97706]" /> CULTURAL OCCASIONS
              </div>
              <h3 className="font-display text-xl font-bold text-[#0c0f14]">
                SERVED DURING
              </h3>
              <ul className="space-y-1.5 text-xs font-bold text-zinc-800 font-hand text-base">
                {food.culturalOccasions.map((occ, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ef4444] border border-black" />
                    <span>{occ}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Flavor Profile */}
            <div className="card-retro bg-white p-6 border-[2.5px] border-[#0c0f14] shadow-retro-md space-y-3">
              <span className="font-display text-xs uppercase tracking-wider text-zinc-500 block">
                Flavor Profile & Notes:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {food.flavorProfile.map((flv, i) => (
                  <span key={i} className="px-3 py-1 bg-[#f4eee3] text-[#0c0f14] text-xs font-bold rounded-lg border border-black shadow-retro-sm">
                    {flv}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

