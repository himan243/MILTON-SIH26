'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Gamepad2,
  Hammer,
  UtensilsCrossed,
  Users,
  Trophy,
  Package,
  Wand2,
  User,
  Shield,
  X,
  CheckCircle,
  LayoutGrid,
  Clock
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { role, triggerConfetti } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setIsSubscribed(true);
    triggerConfetti();
    setTimeout(() => {
      setNewsletterEmail('');
      setIsSubscribed(false);
    }, 3500);
  };

  const navLinks = [
    { label: 'DISCOVER', href: '/', icon: <LayoutGrid className="w-4 h-4" /> },
    { label: 'GAMES', href: '/games', icon: <Gamepad2 className="w-4 h-4" /> },
    { label: 'AI STUDIO', href: '/create-with-ai', icon: <Wand2 className="w-4 h-4" /> },
    { label: 'CRAFTS', href: '/crafts', icon: <Hammer className="w-4 h-4" /> },
    { label: 'FOOD STORIES', href: '/food-stories', icon: <UtensilsCrossed className="w-4 h-4" /> },
    { label: 'COMMUNITY & MEETS', href: '/community', icon: <Users className="w-4 h-4" /> },
    { label: 'MARKETPLACE', href: '/marketplace', icon: <Package className="w-4 h-4" /> },
    { label: 'ARTISAN GUILD', href: '/artisan-dashboard', icon: <Hammer className="w-4 h-4 text-amber-700" />, badge: 'SOON' },
    { label: 'CHALLENGES', href: '/challenges', icon: <Trophy className="w-4 h-4" /> },
    { label: 'MY PROFILE', href: '/profile', icon: <User className="w-4 h-4" /> },
  ];

  if (role === 'admin') {
    navLinks.push({ label: 'CURATOR ADMIN', href: '/admin', icon: <Shield className="w-4 h-4 text-red-600" />, badge: undefined });
  }

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Retro Sidebar: w-[290px] fixed left panel */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-[290px] bg-graph-paper flex flex-col justify-between transition-transform duration-300 ease-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{ boxShadow: '3px 0 0 #0c0f14' }}
      >
        {/* Notebook Ring Binder Spine */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 bottom-0 w-[36px] pointer-events-none z-30 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#1c2235]" />
          <div className="absolute top-0 left-0 bottom-0 w-[1px] bg-white/12" />
          <div className="absolute top-0 right-0 bottom-0 w-[2.5px] bg-[#0c0f14]" />
          <div className="relative z-10 flex flex-col justify-around h-full py-6 items-center">
            {Array.from({ length: 22 }).map((_, i) => (
              <div key={i} className="spiral-ring" />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between h-full pt-4 pr-10 pb-4 pl-2 sm:pt-5 sm:pr-10 sm:pb-5 sm:pl-3">
          
          {/* Top: Brand + Nav */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              {/* 3D Retro "NOST" Brand */}
              <Link href="/" onClick={onClose} className="group inline-block">
                <div className="flex items-baseline gap-1.5">
                  <span className="retro-3d-text text-4xl font-display tracking-wider group-hover:scale-105 transition-transform inline-block">
                    NOST
                  </span>
                  <span className="font-display text-lg font-black text-[#0c0f14] tracking-widest">
                    HUB
                  </span>
                </div>
                <span className="font-hand text-xs text-[#0c0f14]/80 font-bold block -mt-1 tracking-wide">
                  Northeast Living Museum
                </span>
              </Link>

              {/* Close button on mobile */}
              <button
                onClick={onClose}
                className="lg:hidden w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center hover:bg-[#fed7aa] transition-colors shadow-retro-sm"
                aria-label="Close sidebar"
              >
                <X className="w-4 h-4 text-[#0c0f14]" />
              </button>
            </div>

            {/* Kraft Navigation Card */}
            <div className="card-retro bg-[#f4eee3] p-2.5 sm:p-3 border-[2.5px] border-[#0c0f14] shadow-retro-md">
              <nav className="flex flex-col space-y-1">
                {navLinks.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl font-display text-xs sm:text-sm tracking-wider uppercase transition-all duration-150 ${
                        active
                          ? 'bg-[#0c0f14] text-[#fef08a] translate-x-1 shadow-retro-sm'
                          : 'text-[#0c0f14] hover:bg-black/8 hover:translate-x-1'
                      }`}
                    >
                      <span className="truncate mr-1">{item.label}</span>
                      <div className="flex items-center gap-1 shrink-0">
                        {item.badge && (
                          <span className="px-1.5 py-0.5 bg-[#fef08a] text-[#0c0f14] border border-black rounded text-[9px] font-black uppercase">
                            {item.badge}
                          </span>
                        )}
                        {active && <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse" />}
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Bottom: Divider + Newsletter + Badge */}
          <div className="py-3 space-y-3">
            <div className="w-full border-t-2 border-dashed border-black/40" />

            {/* Newsletter */}
            <div className="space-y-1">
              <span className="font-hand text-lg font-bold text-[#0c0f14] block tracking-wide">
                Heritage Gazette
              </span>

              {isSubscribed ? (
                <div className="p-2 bg-[#bbf7d0] border-2 border-black rounded-xl text-center space-y-0.5 shadow-retro-sm">
                  <div className="flex items-center justify-center gap-1 font-display text-xs text-[#065f46]">
                    <CheckCircle className="w-3 h-3" /> SUBSCRIBED!
                  </div>
                  <p className="font-hand text-[11px] text-[#065f46] font-bold">
                    Welcome to the Gazette! 📬
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-1">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="E-mail"
                    className="flex-1 min-w-0 px-2 py-1 text-xs font-hand font-bold bg-white border-2 border-black rounded-lg text-[#0c0f14] placeholder-zinc-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-2 py-1 bg-[#fef08a] hover:bg-[#fde047] text-[#0c0f14] font-display text-xs font-black uppercase border-2 border-black rounded-lg shadow-retro-sm"
                  >
                    GO
                  </button>
                </form>
              )}
            </div>

            {/* Footer badge */}
            <div className="pt-0.5 text-center">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-white border border-black rounded-full text-[9px] font-bold uppercase tracking-wider shadow-retro-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-ping" />
                <span>Supabase Live DB</span>
              </div>
            </div>
          </div>

        </div>
      </aside>
    </>
  );
};
