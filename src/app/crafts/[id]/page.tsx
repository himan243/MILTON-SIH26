'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Hammer, Bookmark, BookmarkCheck, ArrowLeft, ShieldCheck, Package, Layers } from 'lucide-react';

export default function CraftDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { crafts, products, user, toggleSaveCraft } = useApp();

  const craft = crafts.find((c) => c.id === resolvedParams.id);
  if (!craft) return notFound();

  const verifiedListings = products.filter(
    (p) => craft.marketplaceListingIds && craft.marketplaceListingIds.includes(p.id)
  );

  return (
    <div className="min-h-screen bg-[#fcf9f3] py-10 sm:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          href="/crafts"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#434843] hover:text-[#061b0e] mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Crafts</span>
        </Link>

        {/* Hero Card */}
        <div className="bg-[#f0eee8] rounded-3xl border border-[#c3c8c1] p-6 sm:p-10 shadow-xl mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-[#1b3022] text-[#fcf9f3] text-[11px] font-bold uppercase rounded-full">
                {craft.category}
              </span>
              <span className="px-3 py-1 bg-[#d0e9d4] text-[#0b2013] text-[11px] font-bold uppercase rounded-full">
                Status: {craft.preservationStatus}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#061b0e]">
              {craft.name}
            </h1>

            {craft.indigenousName && (
              <p className="text-sm font-semibold text-[#772f1a]">
                Indigenous nomenclature: {craft.indigenousName}
              </p>
            )}

            <p className="text-sm text-[#434843] leading-relaxed">
              {craft.culturalSignificance}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => toggleSaveCraft(craft.id)}
                className="px-6 py-3 bg-[#1b3022] hover:bg-[#061b0e] text-[#fcf9f3] text-xs font-bold uppercase tracking-wider rounded-full shadow-md flex items-center gap-2"
              >
                {user.savedCraftIds.includes(craft.id) ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-[#fbbb51] fill-current" /> Saved in Archive
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" /> Save Craft to Collection
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-[#e5e2dc]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={craft.imageUrl} alt={craft.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Detailed Knowledge Layer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          <div className="lg:col-span-8 space-y-8">
            
            {/* Traditional Crafting Method */}
            <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-8 border border-[#c3c8c1] shadow-md space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#974730]">
                <Hammer className="w-4 h-4" /> Archival Method & Technique
              </div>
              <h2 className="font-display text-2xl font-bold text-[#061b0e]">
                How {craft.name} is Traditionally Made
              </h2>
              <div className="space-y-4">
                {craft.traditionalCraftingMethod.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-[#fcf9f3] border border-[#c3c8c1]/40">
                    <div className="w-6 h-6 rounded-full bg-[#974730] text-[#fcf9f3] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-[#1c1c18] leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Artisan Listings (Clear separation between cultural knowledge & marketplace) */}
            <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-8 border border-[#c3c8c1] shadow-md space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#f0eee8]">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#819986] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> Living Artisan Marketplace
                  </span>
                  <h3 className="font-display text-xl font-bold text-[#061b0e] mt-0.5">
                    Acquire from Verified Northeast Masters
                  </h3>
                </div>
              </div>

              {verifiedListings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {verifiedListings.map((p) => (
                    <div key={p.id} className="p-4 rounded-2xl bg-[#fcf9f3] border border-[#c3c8c1]/60 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-[#e5e2dc]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                        </div>
                        <h4 className="font-display font-bold text-sm text-[#061b0e] line-clamp-2">
                          {p.title}
                        </h4>
                        <p className="text-[11px] text-[#737973] mt-1">
                          By {p.artisanName} ({p.artisanLocation})
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#c3c8c1]/40 flex items-center justify-between">
                        <span className="font-display text-base font-bold text-[#061b0e]">
                          ₹{p.priceInr}
                        </span>
                        <Link
                          href={`/marketplace#${p.id}`}
                          className="px-4 py-1.5 bg-[#974730] text-[#fcf9f3] text-xs font-bold uppercase rounded-full hover:bg-[#772f1a]"
                        >
                          Inquire Order
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 bg-[#f6f3ed] rounded-2xl text-center text-xs text-[#737973]">
                  No commercial listings currently approved for this craft. Would you like to connect with guilds in {craft.region}?
                </div>
              )}
            </div>

          </div>

          {/* Right Sidebar: Materials & Region Metadata */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#ffffff] rounded-3xl p-6 border border-[#c3c8c1] shadow-md space-y-4">
              <h3 className="font-display text-lg font-bold text-[#061b0e] pb-3 border-b border-[#f0eee8]">
                Material Origins
              </h3>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#737973] block mb-1">
                  Raw Indigenous Materials:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {craft.materialsUsed.map((mat, i) => (
                    <span key={i} className="px-2.5 py-1 bg-[#f0eee8] text-[#061b0e] text-xs font-medium rounded-full">
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#737973] block mb-1">
                  Primary Cultural Hub:
                </span>
                <p className="text-xs text-[#061b0e] font-semibold">{craft.region}, {craft.state}</p>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#737973] block mb-1">
                  Active Craftsmen in Hub:
                </span>
                <p className="text-xs text-[#1b3022] font-semibold">~{craft.artisanCountInRegion} Master Artisans</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
