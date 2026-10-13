import React, { useState, useRef, useEffect, useCallback } from 'react';

export interface TabItem<T = string | number> {
  id: T;
  label: React.ReactNode;
  ariaLabel?: string;
}

export interface SegmentedTabsProps<T = string | number> {
  tabs: TabItem<T>[];
  activeId: T;
  onChange: (id: T) => void;
  className?: string;
  pillClassName?: string;
  tabClassName?: string;
  ariaLabel?: string;
}

export function SegmentedTabs<T extends string | number = string | number>({
  tabs,
  activeId,
  onChange,
  className = '',
  pillClassName = '',
  tabClassName = '',
  ariaLabel = 'Segmented navigation tabs',
}: SegmentedTabsProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isInitialMount = useRef(true);

  const [pillStyle, setPillStyle] = useState<{
    left: number;
    width: number;
    top: number;
    height: number;
    ready: boolean;
  }>({
    left: 0,
    width: 0,
    top: 0,
    height: 0,
    ready: false,
  });

  const updatePillPosition = useCallback(
    (targetIndex?: number) => {
      const idx =
        targetIndex !== undefined
          ? targetIndex
          : tabs.findIndex((t) => t.id === activeId);

      if (idx < 0) return;
      const target = tabRefs.current[idx];
      if (!target) return;

      const left = target.offsetLeft;
      const width = target.offsetWidth;
      const top = target.offsetTop;
      const height = target.offsetHeight;

      setPillStyle({
        left,
        width,
        top,
        height,
        ready: true,
      });
    },
    [tabs, activeId]
  );

  // Synchronize pill position when activeId or tabs change
  useEffect(() => {
    updatePillPosition();
    // After the initial position has been calculated, enable animations
    if (isInitialMount.current) {
      const timer = setTimeout(() => {
        isInitialMount.current = false;
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [activeId, updatePillPosition]);

  // Handle window resizing and layout shifts
  useEffect(() => {
    const handleResize = () => {
      updatePillPosition();
    };

    window.addEventListener('resize', handleResize);

    // ResizeObserver on the container to detect width/font layout updates
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      ro = new ResizeObserver(() => {
        updatePillPosition();
      });
      ro.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (ro) ro.disconnect();
    };
  }, [updatePillPosition]);

  const handleTabClick = (tabId: T, index: number) => {
    // Read the target button's offsetLeft and offsetWidth immediately on click
    const target = tabRefs.current[index];
    if (target) {
      setPillStyle({
        left: target.offsetLeft,
        width: target.offsetWidth,
        top: target.offsetTop,
        height: target.offsetHeight,
        ready: true,
      });
    }
    onChange(tabId);
  };

  return (
    <div
      ref={containerRef}
      role="tablist"
      aria-label={ariaLabel}
      className={`relative flex flex-wrap items-center gap-2 sm:gap-3 ${className}`}
    >
      {/* Sliding Highlighted Pill Indicator */}
      <div
        aria-hidden="true"
        className={`absolute rounded-full pointer-events-none z-0 ${
          pillClassName || 'bg-beacon shadow-[0_0_20px_rgba(245,158,11,0.35)]'
        }`}
        style={{
          left: `${pillStyle.left}px`,
          top: `${pillStyle.top}px`,
          width: `${pillStyle.width}px`,
          height: `${pillStyle.height}px`,
          opacity: pillStyle.ready ? 1 : 0,
          transition: isInitialMount.current
            ? 'opacity 0.2s ease'
            : 'left 0.4s cubic-bezier(0.65, 0, 0.35, 1), width 0.4s cubic-bezier(0.65, 0, 0.35, 1), top 0.4s cubic-bezier(0.65, 0, 0.35, 1), height 0.4s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.2s ease',
        }}
      />

      {/* Tab Buttons */}
      {tabs.map((tab, idx) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={String(tab.id)}
            ref={(el) => {
              tabRefs.current[idx] = el;
            }}
            role="tab"
            aria-selected={isActive}
            aria-label={tab.ariaLabel}
            onClick={() => handleTabClick(tab.id, idx)}
            className={`relative z-10 px-5 py-2.5 rounded-full text-xs sm:text-sm font-mono uppercase tracking-wider cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-beacon/50 flex items-center gap-2 ${
              isActive
                ? 'text-black font-bold border border-transparent bg-transparent'
                : 'text-stone-accent hover:text-white font-medium bg-black/35 hover:bg-black/60 border border-white/15 hover:border-white/30 backdrop-blur-sm'
            } ${tabClassName}`}
            style={{
              transitionProperty: 'color, border-color, background-color',
              transitionDuration: isActive ? '0.35s' : '0.25s',
              transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)',
              // Delay color crossfade slightly on arrival so label color crossfades as the pill arrives
              transitionDelay: isActive ? '0.08s' : '0s',
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
