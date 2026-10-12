import React, { useEffect, useRef, useState } from 'react';
import { Compass, Sparkles } from 'lucide-react';

interface LighthouseAnchorProps {
  currentSection?: string;
}

export const LighthouseAnchor: React.FC<LighthouseAnchorProps> = ({ currentSection = 'Home' }) => {
  const [rotationDegrees, setRotationDegrees] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(Math.max(window.scrollY / totalScroll, 0), 1);
        setScrollProgress(progress);
        const deg = Math.round(progress * 360);
        setRotationDegrees(deg);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 group cursor-pointer"
      title="The Dolapo Olutoye Lighthouse Anchor — Click to return to top"
    >
      <div className="relative flex items-center gap-3 bg-surface/90 hover:bg-surface-elevated/95 border border-surface-border hover:border-beacon/40 backdrop-blur-xl px-4 py-2.5 rounded-full shadow-2xl transition-all duration-300 group-hover:scale-105">
        {/* Subtle Radial Glow */}
        <div className="absolute -inset-1 bg-beacon/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Rotating Monogram Emblem */}
        <div className="relative w-8 h-8 flex items-center justify-center">
          {/* Circular Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
            <circle
              cx="16"
              cy="16"
              r="14"
              className="stroke-surface-border"
              strokeWidth="2"
              fill="none"
            />
            <circle
              cx="16"
              cy="16"
              r="14"
              className="stroke-beacon"
              strokeWidth="2"
              fill="none"
              strokeDasharray={2 * Math.PI * 14}
              strokeDashoffset={2 * Math.PI * 14 * (1 - scrollProgress)}
              strokeLinecap="round"
            />
          </svg>

          {/* Monogram emblem icon */}
          <div
            className="w-5 h-5 flex items-center justify-center will-change-transform"
            style={{
              transform: `rotate(${rotationDegrees}deg)`,
            }}
          >
            <img
              src="/assets/lighthouse_monogram.svg"
              alt="Lighthouse Anchor"
              className="w-full h-full object-contain filter invert opacity-90 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
            />
          </div>
        </div>

        {/* Section Indicator & Degree */}
        <div className="flex flex-col text-left pr-1">
          <span className="text-[10px] tracking-widest uppercase font-mono text-stone-accent group-hover:text-beacon transition-colors flex items-center gap-1">
            <Compass className="w-2.5 h-2.5" />
            {rotationDegrees}° BEACON
          </span>
          <span className="text-xs font-medium text-cream group-hover:text-white transition-colors">
            {currentSection}
          </span>
        </div>

        <Sparkles className="w-3.5 h-3.5 text-beacon opacity-60 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
};
