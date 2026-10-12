import React from 'react';
import { ArrowUp, Youtube, Linkedin, Instagram, Twitter, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socials = [
    { name: 'YouTube', href: 'https://www.youtube.com/@thedolapoolutoye', icon: Youtube, ariaLabel: 'YouTube Channel' },
    { name: 'Shorts', href: 'https://www.youtube.com/@thedolapoolutoye/shorts', icon: Youtube, ariaLabel: 'YouTube Shorts' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/thedolapoolutoye', icon: Linkedin, ariaLabel: 'LinkedIn Profile' },
    { name: 'Instagram', href: 'https://www.instagram.com/thedolapoolutoye', icon: Instagram, ariaLabel: 'Instagram Profile' },
    { name: 'X / Twitter', href: 'https://x.com/thedolapoolutoye', icon: Twitter, ariaLabel: 'X / Twitter Profile' },
    { name: 'Email', href: 'mailto:Dolapoolutoye@gmail.com', icon: Mail, ariaLabel: 'Direct Email' },
  ];

  return (
    <footer className="relative py-16 text-xs sm:text-sm font-mono select-none overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Above it: A Centred Mono Link "↑ RETURN TO ORIGIN // 06°27′N" */}
        <div className="text-center mb-12">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 text-stone-accent hover:text-beacon uppercase tracking-[0.25em] text-xs transition-all duration-300 group cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            <span>RETURN TO ORIGIN // 06°27′N</span>
          </button>
        </div>

        {/* Single Hairline-Top Row */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-stone-accent">
          {/* Left: Brand Identity & Location */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <span className="text-cream font-medium">Dolapo Olutoye</span>
            <span className="text-white/20">·</span>
            <a href="#pillars" className="hover:text-beacon transition-colors">Kings Consult</a>
            <span className="text-white/20">·</span>
            <span className="text-stone-driftwood">Lagos & Global</span>
          </div>

          {/* Center: Social Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target={s.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={s.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  aria-label={s.ariaLabel}
                  className="hover:text-beacon transition-colors flex items-center gap-1.5 group"
                >
                  <Icon className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:text-beacon transition-all" />
                  <span>{s.name}</span>
                </a>
              );
            })}
          </div>

          {/* Right: Copyright & Disclaimer + Admin Key */}
          <div className="text-center md:text-right text-stone-driftwood">
            <span>© {new Date().getFullYear()} The Dolapo Olutoye. Built for Purpose.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
