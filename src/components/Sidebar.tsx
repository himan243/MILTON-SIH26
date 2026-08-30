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
  LayoutGrid
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
    { label: 'COMMUNITY', href: '/community', icon: <Users className="w-4 h-4" /> },
    { label: 'MARKETPLACE', href: '/marketplace', icon: <Package className="w-4 h-4" /> },
    { label: 'CHALLENGES', href: '/challenges', icon: <Trophy className="w-4 h-4" /> },
    { label: 'MY PROFILE', href: '/profile', icon: <User className="w-4 h-4" /> },
  ];

  if (role === 'admin') {
    navLinks.push({ label: 'ADMIN CURATOR', href: '/admin', icon: <Shield className="w-4 h-4 text-red-600" /> });
  } else if (role === 'artisan') {
    navLinks.push({ label: 'ARTISAN PORTAL', href: '/artisan-dashboard', icon: <Hammer className="w-4 h-4 text-amber-600" /> });
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

      {/* ── Retro Sidebar: w-[290px] fixed left panel ─────────────── */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-[290px] bg-graph-paper flex flex-col justify-between transition-transform duration-300 ease-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{ boxShadow: '3px 0 0 #0c0f14' }}
      >

        {/* ── Notebook Ring Binder Spine (integrated right edge) ──── */}
        {/*
          The spine sits flush with the sidebar's right edge.
          Dark navy rail + metallic spiral rings create a physical
          binder separator between nav and paper content canvas.
          Width = 36px, matching the 64px safety gap in main content
          (290px sidebar + 36px spine overlap + 64px gap = 354px left padding).
        */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 bottom-0 w-[36px] pointer-events-none z-30 overflow-hidden"
        >
          {/* Dark navy rail backing */}
          <div className="absolute inset-0 bg-[#1c2235]" />
          {/* Subtle left-edge highlight on rail */}
          <div className="absolute top-0 left-0 bottom-0 w-[1px] bg-white/12" />
          {/* Right hard border */}
          <div className="absolute top-0 right-0 bottom-0 w-[2.5px] bg-[#0c0f14]" />
          {/* Rings column */}
          <div className="relative z-10 flex flex-col justify-around h-full py-6 items-center">
            {Array.from({ length: 22 }).map((_, i) => (
              <div key={i} className="spiral-ring" />
            ))}
          </div>
        </div>

        {/* ── Content — padded away from spine ─────────────────────── */}
        <div className="flex flex-col justify-between h-full pt-4 pr-10 pb-4 pl-2 sm:pt-5 sm:pr-10 sm:pb-5 sm:pl-3">

          {/* Top: Brand + Nav */}
          <div className="space-y-4">
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
            <div className="card-retro bg-[#f4eee3] p-3 sm:p-4 border-[2.5px] border-[#0c0f14] shadow-retro-md">
              <nav className="flex flex-col space-y-1">
                {navLinks.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center justify-between px-3 py-1.5 rounded-xl font-display text-sm tracking-wider uppercase transition-all duration-150 ${
                        active
                          ? 'bg-[#0c0f14] text-[#fef08a] translate-x-1 shadow-retro-sm'
                          : 'text-[#0c0f14] hover:bg-black/8 hover:translate-x-1'
                      }`}
                    >
                      <span>{item.label}</span>
                      {active && <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse" />}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Bottom: Divider + Social + Newsletter + Badge */}
          <div className="py-4 space-y-4">
            <div className="w-full border-t-2 border-dashed border-black/40" />

            {/* Social Links */}
            <div className="flex items-center justify-around px-2">
              {[
                {
                  icon: (
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  ),
                  href: "https://facebook.com",
                  label: "Facebook"
                },
                {
                  icon: (
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  ),
                  href: "https://twitter.com",
                  label: "X"
                },
                {
                  icon: (
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  ),
                  href: "https://youtube.com",
                  label: "YouTube"
                },
                {
                  icon: (
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  ),
                  href: "https://instagram.com",
                  label: "Instagram"
                }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center hover:bg-[#0c0f14] hover:text-[#fef08a] transition-all shadow-retro-sm hover:scale-110 active:scale-95"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="w-full border-t-2 border-dashed border-black/40" />

            {/* Newsletter */}
            <div className="space-y-1.5">
              <span className="font-hand text-xl font-bold text-[#0c0f14] block tracking-wide">
                Newsletter
              </span>

              {isSubscribed ? (
                <div className="p-2.5 bg-[#bbf7d0] border-2 border-black rounded-xl text-center space-y-0.5 shadow-retro-sm">
                  <div className="flex items-center justify-center gap-1 font-display text-xs text-[#065f46]">
                    <CheckCircle className="w-3.5 h-3.5" /> SUBSCRIBED!
                  </div>
                  <p className="font-hand text-xs text-[#065f46] font-bold">
                    Welcome to the Nostalgia Gazette! 📬
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-1.5">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="E-mail here"
                    className="flex-1 min-w-0 px-2.5 py-1.5 text-xs font-hand font-bold bg-white border-2 border-black rounded-lg text-[#0c0f14] placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  <button
                    type="submit"
                    className="px-2.5 py-1.5 bg-[#fef08a] hover:bg-[#fde047] text-[#0c0f14] font-display text-xs font-black uppercase border-2 border-black rounded-lg shadow-retro-sm hover:translate-y-[-1px] active:translate-y-[1px] transition-transform whitespace-nowrap"
                  >
                    GO
                  </button>
                </form>
              )}
            </div>

            {/* Footer badge */}
            <div className="pt-1 text-center">
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-black rounded-full text-[10px] font-bold uppercase tracking-wider shadow-retro-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] animate-ping" />
                <span>Northeast Heritage MVP</span>
              </div>
            </div>
          </div>

        </div>
      </aside>
    </>
  );
};
