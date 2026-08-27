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
  const { products, addProduct, inquiries, user, role, setRole, t } = useApp();
  
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
  };

  return (
    <div className="min-h-screen bg-[#fcf9f3] py-12 sm:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header with Role Check */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fbbb51]/20 text-[#281800] text-xs font-bold uppercase tracking-wider mb-2">
              <Hammer className="w-4 h-4 text-[#c08820]" /> Verified Artisan Portal
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#061b0e]">
              Artisan Workshop Dashboard
            </h1>
            <p className="text-xs text-[#737973] mt-1">
              Active Guild: <span className="font-bold text-[#061b0e]">{user.name}</span> ({user.region})
            </p>
          </div>

          <div className="flex items-center gap-3">
            {role !== 'artisan' && (
              <button
                onClick={() => setRole('artisan')}
                className="px-4 py-2 bg-[#f0eee8] text-[#061b0e] text-xs font-bold uppercase rounded-full border border-[#c3c8c1]"
              >
                Switch Role to Artisan
              </button>
            )}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-6 py-3 bg-[#974730] hover:bg-[#772f1a] text-[#fcf9f3] text-xs font-bold uppercase tracking-wider rounded-full shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add New Craft Listing
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-[#ffffff] rounded-3xl border border-[#c3c8c1] shadow-sm">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#737973]">Active Catalog Items</div>
            <div className="font-display text-3xl font-bold text-[#061b0e] mt-1">{myProducts.length}</div>
            <div className="text-xs text-[#819986] mt-1">Verified & Pending listings</div>
          </div>
          <div className="p-6 bg-[#ffffff] rounded-3xl border border-[#c3c8c1] shadow-sm">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#737973]">Customer Inquiries</div>
            <div className="font-display text-3xl font-bold text-[#974730] mt-1">{inquiries.length}</div>
            <div className="text-xs text-[#737973] mt-1">Direct patron communications</div>
          </div>
          <div className="p-6 bg-[#ffffff] rounded-3xl border border-[#c3c8c1] shadow-sm">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#737973]">Platform Commission</div>
            <div className="font-display text-3xl font-bold text-[#1b3022] mt-1">
              {products[0]?.commissionRate || 5}%
            </div>
            <div className="text-xs text-[#737973] mt-1">Configured by Curator Admin</div>
          </div>
        </div>

        {/* Listings Table & Approvals Status */}
        <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-8 border border-[#c3c8c1] shadow-md mb-12 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#f0eee8]">
            <h2 className="font-display text-2xl font-bold text-[#061b0e]">
              My Handcrafted Listings
            </h2>
            <span className="text-xs text-[#737973]">
              *All new items require curator approval before public marketplace display.
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#f0eee8] text-[#737973] font-bold uppercase text-[10px]">
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3">Stock</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0eee8]">
                {myProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-[#fcf9f3]">
                    <td className="py-4 flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.imageUrl} alt={p.title} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <div className="font-bold text-[#061b0e]">{p.title}</div>
                        <div className="text-[10px] text-[#737973]">{p.dimensions}</div>
                      </div>
                    </td>
                    <td className="py-4 font-medium text-[#434843]">{p.craftName}</td>
                    <td className="py-4 font-bold text-[#061b0e]">₹{p.priceInr}</td>
                    <td className="py-4 font-medium text-[#434843]">{p.stockAvailable} units</td>
                    <td className="py-4">
                      {p.verificationStatus === 'approved' ? (
                        <span className="px-2.5 py-1 bg-[#d0e9d4] text-[#0b2013] text-[10px] font-bold uppercase rounded-full">
                          ✓ Publicly Listed
                        </span>
                      ) : p.verificationStatus === 'pending' ? (
                        <span className="px-2.5 py-1 bg-[#fbbb51]/20 text-[#281800] text-[10px] font-bold uppercase rounded-full">
                          ⏳ Pending Approval
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-[#ffdad6] text-[#93000a] text-[10px] font-bold uppercase rounded-full">
                          Changes Needed
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
        <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-8 border border-[#c3c8c1] shadow-md space-y-6">
          <h2 className="font-display text-2xl font-bold text-[#061b0e]">
            Customer Inquiries & Bulk Quote Requests
          </h2>

          {inquiries.length > 0 ? (
            <div className="space-y-3">
              {inquiries.map((inq) => (
                <div key={inq.id} className="p-4 rounded-2xl bg-[#fcf9f3] border border-[#c3c8c1]/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 bg-[#1b3022] text-[#fcf9f3] text-[10px] font-bold uppercase rounded-full">
                        {inq.orderType === 'bulk' ? 'Bulk Request' : 'Standard Inquiry'}
                      </span>
                      <span className="text-xs font-bold text-[#061b0e]">{inq.productTitle}</span>
                    </div>
                    <div className="text-xs text-[#737973]">
                      From: <span className="font-semibold text-[#061b0e]">{inq.customerName}</span> • 📞 {inq.customerContact} • 📍 {inq.deliveryCity}
                    </div>
                    {inq.notes && (
                      <p className="text-xs text-[#434843] mt-2 italic bg-[#ffffff] p-2 rounded-lg border border-[#c3c8c1]/40">
                        &quot;{inq.notes}&quot;
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#974730]">Qty: {inq.requestedQuantity} pcs</span>
                    <div className="text-[10px] text-[#737973] mt-1">{inq.submittedAt}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 bg-[#f6f3ed] rounded-2xl text-center text-xs text-[#737973]">
              No pending customer inquiries. New patron requests will appear here.
            </div>
          )}
        </div>

        {/* Add Product Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#061b0e]/75 backdrop-blur-md animate-in fade-in">
            <div className="w-full max-w-xl bg-[#ffffff] rounded-3xl border border-[#c3c8c1] shadow-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#f0eee8]">
                <div>
                  <h3 className="font-display text-2xl font-bold text-[#061b0e]">Add Handcrafted Listing</h3>
                  <p className="text-xs text-[#737973]">Queued for Admin Curator Verification</p>
                </div>
                <button onClick={() => setIsAddModalOpen(false)} className="text-[#737973] hover:text-[#061b0e]">
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#737973] mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Handwoven Majuli Bamboo Fish Basket..."
                    className="w-full px-3 py-2 rounded-xl bg-[#f6f3ed] border border-[#c3c8c1] text-xs text-[#061b0e] outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#737973] mb-1">
                      Craft Category
                    </label>
                    <select
                      value={craftName}
                      onChange={(e) => setCraftName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#f6f3ed] border border-[#c3c8c1] text-xs text-[#061b0e] outline-none"
                    >
                      <option value="Bamboo & Cane">Bamboo & Cane</option>
                      <option value="Pottery & Clay">Longpi Black Pottery</option>
                      <option value="Handloom & Weaving">Muga & Eri Ahimsa Silk</option>
                      <option value="Household Tools">Household Tools</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#737973] mb-1">
                      Price (INR) *
                    </label>
                    <input
                      type="number"
                      required
                      min={100}
                      value={priceInr}
                      onChange={(e) => setPriceInr(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-xl bg-[#f6f3ed] border border-[#c3c8c1] text-xs text-[#061b0e] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#737973] mb-1">
                    Description & Crafting Narrative
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe how it was crafted, tools used, and significance..."
                    className="w-full px-3 py-2 rounded-xl bg-[#f6f3ed] border border-[#c3c8c1] text-xs text-[#061b0e] outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#737973] mb-1">
                      Dimensions
                    </label>
                    <input
                      type="text"
                      value={dimensions}
                      onChange={(e) => setDimensions(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#f6f3ed] border border-[#c3c8c1] text-xs text-[#061b0e] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#737973] mb-1">
                      Crafting Lead Time (Days)
                    </label>
                    <input
                      type="number"
                      value={estimatedCraftingDays}
                      onChange={(e) => setEstimatedCraftingDays(parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 rounded-xl bg-[#f6f3ed] border border-[#c3c8c1] text-xs text-[#061b0e] outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold uppercase text-[#737973]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#974730] hover:bg-[#772f1a] text-[#fcf9f3] text-xs font-bold uppercase tracking-wider rounded-full shadow-md"
                  >
                    Submit for Curator Approval
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
