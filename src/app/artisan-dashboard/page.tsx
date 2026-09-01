'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Hammer,
  Sparkles,
  Clock,
  CheckCircle2,
  Send,
  ShieldCheck,
  Package,
  Layers,
  HeartHandshake,
  Award,
  ArrowRight
} from 'lucide-react';

export default function ArtisanDashboardPage() {
  const { joinArtisanWaitlist, artisanWaitlist, user, triggerConfetti } = useApp();

  const [artisanName, setArtisanName] = useState(user.name !== 'Guest Visitor' ? user.name : '');
  const [craftCategory, setCraftCategory] = useState('Bamboo & Cane Weaving');
  const [location, setLocation] = useState(user.region || 'Guwahati, Assam');
  const [phone, setPhone] = useState('+91 ');
  const [email, setEmail] = useState(user.email || '');
  const [experienceYears, setExperienceYears] = useState(8);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artisanName.trim() || !phone.trim()) return;

    joinArtisanWaitlist({
      artisanName,
      craftCategory,
      location,
      phone,
      email,
      experienceYears,
      message
    });

    setSubmitted(true);
    triggerConfetti();
  };

  return (
    <div className="lg:pl-[354px] min-h-screen bg-[#faf8f5] bg-creased-paper py-10 sm:py-14 px-4 sm:px-6 lg:px-10 transition-all">
      <div className="max-w-[1240px] mx-auto space-y-12">
        
        {/* Coming Soon Hero Banner */}
        <div className="card-retro bg-[#f4eee3] p-8 sm:p-12 lg:p-14 border-[2.5px] border-[#0c0f14] shadow-retro-xl relative text-center sm:text-left overflow-hidden">
          <div className="pushpin-red" />

          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#fef08a] border-2 border-black rounded-full font-display text-xs uppercase tracking-wider shadow-retro-sm">
              <Clock className="w-4 h-4 text-[#ef4444] animate-spin" /> COMING SOON • PHASE 2 ROLLOUT
            </div>

            <h1 className="font-display text-4xl sm:text-7xl font-black text-[#0c0f14] leading-[0.95] tracking-tight uppercase">
              INDIGENOUS <span className="marker-underline text-[#ef4444]">ARTISAN GUILD</span> STUDIO
            </h1>

            <p className="font-hand text-xl sm:text-2xl text-zinc-800 font-bold leading-relaxed">
              We are currently digitizing master craft lineages across 8 Northeast states to bring direct, fair-trade artisan storefronts with zero middlemen exploitation.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 justify-center sm:justify-start">
              <span className="px-3.5 py-1.5 bg-[#0c0f14] text-[#fef08a] rounded-xl font-display text-xs uppercase border border-black shadow-retro-sm">
                🏺 0% PLATFORM CUT GUARANTEE
              </span>
              <span className="px-3.5 py-1.5 bg-[#fed7aa] text-[#9a3412] rounded-xl font-display text-xs uppercase border border-black shadow-retro-sm">
                📜 HERITAGE GEOGRAPHICAL INDICATION (GI)
              </span>
            </div>
          </div>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-retro bg-white p-6 border-2 border-black shadow-retro-md space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#fef08a] border border-black flex items-center justify-center font-bold text-xl">
              🪵
            </div>
            <h3 className="font-display text-2xl font-bold text-[#0c0f14]">DIRECT CRAFT STOREFRONT</h3>
            <p className="font-hand text-sm font-bold text-zinc-600 leading-relaxed">
              Authentic hand-carved bamboo tools, black stone pottery, and natural Ahimsa peace silks listed directly by the master weavers.
            </p>
          </div>

          <div className="card-retro bg-white p-6 border-2 border-black shadow-retro-md space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#fed7aa] border border-black flex items-center justify-center font-bold text-xl">
              🛡️
            </div>
            <h3 className="font-display text-2xl font-bold text-[#0c0f14]">CURATOR AUTHENTICATION</h3>
            <p className="font-hand text-sm font-bold text-zinc-600 leading-relaxed">
              Every item is verified by our museum curators for raw materials, cultural provenance, and traditional handcrafting standards.
            </p>
          </div>

          <div className="card-retro bg-white p-6 border-2 border-black shadow-retro-md space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#bbf7d0] border border-black flex items-center justify-center font-bold text-xl">
              📦
            </div>
            <h3 className="font-display text-2xl font-bold text-[#0c0f14]">BULK PATRON INQUIRIES</h3>
            <p className="font-hand text-sm font-bold text-zinc-600 leading-relaxed">
              Enable global cultural institutions, schools, and diaspora collectors to request custom bulk orders with fair transparent escrow.
            </p>
          </div>
        </div>

        {/* Early Artisan Waitlist / Application Form */}
        <div className="card-retro bg-white p-6 sm:p-10 border-[2.5px] border-[#0c0f14] shadow-retro-xl relative">
          <div className="pushpin-red" />

          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2 pb-4 border-b-2 border-dashed border-black/20">
              <span className="font-display text-xs uppercase tracking-widest text-[#ef4444] font-bold">
                EARLY ONBOARDING REGISTRATION
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0c0f14]">
                ARE YOU A TRADITIONAL CRAFTSMAN?
              </h2>
              <p className="font-hand text-base text-zinc-600 font-bold">
                Join the early access cohort. Our field curators will visit your workshop to assist with free photography, GI verification, and catalog listing.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-[#bbf7d0] border-2 border-black rounded-2xl text-center space-y-3 shadow-retro-md">
                <CheckCircle2 className="w-12 h-12 text-[#065f46] mx-auto" />
                <h3 className="font-display text-2xl font-bold text-[#065f46]">
                  APPLICATION RECEIVED!
                </h3>
                <p className="font-hand text-base text-[#065f46] font-bold max-w-md mx-auto">
                  Thank you for keeping ancestral crafts alive. Our team will contact you shortly to coordinate workshop verification and early catalog listing.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-display text-xs uppercase tracking-wider text-zinc-700 mb-1 font-bold">
                      Artisan / Guild Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={artisanName}
                      onChange={(e) => setArtisanName(e.target.value)}
                      placeholder="e.g. Majuli Mask Artisans Guild"
                      className="w-full px-3 py-2 bg-[#faf8f5] border-2 border-black rounded-xl text-xs font-bold text-[#0c0f14] outline-none shadow-retro-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-display text-xs uppercase tracking-wider text-zinc-700 mb-1 font-bold">
                      Craft Category *
                    </label>
                    <select
                      value={craftCategory}
                      onChange={(e) => setCraftCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-[#faf8f5] border-2 border-black rounded-xl text-xs font-bold text-[#0c0f14] outline-none shadow-retro-sm"
                    >
                      <option value="Bamboo & Cane Weaving">Bamboo & Cane Weaving</option>
                      <option value="Pottery & Clay Sculpting">Longpi Black Pottery / Clay</option>
                      <option value="Muga & Eri Ahimsa Silk">Muga & Eri Ahimsa Silk</option>
                      <option value="Woodcarving & Bell Metal">Woodcarving & Bell Metal</option>
                      <option value="Natural Fiber Basketry">Natural Fiber Basketry</option>
                      <option value="Tribal Musical Instruments">Tribal Musical Instruments</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-display text-xs uppercase tracking-wider text-zinc-700 mb-1 font-bold">
                      Location / District *
                    </label>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Majuli, Assam"
                      className="w-full px-3 py-2 bg-[#faf8f5] border-2 border-black rounded-xl text-xs font-bold text-[#0c0f14] outline-none shadow-retro-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-display text-xs uppercase tracking-wider text-zinc-700 mb-1 font-bold">
                      Phone Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98640 11234"
                      className="w-full px-3 py-2 bg-[#faf8f5] border-2 border-black rounded-xl text-xs font-bold text-[#0c0f14] outline-none shadow-retro-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-display text-xs uppercase tracking-wider text-zinc-700 mb-1 font-bold">
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={70}
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 bg-[#faf8f5] border-2 border-black rounded-xl text-xs font-bold text-[#0c0f14] outline-none shadow-retro-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-display text-xs uppercase tracking-wider text-zinc-700 mb-1 font-bold">
                    Tell us about your handcrafted tools & techniques
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. We use seasoned Bhaluka bamboo harvested in autumn and split with traditional daos..."
                    className="w-full px-3 py-2 bg-[#faf8f5] border-2 border-black rounded-xl text-xs font-bold text-[#0c0f14] outline-none shadow-retro-sm"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="btn-retro px-6 py-3 bg-[#ef4444] hover:bg-[#dc2626] text-white font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-retro flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" /> SUBMIT ARTISAN WAITLIST APPLICATION
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
