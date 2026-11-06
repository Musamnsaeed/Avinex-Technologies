import React from 'react';

/**
 * Animated RF Signal Wave SVG Motif
 * Represents telecommunication, radio frequency, and ATC navigation waveforms.
 */
export function SignalWave({ height = 90, className = '', opacity = 0.4 }) {
  return (
    <div
      className={`signal-wave-container ${className}`}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: `${height}px`,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1,
        opacity,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          <linearGradient id="waveGradGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.05" />
            <stop offset="30%" stopColor="#D4AF37" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#F3C669" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="waveGradSubtle" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#64748B" stopOpacity="0.0" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#64748B" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Harmonic carrier wave 1 */}
        <path
          className="anim-wave-1"
          d="M0 60 Q 180 15, 360 60 T 720 60 T 1080 60 T 1440 60"
          stroke="url(#waveGradGold)"
          strokeWidth="2"
          fill="none"
        />

        {/* Secondary modulating wave 2 */}
        <path
          className="anim-wave-2"
          d="M0 65 Q 120 95, 240 65 T 480 65 T 720 65 T 960 65 T 1200 65 T 1440 65"
          stroke="url(#waveGradSubtle)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          fill="none"
        />

        {/* Precision baseline grid */}
        <line
          x1="0"
          y1="60"
          x2="1440"
          y2="60"
          stroke="rgba(212, 175, 55, 0.15)"
          strokeWidth="1"
          strokeDasharray="2 6"
        />
      </svg>
    </div>
  );
}

/**
 * Radar Sweep Motif (Concentric rings + 360-deg sweeping beam)
 * Evokes aerospace surveillance, avionics radar, and ATC tracking.
 */
export function RadarSweep({ size = 320, className = '', opacity = 0.22 }) {
  return (
    <div
      className={`radar-sweep-container ${className}`}
      style={{
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        pointerEvents: 'none',
        opacity,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          <radialGradient id="radarRings" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.1" />
            <stop offset="70%" stopColor="#D4AF37" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background scope glow */}
        <circle cx="160" cy="160" r="150" fill="url(#radarRings)" />

        {/* Range rings (50, 100, 150 NM) */}
        <circle cx="160" cy="160" r="150" stroke="rgba(212, 175, 55, 0.28)" strokeWidth="1" />
        <circle cx="160" cy="160" r="105" stroke="rgba(212, 175, 55, 0.22)" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="160" cy="160" r="60" stroke="rgba(212, 175, 55, 0.28)" strokeWidth="1" />
        <circle cx="160" cy="160" r="18" stroke="rgba(212, 175, 55, 0.45)" strokeWidth="1" />
        <circle cx="160" cy="160" r="2.5" fill="#D4AF37" />

        {/* Cardinal crosshairs */}
        <line x1="10" y1="160" x2="310" y2="160" stroke="rgba(212, 175, 55, 0.2)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="160" y1="10" x2="160" y2="310" stroke="rgba(212, 175, 55, 0.2)" strokeWidth="1" strokeDasharray="4 4" />

        {/* Angle ticks (45 deg diagonal markers) */}
        <line x1="54" y1="54" x2="70" y2="70" stroke="rgba(212, 175, 55, 0.35)" strokeWidth="1" />
        <line x1="266" y1="54" x2="250" y2="70" stroke="rgba(212, 175, 55, 0.35)" strokeWidth="1" />
        <line x1="54" y1="266" x2="70" y2="250" stroke="rgba(212, 175, 55, 0.35)" strokeWidth="1" />
        <line x1="266" y1="266" x2="250" y2="250" stroke="rgba(212, 175, 55, 0.35)" strokeWidth="1" />

        {/* Rotating sweep cone */}
        <g className="anim-radar-spin" style={{ transformOrigin: '160px 160px' }}>
          <path
            d="M 160 160 L 160 10 A 150 150 0 0 1 290 85 Z"
            fill="url(#radarConeGrad)"
            opacity="0.4"
          />
          <line x1="160" y1="160" x2="290" y2="85" stroke="#D4AF37" strokeWidth="1.5" />
        </g>

        <defs>
          <linearGradient id="radarConeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Detected target blip */}
        <circle cx="210" cy="115" r="3.5" fill="#F3C669" className="anim-blip" />
      </svg>
    </div>
  );
}

/**
 * Blueprint Technical Grid Background
 * Subtle grid pattern with technical corner crosses.
 */
export function TechnicalGrid({ className = '', opacity = 0.05 }) {
  return (
    <div
      className={`tech-grid-bg ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity,
        backgroundImage: `
          linear-gradient(to right, rgba(212, 175, 55, 0.15) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(212, 175, 55, 0.15) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }}
      aria-hidden="true"
    />
  );
}

/**
 * Telemetry Status Badge
 * Engineered system status indicator.
 */
export function TelemetryBadge({ label = 'SYS: ACTIVE // MIL & CIVIL AVIONICS', className = '' }) {
  return (
    <div className={`telemetry-badge ${className}`}>
      <span className="telemetry-beacon" />
      <span className="telemetry-text">{label}</span>
    </div>
  );
}
