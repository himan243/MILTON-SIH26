'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Hammer,
  Bookmark,
  BookmarkCheck,
  ArrowLeft,
  ShieldCheck,
  Package,
  ChevronRight,
  Sparkles,
  MapPin
} from 'lucide-react';

export default function CraftDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { crafts, products, user, toggleSaveCraft, triggerConfetti } = useApp();

  const craft = crafts.find((c) => c.id === resolvedParams.id);
  if (!craft) return notFound();

  const verifiedListings = products.filter(
    (p) => craft.marketplaceListingIds && craft.marketplaceListingIds.includes(p.id)
  );

  return (
    <div className="lg:pl-[354px] min-h-screen bg-[#faf8f5] bg-creased-paper py-10 sm:py-14 px-4 sm:px-6 lg:px-10 transition-all">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Back Link */}
        <Link
          href="/crafts"
          className="inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-wider text-zinc-700 hover:text-[#ef4444] mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO TRADITIONAL CRAFTS ARCHIVE</span>
        </Link>

        {/* Hero Scrapbook Card */}
        <div className="card-retro bg-[#f4eee3] p-6 sm:p-8 lg:p-10 border-[2.5px] border-[#0c0f14] shadow-retro-xl mb-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
          
          <div className="pushpin-red" />

          {/* Left Details */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-0.5 bg-[#0c0f14] text-[#fef08a] font-display text-xs uppercase rounded-lg border border-black shadow-retro-sm">
                {craft.category}
              </span>
              <span className="rubber-stamp rubber-stamp-green text-[10px] py-0.5">
                STATUS: {craft.preservationStatus}
              </span>
              <span className="px-2.5 py-0.5 bg-white border border-black rounded-lg font-hand text-xs font-bold text-zinc-700">
                {craft.state}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#0c0f14] leading-[1.05] tracking-tight">
              {craft.name}
            </h1>

            {craft.indigenousName && (
              <div className="p-2.5 bg-white rounded-xl border-2 border-black inline-block shadow-retro-sm">
                <span className="font-display text-xs uppercase text-[#ef4444] mr-1.5 font-bold">INDIGENOUS NAME:</span>
                <span className="font-hand text-base font-bold text-[#0c0f14]">{craft.indigenousName}</span>
              </div>
            )}

            <p className="font-hand text-lg text-zinc-800 font-bold leading-relaxed">
              {craft.culturalSignificance}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => { toggleSaveCraft(craft.id); triggerConfetti(); }}
                className="btn-retro px-5 py-2.5 bg-[#0c0f14] hover:bg-zinc-800 text-[#fef08a] font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-retro flex items-center gap-2"
              >
                {user.savedCraftIds.includes(craft.id) ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-[#ef4444] fill-current" /> SAVED IN ARCHIVE
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4 text-[#fef08a]" /> SAVE CRAFT TO PASSPORT
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden border-2 border-black shadow-retro-md bg-zinc-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={craft.imageUrl} alt={craft.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* 2-Column Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
          
          {/* Left 8 Cols: Traditional Crafting Method & Verified Artisan Listings */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Traditional Crafting Method */}
            <div className="card-retro bg-white p-6 sm:p-8 border-[2.5px] border-[#0c0f14] shadow-retro-md space-y-5">
              <div className="flex items-center gap-2 text-[#d97706] font-display text-sm uppercase tracking-wider font-bold">
                <Hammer className="w-4 h-4" /> ARCHIVAL TECHNIQUE & CRAFTING RITUAL
              </div>
              <h2 className="font-display text-3xl font-bold text-[#0c0f14]">
                HOW {craft.name.toUpperCase()} IS TRADITIONALLY HANDCRAFTED
              </h2>
              <div className="space-y-3.5">
                {craft.traditionalCraftingMethod.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-4 rounded-xl bg-[#faf8f5] border-2 border-black shadow-retro-sm"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#d97706] text-white font-display text-sm font-bold flex items-center justify-center shrink-0 border border-black shadow-retro-sm">
                      {idx + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-800 font-medium leading-relaxed mt-0.5">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Living Artisan Marketplace Links */}
            <div className="card-retro bg-white p-6 sm:p-8 border-[2.5px] border-[#0c0f14] shadow-retro-md space-y-5">
              <div className="flex items-center justify-between pb-3 border-b-2 border-dashed border-black/20">
                <div>
                  <span className="font-display text-xs uppercase tracking-wider text-[#059669] flex items-center gap-1.5 font-bold">
                    <ShieldCheck className="w-4 h-4" /> LIVING ARTISAN MARKETPLACE
                  </span>
                  <h3 className="font-display text-2xl font-bold text-[#0c0f14] mt-0.5">
                    Acquire from Verified Master Guilds
                  </h3>
                </div>
              </div>

              {verifiedListings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {verifiedListings.map((p) => (
                    <div
                      key={p.id}
                      className="p-4 rounded-2xl bg-[#f4eee3] border-2 border-black flex flex-col justify-between space-y-3 shadow-retro-sm"
                    >
                      <div>
                        <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3 border border-black bg-zinc-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                        </div>
                        <h4 className="font-display text-lg font-bold text-[#0c0f14] line-clamp-1">
                          {p.title}
                        </h4>
                        <p className="font-hand text-xs text-zinc-600 font-bold mt-0.5">
                          By {p.artisanName} ({p.artisanLocation})
                        </p>
                      </div>

                      <div className="pt-2 border-t border-black/20 flex items-center justify-between">
                        <span className="font-display text-lg font-bold text-[#0c0f14]">
                          ₹{p.priceInr}
                        </span>
                        <Link
                          href={`/marketplace#${p.id}`}
                          className="btn-retro px-3.5 py-1.5 bg-[#ef4444] text-white font-display text-xs font-black uppercase tracking-wider rounded-lg shadow-retro-sm"
                        >
                          INQUIRE ORDER
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 bg-[#f4eee3] rounded-2xl border-2 border-black text-center font-hand text-base text-zinc-700 font-bold shadow-retro-sm">
                  Direct artisan inquiries open for guilds in {craft.region}. Connect via the Artisan Portal.
                </div>
              )}
            </div>

          </div>

          {/* Right 4 Cols: Materials & Regional Provenance */}
          <div className="lg:col-span-4 space-y-6">
            <div className="card-retro bg-white p-6 border-[2.5px] border-[#0c0f14] shadow-retro-md space-y-4">
              <h3 className="font-display text-xl font-bold text-[#0c0f14] pb-2 border-b-2 border-dashed border-black/20">
                PROVENANCE & MATERIALS
              </h3>

              <div>
                <span className="font-display text-xs uppercase tracking-wider text-zinc-500 block mb-1.5">
                  Raw Indigenous Materials:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {craft.materialsUsed.map((mat, i) => (
                    <span key={i} className="px-2.5 py-1 bg-[#f4eee3] text-[#0c0f14] text-xs font-bold rounded-lg border border-black shadow-retro-sm">
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-display text-xs uppercase tracking-wider text-zinc-500 block mb-0.5">
                  Primary Cultural Hub:
                </span>
                <p className="font-display text-sm font-bold text-[#0c0f14]">{craft.region}, {craft.state}</p>
              </div>

              <div>
                <span className="font-display text-xs uppercase tracking-wider text-zinc-500 block mb-0.5">
                  Active Craftsmen in Guild:
                </span>
                <p className="font-display text-sm font-bold text-[#059669]">~{craft.artisanCountInRegion} Master Artisans</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

