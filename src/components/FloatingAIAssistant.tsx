'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, X, Send, Mic, Bot, ArrowRight, Wand2, Loader2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  link?: { label: string; href: string };
}

// ── Simulated culturally-aware AI responses ────────────────────────────────
const CULTURAL_KB: Array<{ keywords: string[]; response: string; link?: { label: string; href: string } }> = [
  {
    keywords: ['pittu', 'game', 'play', 'games', 'folk', 'traditional game'],
    response: "Pittu is a beloved Northeast folk game played with a stack of flat stones and a rubber ball — teams take turns throwing and rebuilding the stack! It's a perfect outdoor revival for all ages. I can show you the full rules and 4-tier skill progression.",
    link: { label: 'Explore Pittu & More Games →', href: '/games' }
  },
  {
    keywords: ['gilli danda', 'gilli'],
    response: "Gilli Danda is one of India's oldest stick-and-target games, predating cricket by centuries! The danda (long stick) flicks the gilli (short tapered peg) into the air and the batter tries to hit it as far as possible.",
    link: { label: 'View Gilli Danda Rules →', href: '/games/gilli-danda' }
  },
  {
    keywords: ['khar', 'recipe', 'food', 'assamese', 'cook', 'dish'],
    response: "Khar is Assam's signature alkaline dish made with dried banana peel ash — an ancient technique that balances nutrients and creates a unique earthy flavour. It's traditionally served at the start of an Assamese meal. Let me show you the full preparation ritual!",
    link: { label: 'Open Khar Recipe & Story →', href: '/food-stories/khar-assam' }
  },
  {
    keywords: ['smoked pork', 'pork', 'bamboo shoots', 'nagaland', 'naga'],
    response: "Smoked Pork with Bamboo Shoots is Nagaland's most iconic dish — pork is cold-smoked over wood fires for days, then slow-cooked with fermented bamboo. The umami depth is unmatched. This technique has been passed down for generations in Naga kitchens.",
    link: { label: 'Explore Naga Food Stories →', href: '/food-stories/smoked-pork-bamboo-shoots' }
  },
  {
    keywords: ['japi', 'craft', 'bamboo', 'weave', 'crafts', 'artisan'],
    response: "The Assamese Japi is a ceremonial sun-hat woven from bamboo and Tora palm leaves — it's one of the most recognisable symbols of Assamese identity! Master craftspeople take 3–5 days to complete one. You can learn the full technique and even buy authenticated handcrafted Japis.",
    link: { label: 'Explore Japi Craft Heritage →', href: '/crafts/assamese-japi' }
  },
  {
    keywords: ['longpi', 'pottery', 'manipur', 'clay', 'pot'],
    response: "Longpi Black Pottery from Manipur is made without a potter's wheel — just stone-paste, hand-moulding, and wood-fire polishing. Each piece is entirely handcrafted by the Tangkhul Naga community. No two pieces are identical.",
    link: { label: 'Discover Longpi Pottery →', href: '/crafts/longpi-black-pottery' }
  },
  {
    keywords: ['muga', 'silk', 'eri', 'golden silk', 'assam silk'],
    response: "Muga silk is the world's only naturally golden-coloured silk, exclusive to Assam! Eri silk (Ahimsa silk) is peace silk — the silkworm is allowed to emerge before spinning. Both are protected GI-tagged textiles of Northeast India.",
    link: { label: 'View Silk Heritage →', href: '/crafts/muga-eri-silk' }
  },
  {
    keywords: ['upcycle', 'create', 'ai', 'build', 'recycle', 'object', 'bottle'],
    response: "The Create with AI feature uses computer vision to analyse household objects — plastic bottles, old cloth, bamboo scraps — and suggests traditional Northeast-inspired upcycling projects with step-by-step blueprints. Upload an image and get your cultural craft blueprint!",
    link: { label: 'Open AI Creative Studio →', href: '/create-with-ai' }
  },
  {
    keywords: ['marketplace', 'buy', 'shop', 'artisan', 'handmade', 'order'],
    response: "Our Verified Artisan Marketplace connects you directly with verified craftspeople from Assam, Manipur, Nagaland, and Meghalaya. All products go through a cultural authenticity review by our curator team. You can place standard orders or bulk enquiries — no middlemen.",
    link: { label: 'Browse Artisan Marketplace →', href: '/marketplace' }
  },
  {
    keywords: ['community', 'session', 'meet', 'play', 'nearby', 'radar'],
    response: "The Community section has a privacy-first Nearby Player Radar where you can find people in your locality who want to organise traditional game matches — with configurable GPS precision (Approximate, Manual Area, or Exact). You can host or join sessions.",
    link: { label: 'Go to Community →', href: '/community' }
  },
  {
    keywords: ['challenge', 'quest', 'badge', 'xp', 'streak', 'gamification', 'level'],
    response: "Nostalgic Hub uses Heritage XP to reward real-world actions — playing games, cooking recipes, buying artisan crafts, and submitting preserved memories. Complete daily & weekly Cultural Quests to earn Badges of Honour and climb levels!",
    link: { label: 'View Active Quests →', href: '/challenges' }
  },
  {
    keywords: ['northeast', 'assam', 'nagaland', 'manipur', 'meghalaya', 'arunachal', 'mizoram', 'tripura', 'about'],
    response: "Nostalgic Hub is a living cultural museum dedicated to the 8 sister states of Northeast India — preserving folk games, traditional crafts, culinary heritage, and artisan livelihoods. The platform separates free cultural knowledge from a commercial marketplace, ensuring tradition is never paywalled.",
    link: { label: 'Start Exploring →', href: '/' }
  }
];

const getAIResponse = (query: string): { text: string; link?: { label: string; href: string } } => {
  const q = query.toLowerCase();
  for (const entry of CULTURAL_KB) {
    if (entry.keywords.some(k => q.includes(k))) {
      return { text: entry.response, link: entry.link };
    }
  }
  return {
    text: "I'm your Northeast Cultural Assistant! I can help you explore traditional folk games like Pittu and Gilli Danda, discover crafts like Japi weaving and Longpi pottery, find Assamese food stories like Khar, or guide you to the artisan marketplace. Try asking me about any of those!",
  };
};

const QUICK_PROMPTS = [
  'Tell me about Pittu',
  'What is Khar?',
  'How to buy artisan crafts?',
  'What is Longpi pottery?',
  'AI upcycling feature?'
];

export const FloatingAIAssistant: React.FC = () => {
  const { addXP } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Namaskaar! 🙏 I'm Aruna, your Northeast Cultural Guide. Ask me about folk games, traditional crafts, recipes, artisan products, or cultural quests!",
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: text.trim()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const { text: responseText, link } = getAIResponse(text);
      const aiMsg: Message = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        text: responseText,
        link
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
      addXP(10, 'Asked AI Cultural Assistant');
    }, 900 + Math.random() * 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI Cultural Assistant"
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
          isOpen
            ? 'bg-[#061b0e] rotate-[360deg]'
            : 'bg-gradient-to-br from-[#974730] via-[#c08820] to-[#1b3022]'
        }`}
      >
        {isOpen
          ? <X className="w-5 h-5 text-[#fcf9f3]" />
          : <Sparkles className="w-6 h-6 text-[#fbbb51]" />
        }
        {/* Pulse ring when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#fbbb51]/30 animate-ping" />
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-h-[520px] bg-[#fcf9f3] rounded-3xl border border-[#c3c8c1] shadow-[0_24px_64px_rgba(6,27,14,0.22)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-200">

          {/* Header */}
          <div className="bg-gradient-to-r from-[#1b3022] to-[#061b0e] px-5 py-4 flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-full bg-[#fbbb51]/20 border border-[#fbbb51]/40 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#fbbb51]" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#fcf9f3]">Aruna — Cultural Guide</div>
              <div className="text-[10px] text-[#b4cdb8] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                Powered by Heritage Knowledge Base
              </div>
            </div>
            <Link
              href="/create-with-ai"
              className="ml-auto flex items-center gap-1 text-[10px] font-bold text-[#fbbb51] hover:text-[#fcf9f3] uppercase tracking-wider"
              onClick={() => setIsOpen(false)}
            >
              <Wand2 className="w-3 h-3" /> AI Studio
            </Link>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col gap-1 ${m.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-[#1b3022] text-[#fcf9f3] rounded-br-sm'
                      : 'bg-[#ffffff] border border-[#c3c8c1]/60 text-[#1c1c18] rounded-bl-sm shadow-sm'
                  }`}
                >
                  {m.text}
                </div>
                {m.link && (
                  <Link
                    href={m.link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-1 text-[10px] font-bold text-[#974730] hover:text-[#772f1a] hover:underline px-1"
                  >
                    {m.link.label} <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="px-4 py-3 bg-[#ffffff] border border-[#c3c8c1]/60 rounded-2xl rounded-bl-sm shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#974730] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#c08820] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#1b3022] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick prompts */}
          <div className="px-4 pb-2 flex gap-1.5 overflow-x-auto shrink-0">
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => sendMessage(p)}
                className="shrink-0 px-3 py-1.5 bg-[#f0eee8] hover:bg-[#e5e2dc] text-[10px] font-bold text-[#434843] rounded-full border border-[#c3c8c1]/50 transition-colors whitespace-nowrap"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-[#c3c8c1]/40 bg-[#f6f3ed] flex items-center gap-2 shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about games, crafts, recipes..."
              className="flex-1 bg-[#ffffff] border border-[#c3c8c1] rounded-full px-4 py-2 text-xs text-[#061b0e] placeholder-[#737973] outline-none focus:border-[#974730] transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-8 h-8 bg-[#974730] hover:bg-[#772f1a] disabled:opacity-40 text-[#fcf9f3] rounded-full flex items-center justify-center shrink-0 transition-colors"
            >
              {isTyping ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            </button>
          </form>

          {/* XP note */}
          <div className="px-4 pb-3 text-center shrink-0">
            <span className="text-[9px] text-[#737973] uppercase tracking-widest">+10 XP per question • Zero-cost on-device knowledge</span>
          </div>
        </div>
      )}
    </>
  );
};
