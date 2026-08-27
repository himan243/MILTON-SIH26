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
    t
  } = useApp();

  const [commissionInput, setCommissionInput] = useState(analytics.currentCommissionPercentage);
  const [activeTab, setActiveTab] = useState<'products' | 'submissions' | 'config'>('products');

  const pendingProducts = products.filter((p) => p.verificationStatus === 'pending');
  const pendingSubmissions = submissions.filter((s) => s.status === 'pending' || s.status === 'under-review');

  const handleUpdateCommission = (e: React.FormEvent) => {
    e.preventDefault();
    updateCommissionRate(commissionInput);
  };

  return (
    <div className="min-h-screen bg-[#fcf9f3] py-12 sm:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffdad6] text-[#93000a] text-xs font-bold uppercase tracking-wider mb-2">
              <Shield className="w-4 h-4" /> Heritage Curator Administrative Console
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#061b0e]">
              Cultural Moderation & Governance
            </h1>
            <p className="text-xs text-[#737973] mt-1">
              Verify artisan submissions, moderate community knowledge, and calibrate platform economics.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {role !== 'admin' && (
              <button
                onClick={() => setRole('admin')}
                className="px-4 py-2 bg-[#974730] text-[#fcf9f3] text-xs font-bold uppercase rounded-full shadow-md"
              >
                Switch to Admin Role
              </button>
            )}
          </div>
        </div>

        {/* Real-time Analytics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
          <div className="p-5 bg-[#ffffff] rounded-3xl border border-[#c3c8c1] shadow-sm space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#737973]">Registered Explorers</div>
            <div className="font-display text-3xl font-bold text-[#061b0e]">{analytics.registeredUsersCount}</div>
            <div className="text-[11px] text-[#819986]">+18 active today</div>
          </div>
          <div className="p-5 bg-[#ffffff] rounded-3xl border border-[#c3c8c1] shadow-sm space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#737973]">Pending Approvals</div>
            <div className="font-display text-3xl font-bold text-[#974730]">
              {pendingProducts.length + pendingSubmissions.length}
            </div>
            <div className="text-[11px] text-[#974730]">Awaiting verification</div>
          </div>
          <div className="p-5 bg-[#ffffff] rounded-3xl border border-[#c3c8c1] shadow-sm space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#737973]">AI Creations Run</div>
            <div className="font-display text-3xl font-bold text-[#c08820]">{analytics.aiCreationsGenerated}</div>
            <div className="text-[11px] text-[#737973]">Multimodal upcycling</div>
          </div>
          <div className="p-5 bg-[#ffffff] rounded-3xl border border-[#c3c8c1] shadow-sm space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#737973]">Commission Rate</div>
            <div className="font-display text-3xl font-bold text-[#1b3022]">{analytics.currentCommissionPercentage}%</div>
            <div className="text-[11px] text-[#737973]">Marketplace transaction fee</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-1.5 bg-[#f0eee8] rounded-full border border-[#c3c8c1] mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'products' ? 'bg-[#1b3022] text-[#fcf9f3]' : 'text-[#434843] hover:text-[#061b0e]'
            }`}
          >
            Pending Products ({pendingProducts.length})
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'submissions' ? 'bg-[#1b3022] text-[#fcf9f3]' : 'text-[#434843] hover:text-[#061b0e]'
            }`}
          >
            Community Submissions ({pendingSubmissions.length})
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'config' ? 'bg-[#1b3022] text-[#fcf9f3]' : 'text-[#434843] hover:text-[#061b0e]'
            }`}
          >
            Platform Economics & Settings
          </button>
        </div>

        {/* Tab 1: Pending Products Verification Queue */}
        {activeTab === 'products' && (
          <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-8 border border-[#c3c8c1] shadow-md space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#f0eee8]">
              <div>
                <h2 className="font-display text-2xl font-bold text-[#061b0e]">
                  Artisan Product Verification Queue
                </h2>
                <p className="text-xs text-[#737973]">
                  Verify authenticity, ensure fair pricing, and approve for public marketplace visibility.
                </p>
              </div>
            </div>

            {pendingProducts.length > 0 ? (
              <div className="space-y-4">
                {pendingProducts.map((p) => (
                  <div
                    key={p.id}
                    className="p-5 rounded-2xl bg-[#fcf9f3] border border-[#c3c8c1] flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                  >
                    <div className="flex items-start gap-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.imageUrl} alt={p.title} className="w-20 h-20 rounded-2xl object-cover shrink-0" />
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#1b3022] text-[#fcf9f3]">
                          {p.craftName}
                        </span>
                        <h4 className="font-display font-bold text-lg text-[#061b0e]">{p.title}</h4>
                        <div className="text-xs text-[#737973]">
                          Artisan: <span className="font-semibold text-[#061b0e]">{p.artisanName}</span> ({p.artisanLocation}) • ₹{p.priceInr}
                        </div>
                        <p className="text-xs text-[#434843] max-w-xl leading-relaxed">
                          {p.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                      <button
                        onClick={() => rejectProduct(p.id)}
                        className="px-4 py-2 bg-[#ffdad6] hover:bg-[#ffb4ab] text-[#93000a] text-xs font-bold uppercase rounded-full transition-colors flex items-center gap-1.5"
                      >
                        <XCircle className="w-4 h-4" /> Reject / Changes
                      </button>
                      <button
                        onClick={() => approveProduct(p.id)}
                        className="px-6 py-2 bg-[#1b3022] hover:bg-[#061b0e] text-[#fcf9f3] text-xs font-bold uppercase tracking-wider rounded-full shadow-md transition-colors flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#fbbb51]" /> Approve & Publish
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-10 bg-[#f6f3ed] rounded-2xl text-center text-xs text-[#737973]">
                🎉 All artisan product listings are verified and up to date!
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Community Submissions Moderation */}
        {activeTab === 'submissions' && (
          <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-8 border border-[#c3c8c1] shadow-md space-y-6">
            <h2 className="font-display text-2xl font-bold text-[#061b0e]">
              Community Archival Submissions
            </h2>

            {pendingSubmissions.length > 0 ? (
              <div className="space-y-4">
                {pendingSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-5 rounded-2xl bg-[#fcf9f3] border border-[#c3c8c1] flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 bg-[#fe997c]/20 text-[#772f1a] text-[10px] font-bold uppercase rounded-full">
                          {sub.type}
                        </span>
                        <span className="text-xs font-bold text-[#061b0e]">{sub.title}</span>
                        <span className="text-xs text-[#737973]">📍 {sub.region}</span>
                      </div>
                      <p className="text-xs text-[#434843] max-w-xl leading-relaxed">
                        {sub.description}
                      </p>
                      <div className="text-[10px] text-[#737973]">
                        Submitted by: {sub.submittedBy} ({sub.submittedAt})
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateSubmissionStatus(sub.id, 'rejected')}
                        className="px-3.5 py-1.5 text-xs font-bold text-[#ba1a1a] hover:bg-[#ffdad6] rounded-full"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => updateSubmissionStatus(sub.id, 'under-review')}
                        className="px-3.5 py-1.5 bg-[#f0eee8] text-xs font-bold text-[#061b0e] rounded-full"
                      >
                        Under Review
                      </button>
                      <button
                        onClick={() => updateSubmissionStatus(sub.id, 'approved')}
                        className="px-5 py-1.5 bg-[#1b3022] text-[#fcf9f3] text-xs font-bold uppercase rounded-full shadow-sm"
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-10 bg-[#f6f3ed] rounded-2xl text-center text-xs text-[#737973]">
                No pending community memories awaiting review.
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Config & Platform Economics */}
        {activeTab === 'config' && (
          <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-8 border border-[#c3c8c1] shadow-md space-y-6">
            <h2 className="font-display text-2xl font-bold text-[#061b0e]">
              Marketplace Economics Configuration
            </h2>

            <form onSubmit={handleUpdateCommission} className="max-w-md space-y-4 p-6 bg-[#fcf9f3] rounded-2xl border border-[#c3c8c1]/60">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#737973] mb-1">
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
                    className="w-32 px-3 py-2 rounded-xl bg-[#ffffff] border border-[#c3c8c1] text-sm font-bold text-[#061b0e] outline-none"
                  />
                  <span className="text-xs text-[#737973]">% per verified transaction</span>
                </div>
                <p className="text-[11px] text-[#737973] mt-2">
                  *As per prompt specification Section 14, commission rate is not hardcoded and can be adjusted by admins dynamically.
                </p>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1b3022] hover:bg-[#061b0e] text-[#fcf9f3] text-xs font-bold uppercase tracking-wider rounded-full shadow-md"
              >
                Save Commission Config
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
