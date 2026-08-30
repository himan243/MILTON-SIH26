'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Hammer,
  Plus,
  Package,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  DollarSign
} from 'lucide-react';

export default function ArtisanDashboardPage() {
  const { products, addProduct, inquiries, user, role, setRole, t, triggerConfetti } = useApp();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [craftName, setCraftName] = useState('Bamboo & Cane');
  const [priceInr, setPriceInr] = useState(1200);
  const [stockAvailable, setStockAvailable] = useState(10);
  const [description, setDescription] = useState('');
  const [dimensions, setDimensions] = useState('16 inches x 10 inches');
  const [materialDetails, setMaterialDetails] = useState('Organic Assam Bamboo & Cane');
  const [estimatedCraftingDays, setEstimatedCraftingDays] = useState(4);
  const [supportsBulkOrders, setSupportsBulkOrders] = useState(true);
  const [minBulkQuantity, setMinBulkQuantity] = useState(10);
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=800&q=80');

  const myProducts = products.filter((p) => p.artisanId === user.id || role === 'admin');

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      title,
      craftId: 'craft-bamboo-guild',
      craftName,
      artisanLocation: user.region,
      priceInr,
      stockAvailable,
      description,
      dimensions,
      materialDetails,
      estimatedCraftingDays,
      supportsBulkOrders,
      minBulkQuantity,
      imageUrl
    });

    setIsAddModalOpen(false);
    setTitle('');
    setDescription('');
    triggerConfetti();
  };

  return (
    <div className="lg:pl-[354px] min-h-screen bg-[#faf8f5] bg-creased-paper py-10 sm:py-14 px-4 sm:px-6 lg:px-10 transition-all">
      <div className="max-w-[1320px] mx-auto">
        
        {/* Header with Role Check */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#fed7aa] border-2 border-black rounded-full font-display text-xs uppercase tracking-wider shadow-retro-sm mb-3">
              <Hammer className="w-4 h-4 text-[#d97706]" /> Verified Artisan Portal
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#0c0f14] leading-[1.05] tracking-tight mb-2">
              ARTISAN <span className="marker-yellow">WORKSHOP</span> DESK
            </h1>
            <p className="font-hand text-xl text-zinc-700 font-bold leading-relaxed">
              Guild Craftsman: <span className="text-[#0c0f14]">{user.name}</span> ({user.region})
            </p>
          </div>

          <div className="flex items-center gap-3">
            {role !== 'artisan' && (
              <button
                onClick={() => setRole('artisan')}
                className="btn-retro px-4 py-2 bg-[#f4eee3] text-[#0c0f14] font-display text-xs uppercase rounded-xl border border-black shadow-retro-sm"
              >
                SWITCH ROLE TO ARTISAN
              </button>
            )}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn-retro px-5 py-2.5 bg-[#ef4444] hover:bg-[#dc2626] text-white font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-retro flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> ADD NEW CRAFT LISTING
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="card-retro bg-white p-5 border-2 border-black shadow-retro-sm space-y-1">
            <div className="font-display text-xs uppercase text-zinc-500 font-bold">CATALOG ITEMS</div>
            <div className="font-display text-3xl font-bold text-[#0c0f14]">{myProducts.length}</div>
            <div className="font-hand text-xs font-bold text-[#059669]">Verified & Pending listings</div>
          </div>
          <div className="card-retro bg-white p-5 border-2 border-black shadow-retro-sm space-y-1">
            <div className="font-display text-xs uppercase text-zinc-500 font-bold">CUSTOMER INQUIRIES</div>
            <div className="font-display text-3xl font-bold text-[#ef4444]">{inquiries.length}</div>
            <div className="font-hand text-xs font-bold text-zinc-600">Direct patron communications</div>
          </div>
          <div className="card-retro bg-white p-5 border-2 border-black shadow-retro-sm space-y-1">
            <div className="font-display text-xs uppercase text-zinc-500 font-bold">PLATFORM COMMISSION</div>
            <div className="font-display text-3xl font-bold text-[#0c0f14]">
              {products[0]?.commissionRate || 5}%
            </div>
            <div className="font-hand text-xs font-bold text-zinc-600">Fair transparent rate</div>
          </div>
        </div>

        {/* Listings Table & Approvals Status */}
        <div className="card-retro bg-white p-6 sm:p-8 border-[2.5px] border-[#0c0f14] shadow-retro-lg mb-10 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b-2 border-dashed border-black/20">
            <h2 className="font-display text-3xl font-bold text-[#0c0f14]">
              MY HANDCRAFTED LISTINGS
            </h2>
            <span className="font-hand text-xs font-bold text-zinc-600">
              *All new items require curator approval before public marketplace display.
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b-2 border-black text-zinc-700 font-display uppercase text-xs">
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3">Stock</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10">
                {myProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-[#faf8f5]">
                    <td className="py-3.5 flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.imageUrl} alt={p.title} className="w-10 h-10 rounded-lg object-cover border border-black shadow-retro-sm" />
                      <div>
                        <div className="font-display font-bold text-base text-[#0c0f14]">{p.title}</div>
                        <div className="font-hand text-xs font-bold text-zinc-600">{p.dimensions}</div>
                      </div>
                    </td>
                    <td className="py-3.5 font-display text-xs text-zinc-800">{p.craftName}</td>
                    <td className="py-3.5 font-display text-base font-bold text-[#0c0f14]">₹{p.priceInr}</td>
                    <td className="py-3.5 font-hand text-sm font-bold text-zinc-700">{p.stockAvailable} units</td>
                    <td className="py-3.5">
                      {p.verificationStatus === 'approved' ? (
                        <span className="rubber-stamp rubber-stamp-green text-[9px] py-0.5">
                          ✓ PUBLICLY LISTED
                        </span>
                      ) : p.verificationStatus === 'pending' ? (
                        <span className="rubber-stamp rubber-stamp-red text-[9px] py-0.5">
                          ⏳ PENDING APPROVAL
                        </span>
                      ) : (
                        <span className="rubber-stamp rubber-stamp-red text-[9px] py-0.5">
                          CHANGES NEEDED
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Inquiries Manager */}
        <div className="card-retro bg-[#f4eee3] p-6 sm:p-8 border-[2.5px] border-[#0c0f14] shadow-retro-lg space-y-6">
          <h2 className="font-display text-3xl font-bold text-[#0c0f14]">
            CUSTOMER INQUIRIES & BULK QUOTE REQUESTS
          </h2>

          {inquiries.length > 0 ? (
            <div className="space-y-3">
              {inquiries.map((inq) => (
                <div key={inq.id} className="card-retro bg-white p-4 border-2 border-black flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-retro-sm">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 bg-[#fef08a] text-[#0c0f14] font-display text-[10px] font-bold uppercase rounded border border-black">
                        {inq.orderType === 'bulk' ? 'BULK REQUEST' : 'STANDARD INQUIRY'}
                      </span>
                      <span className="font-display text-base font-bold text-[#0c0f14]">{inq.productTitle}</span>
                    </div>
                    <div className="font-hand text-xs font-bold text-zinc-600">
                      From: {inq.customerName} • 📞 {inq.customerContact} • 📍 {inq.deliveryCity}
                    </div>
                    {inq.notes && (
                      <p className="font-hand text-xs font-bold text-zinc-800 mt-2 italic bg-[#faf8f5] p-2 rounded-lg border border-black/20">
                        &quot;{inq.notes}&quot;
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="font-display text-sm font-bold text-[#ef4444]">Qty: {inq.requestedQuantity} pcs</span>
                    <div className="font-hand text-xs text-zinc-500 font-bold">{inq.submittedAt}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 bg-white rounded-2xl border-2 border-black text-center font-hand text-lg text-zinc-600 font-bold shadow-retro-sm">
              No pending customer inquiries. New patron requests will appear here.
            </div>
          )}
        </div>

        {/* Add Product Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="w-full max-w-xl card-retro bg-[#faf8f5] border-[2.5px] border-[#0c0f14] shadow-retro-xl p-6 sm:p-8 space-y-4 relative">
              <div className="pushpin-red" />

              <div className="flex items-center justify-between pb-3 border-b-2 border-black/20">
                <div>
                  <h3 className="font-display text-2xl font-bold text-[#0c0f14]">ADD HANDCRAFTED LISTING</h3>
                  <p className="font-hand text-xs font-bold text-zinc-600">Queued for Admin Curator Verification</p>
                </div>
                <button onClick={() => setIsAddModalOpen(false)} className="w-7 h-7 rounded-full border border-black bg-white flex items-center justify-center text-xs font-bold mr-6">
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-3">
                <div>
                  <label className="block font-display text-xs uppercase tracking-wider text-zinc-700 mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Handwoven Majuli Bamboo Fish Basket..."
                    className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-xs font-bold text-[#0c0f14] outline-none shadow-retro-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-display text-xs uppercase tracking-wider text-zinc-700 mb-1">
                      Craft Category
                    </label>
                    <select
                      value={craftName}
                      onChange={(e) => setCraftName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-xs font-bold text-[#0c0f14] outline-none shadow-retro-sm"
                    >
                      <option value="Bamboo & Cane">Bamboo & Cane</option>
                      <option value="Pottery & Clay">Longpi Black Pottery</option>
                      <option value="Handloom & Weaving">Muga & Eri Ahimsa Silk</option>
                      <option value="Household Tools">Household Tools</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-display text-xs uppercase tracking-wider text-zinc-700 mb-1">
                      Price (INR) *
                    </label>
                    <input
                      type="number"
                      required
                      min={100}
                      value={priceInr}
                      onChange={(e) => setPriceInr(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-xs font-bold text-[#0c0f14] outline-none shadow-retro-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-display text-xs uppercase tracking-wider text-zinc-700 mb-1">
                    Description & Crafting Narrative
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe how it was crafted, tools used, and significance..."
                    className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-xs font-bold text-[#0c0f14] outline-none shadow-retro-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-display text-xs uppercase tracking-wider text-zinc-700 mb-1">
                      Dimensions
                    </label>
                    <input
                      type="text"
                      value={dimensions}
                      onChange={(e) => setDimensions(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-xs font-bold text-[#0c0f14] outline-none shadow-retro-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-display text-xs uppercase tracking-wider text-zinc-700 mb-1">
                      Lead Time (Days)
                    </label>
                    <input
                      type="number"
                      value={estimatedCraftingDays}
                      onChange={(e) => setEstimatedCraftingDays(parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-xs font-bold text-[#0c0f14] outline-none shadow-retro-sm"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t-2 border-dashed border-black/20">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 text-xs font-display uppercase tracking-wider text-zinc-700 hover:bg-zinc-200 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-retro px-5 py-2.5 bg-[#ef4444] text-white font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-retro"
                  >
                    SUBMIT FOR CURATOR APPROVAL
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
