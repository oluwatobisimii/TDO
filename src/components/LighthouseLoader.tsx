import React, { useState, useEffect } from 'react';

interface LighthouseLoaderProps {
  onComplete?: () => void;
  durationMs?: number; // Defaults to 2000ms
}

export const LighthouseLoader: React.FC<LighthouseLoaderProps> = ({
  onComplete,
  durationMs = 2000,
}) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Prevent scrolling while loading screen is active
    document.body.style.overflow = 'hidden';

    const startTime = performance.now();
    let animationFrameId: number;

    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(elapsed / (durationMs - 250), 1);
      // Subtle ease-out curve for natural deceleration towards 100%
      const eased = 1 - Math.pow(1 - rawProgress, 2);
      setProgress(Math.round(eased * 100));

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        // Trigger smooth fade-out
        setIsFading(true);
        setTimeout(() => {
          setIsDone(true);
          document.body.style.overflow = '';
          if (onComplete) onComplete();
        }, 450);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = '';
    };
  }, [durationMs, onComplete]);

  if (isDone) return null;

  // Dynamic status telemetry text based on progress
  let statusText = 'CALIBRATING OPTICS · 06°27′N';
  if (progress > 30 && progress <= 65) {
    statusText = 'ACQUIRING BEACON FREQUENCY';
  } else if (progress > 65 && progress <= 90) {
    statusText = 'ALIGNING WAYPOINT TELEMETRY';
  } else if (progress > 90) {
    statusText = 'BEACON ACTIVE · COURSE ENGAGED';
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070b12] text-cream select-none transition-all duration-500 ease-emil-out ${
        isFading ? 'opacity-0 scale-[1.02] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-label="Loading The Dolapo Olutoye"
      role="status"
    >
      {/* Soft Ambient Radial Gold Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.14)_0%,rgba(7,11,18,0.85)_55%,#070b12_100%)]" />

      {/* Main Lighthouse Assembly */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Compass Outer Rings & Sweeping Volumetric Beam */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center mb-8">
          
          {/* Subtle Outer Compass Ring */}
          <div className="absolute inset-0 rounded-full border border-white/10" />
          
          {/* Rotating Dashed Nautical Ring */}
          <div className="absolute inset-2 rounded-full border border-dashed border-beacon/25 animate-[spin_10s_linear_infinite]" />
          
          {/* Inner Glowing Ring */}
          <div className="absolute inset-6 rounded-full border border-beacon/30 shadow-[0_0_25px_rgba(245,158,11,0.15)]" />

          {/* Sweeping Volumetric Light Beam */}
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <div
              className="w-full h-full animate-[spin_2.2s_linear_infinite]"
              style={{
                background:
                  'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(245,158,11,0.02) 15deg, rgba(245,158,11,0.28) 32deg, rgba(253,224,71,0.45) 36deg, transparent 40deg, transparent 360deg)',
              }}
            />
          </div>

          {/* Centered Lighthouse Monogram */}
          <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
            {/* Ambient Pulse Behind Monogram */}
            <div className="absolute inset-0 bg-beacon/20 rounded-full blur-xl animate-pulse" />

            <img
              src="/assets/lighthouse_monogram.svg"
              alt="Lighthouse Beacon"
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain filter invert drop-shadow-[0_0_18px_rgba(245,158,11,0.65)]"
            />

            {/* Glowing Lantern Lamp Heart */}
            <div className="absolute top-[22%] left-[49%] -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-beacon animate-ping shadow-[0_0_12px_#f59e0b]" />
            <div className="absolute top-[22%] left-[49%] -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-yellow-200 shadow-[0_0_8px_#ffffff]" />
          </div>

          {/* Cardinal Coordinate Markers */}
          <span className="absolute top-1 text-[9px] font-mono text-beacon/60 font-semibold tracking-widest">N</span>
          <span className="absolute bottom-1 text-[9px] font-mono text-beacon/60 font-semibold tracking-widest">S</span>
          <span className="absolute left-1 text-[9px] font-mono text-beacon/60 font-semibold tracking-widest">W</span>
          <span className="absolute right-1 text-[9px] font-mono text-beacon/60 font-semibold tracking-widest">E</span>
        </div>

        {/* Brand Monogram Eyebrow */}
        <div className="font-serif text-xl sm:text-2xl text-white font-normal tracking-wide mb-2 drop-shadow-md">
          Dolapo Olutoye
        </div>

        {/* Dynamic Navigational Telemetry Line */}
        <div className="flex items-center gap-2 text-beacon font-mono text-xs uppercase tracking-[0.22em] font-semibold mb-5 h-5">
          <span className="w-1.5 h-1.5 rounded-full bg-beacon animate-ping" />
          <span>{statusText}</span>
        </div>

        {/* Hairline Progress Gauge */}
        <div className="w-48 sm:w-56 h-[3px] bg-white/10 rounded-full overflow-hidden relative mb-3">
          <div
            className="h-full bg-gradient-to-r from-beacon/40 via-beacon to-amber-300 rounded-full transition-all duration-100 ease-out shadow-[0_0_10px_rgba(245,158,11,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Telemetry Coordinate Subtext */}
        <div className="flex items-center justify-between w-48 sm:w-56 text-[10px] font-mono text-stone-accent uppercase tracking-wider">
          <span>ORIGIN: 06°27.4′N</span>
          <span className="text-beacon font-medium">{progress}%</span>
        </div>

      </div>
    </div>
  );
};
