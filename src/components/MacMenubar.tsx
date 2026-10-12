import React, { useState, useEffect, useRef } from 'react';
import { Compass, Navigation, Clock, ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';

interface MacMenubarProps {
  currentCoord?: { lat: string; bearing: string; waypoint: string };
  onOpenBooking: () => void;
}

export const MacMenubar: React.FC<MacMenubarProps> = ({ currentCoord, onOpenBooking }) => {
  const [timeString, setTimeString] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menubarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-GB', { timeZone: 'Africa/Lagos', hour: '2-digit', minute: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menubarRef.current && !menubarRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 4 Grouped Menu Categories
  const menuGroups = [
    {
      id: 'pillars',
      label: 'Work & Pillars',
      href: '#pillars',
      items: [
        { name: 'Foundation', coord: '14°N', href: '#foundation', desc: 'The Mind as the Irreducible Base' },
        { name: 'The Five Pillars', coord: '28°N', href: '#pillars', desc: 'Speaking, Strategy, Education, Media, Leadership' },
      ],
    },
    {
      id: 'media',
      label: 'Media & Ideas',
      href: '#discourse',
      items: [
        { name: 'Discourse & Essays', coord: '42°N', href: '#discourse', desc: 'Ideas Worth Building' },
        { name: 'YouTube Shorts', coord: '56°N', href: '#media', desc: 'Short-Form Broadcasts & Frameworks' },
      ],
    },
    {
      id: 'speaking',
      label: 'Speaking & Impact',
      href: '#keynotes',
      items: [
        { name: 'Keynote Addresses', coord: '68°N', href: '#keynotes', desc: 'Conventions, Summits & Retreats' },
        { name: 'Proof of Impact', coord: '75°N', href: '#impact', desc: 'Metrics, Audits & Verified Logs' },
      ],
    },
    {
      id: 'governance',
      label: 'Governance & FAQ',
      href: '#principles',
      items: [
        { name: 'Principles & Rigor', coord: '82°N', href: '#principles', desc: 'Operational Governance & Ethics' },
        { name: 'Honest Boundaries', coord: '86°N', href: '#limitations', desc: "What I Don't Do" },
        { name: 'Engagement Protocol', coord: '88°N', href: '#roadmap', desc: 'Four-Step Process' },
        { name: 'Common Questions', coord: '90°N', href: '#faq', desc: 'Inquiries & Scheduling' },
      ],
    },
  ];

  const lat = currentCoord?.lat || "06°27.4'N";
  const bearing = currentCoord?.bearing || "042° NE";
  const waypoint = currentCoord?.waypoint || "WP.00";

  return (
    <div
      ref={menubarRef}
      className="fixed top-0 left-0 right-0 z-50 h-11 bg-black/80 backdrop-blur-2xl border-b border-white/10 text-xs font-mono select-none px-4 sm:px-6 flex items-center justify-between"
    >
      {/* Brand & Grouped Navigation Left */}
      <div className="flex items-center gap-5 sm:gap-6">
        <a href="#" className="flex items-center gap-2.5 group text-cream hover:text-white transition-colors shrink-0">
          <div className="w-5 h-5 flex items-center justify-center">
            <img
              src="/assets/lighthouse_monogram.svg"
              alt="Logo"
              className="w-full h-full object-contain filter invert opacity-85 group-hover:opacity-100"
            />
          </div>
          <span className="font-serif tracking-tight text-base text-white font-medium whitespace-nowrap">
            Dolapo Olutoye
          </span>
        </a>

        {/* 4 Grouped Dropdown Menus (Visible on lg+ screens, preventing awkward wrapping on 16" laptops) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {menuGroups.map((group) => {
            const isOpen = activeDropdown === group.id;
            return (
              <div
                key={group.id}
                className="relative"
                onMouseEnter={() => setActiveDropdown(group.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="flex items-center">
                  <a
                    href={group.href}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                      isOpen
                        ? 'text-white bg-white/10'
                        : 'text-stone-accent hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    <span>{group.label}</span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-beacon' : 'opacity-60'
                      }`}
                    />
                  </a>
                </div>

                {/* Frosted Glass macOS Dropdown Popover */}
                {isOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 rounded-2xl bg-black/85 border border-white/15 backdrop-blur-2xl shadow-2xl p-2 z-50 popover-enter">
                    <div className="space-y-1">
                      {group.items.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          onClick={() => setActiveDropdown(null)}
                          className="px-3 py-2 rounded-xl hover:bg-white/[0.08] active:scale-[0.98] transition-[background-color,transform] duration-150 flex flex-col text-left group"
                        >
                          <div className="flex items-center justify-between gap-2 mb-0.5">
                            <span className="font-serif text-sm text-white group-hover:text-beacon transition-colors font-medium">
                              {subItem.name}
                            </span>
                            <span className="font-mono text-[10px] text-beacon/90 font-bold">
                              {subItem.coord}
                            </span>
                          </div>
                          <span className="text-[11px] text-[#a8a29e] leading-snug font-sans">
                            {subItem.desc}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Navigational Telemetry & Connect Right */}
      <div className="flex items-center gap-3 sm:gap-4 text-stone-accent text-xs whitespace-nowrap">
        {/* Beacon Signal Active Indicator */}
        <div className="hidden xl:flex items-center gap-2 text-beacon font-semibold">
          <span className="w-2 h-2 rounded-full bg-beacon animate-ping" />
          <span className="tracking-widest uppercase text-[11px]">ACTIVE</span>
        </div>

        <span className="hidden xl:inline text-white/15">|</span>

        {/* Dynamic Coordinates Cluster */}
        <div className="hidden sm:flex items-center gap-1.5 text-white font-medium bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/10">
          <Navigation className="w-3.5 h-3.5 text-beacon shrink-0" />
          <span className="font-mono">{lat}</span>
          <span className="text-stone-accent text-[11px] font-normal hidden md:inline">({bearing})</span>
        </div>

        {/* Current Active Waypoint Badge */}
        <div className="hidden md:flex items-center gap-1 text-[11px] uppercase tracking-wider text-stone-accent">
          <Compass className="w-3.5 h-3.5 text-beacon shrink-0" />
          <span className="text-white font-semibold">{waypoint}</span>
        </div>

        <span className="hidden lg:inline text-white/15">|</span>

        {/* Lagos Time */}
        <div className="hidden lg:flex items-center gap-1.5 text-stone-accent text-xs">
          <Clock className="w-3.5 h-3.5 text-stone-accent shrink-0" />
          <span>LAGOS {timeString}</span>
        </div>

        {/* Connect Action Button */}
        <button
          onClick={onOpenBooking}
          className="px-3.5 py-1.5 rounded-full bg-beacon hover:bg-beacon-light text-black text-xs uppercase tracking-widest font-bold btn-press flex items-center gap-1.5 shadow-sm shrink-0"
        >
          <span>Connect</span>
          <ArrowUpRight className="w-3 h-3" />
        </button>

        {/* Mobile Hamburger Toggle (for screens below lg) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Drawer Menu (sm/md screens) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-11 left-0 right-0 bg-black/95 border-b border-white/15 backdrop-blur-2xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto z-50">
          <div className="space-y-6 text-left">
            {menuGroups.map((group) => (
              <div key={group.id} className="space-y-2">
                <div className="font-mono text-xs uppercase tracking-widest text-beacon font-bold pb-1 border-b border-white/10">
                  {group.label}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {group.items.map((subItem) => (
                    <a
                      key={subItem.name}
                      href={subItem.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-serif text-white text-sm font-medium">{subItem.name}</div>
                        <div className="text-[11px] text-[#a8a29e]">{subItem.desc}</div>
                      </div>
                      <span className="font-mono text-xs text-beacon font-bold">{subItem.coord}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-stone-accent">
              <div className="flex items-center gap-2">
                <Navigation className="w-3.5 h-3.5 text-beacon" />
                <span>{lat} ({bearing})</span>
              </div>
              <span>LAGOS {timeString}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
