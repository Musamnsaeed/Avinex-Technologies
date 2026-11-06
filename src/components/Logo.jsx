import logoTransparent from '../assets/logo-transparent.png';
import { COMPANY } from '../data/siteData';

export default function Logo({
  height = 64,
  className = '',
  alt = 'AVINEX TECHNOLOGIES (PVT) LTD',
  showTagline = true,
  tagline = COMPANY.tagline,
  theme = 'light',
}) {
  // Always use the original transparent logo — it has the full gold + blue Avinex branding.
  // On dark backgrounds add a stronger drop-shadow so it stays crisp.
  const isDark = theme === 'dark';

  return (
    <span
      className={`brand-logo ${className}`}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        textDecoration: 'none',
      }}
    >
      <img
        src={logoTransparent}
        alt={alt}
        style={{
          height: `${height}px`,
          width: 'auto',
          maxHeight: '100%',
          objectFit: 'contain',
          display: 'block',
          filter: isDark
            ? 'drop-shadow(0 2px 8px rgba(0,0,0,0.6))'
            : 'none',
        }}
      />
      {showTagline && tagline && (
        <span
          className="brand-logo-tagline"
          style={{
            fontFamily: 'var(--font-body, Inter, sans-serif)',
            fontSize: '0.71875rem',
            fontWeight: 700,
            color: isDark ? '#F3C669' : '#b45309',
            letterSpacing: '0.04em',
            marginTop: '3px',
            fontStyle: 'italic',
            whiteSpace: 'nowrap',
            lineHeight: 1.2,
          }}
        >
          {tagline}
        </span>
      )}
    </span>
  );
}
