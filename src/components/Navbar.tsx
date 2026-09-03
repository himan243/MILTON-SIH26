'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { SupportedLanguage, UserRole } from '@/types';
import { Sidebar } from './Sidebar';
import {
  Search, Globe, Bell, User, Shield, Hammer,
  X, Flame, Sparkles, Plus,
  Bookmark
} from 'lucide-react';

const dropdownAnimation = {
  hidden: { opacity: 0, scale: 0.94, y: -6 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 350, damping: 25 }
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    y: -6,
    transition: { duration: 0.15 }
  }
};

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const {
    user, role, setRole, language, setLanguage,
    setIsSearchOpen, setIsPreserveModalOpen, notifications, markNotificationsAsRead
  } = useApp();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close all dropdowns when clicking outside
  const headerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
        setIsNotifOpen(false);
        setIsRoleOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const languages: Array<{ code: SupportedLanguage; label: string; native: string }> = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'as', label: 'Assamese', native: 'অসমীয়া' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'bodo', label: 'Bodo', native: 'बर\'' }
  ];

  const roles: Array<{ code: UserRole; label: string; desc: string; icon: React.ReactNode }> = [
    { code: 'user', label: 'Archival Explorer', desc: 'Standard cultural explorer', icon: <User className="w-4 h-4 text-emerald-800" /> },
    { code: 'artisan', label: 'Verified Artisan', desc: 'Artisan portal access', icon: <Hammer className="w-4 h-4 text-amber-800" /> },
    { code: 'admin', label: 'Curator Admin', desc: 'Content & moderation approval', icon: <Shield className="w-4 h-4 text-red-800" /> },
    { code: 'guest', label: 'Guest Visitor', desc: 'Read-only public browsing', icon: <Globe className="w-4 h-4 text-stone-600" /> }
  ];

  return (
    <>
      {/* Permanent / Drawer Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Top Paper Header Bar */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-40 h-[72px] lg:pl-[290px] bg-[#faf8f5]/90 backdrop-blur-md border-b-[1.75px] border-[#1c1917]/15 transition-all"
      >
        <div className="max-w-[1400px] h-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          
          {/* Left Greeting & Brand */}
          <div className="flex items-center gap-3">
            {/* Mobile Brand Link */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden flex items-baseline gap-1 group text-left"
              title="Open Navigation"
            >
              <span className="retro-3d-text text-xl font-display font-black tracking-tight">NOSTALGIC</span>
              <span className="font-display text-xs font-black text-[#1c1917]">HUB</span>
            </motion.button>

            {/* Handwritten Greeting */}
            <div className="flex flex-col">
              <span className="font-hand text-base sm:text-lg font-bold text-[#1c1917] leading-tight truncate">
                Welcome to Nostalgic Hub
              </span>
              <svg className="w-24 sm:w-28 h-2 text-[#c2410c]" viewBox="0 0 100 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5.5C12 1.5 24 7.5 35 3.5C46 -0.5 58 7.5 70 3.5C82 -0.5 94 6 99 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* Right Controls & Pills */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border-[1.5px] border-[#1c1917] bg-white text-xs font-bold text-[#1c1917] shadow-retro-sm hover:bg-[#fde68a] transition-all"
              aria-label="Search"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden md:inline font-display text-xs font-bold uppercase tracking-wider">SEARCH</span>
            </motion.button>

            {/* Language Selector */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => { setIsLangOpen(!isLangOpen); setIsNotifOpen(false); setIsRoleOpen(false); }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-[1.5px] border-[#1c1917] bg-white text-xs font-display font-bold tracking-wider uppercase text-[#1c1917] shadow-retro-sm hover:bg-[#fed7aa] transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-[#c2410c]" />
                <span>{language.toUpperCase()}</span>
              </motion.button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    variants={dropdownAnimation}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute right-0 mt-2 w-48 bg-[#faf8f5] border-[1.5px] border-[#1c1917] rounded-xl shadow-retro-md p-2 z-50 origin-top-right"
                  >
                    <div className="px-3 py-1 text-[10px] font-display uppercase tracking-widest text-stone-500 border-b border-stone-200 mb-1">
                      Select Language
                    </div>
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLanguage(l.code); setIsLangOpen(false); }}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-bold flex items-center justify-between transition-colors ${
                          language === l.code
                            ? 'bg-[#1c1917] text-[#fef3c7]'
                            : 'hover:bg-stone-200 text-[#1c1917]'
                        }`}
                      >
                        <span>{l.label}</span>
                        <span className="text-[10px] opacity-75 font-hand text-sm">{l.native}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notifications */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => { setIsNotifOpen(!isNotifOpen); setIsLangOpen(false); setIsRoleOpen(false); if (unreadCount > 0) markNotificationsAsRead(); }}
                className="relative p-2 rounded-lg border-[1.5px] border-[#1c1917] bg-white text-[#1c1917] shadow-retro-sm hover:bg-[#f3e8ff] transition-all"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#c2410c] border border-white rounded-full animate-bounce" />
                )}
              </motion.button>

              <AnimatePresence>
                {isNotifOpen && (
                  <motion.div
                    variants={dropdownAnimation}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute right-0 mt-2 w-80 bg-[#faf8f5] border-[1.5px] border-[#1c1917] rounded-xl shadow-retro-lg p-3 z-50 origin-top-right"
                  >
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-dashed border-[#1c1917]/30">
                      <span className="font-display text-xs font-bold uppercase tracking-wider text-[#1c1917]">
                        Notifications
                      </span>
                      <span className="px-2 py-0.5 bg-[#c2410c] text-white text-[10px] font-bold rounded-full">
                        {notifications.length} NEW
                      </span>
                    </div>
                    <div className="space-y-2 max-h-72 overflow-y-auto">
                      {notifications.map((n) => (
                        <div key={n.id} className="p-2.5 rounded-lg bg-white border border-[#1c1917]/20 shadow-retro-sm">
                          <div className="text-xs font-bold text-[#1c1917]">{n.title}</div>
                          <div className="text-[11px] text-stone-700 mt-0.5 font-hand text-sm leading-tight">{n.message}</div>
                          <div className="text-[9px] text-stone-500 mt-1 uppercase font-bold">{n.timestamp}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* XP Streak Pill */}
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/profile"
                className="hidden sm:flex items-center gap-2 bg-[#f6f1e8] px-3 py-1.5 rounded-lg border-[1.5px] border-[#1c1917] shadow-retro-sm hover:bg-[#fed7aa] transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#d97706]" />
                <span className="font-display text-xs font-bold text-[#1c1917]">{user.xp} XP</span>
                <span className="w-px h-3.5 bg-stone-400" />
                <Flame className="w-3.5 h-3.5 text-[#c2410c]" />
                <span className="font-display text-xs font-bold text-[#c2410c]">{user.streakDays}d</span>
              </Link>
            </motion.div>

            {/* Preserve Memory CTA Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsPreserveModalOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#fde68a] hover:bg-[#fcd34d] text-[#1c1917] font-display text-xs font-bold uppercase border-[1.5px] border-[#1c1917] rounded-lg shadow-retro-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>PRESERVE</span>
            </motion.button>

            {/* Role Switcher Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => { setIsRoleOpen(!isRoleOpen); setIsLangOpen(false); setIsNotifOpen(false); }}
                className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 bg-[#1c1917] text-white rounded-lg border-[1.5px] border-[#1c1917] shadow-retro-sm hover:bg-stone-800 transition-all"
              >
                <div className="w-6 h-6 rounded-md bg-[#fde68a] text-[#1c1917] flex items-center justify-center font-display font-bold text-xs border border-[#1c1917]">
                  {user.name.charAt(0)}
                </div>
                <span className="font-display text-xs font-bold tracking-wider uppercase hidden sm:inline">{role}</span>
              </motion.button>

              <AnimatePresence>
                {isRoleOpen && (
                  <motion.div
                    variants={dropdownAnimation}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute right-0 mt-2 w-72 bg-[#faf8f5] border-2 border-black rounded-2xl shadow-retro-lg p-3 z-50 origin-top-right"
                  >
                    <div className="p-2.5 bg-[#f4eee3] border-2 border-black rounded-xl mb-3 shadow-retro-sm">
                      <div className="font-display text-sm font-bold text-[#0c0f14]">{user.name}</div>
                      <div className="text-[10px] text-zinc-600 truncate">{user.email}</div>
                      <div className="mt-1 inline-block px-2 py-0.5 bg-[#ef4444] text-white text-[9px] font-bold uppercase rounded-md">
                        Role: {role} • Lvl {user.level}
                      </div>
                    </div>

                    <div className="text-[10px] font-display uppercase tracking-widest text-zinc-500 px-2 mb-1.5">
                      Switch User Role
                    </div>
                    <div className="space-y-1">
                      {roles.map((r) => (
                        <button
                          key={r.code}
                          onClick={() => { setRole(r.code); setIsRoleOpen(false); }}
                          className={`w-full text-left p-2 rounded-xl text-xs flex items-start gap-2.5 border transition-all ${
                            role === r.code
                              ? 'bg-[#0c0f14] text-[#fef08a] border-black shadow-retro-sm'
                              : 'border-transparent hover:bg-zinc-200 text-[#0c0f14]'
                          }`}
                        >
                          <div className="mt-0.5">{r.icon}</div>
                          <div>
                            <div className="font-display text-sm tracking-wide">{r.label}</div>
                            <div className={`text-[10px] ${role === r.code ? 'text-zinc-300' : 'text-zinc-500'}`}>
                              {r.desc}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="mt-3 pt-2 border-t-2 border-dashed border-black/30 flex flex-col gap-1">
                      <Link
                        href="/profile"
                        onClick={() => setIsRoleOpen(false)}
                        className="px-3 py-1.5 text-xs font-bold text-[#0c0f14] hover:bg-[#fef08a] rounded-lg transition-colors flex items-center justify-between"
                      >
                        <span>Nostalgia Passport</span>
                        <Bookmark className="w-3.5 h-3.5" />
                      </Link>
                      {role === 'admin' && (
                        <Link
                          href="/admin"
                          onClick={() => setIsRoleOpen(false)}
                          className="px-3 py-1.5 text-xs font-bold text-[#ef4444] hover:bg-red-100 rounded-lg transition-colors flex items-center gap-1.5"
                        >
                          <Shield className="w-3.5 h-3.5" /> Curator Admin Panel
                        </Link>
                      )}
                      {role === 'artisan' && (
                        <Link
                          href="/artisan-dashboard"
                          onClick={() => setIsRoleOpen(false)}
                          className="px-3 py-1.5 text-xs font-bold text-[#d97706] hover:bg-amber-100 rounded-lg transition-colors flex items-center gap-1.5"
                        >
                          <Hammer className="w-3.5 h-3.5" /> Artisan Vendor Studio
                        </Link>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </header>
    </>
  );
};

