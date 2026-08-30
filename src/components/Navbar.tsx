'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { SupportedLanguage, UserRole } from '@/types';
import { Sidebar } from './Sidebar';
import {
  Search, Globe, Bell, User, Shield, Hammer,
  X, Flame, Sparkles, Plus,
  Bookmark
} from 'lucide-react';

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
        className="fixed top-0 left-0 right-0 z-40 h-[72px] lg:pl-[290px] bg-[#faf8f5]/90 backdrop-blur-md border-b-2 border-[#0c0f14]/15 transition-all"
      >
        <div className="max-w-[1400px] h-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          
          {/* Left Greeting & Brand */}
          <div className="flex items-center gap-3">
            {/* Mobile Brand Link */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden flex items-baseline gap-1 group text-left"
              title="Open Navigation"
            >
              <span className="retro-3d-text text-2xl font-display tracking-wider">NOST</span>
              <span className="font-display text-xs font-black text-[#0c0f14]">HUB</span>
            </button>

            {/* Handwritten Greeting from Template 1.0: "Welcome to my blogiverse! ~~~" */}
            <div className="flex flex-col">
              <span className="font-hand text-base sm:text-xl font-bold text-[#0c0f14] leading-tight truncate">
                Welcome to Nostalgic Hub!
              </span>
              <svg className="w-24 sm:w-28 h-2 text-[#ef4444]" viewBox="0 0 100 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5.5C12 1.5 24 7.5 35 3.5C46 -0.5 58 7.5 70 3.5C82 -0.5 94 6 99 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* Right Controls & Pills */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 border-[#0c0f14] bg-white text-xs font-bold text-[#0c0f14] shadow-retro-sm hover:bg-[#fef08a] transition-all"
              aria-label="Search"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden md:inline font-display text-sm uppercase tracking-wider">SEARCH</span>
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => { setIsLangOpen(!isLangOpen); setIsNotifOpen(false); setIsRoleOpen(false); }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border-2 border-[#0c0f14] bg-white text-xs font-display tracking-wider uppercase text-[#0c0f14] shadow-retro-sm hover:bg-[#fed7aa] transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-[#ef4444]" />
                <span>{language.toUpperCase()}</span>
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#faf8f5] border-2 border-black rounded-2xl shadow-retro-md p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1 text-[10px] font-display uppercase tracking-widest text-zinc-500 border-b border-zinc-300 mb-1">
                    Select Language
                  </div>
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLanguage(l.code); setIsLangOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                        language === l.code
                          ? 'bg-[#0c0f14] text-[#fef08a]'
                          : 'hover:bg-zinc-200 text-[#0c0f14]'
                      }`}
                    >
                      <span>{l.label}</span>
                      <span className="text-[10px] opacity-75 font-hand text-sm">{l.native}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => { setIsNotifOpen(!isNotifOpen); setIsLangOpen(false); setIsRoleOpen(false); if (unreadCount > 0) markNotificationsAsRead(); }}
                className="relative p-2 rounded-xl border-2 border-[#0c0f14] bg-white text-[#0c0f14] shadow-retro-sm hover:bg-[#e9d5ff] transition-all"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#ef4444] border-2 border-black rounded-full animate-bounce" />
                )}
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-[#faf8f5] border-2 border-black rounded-2xl shadow-retro-lg p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b-2 border-dashed border-black/30">
                    <span className="font-display text-sm font-bold uppercase tracking-wider text-[#0c0f14]">
                      Notifications
                    </span>
                    <span className="px-2 py-0.5 bg-[#ef4444] text-white text-[10px] font-bold rounded-full">
                      {notifications.length} NEW
                    </span>
                  </div>
                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-2.5 rounded-xl bg-white border border-black/30 shadow-retro-sm">
                        <div className="text-xs font-bold text-[#0c0f14]">{n.title}</div>
                        <div className="text-[11px] text-zinc-700 mt-0.5 font-hand text-sm leading-tight">{n.message}</div>
                        <div className="text-[9px] text-zinc-500 mt-1 uppercase font-bold">{n.timestamp}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* XP Streak Pill */}
            <Link
              href="/profile"
              className="hidden sm:flex items-center gap-2 bg-[#f4eee3] px-3 py-1.5 rounded-xl border-2 border-[#0c0f14] shadow-retro-sm hover:translate-y-[-1px] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d97706]" />
              <span className="font-display text-sm font-bold text-[#0c0f14]">{user.xp} XP</span>
              <span className="w-px h-3.5 bg-black/30" />
              <Flame className="w-3.5 h-3.5 text-[#ef4444]" />
              <span className="font-display text-sm font-bold text-[#ef4444]">{user.streakDays}d</span>
            </Link>

            {/* Preserve Memory CTA Button */}
            <button
              onClick={() => setIsPreserveModalOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#fef08a] hover:bg-[#fde047] text-[#0c0f14] font-display text-xs font-black uppercase border-2 border-black rounded-xl shadow-retro-sm hover:translate-y-[-1px] active:translate-y-[1px] transition-all"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>PRESERVE</span>
            </button>

            {/* Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => { setIsRoleOpen(!isRoleOpen); setIsLangOpen(false); setIsNotifOpen(false); }}
                className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 bg-[#0c0f14] text-white rounded-xl border-2 border-black shadow-retro-sm hover:bg-zinc-800 transition-all"
              >
                <div className="w-6 h-6 rounded-lg bg-[#fef08a] text-[#0c0f14] flex items-center justify-center font-display font-bold text-xs border border-black">
                  {user.name.charAt(0)}
                </div>
                <span className="font-display text-xs tracking-wider uppercase hidden sm:inline">{role}</span>
              </button>

              {isRoleOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-[#faf8f5] border-2 border-black rounded-2xl shadow-retro-lg p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
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
                </div>
              )}
            </div>

          </div>
        </div>
      </header>
    </>
  );
};
