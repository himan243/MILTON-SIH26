'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ArtisanProduct } from '@/types';
import {
  Package,
  Search,
  ShieldCheck,
  Mail,
  Send,
  Sparkles,
  CheckCircle2,
  Phone,
  MessageSquare,
  Truck,
  Box
} from 'lucide-react';

export default function MarketplacePage() {
  const { products, submitInquiry, user, t } = useApp();
  
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
    setTimeout(() => {
      setIsSuccess(false);
      setIsInquiryModalOpen(false);
      setNotes('');
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-[#fcf9f3] py-12 sm:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d0e9d4] text-[#0b2013] text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4 text-[#1b3022]" /> Verified Northeast Artisan Marketplace
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#061b0e] leading-tight mb-4">
            {t.navMarketplace}
          </h1>
          <p className="text-base text-[#434843] leading-relaxed">
            Support traditional craft masters directly. We connect you straight to the weaving looms and bamboo workshops with transparent commission ({products[0]?.commissionRate || 5}%) and bulk-order support. No automated fake checkouts—genuine artisan dialogues.
          </p>
        </div>

        {/* Search Bar & Stats */}
        <div className="bg-[#f0eee8] rounded-3xl p-4 sm:p-6 border border-[#c3c8c1] mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-[#737973] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by title, artisan, craft..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#ffffff] border border-[#c3c8c1] text-xs font-medium text-[#061b0e] focus:border-[#974730] outline-none"
            />
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-[#061b0e]">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#974730]" /> Direct from Northeast Artisans
            </span>
            <span className="text-[#c3c8c1]">•</span>
            <span className="flex items-center gap-1.5">
              <Box className="w-4 h-4 text-[#c08820]" /> Bulk Quotations Supported
            </span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              id={product.id}
              className="bg-[#ffffff] rounded-3xl border border-[#c3c8c1] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[4/3] bg-[#e5e2dc] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-[#1b3022]/90 backdrop-blur-md text-[#fcf9f3] text-[10px] font-bold uppercase rounded-full">
                    {product.craftName}
                  </span>
                  {product.supportsBulkOrders && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 bg-[#fbbb51]/90 backdrop-blur-md text-[#281800] text-[10px] font-bold uppercase rounded-full">
                      Bulk Ready
                    </span>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.artisanAvatar} alt={product.artisanName} className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-xs font-semibold text-[#737973]">{product.artisanName} • {product.artisanLocation}</span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#061b0e] group-hover:text-[#974730] transition-colors leading-snug">
                    {product.title}
                  </h3>

                  <p className="text-xs text-[#434843] line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="pt-2 text-[11px] text-[#737973] space-y-1">
                    <div>📐 <span className="font-semibold text-[#061b0e]">{product.dimensions}</span></div>
                    <div>⏳ Crafting lead time: <span className="font-semibold text-[#061b0e]">{product.estimatedCraftingDays} days</span></div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-4">
                <div className="pt-4 border-t border-[#f0eee8] flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-[#737973] font-bold uppercase">Estimated Price</div>
                    <div className="font-display text-2xl font-bold text-[#061b0e]">
                      ₹{product.priceInr.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {product.supportsBulkOrders && (
                      <button
                        onClick={() => handleOpenInquiry(product, 'bulk')}
                        className="px-3.5 py-2 bg-[#f0eee8] hover:bg-[#e5e2dc] text-[#061b0e] text-xs font-bold uppercase rounded-full transition-colors"
                      >
                        Bulk Quote
                      </button>
                    )}
                    <button
                      onClick={() => handleOpenInquiry(product, 'single')}
                      className="px-5 py-2 bg-[#974730] hover:bg-[#772f1a] text-[#fcf9f3] text-xs font-bold uppercase rounded-full shadow-sm transition-colors"
                    >
                      {t.contactArtisan}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Inquiry Modal */}
        {isInquiryModalOpen && selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#061b0e]/75 backdrop-blur-md animate-in fade-in">
            <div className="w-full max-w-lg bg-[#ffffff] rounded-3xl border border-[#c3c8c1] shadow-2xl overflow-hidden animate-in zoom-in-95">
              
              <div className="p-6 bg-[#1b3022] text-[#fcf9f3] flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold">
                    {orderType === 'bulk' ? 'Request Bulk Order Quotation' : 'Contact Artisan & Request Order'}
                  </h3>
                  <p className="text-xs text-[#b4cdb8]">Direct communication with {selectedProduct.artisanName}</p>
                </div>
                <button
                  onClick={() => setIsInquiryModalOpen(false)}
                  className="text-[#b4cdb8] hover:text-[#fcf9f3]"
                >
                  ✕
                </button>
              </div>

              {isSuccess ? (
                <div className="p-10 text-center space-y-4">
                  <div className="w-16 h-16 bg-[#d0e9d4] text-[#1b3022] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="font-display text-2xl font-bold text-[#061b0e]">Inquiry Transmitted to Artisan!</h4>
                  <p className="text-xs text-[#434843] max-w-sm mx-auto">
                    {selectedProduct.artisanName} will review your specifications and contact you via your provided contact info.
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#fbbb51]/20 text-[#281800] rounded-full text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-[#c08820]" /> +40 Heritage XP Awarded!
                  </div>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="p-6 space-y-4">
                  <div className="p-3 bg-[#f6f3ed] rounded-xl flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={selectedProduct.imageUrl} alt={selectedProduct.title} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <div className="text-xs font-bold text-[#061b0e]">{selectedProduct.title}</div>
                      <div className="text-[11px] text-[#737973]">Base Price: ₹{selectedProduct.priceInr} each</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#737973] mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        min={orderType === 'bulk' ? (selectedProduct.minBulkQuantity || 5) : 1}
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 rounded-xl bg-[#f6f3ed] border border-[#c3c8c1] text-xs text-[#061b0e] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#737973] mb-1">
                        Delivery City / State
                      </label>
                      <input
                        type="text"
                        required
                        value={deliveryCity}
                        onChange={(e) => setDeliveryCity(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#f6f3ed] border border-[#c3c8c1] text-xs text-[#061b0e] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#737973] mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#f6f3ed] border border-[#c3c8c1] text-xs text-[#061b0e] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#737973] mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="text"
                        required
                        value={customerContact}
                        onChange={(e) => setCustomerContact(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#f6f3ed] border border-[#c3c8c1] text-xs text-[#061b0e] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#737973] mb-1">
                      Custom Dimensions / Message for Artisan
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Specify custom sizes, required delivery dates, or specific questions about the materials..."
                      className="w-full px-3 py-2 rounded-xl bg-[#f6f3ed] border border-[#c3c8c1] text-xs text-[#061b0e] outline-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsInquiryModalOpen(false)}
                      className="px-4 py-2 text-xs font-bold uppercase text-[#737973]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#974730] hover:bg-[#772f1a] text-[#fcf9f3] text-xs font-bold uppercase tracking-wider rounded-full shadow-md flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" /> Submit Request to Artisan
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
