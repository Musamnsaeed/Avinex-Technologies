import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

// Inline SVG brand icons (lucide-react doesn't export brand icons)
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);
import { COMPANY, SERVICES, NAV_LINKS } from '../data/siteData';

import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="site-footer" id="site-footer">
      <div className="container">
        {/* Brand Top Header */}
        <div
          className="footer-top-brand"
          style={{
            marginBottom: '40px',
            paddingBottom: '32px',
            borderBottom: '1px solid var(--gray-200)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div>
            <Link to="/" aria-label="AVINEX Technologies Home">
              <Logo height={64} />
            </Link>
            <p
              style={{
                marginTop: '12px',
                fontSize: '0.9375rem',
                color: 'var(--gray-500)',
                maxWidth: '560px',
                lineHeight: '1.6',
              }}
            >
              {COMPANY.tagline} — {COMPANY.subtitle}
            </p>
          </div>
          <div className="compliance-badges" style={{ marginTop: 0 }}>
            <span className="compliance-badge">Private Limited Company</span>
            <span className="compliance-badge">NTN / STRN Registered</span>
          </div>
        </div>

        <div className="footer-grid">
          {/* Column 1 — About / Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
              <li>
                <Link to="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 2 — Services */}
          <div className="footer-col">
            <h4>Our Services</h4>
            <ul>
              {SERVICES.map((svc) => (
                <li key={svc.id}>
                  <Link to="/services">{svc.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact Address */}
          <div className="footer-col">
            <h4>Contact Info</h4>
            <div className="contact-line">
              <MapPin size={18} />
              <span>
                {COMPANY.address.line1}, {COMPANY.address.line2},<br />
                {COMPANY.address.city}, {COMPANY.address.country}
              </span>
            </div>
            <div className="contact-line">
              <Phone size={18} />
              <span>
                Phone: {COMPANY.phone}
                <br />
                Fax: {COMPANY.fax}
              </span>
            </div>
            <div className="contact-line">
              <Mail size={18} />
              <span>{COMPANY.email}</span>
            </div>
          </div>

          {/* Column 4 — Social */}
          <div className="footer-col">
            <h4>Connect With Us</h4>
            <p>Follow us on social media for the latest updates on products and industry news.</p>
            <div className="footer-socials">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" id="social-facebook">
                <FacebookIcon />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" id="social-instagram">
                <InstagramIcon />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" id="social-youtube">
                <YoutubeIcon />
              </a>
            </div>
          </div>
        </div>

        {/* PTA Regulatory Compliance Note */}
        <div
          style={{
            marginTop: '32px',
            paddingTop: '20px',
            borderTop: '1px solid var(--gray-200)',
            fontSize: '0.8125rem',
            color: 'var(--gray-500)',
            lineHeight: 1.6,
            textAlign: 'center',
          }}
        >
          <p>
            <strong>Regulatory Notice:</strong> Availability of wireless and telecom equipment is subject to applicable PTA type approval and licensing requirements.
          </p>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          © {new Date().getFullYear()} {COMPANY.legalName}. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
