'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, X, Send, ArrowRight, Wand2, Loader2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  link?: { label: string; href: string };
}

const CULTURAL_KB: Array<{ keywords: string[]; response: string; link?: { label: string; href: string } }> = [
  {
    keywords: ['pittu', 'game', 'play', 'games', 'folk', 'traditional game'],
    response: "Pittu is a beloved Northeast folk game played with a stack of flat stones and a rubber ball — teams take turns throwing and rebuilding the stack! It's a perfect outdoor revival for all ages.",
    link: { label: 'Explore Pittu & More Games →', href: '/games' }
  },
  {
    keywords: ['gilli danda', 'gilli'],
    response: "Gilli Danda is one of India's oldest stick-and-target games, predating cricket by centuries! The danda (long stick) flicks the gilli (short tapered peg) into the air.",
    link: { label: 'View Gilli Danda Rules →', href: '/games/gilli-danda' }
  },
  {
    keywords: ['khar', 'recipe', 'food', 'assamese', 'cook', 'dish'],
    response: "Khar is Assam's signature alkaline dish made with dried banana peel ash — an ancient technique that balances nutrients and creates a unique earthy flavour.",
    link: { label: 'Open Khar Recipe & Story →', href: '/food-stories/khar-assam' }
  },
  {
    keywords: ['smoked pork', 'pork', 'bamboo shoots', 'nagaland', 'naga'],
    response: "Smoked Pork with Bamboo Shoots is Nagaland's most iconic dish — pork is cold-smoked over wood fires for days, then slow-cooked with fermented bamboo.",
    link: { label: 'Explore Naga Food Stories →', href: '/food-stories/smoked-pork-bamboo-shoots' }
  },
  {
    keywords: ['japi', 'craft', 'bamboo', 'weave', 'crafts', 'artisan'],
    response: "The Assamese Japi is a ceremonial sun-hat woven from bamboo and Tora palm leaves — it's one of the most recognisable symbols of Assamese identity!",
    link: { label: 'Explore Japi Craft Heritage →', href: '/crafts/assamese-japi' }
  },
  {
    keywords: ['longpi', 'pottery', 'manipur', 'clay', 'pot'],
    response: "Longpi Black Pottery from Manipur is made without a potter's wheel — just stone-paste, hand-moulding, and wood-fire polishing.",
    link: { label: 'Discover Longpi Pottery →', href: '/crafts/longpi-black-pottery' }
  },
  {
    keywords: ['upcycle', 'create', 'ai', 'build', 'recycle', 'object', 'bottle'],
    response: "The Create with AI studio analyses household items and suggests authentic Northeast upcycling blueprints step-by-step!",
    link: { label: 'Open AI Creative Studio →', href: '/create-with-ai' }
  },
  {
    keywords: ['marketplace', 'buy', 'shop', 'artisan', 'handmade', 'order'],
    response: "Our Verified Artisan Marketplace connects you directly with authentic craftspeople from across Northeast India with zero middlemen!",
    link: { label: 'Browse Artisan Marketplace →', href: '/marketplace' }
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
    text: "Namaskaar! I'm Aruna, your Northeast Cultural Guide. Ask me about folk games like Pittu, bamboo crafts like Japi, recipes like Khar, or the AI DIY Studio!",
  };
};

const QUICK_PROMPTS = [
  'Tell me about Pittu',
  'What is Khar?',
  'How to buy crafts?',
  'AI upcycling studio?'
];

export const FloatingAIAssistant: React.FC = () => {
  const { addXP } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Namaskaar! 🙏 I'm Aruna, your Northeast Cultural Guide. Ask me about folk games, traditional crafts, recipes, or AI creations!",
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
    }, 700 + Math.random() * 400);
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
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl border-[2.5px] border-[#0c0f14] shadow-retro-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 ${
          isOpen
            ? 'bg-[#0c0f14] text-[#fef08a]'
            : 'bg-[#fef08a] text-[#0c0f14] hover:bg-[#fde047]'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 stroke-[3]" />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Sparkles className="w-6 h-6 text-[#ef4444]" />
            <span className="font-display text-[9px] font-black -mt-1">AI</span>
          </div>
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[350px] sm:w-[380px] max-h-[520px] card-retro bg-[#faf8f5] border-[2.5px] border-[#0c0f14] shadow-retro-xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-3 duration-200">
          
          {/* Header */}
          <div className="bg-[#f4eee3] p-3.5 border-b-2 border-[#0c0f14] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl border-2 border-black bg-[#ef4444] text-white flex items-center justify-center shadow-retro-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="font-display text-base font-bold text-[#0c0f14]">Aruna — Cultural Guide</div>
                <div className="font-hand text-xs text-zinc-600 font-bold -mt-0.5">Living Heritage AI Knowledge</div>
              </div>
            </div>
            <Link
              href="/create-with-ai"
              className="flex items-center gap-1 px-2.5 py-1 bg-[#fef08a] border border-black rounded-lg text-[10px] font-display uppercase tracking-wider text-[#0c0f14] shadow-retro-sm hover:bg-[#fde047]"
              onClick={() => setIsOpen(false)}
            >
              <Wand2 className="w-3 h-3 text-[#ef4444]" /> Studio
            </Link>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 bg-creased-paper">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col gap-1 ${m.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-xs font-medium leading-relaxed border-2 border-black ${
                    m.role === 'user'
                      ? 'bg-[#0c0f14] text-[#fef08a] rounded-br-none shadow-retro-sm'
                      : 'bg-white text-[#0c0f14] rounded-bl-none shadow-retro-sm font-hand text-sm font-bold'
                  }`}
                >
                  {m.text}
                </div>
                {m.link && (
                  <Link
                    href={m.link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-1 text-[11px] font-display uppercase tracking-wider text-[#ef4444] hover:underline px-1"
                  >
                    {m.link.label} <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="px-3.5 py-2.5 bg-white border-2 border-black rounded-2xl rounded-bl-none shadow-retro-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#ef4444] rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-[#d97706] rounded-full animate-bounce delay-100" />
                    <span className="w-1.5 h-1.5 bg-[#059669] rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-[#e4e8ee] border-t-2 border-[#0c0f14] flex gap-1.5 overflow-x-auto shrink-0">
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => sendMessage(p)}
                className="shrink-0 px-2.5 py-1 bg-white hover:bg-[#fef08a] text-[10px] font-display uppercase tracking-wider text-[#0c0f14] rounded-lg border border-black shadow-retro-sm transition-all whitespace-nowrap"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 border-t-2 border-[#0c0f14] bg-[#f4eee3] flex items-center gap-2 shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about games, crafts, recipes..."
              className="flex-1 bg-white border-2 border-black rounded-xl px-3 py-1.5 text-xs font-bold text-[#0c0f14] placeholder-zinc-500 outline-none shadow-retro-sm"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-8 h-8 bg-[#ef4444] hover:bg-[#dc2626] disabled:opacity-40 text-white rounded-xl border-2 border-black flex items-center justify-center shrink-0 shadow-retro-sm transition-all"
            >
              {isTyping ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            </button>
          </form>

        </div>
      )}
    </>
  );
};
