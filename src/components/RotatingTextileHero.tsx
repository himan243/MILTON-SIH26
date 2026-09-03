'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type PatternTheme = 'weaving' | 'geometric' | 'floral' | 'bamboo' | 'traditional';

interface TextilePattern {
  id: PatternTheme;
  name: string;
  svgPath: string;
  bgColor: string;
  primaryColor: string;
  secondaryColor: string;
}

const patterns: TextilePattern[] = [
  {
    id: 'weaving',
    name: 'Traditional Weaving',
    svgPath: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="weave" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="10" height="10" fill="currentColor" opacity="0.1"/>
          <rect x="10" y="10" width="10" height="10" fill="currentColor" opacity="0.15"/>
          <line x1="0" y1="0" x2="20" y2="20" stroke="currentColor" stroke-width="0.5" opacity="0.2"/>
          <line x1="20" y1="0" x2="0" y2="20" stroke="currentColor" stroke-width="0.5" opacity="0.2"/>
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#weave)"/>
    </svg>`,
    bgColor: '#f4eee3',
    primaryColor: '#d97706',
    secondaryColor: '#ea580c'
  },
  {
    id: 'geometric',
    name: 'Geometric Patterns',
    svgPath: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="geo" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
          <polygon points="12.5,0 25,6.25 25,18.75 12.5,25 0,18.75 0,6.25" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.15"/>
          <circle cx="12.5" cy="12.5" r="2" fill="currentColor" opacity="0.2"/>
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#geo)"/>
    </svg>`,
    bgColor: '#fef08a',
    primaryColor: '#dc2626',
    secondaryColor: '#991b1b'
  },
  {
    id: 'floral',
    name: 'Floral Motifs',
    svgPath: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="flora" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="15" cy="15" r="8" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.12"/>
          <circle cx="15" cy="15" r="5" fill="none" stroke="currentColor" stroke-width="0.4" opacity="0.15"/>
          <circle cx="15" cy="5" r="2" fill="currentColor" opacity="0.15"/>
          <circle cx="25" cy="15" r="2" fill="currentColor" opacity="0.15"/>
          <circle cx="15" cy="25" r="2" fill="currentColor" opacity="0.15"/>
          <circle cx="5" cy="15" r="2" fill="currentColor" opacity="0.15"/>
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#flora)"/>
    </svg>`,
    bgColor: '#e9d5ff',
    primaryColor: '#9333ea',
    secondaryColor: '#6b21a8'
  },
  {
    id: 'bamboo',
    name: 'Bamboo Weave',
    svgPath: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="bamboo" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="10" height="20" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.15"/>
          <rect x="10" y="0" width="10" height="20" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
          <line x1="0" y1="5" x2="20" y2="5" stroke="currentColor" stroke-width="0.3" opacity="0.12"/>
          <line x1="0" y1="10" x2="20" y2="10" stroke="currentColor" stroke-width="0.3" opacity="0.12"/>
          <line x1="0" y1="15" x2="20" y2="15" stroke="currentColor" stroke-width="0.3" opacity="0.12"/>
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#bamboo)"/>
    </svg>`,
    bgColor: '#bbf7d0',
    primaryColor: '#059669',
    secondaryColor: '#047857'
  },
  {
    id: 'traditional',
    name: 'Traditional Tiles',
    svgPath: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="tiles" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="25" height="25" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.15"/>
          <path d="M 0 0 L 25 25 M 25 0 L 0 25" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
          <circle cx="12.5" cy="12.5" r="3" fill="currentColor" opacity="0.12"/>
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#tiles)"/>
    </svg>`,
    bgColor: '#fecdd3',
    primaryColor: '#dc2626',
    secondaryColor: '#b91c1c'
  }
];

export const RotatingTextileHero: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPatternIndex((prev) => (prev + 1) % patterns.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const currentPattern = patterns[currentPatternIndex];

  return (
    <section className="relative w-full pt-8 pb-16 px-4 sm:px-6 lg:px-10 border-b-2 border-[#0c0f14]/15 overflow-hidden">
      {/* Animated Textile Pattern Background with Framer Motion */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPattern.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{ backgroundColor: currentPattern.bgColor }}
          >
            {/* Textile Pattern Overlay */}
            <div
              className="absolute inset-0 animate-textile-float"
              style={{
                color: currentPattern.primaryColor,
                opacity: 0.55,
                backgroundImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(currentPattern.svgPath.replace(/currentColor/g, currentPattern.primaryColor))}')`
              }}
            />

            {/* Radiant Ambient Gradients */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, 45, 0],
                opacity: [0.25, 0.4, 0.25]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full blur-3xl pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${currentPattern.primaryColor}30, transparent 70%)`
              }}
            />

            <motion.div
              animate={{
                scale: [1.1, 1, 1.1],
                opacity: [0.2, 0.35, 0.2]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-20 -left-20 w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${currentPattern.secondaryColor}25, transparent 70%)`
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Paper Grain Overlay */}
        <div className="absolute inset-0 bg-creased-paper opacity-40 mix-blend-multiply pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="max-w-[1320px] mx-auto relative z-10">
        {/* Pattern Theme Switcher Pills */}
        <div className="absolute top-0 right-2 sm:right-6 hidden sm:flex items-center gap-1.5 p-1 bg-white/90 backdrop-blur-xs border-2 border-black rounded-full shadow-retro-sm z-20">
          <span className="font-display text-[10px] uppercase px-2 text-zinc-600 font-bold">MOTIF:</span>
          {patterns.map((p, idx) => (
            <motion.button
              key={p.id}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentPatternIndex(idx)}
              className={`px-2.5 py-0.5 rounded-full font-display text-[10px] uppercase font-bold transition-all ${
                idx === currentPatternIndex
                  ? 'bg-[#0c0f14] text-[#fef08a] shadow-xs'
                  : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
              }`}
              title={`Switch motif to ${p.name}`}
            >
              {p.name.split(' ')[0]}
            </motion.button>
          ))}
        </div>

        {children}
      </div>
    </section>
  );
};
