import React, { useEffect, useState } from 'react';

interface DepthRulerProps {
  onCoordinateChange?: (coord: { lat: string; bearing: string; waypoint: string }) => void;
}

export const DepthRuler: React.FC<DepthRulerProps> = ({ onCoordinateChange }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [latDisplay, setLatDisplay] = useState("06°27.4'N");
  const [bearingDisplay, setBearingDisplay] = useState("042° NE");
  const [waypointDisplay, setWaypointDisplay] = useState("WP.00");

  const waypoints = [
    { pos: 0.0, wp: 'WP.00', label: '06°N', name: 'ORIGIN' },
    { pos: 0.1, wp: 'WP.01', label: '14°N', name: 'MIND' },
    { pos: 0.2, wp: 'WP.02', label: '28°N', name: 'PILLARS' },
    { pos: 0.3, wp: 'WP.03', label: '42°N', name: 'IDEAS' },
    { pos: 0.45, wp: 'WP.04', label: '56°N', name: 'MEDIA' },
    { pos: 0.58, wp: 'WP.05', label: '68°N', name: 'KEYNOTES' },
    { pos: 0.70, wp: 'WP.06', label: '75°N', name: 'IMPACT' },
    { pos: 0.82, wp: 'WP.07', label: '82°N', name: 'RIGOR' },
    { pos: 0.92, wp: 'WP.08', label: '88°N', name: 'PROTOCOL' },
    { pos: 1.0, wp: 'WP.10', label: '90°N', name: 'PORT' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const progress = Math.min(Math.max(window.scrollY / scrollHeight, 0), 1);
        setScrollProgress(progress);

        // Calculate dynamic nautical latitude from Lagos 06°27'N up to 88°45'N
        const baseLat = 6.456;
        const targetLat = 88.75;
        const currentLatDeg = baseLat + progress * (targetLat - baseLat);
        const deg = Math.floor(currentLatDeg);
        const min = ((currentLatDeg - deg) * 60).toFixed(1);

        // Add subtle pseudo-random micro jitter representing live GPS / gyro navigation
        const jitter = (Math.sin(window.scrollY * 0.05) * 0.03).toFixed(2);
        const finalMin = Math.max(0, parseFloat(min) + parseFloat(jitter)).toFixed(1);
        const formattedLat = `${deg < 10 ? '0' + deg : deg}°${finalMin}'N`;

        // Calculate magnetic bearing (sweeps smoothly between 042° NE and 315° NW)
        const bearingAngle = Math.round((42 + progress * 280) % 360);
        let quadrant = 'N';
        if (bearingAngle >= 25 && bearingAngle < 70) quadrant = 'NE';
        else if (bearingAngle >= 70 && bearingAngle < 115) quadrant = 'E';
        else if (bearingAngle >= 115 && bearingAngle < 160) quadrant = 'SE';
        else if (bearingAngle >= 160 && bearingAngle < 205) quadrant = 'S';
        else if (bearingAngle >= 205 && bearingAngle < 250) quadrant = 'SW';
        else if (bearingAngle >= 250 && bearingAngle < 295) quadrant = 'W';
        else quadrant = 'NW';

        const formattedBearing = `${bearingAngle < 100 ? (bearingAngle < 10 ? '00' : '0') : ''}${bearingAngle}° ${quadrant}`;

        // Find active waypoint
        let activeWp = waypoints[0].wp;
        for (let i = waypoints.length - 1; i >= 0; i--) {
          if (progress >= waypoints[i].pos - 0.05) {
            activeWp = waypoints[i].wp;
            break;
          }
        }

        setLatDisplay(formattedLat);
        setBearingDisplay(formattedBearing);
        setWaypointDisplay(activeWp);

        if (onCoordinateChange) {
          onCoordinateChange({
            lat: formattedLat,
            bearing: formattedBearing,
            waypoint: activeWp,
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onCoordinateChange]);

  return (
    <div className="fixed right-4 sm:right-7 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end pointer-events-none select-none font-mono">
      {/* Live Navigational Readout Badge */}
      <div className="mb-4 pr-1 text-right bg-black/60 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 shadow-lg">
        <div className="flex items-center gap-1.5 justify-end text-beacon text-xs font-bold tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-beacon animate-ping" />
          <span>{latDisplay}</span>
        </div>
        <div className="text-stone-accent text-[10px] tracking-widest mt-0.5">
          {bearingDisplay}
        </div>
        <div className="text-cream/50 text-[9px] uppercase tracking-widest">
          {waypointDisplay} // ACTIVE
        </div>
      </div>

      {/* Vertical Navigation Ruler Axis */}
      <div className="relative w-8 h-80 border-r border-white/20 flex flex-col justify-between py-1">
        {/* Moving Indicator Arrow */}
        <div
          className="absolute right-0 -mr-[1px] w-4 h-[2px] bg-beacon transition-all duration-150 ease-out flex items-center justify-end"
          style={{ top: `${scrollProgress * 100}%` }}
        >
          <div className="w-2 h-2 rounded-full bg-beacon -mr-1 shadow-md shadow-beacon animate-pulse" />
        </div>

        {/* Major Waypoint Ticks */}
        {waypoints.map((item, idx) => (
          <div key={idx} className="flex items-center justify-end gap-2 pr-1">
            <span
              className={`text-[9px] uppercase tracking-wider transition-colors duration-200 ${
                waypointDisplay === item.wp
                  ? 'text-beacon font-bold scale-105'
                  : 'text-stone-accent/60'
              }`}
            >
              {item.wp}
            </span>
            <div
              className={`h-[1px] transition-all duration-200 ${
                waypointDisplay === item.wp
                  ? 'w-3 bg-beacon'
                  : 'w-1.5 bg-white/20'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Bottom Nav Label */}
      <div className="mt-3 pr-1 text-right text-[10px] text-stone-accent uppercase tracking-widest">
        NAV GAUGES
      </div>
    </div>
  );
};
