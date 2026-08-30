'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ArtisanProduct } from '@/types';
import {
  Package,
  Search,
  ShieldCheck,
  Send,
  Sparkles,
  CheckCircle2,
  Truck,
  Box,
  Folder,
  X
} from 'lucide-react';

export default function MarketplacePage() {
  const { products, submitInquiry, user, t, triggerConfetti } = useApp();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<ArtisanProduct | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [orderType, setOrderType] = useState<'single' | 'bulk'>('single');
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState(user.name);
  const [customerContact, setCustomerContact] = useState('+91 98765 43210');
  const [deliveryCity, setDeliveryCity] = useState(user.region);
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const approvedProducts = products.filter((p) => p.verificationStatus === 'approved');

  const filteredProducts = approvedProducts.filter((product) => {
    return (
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.artisanName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.artisanLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.craftName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleOpenInquiry = (product: ArtisanProduct, type: 'single' | 'bulk' = 'single') => {
    setSelectedProduct(product);
    setOrderType(type);
    setQuantity(type === 'bulk' ? (product.minBulkQuantity || 10) : 1);
    setIsInquiryModalOpen(true);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    submitInquiry({
      productId: selectedProduct.id,
      productTitle: selectedProduct.title,
      artisanId: selectedProduct.artisanId,
      artisanName: selectedProduct.artisanName,
      customerName,
      customerContact,
      customerEmail: user.email,
      deliveryCity,
      requestedQuantity: quantity,
      orderType,
      notes
    });

    setIsSuccess(true);
    triggerConfetti();
    setTimeout(() => {
      setIsSuccess(false);
      setIsInquiryModalOpen(false);
      setNotes('');
    }, 2400);
  };

  return (
    <div className="lg:pl-[354px] min-h-screen bg-[#faf8f5] bg-creased-paper py-10 sm:py-14 px-4 sm:px-6 lg:px-10 transition-all">
      <div className="max-w-[1320px] mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#e9d5ff] border-2 border-black rounded-full font-display text-xs uppercase tracking-wider shadow-retro-sm mb-3">
            <ShieldCheck className="w-4 h-4 text-[#9333ea]" /> Verified Northeast Artisan Store
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#0c0f14] leading-[1.05] tracking-tight mb-3">
            ARTISAN <span className="marker-yellow">MARKETPLACE</span>
          </h1>
          <p className="font-hand text-xl text-zinc-700 font-bold leading-relaxed">
            Direct connections to master weavers, bamboo sculptors, and black pottery kilns. Zero middlemen, transparent quotes, and bulk procurement support.
          </p>
        </div>

        {/* Search Bar & Trust Badges */}
        <div className="card-retro bg-[#f4eee3] p-4 sm:p-5 border-[2.5px] border-[#0c0f14] shadow-retro-md mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-zinc-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search items by title, artisan, craft..."
              className="w-full pl-10 pr-4 py-2 bg-white border-2 border-black rounded-xl text-xs font-bold text-[#0c0f14] placeholder-zinc-500 outline-none shadow-retro-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 font-display text-xs uppercase tracking-wider text-[#0c0f14]">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-white border border-black rounded-lg shadow-retro-sm">
              <Truck className="w-4 h-4 text-[#ef4444]" /> DIRECT FROM GUILDS
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-white border border-black rounded-lg shadow-retro-sm">
              <Box className="w-4 h-4 text-[#d97706]" /> BULK QUOTES SUPPORTED
            </span>
          </div>
        </div>

        {/* Product Grid (Template 1.2 vertical card aesthetic) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              id={product.id}
              className="card-retro bg-white p-5 border-[2.5px] border-[#0c0f14] shadow-retro-md hover:shadow-retro-lg transition-all flex flex-col justify-between group relative"
            >
              <div className="pushpin-red" />

              <div>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-black mb-3.5 bg-zinc-200 shadow-retro-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 px-2.5 py-0.5 bg-white/95 border border-black rounded-md font-display text-[10px] uppercase">
                    {product.craftName}
                  </span>
                  {product.supportsBulkOrders && (
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#fef08a] border border-black rounded-md font-display text-[9px] uppercase text-[#0c0f14]">
                      Bulk Ready (Min {product.minBulkQuantity || 5})
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-2 pr-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.artisanAvatar} alt={product.artisanName} className="w-6 h-6 rounded-full object-cover border border-black" />
                  <span className="font-hand text-xs font-bold text-zinc-600 truncate">{product.artisanName} • {product.artisanLocation}</span>
                </div>

                <h3 className="font-display text-2xl font-bold text-[#0c0f14] group-hover:text-[#ef4444] transition-colors leading-tight mb-2">
                  {product.title}
                </h3>

                <p className="text-xs text-zinc-700 line-clamp-2 font-medium leading-relaxed mb-3">
                  {product.description}
                </p>

                <div className="p-2.5 bg-[#faf8f5] rounded-xl border border-black/20 text-[11px] text-zinc-600 space-y-0.5 mb-3 font-medium">
                  <div>📐 Dimensions: <span className="font-bold text-[#0c0f14]">{product.dimensions}</span></div>
                  <div>⏳ Crafting lead time: <span className="font-bold text-[#0c0f14]">{product.estimatedCraftingDays} days</span></div>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="pt-3 border-t border-black/10 flex items-center justify-between">
                <div>
                  <div className="font-display text-[10px] text-zinc-500 uppercase">Artisan Price</div>
                  <div className="font-display text-2xl font-bold text-[#0c0f14]">
                    ₹{product.priceInr.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="flex gap-2">
                  {product.supportsBulkOrders && (
                    <button
                      onClick={() => handleOpenInquiry(product, 'bulk')}
                      className="btn-retro px-3 py-1.5 bg-[#fef08a] hover:bg-[#fde047] text-[#0c0f14] font-display text-xs font-black uppercase rounded-lg shadow-retro-sm"
                    >
                      BULK QUOTE
                    </button>
                  )}
                  <button
                    onClick={() => handleOpenInquiry(product, 'single')}
                    className="btn-retro px-4 py-1.5 bg-[#0c0f14] hover:bg-zinc-800 text-[#fef08a] font-display text-xs font-black uppercase rounded-lg shadow-retro-sm"
                  >
                    ORDER
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Inquiry Modal */}
        {isInquiryModalOpen && selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="w-full max-w-lg card-retro bg-[#faf8f5] border-[2.5px] border-[#0c0f14] shadow-retro-xl overflow-hidden animate-in zoom-in-95 relative">
              <div className="pushpin-red" />

              <div className="p-5 bg-[#f4eee3] border-b-2 border-[#0c0f14] flex items-center justify-between pr-8">
                <div>
                  <h3 className="font-display text-2xl font-bold text-[#0c0f14]">
                    {orderType === 'bulk' ? 'BULK ORDER QUOTATION' : 'DIRECT ARTISAN INQUIRY'}
                  </h3>
                  <p className="font-hand text-xs font-bold text-zinc-600">Direct contact with {selectedProduct.artisanName}</p>
                </div>
                <button
                  onClick={() => setIsInquiryModalOpen(false)}
                  className="w-7 h-7 rounded-full border border-black bg-white flex items-center justify-center text-xs font-bold mr-4"
                >
                  <X className="w-4 h-4 text-[#0c0f14]" />
                </button>
              </div>

              {isSuccess ? (
                <div className="p-8 sm:p-10 text-center space-y-4 bg-creased-paper">
                  <div className="w-16 h-16 bg-[#bbf7d0] border-2 border-black rounded-2xl flex items-center justify-center mx-auto shadow-retro">
                    <CheckCircle2 className="w-9 h-9 text-[#059669]" />
                  </div>
                  <div className="rubber-stamp rubber-stamp-green text-sm">INQUIRY DISPATCHED</div>
                  <h4 className="font-display text-3xl font-bold text-[#0c0f14]">MESSAGE TRANSMITTED!</h4>
                  <p className="font-hand text-lg text-zinc-700 font-bold max-w-sm mx-auto leading-relaxed">
                    {selectedProduct.artisanName} will review your specifications and contact you directly.
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#fef08a] border-2 border-black rounded-xl text-xs font-display tracking-wider shadow-retro-sm">
                    <Sparkles className="w-4 h-4 text-[#d97706]" /> +40 HERITAGE XP AWARDED!
                  </div>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="p-6 space-y-3.5 bg-creased-paper">
                  <div className="p-3 bg-white rounded-xl border-2 border-black flex items-center gap-3 shadow-retro-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={selectedProduct.imageUrl} alt={selectedProduct.title} className="w-12 h-12 rounded-lg object-cover border border-black" />
                    <div>
                      <div className="font-display text-base font-bold text-[#0c0f14]">{selectedProduct.title}</div>
                      <div className="font-hand text-xs font-bold text-zinc-600">Base: ₹{selectedProduct.priceInr} each • {selectedProduct.artisanName}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-display text-xs uppercase tracking-wider text-zinc-700 mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        min={orderType === 'bulk' ? (selectedProduct.minBulkQuantity || 5) : 1}
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-xs font-bold text-[#0c0f14] outline-none shadow-retro-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-display text-xs uppercase tracking-wider text-zinc-700 mb-1">
                        Delivery City / State
                      </label>
                      <input
                        type="text"
                        required
                        value={deliveryCity}
                        onChange={(e) => setDeliveryCity(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-xs font-bold text-[#0c0f14] outline-none shadow-retro-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-display text-xs uppercase tracking-wider text-zinc-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-xs font-bold text-[#0c0f14] outline-none shadow-retro-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-display text-xs uppercase tracking-wider text-zinc-700 mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="text"
                        required
                        value={customerContact}
                        onChange={(e) => setCustomerContact(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-xs font-bold text-[#0c0f14] outline-none shadow-retro-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-display text-xs uppercase tracking-wider text-zinc-700 mb-1">
                      Custom Dimensions / Message for Artisan
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Specify dimensions, deadline, or color preferences..."
                      className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-xs font-bold text-[#0c0f14] outline-none shadow-retro-sm"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-3 border-t-2 border-dashed border-black/20">
                    <button
                      type="button"
                      onClick={() => setIsInquiryModalOpen(false)}
                      className="px-4 py-2 text-xs font-display uppercase tracking-wider text-zinc-700 hover:bg-zinc-200 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-retro px-5 py-2.5 bg-[#ef4444] text-white font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-retro flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" /> SUBMIT REQUEST TO ARTISAN
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
