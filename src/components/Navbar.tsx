'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { SupportedLanguage, UserRole } from '@/types';
import {
  Search, Globe, Bell, User, Shield, Hammer,
  Menu, X, Flame, Sparkles, ChevronDown,
  Gamepad2, UtensilsCrossed, Users, Trophy, Package
} from 'lucide-react';

// ── Dropdown section type ──────────────────────────────────────────────────
interface DropdownItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  desc: string;
}

interface NavItem {
  name: string;
  href: string;
  dropdown?: DropdownItem[];
}

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const {
    user, role, setRole, language, setLanguage, t,
    setIsSearchOpen, setIsPreserveModalOpen, notifications, markNotificationsAsRead
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close all dropdowns when clicking outside
  const navRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setIsLangOpen(false);
        setIsNotifOpen(false);
        setIsRoleOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // ── 3 main nav items with rich dropdowns ────────────────────────────────
  const navItems: NavItem[] = [
    {
      name: 'Discover',
      href: '/',
      dropdown: [
        {
          name: 'Traditional Crafts',
          href: '/crafts',
          icon: <Hammer className="w-4 h-4 text-[#c08820]" />,
          desc: 'Bamboo weaving, Longpi pottery & silk'
        },
        {
          name: 'Food Stories',
          href: '/food-stories',
          icon: <UtensilsCrossed className="w-4 h-4 text-[#1b3022]" />,
          desc: 'Khar, smoked pork & culinary heritage'
        },
        {
          name: 'Community',
          href: '/community',
          icon: <Users className="w-4 h-4 text-[#974730]" />,
          desc: 'Nearby sessions & preserved memories'
        },
        {
          name: 'Cultural Quests',
          href: '/challenges',
          icon: <Trophy className="w-4 h-4 text-[#fbbb51]" />,
          desc: 'Daily missions & heritage badges'
        }
      ]
    },
    {
      name: 'Forgotten Games',
      href: '/games',
    },
    {
      name: 'Marketplace',
      href: '/marketplace',
      dropdown: [
        {
          name: 'Browse Artisan Crafts',
          href: '/marketplace',
          icon: <Package className="w-4 h-4 text-[#974730]" />,
          desc: 'Verified handcrafted goods from Northeast'
        },
        {
          name: 'Artisan Portal',
          href: '/artisan-dashboard',
          icon: <Hammer className="w-4 h-4 text-[#c08820]" />,
          desc: 'List products & manage inquiries'
        }
      ]
    }
  ];

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

  const isActive = (path: string) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path);

  const isGroupActive = (item: NavItem) => {
    if (isActive(item.href)) return true;
    return item.dropdown?.some(d => isActive(d.href)) ?? false;
  };

  const closeAll = () => {
    setIsLangOpen(false);
    setIsNotifOpen(false);
    setIsRoleOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-[#fcf9f3]/92 backdrop-blur-xl border-b border-[#c3c8c1]/40 shadow-[0_2px_16px_rgba(6,27,14,0.04)]"
    >
      <div className="max-w-[1360px] mx-auto h-[68px] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

        {/* Brand */}
        <Link href="/" className="group flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-full bg-[#1b3022] flex items-center justify-center shadow group-hover:scale-105 transition-transform">
            <span className="font-display font-bold text-lg text-[#fbbb51]">N</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-[1.15rem] font-bold tracking-tight text-[#061b0e] group-hover:text-[#974730] transition-colors">
              Nostalgic Hub
            </span>
            <span className="text-[9px] uppercase font-bold tracking-widest text-[#772f1a] hidden sm:block">
              Northeast Discovery
            </span>
          </div>
        </Link>

        {/* Desktop Nav — 3 items */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const active = isGroupActive(item);
            const isOpen = openDropdown === item.name;

            return (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <button
                    onClick={() => setOpenDropdown(isOpen ? null : item.name)}
                    className={`flex items-center gap-1 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-150 ${
                      active || isOpen
                        ? 'bg-[#1b3022] text-[#fcf9f3] shadow-sm'
                        : 'text-[#434843] hover:text-[#061b0e] hover:bg-[#ebe8e2]'
                    }`}
                  >
                    {item.name}
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-150 ${
                      active
                        ? 'bg-[#1b3022] text-[#fcf9f3] shadow-sm'
                        : 'text-[#434843] hover:text-[#061b0e] hover:bg-[#ebe8e2]'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}

                {/* Mega dropdown */}
                {item.dropdown && isOpen && (
                  <div className="absolute left-0 top-full mt-2 w-72 bg-[#ffffff] border border-[#c3c8c1] rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 pt-1 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#737973] border-b border-[#f0eee8] mb-1">
                      {item.name === 'Discover' ? 'Cultural Heritage Sections' : 'Marketplace'}
                    </div>
                    {item.dropdown.map((d) => (
                      <Link
                        key={d.href}
                        href={d.href}
                        onClick={() => setOpenDropdown(null)}
                        className={`flex items-start gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                          isActive(d.href) ? 'bg-[#f0eee8]' : 'hover:bg-[#f6f3ed]'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#f0eee8] flex items-center justify-center shrink-0">
                          {d.icon}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#061b0e]">{d.name}</div>
                          <div className="text-[10px] text-[#737973] leading-tight mt-0.5">{d.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">

          {/* Search */}
          <button
            onClick={() => { setIsSearchOpen(true); closeAll(); }}
            className="p-2 rounded-full text-[#434843] hover:text-[#061b0e] hover:bg-[#ebe8e2] transition-colors"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Language */}
          <div className="relative">
            <button
              onClick={() => { setIsLangOpen(!isLangOpen); setIsNotifOpen(false); setIsRoleOpen(false); setOpenDropdown(null); }}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#1c1c18] bg-[#ebe8e2] hover:bg-[#e5e2dc] transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-[#974730]" />
              {language.toUpperCase()}
            </button>
            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#ffffff] border border-[#c3c8c1] rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold text-[#737973] uppercase tracking-wider border-b border-[#f0eee8] mb-1">Language</div>
                {languages.map((l) => (
                  <button key={l.code} onClick={() => { setLanguage(l.code); setIsLangOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${language === l.code ? 'bg-[#1b3022] text-[#fcf9f3]' : 'hover:bg-[#f6f3ed] text-[#1c1c18]'}`}
                  >
                    <span>{l.label}</span>
                    <span className="text-[10px] opacity-70">{l.native}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => { setIsNotifOpen(!isNotifOpen); setIsLangOpen(false); setIsRoleOpen(false); setOpenDropdown(null); if (unreadCount > 0) markNotificationsAsRead(); }}
              className="relative p-2 rounded-full text-[#434843] hover:text-[#061b0e] hover:bg-[#ebe8e2] transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#974730] rounded-full ring-2 ring-[#fcf9f3] animate-pulse" />
              )}
            </button>
            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-[#ffffff] border border-[#c3c8c1] rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#f0eee8]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#061b0e]">Notifications</span>
                  <span className="text-[10px] text-[#974730] font-medium">{notifications.length} updates</span>
                </div>
                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2.5 rounded-xl bg-[#f6f3ed] hover:bg-[#f0eee8] transition-colors">
                      <div className="text-xs font-bold text-[#061b0e]">{n.title}</div>
                      <div className="text-[11px] text-[#434843] mt-0.5 leading-relaxed">{n.message}</div>
                      <div className="text-[10px] text-[#737973] mt-1">{n.timestamp}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* XP Pill */}
          <Link
            href="/profile"
            className="hidden md:flex items-center gap-1.5 bg-[#f0eee8] hover:bg-[#e5e2dc] px-3 py-1.5 rounded-full border border-[#c3c8c1]/60 transition-colors"
          >
            <Sparkles className="w-3 h-3 text-[#c08820]" />
            <span className="text-xs font-bold text-[#1b3022]">{user.xp} XP</span>
            <span className="w-px h-3 bg-[#c3c8c1]" />
            <Flame className="w-3 h-3 text-[#974730]" />
            <span className="text-xs font-bold text-[#974730]">{user.streakDays}d</span>
          </Link>

          {/* Role / Profile Switcher */}
          <div className="relative">
            <button
              onClick={() => { setIsRoleOpen(!isRoleOpen); setIsLangOpen(false); setIsNotifOpen(false); setOpenDropdown(null); }}
              className="flex items-center gap-1.5 pl-1.5 pr-3 py-1 bg-[#1b3022] text-[#fcf9f3] rounded-full hover:bg-[#061b0e] transition-all shadow-sm"
            >
              <div className="w-6 h-6 rounded-full bg-[#fbbb51] text-[#1b3022] flex items-center justify-center font-bold text-xs">
                {user.name.charAt(0)}
              </div>
              <span className="text-xs font-semibold capitalize hidden sm:inline">{role}</span>
            </button>

            {isRoleOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-[#ffffff] border border-[#c3c8c1] rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="p-2 bg-[#f6f3ed] rounded-xl mb-3">
                  <div className="text-xs font-bold text-[#061b0e]">{user.name}</div>
                  <div className="text-[10px] text-[#737973] truncate">{user.email}</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#974730]">
                    Role: {role.toUpperCase()} • Level {user.level}
                  </div>
                </div>
                <div className="text-[10px] font-bold text-[#737973] uppercase tracking-wider px-2 mb-1.5">Switch Role</div>
                <div className="space-y-1">
                  {roles.map((r) => (
                    <button key={r.code} onClick={() => { setRole(r.code); setIsRoleOpen(false); }}
                      className={`w-full text-left p-2 rounded-xl text-xs flex items-start gap-2.5 transition-colors ${role === r.code ? 'bg-[#1b3022] text-[#fcf9f3]' : 'hover:bg-[#f6f3ed] text-[#1c1c18]'}`}
                    >
                      <div className="mt-0.5">{r.icon}</div>
                      <div>
                        <div className="font-bold">{r.label}</div>
                        <div className={`text-[10px] ${role === r.code ? 'text-[#b4cdb8]' : 'text-[#737973]'}`}>{r.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mt-3 pt-2 border-t border-[#f0eee8] flex flex-col gap-1">
                  <Link href="/profile" onClick={() => setIsRoleOpen(false)}
                    className="px-3 py-2 text-xs font-medium text-[#061b0e] hover:bg-[#f6f3ed] rounded-lg">
                    Your Nostalgia Journey
                  </Link>
                  {role === 'admin' && (
                    <Link href="/admin" onClick={() => setIsRoleOpen(false)}
                      className="px-3 py-2 text-xs font-bold text-[#974730] hover:bg-[#fe997c]/20 rounded-lg flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5" /> Curator Admin Dashboard
                    </Link>
                  )}
                  {role === 'artisan' && (
                    <Link href="/artisan-dashboard" onClick={() => setIsRoleOpen(false)}
                      className="px-3 py-2 text-xs font-bold text-[#c08820] hover:bg-[#fbbb51]/20 rounded-lg flex items-center gap-1.5">
                      <Hammer className="w-3.5 h-3.5" /> Artisan Vendor Portal
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#061b0e] hover:bg-[#ebe8e2]"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#fcf9f3] border-b border-[#c3c8c1] px-5 py-5 space-y-4 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => (
            <div key={item.name}>
              <Link
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-colors ${
                  isGroupActive(item) ? 'bg-[#1b3022] text-[#fcf9f3]' : 'bg-[#f0eee8] text-[#061b0e]'
                }`}
              >
                {item.name}
              </Link>
              {item.dropdown && (
                <div className="mt-2 pl-3 space-y-1">
                  {item.dropdown.map((d) => (
                    <Link
                      key={d.href}
                      href={d.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#434843] hover:bg-[#f0eee8] hover:text-[#061b0e]"
                    >
                      {d.icon}
                      {d.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button
            onClick={() => { setIsPreserveModalOpen(true); setIsMobileMenuOpen(false); }}
            className="w-full py-3 bg-[#974730] text-[#fcf9f3] text-xs font-bold uppercase rounded-xl tracking-wider mt-2"
          >
            + Submit Cultural Memory
          </button>
        </div>
      )}
    </header>
  );
};
