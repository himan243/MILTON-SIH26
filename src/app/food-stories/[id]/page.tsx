'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { UtensilsCrossed, Bookmark, BookmarkCheck, ArrowLeft, HeartPulse, Calendar, Flame } from 'lucide-react';

export default function FoodStoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { foodStories, user, toggleSaveFood } = useApp();

  const food = foodStories.find((f) => f.id === resolvedParams.id);
  if (!food) return notFound();

  return (
    <div className="min-h-screen bg-[#fcf9f3] py-10 sm:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          href="/food-stories"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#434843] hover:text-[#061b0e] mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Food Stories</span>
        </Link>

        {/* Hero Banner */}
        <div className="bg-[#f0eee8] rounded-3xl border border-[#c3c8c1] p-6 sm:p-10 shadow-xl mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-[#1b3022] text-[#fcf9f3] text-[11px] font-bold uppercase rounded-full">
                {food.region}, {food.state}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#061b0e]">
              {food.name}
            </h1>

            <p className="text-sm font-semibold text-[#772f1a]">
              Indigenous Name: {food.indigenousName}
            </p>

            <p className="text-sm text-[#434843] leading-relaxed">
              {food.story}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => toggleSaveFood(food.id)}
                className="px-6 py-3 bg-[#974730] hover:bg-[#772f1a] text-[#fcf9f3] text-xs font-bold uppercase tracking-wider rounded-full shadow-md flex items-center gap-2"
              >
                {user.savedFoodIds.includes(food.id) ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 fill-current" /> Saved in Culinary Diary
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" /> Save Recipe to Collection
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-[#e5e2dc]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={food.imageUrl} alt={food.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Recipe & Preparation Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          <div className="lg:col-span-8 space-y-8">
            
            {/* Ingredients */}
            <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-8 border border-[#c3c8c1] shadow-md space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#974730]">
                <UtensilsCrossed className="w-4 h-4" /> Traditional Ingredients
              </div>
              <h2 className="font-display text-2xl font-bold text-[#061b0e]">
                Indigenous Pantry
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {food.ingredients.map((ing, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#fcf9f3] border border-[#c3c8c1]/40 flex justify-between items-center text-xs">
                    <span className="font-bold text-[#061b0e]">{ing.name}</span>
                    <span className="text-[#737973] font-semibold">{ing.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Preparation Steps */}
            <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-8 border border-[#c3c8c1] shadow-md space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1b3022]">
                <Flame className="w-4 h-4" /> Hearth Preparation Technique
              </div>
              <h2 className="font-display text-2xl font-bold text-[#061b0e]">
                Step-by-Step Cooking Ritual
              </h2>
              <div className="space-y-4">
                {food.preparationSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-[#fcf9f3] border border-[#c3c8c1]/40">
                    <div className="w-6 h-6 rounded-full bg-[#1b3022] text-[#fcf9f3] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-[#1c1c18] leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sidebar: Health & Occasions */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Digestive Wisdom */}
            <div className="bg-[#ffffff] rounded-3xl p-6 border border-[#c3c8c1] shadow-md space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#819986]">
                <HeartPulse className="w-4 h-4 text-[#819986]" /> Ancestral Health Wisdom
              </div>
              <p className="text-xs text-[#434843] leading-relaxed">
                {food.healthAndWisdom}
              </p>
            </div>

            {/* Occasions */}
            <div className="bg-[#ffffff] rounded-3xl p-6 border border-[#c3c8c1] shadow-md space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c08820]">
                <Calendar className="w-4 h-4 text-[#c08820]" /> Cultural Occasions
              </div>
              <ul className="text-xs text-[#061b0e] space-y-2">
                {food.culturalOccasions.map((occ, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#974730]" />
                    <span>{occ}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Flavor Profile */}
            <div className="bg-[#ffffff] rounded-3xl p-6 border border-[#c3c8c1] shadow-md space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#737973] block">
                Flavor Profile:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {food.flavorProfile.map((flv, i) => (
                  <span key={i} className="px-3 py-1 bg-[#f6f3ed] text-[#1b3022] text-xs font-semibold rounded-full border border-[#c3c8c1]/40">
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
