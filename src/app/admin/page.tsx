'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Shield,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Package,
  Users,
  Gamepad2,
  DollarSign,
  Sparkles,
  BookOpen,
  Settings
} from 'lucide-react';

export default function CuratorAdminPage() {
  const {
    products,
    approveProduct,
    rejectProduct,
    submissions,
    updateSubmissionStatus,
    analytics,
    updateCommissionRate,
    role,
    setRole,
    t,
    triggerConfetti
  } = useApp();

  const [commissionInput, setCommissionInput] = useState(analytics.currentCommissionPercentage);
  const [activeTab, setActiveTab] = useState<'products' | 'submissions' | 'config'>('products');

  const pendingProducts = products.filter((p) => p.verificationStatus === 'pending');
  const pendingSubmissions = submissions.filter((s) => s.status === 'pending' || s.status === 'under-review');

  const handleUpdateCommission = (e: React.FormEvent) => {
    e.preventDefault();
    updateCommissionRate(commissionInput);
    triggerConfetti();
  };

  return (
    <div className="lg:pl-[354px] min-h-screen bg-[#faf8f5] bg-creased-paper py-10 sm:py-14 px-4 sm:px-6 lg:px-10 transition-all">
      <div className="max-w-[1320px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#fee2e2] border-2 border-black rounded-full font-display text-xs uppercase tracking-wider shadow-retro-sm mb-3">
              <Shield className="w-4 h-4 text-[#dc2626]" /> Heritage Curator Console
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#0c0f14] leading-[1.05] tracking-tight mb-2">
              CURATOR <span className="marker-underline text-[#ef4444]">ADMIN</span> DESK
            </h1>
            <p className="font-hand text-xl text-zinc-700 font-bold leading-relaxed">
              Verify artisan submissions, approve community preservation records, and calibrate platform economics.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {role !== 'admin' && (
              <button
                onClick={() => setRole('admin')}
                className="btn-retro px-4 py-2 bg-[#ef4444] text-white font-display text-xs font-black uppercase rounded-xl shadow-retro"
              >
                SWITCH TO ADMIN ROLE
              </button>
            )}
          </div>
        </div>

        {/* Analytics 4-Card Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="card-retro bg-white p-4 sm:p-5 border-2 border-black shadow-retro-sm space-y-1">
            <div className="font-display text-xs uppercase text-zinc-500 font-bold">REGISTERED ARCHIVISTS</div>
            <div className="font-display text-3xl font-bold text-[#0c0f14]">{analytics.registeredUsersCount}</div>
            <div className="font-hand text-xs font-bold text-[#059669]">+18 active today</div>
          </div>
          <div className="card-retro bg-white p-4 sm:p-5 border-2 border-black shadow-retro-sm space-y-1">
            <div className="font-display text-xs uppercase text-zinc-500 font-bold">PENDING APPROVALS</div>
            <div className="font-display text-3xl font-bold text-[#ef4444]">
              {pendingProducts.length + pendingSubmissions.length}
            </div>
            <div className="font-hand text-xs font-bold text-[#ef4444]">Awaiting verification</div>
          </div>
          <div className="card-retro bg-white p-4 sm:p-5 border-2 border-black shadow-retro-sm space-y-1">
            <div className="font-display text-xs uppercase text-zinc-500 font-bold">AI CREATIONS RUN</div>
            <div className="font-display text-3xl font-bold text-[#d97706]">{analytics.aiCreationsGenerated}</div>
            <div className="font-hand text-xs font-bold text-zinc-600">Multimodal blueprints</div>
          </div>
          <div className="card-retro bg-white p-4 sm:p-5 border-2 border-black shadow-retro-sm space-y-1">
            <div className="font-display text-xs uppercase text-zinc-500 font-bold">COMMISSION RATE</div>
            <div className="font-display text-3xl font-bold text-[#0c0f14]">{analytics.currentCommissionPercentage}%</div>
            <div className="font-hand text-xs font-bold text-zinc-600">Configurable fee</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-[#f4eee3] rounded-2xl border-2 border-black mb-8 shadow-retro-sm">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl font-display text-xs uppercase tracking-wider transition-all ${
              activeTab === 'products'
                ? 'bg-[#0c0f14] text-[#fef08a] border border-black shadow-retro-sm'
                : 'text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            PENDING PRODUCTS ({pendingProducts.length})
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-4 py-2 rounded-xl font-display text-xs uppercase tracking-wider transition-all ${
              activeTab === 'submissions'
                ? 'bg-[#0c0f14] text-[#fef08a] border border-black shadow-retro-sm'
                : 'text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            COMMUNITY SUBMISSIONS ({pendingSubmissions.length})
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`px-4 py-2 rounded-xl font-display text-xs uppercase tracking-wider transition-all ${
              activeTab === 'config'
                ? 'bg-[#0c0f14] text-[#fef08a] border border-black shadow-retro-sm'
                : 'text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            PLATFORM ECONOMICS & CONFIG
          </button>
        </div>

        {/* Tab 1: Products Queue */}
        {activeTab === 'products' && (
          <div className="card-retro bg-white p-6 sm:p-8 border-[2.5px] border-[#0c0f14] shadow-retro-lg space-y-6">
            <div>
              <h2 className="font-display text-3xl font-bold text-[#0c0f14]">
                ARTISAN PRODUCT VERIFICATION QUEUE
              </h2>
              <p className="font-hand text-base text-zinc-600 font-bold">
                Review genuine handiwork, confirm authenticity, and publish to the live marketplace.
              </p>
            </div>

            {pendingProducts.length > 0 ? (
              <div className="space-y-4">
                {pendingProducts.map((p) => (
                  <div
                    key={p.id}
                    className="p-5 rounded-2xl bg-[#faf8f5] border-2 border-black shadow-retro-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                  >
                    <div className="flex items-start gap-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.imageUrl} alt={p.title} className="w-20 h-20 rounded-xl object-cover border border-black shrink-0" />
                      <div className="space-y-1">
                        <span className="font-display text-[10px] uppercase px-2 py-0.5 rounded bg-[#fef08a] text-[#0c0f14] border border-black font-bold">
                          {p.craftName}
                        </span>
                        <h4 className="font-display font-bold text-xl text-[#0c0f14]">{p.title}</h4>
                        <div className="font-hand text-xs font-bold text-zinc-600">
                          Artisan: {p.artisanName} ({p.artisanLocation}) • ₹{p.priceInr}
                        </div>
                        <p className="text-xs text-zinc-700 max-w-xl font-medium leading-relaxed">
                          {p.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
                      <button
                        onClick={() => rejectProduct(p.id)}
                        className="btn-retro px-4 py-2 bg-[#fee2e2] text-[#991b1b] font-display text-xs uppercase rounded-xl shadow-retro-sm flex items-center gap-1"
                      >
                        <XCircle className="w-4 h-4" /> REJECT
                      </button>
                      <button
                        onClick={() => { approveProduct(p.id); triggerConfetti(); }}
                        className="btn-retro px-5 py-2 bg-[#0c0f14] hover:bg-zinc-800 text-[#fef08a] font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-retro-sm flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#fef08a]" /> APPROVE & PUBLISH
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 bg-[#faf8f5] rounded-2xl border-2 border-black text-center font-hand text-lg text-zinc-700 font-bold shadow-retro-sm">
                🎉 All artisan product listings are verified and approved for public display!
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Community Submissions */}
        {activeTab === 'submissions' && (
          <div className="card-retro bg-white p-6 sm:p-8 border-[2.5px] border-[#0c0f14] shadow-retro-lg space-y-6">
            <h2 className="font-display text-3xl font-bold text-[#0c0f14]">
              COMMUNITY ARCHIVAL SUBMISSIONS
            </h2>

            {pendingSubmissions.length > 0 ? (
              <div className="space-y-4">
                {pendingSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-5 rounded-2xl bg-[#faf8f5] border-2 border-black shadow-retro-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#fef08a] text-[#0c0f14] text-[10px] font-display uppercase rounded border border-black">
                          {sub.type}
                        </span>
                        <span className="font-display text-base font-bold text-[#0c0f14]">{sub.title}</span>
                        <span className="font-hand text-xs font-bold text-zinc-600">📍 {sub.region}</span>
                      </div>
                      <p className="text-xs text-zinc-700 max-w-xl font-medium leading-relaxed">
                        {sub.description}
                      </p>
                      <div className="font-hand text-xs text-zinc-500 font-bold">
                        Submitted by: {sub.submittedBy} ({sub.submittedAt})
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateSubmissionStatus(sub.id, 'rejected')}
                        className="btn-retro px-3.5 py-1.5 text-xs font-display uppercase text-[#991b1b] bg-[#fee2e2] rounded-xl shadow-retro-sm"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => updateSubmissionStatus(sub.id, 'under-review')}
                        className="btn-retro px-3.5 py-1.5 bg-[#f4eee3] text-xs font-display uppercase text-[#0c0f14] rounded-xl shadow-retro-sm"
                      >
                        Review
                      </button>
                      <button
                        onClick={() => { updateSubmissionStatus(sub.id, 'approved'); triggerConfetti(); }}
                        className="btn-retro px-4 py-1.5 bg-[#0c0f14] text-[#fef08a] text-xs font-display font-black uppercase rounded-xl shadow-retro-sm"
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 bg-[#faf8f5] rounded-2xl border-2 border-black text-center font-hand text-lg text-zinc-700 font-bold shadow-retro-sm">
                No pending community memories awaiting review.
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Config & Platform Economics */}
        {activeTab === 'config' && (
          <div className="card-retro bg-white p-6 sm:p-8 border-[2.5px] border-[#0c0f14] shadow-retro-lg space-y-6">
            <h2 className="font-display text-3xl font-bold text-[#0c0f14]">
              MARKETPLACE ECONOMICS CONFIGURATION
            </h2>

            <form onSubmit={handleUpdateCommission} className="max-w-md space-y-4 p-6 bg-[#f4eee3] rounded-2xl border-2 border-black shadow-retro-sm">
              <div>
                <label className="block font-display text-xs uppercase tracking-wider text-zinc-700 mb-1">
                  Configurable Marketplace Commission (%)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={0}
                    max={25}
                    step={0.5}
                    value={commissionInput}
                    onChange={(e) => setCommissionInput(parseFloat(e.target.value) || 0)}
                    className="w-32 px-3.5 py-2 rounded-xl bg-white border-2 border-black text-sm font-bold text-[#0c0f14] outline-none shadow-retro-sm"
                  />
                  <span className="font-hand text-sm font-bold text-zinc-700">% transaction fee</span>
                </div>
                <p className="font-hand text-xs font-bold text-zinc-600 mt-2">
                  *Commission rate can be adjusted by admins dynamically to balance artisan revenue and platform maintenance.
                </p>
              </div>

              <button
                type="submit"
                className="btn-retro px-5 py-2.5 bg-[#0c0f14] hover:bg-zinc-800 text-[#fef08a] font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-retro"
              >
                SAVE COMMISSION CONFIG
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
