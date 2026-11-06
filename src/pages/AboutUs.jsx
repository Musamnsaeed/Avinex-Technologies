import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Target,
  Eye,
  CheckCircle2,
  ShieldCheck,
  Plane,
  Building2,
  Radio,
  Zap,
  Shield,
  Activity,
  Layers,
} from 'lucide-react';
import {
  COMPANY,
  PROJECT_LIFECYCLE,
  WHO_WE_SERVE,
  DESIGNED_TO_SUPPORT,
} from '../data/siteData';
import { useSEO } from '../utils/useSEO';

export default function AboutUs() {
  useSEO({
    title: 'About Us | Institutional Engineering & Avionics Supplier',
    description: 'Learn about AVINEX Technologies (Pvt) Ltd — SECP-registered Pakistani engineering company specializing in airport communications, avionics systems, and critical infrastructure.',
    canonical: '/about-us',
  });

  useEffect(() => {
    const els = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ─── Page Banner ─── */}
      <div className="page-banner" id="about-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>About Us</span>
          </div>
          <h1>About AVINEX Technologies</h1>
          <p>
            {COMPANY.tagline} — {COMPANY.subtitle}
          </p>
        </div>
      </div>

      {/* ─── Company Overview (Portfolio Page 2) ─── */}
      <section className="section" id="about-overview">
        <div className="container">
          <div className="about-grid fade-up" style={{ alignItems: 'center' }}>
            <div>
              <div className="section-label">Company Overview</div>
              <h2 className="section-title">
                {COMPANY.headline}
              </h2>
              <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: '16px', fontSize: '1rem' }}>
                {COMPANY.description}
              </p>
              <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: '24px', fontSize: '0.9375rem' }}>
                {COMPANY.overviewSecond}
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link to="/services" className="btn btn-navy">
                  Our Areas of Expertise <ArrowRight size={16} />
                </Link>
                <Link to="/products" className="btn btn-outline">
                  Browse Equipment Hub
                </Link>
              </div>
            </div>

            <div className="about-image" style={{ position: 'relative' }}>
              <div
                style={{
                  width: '100%',
                  height: '440px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 16px 40px rgba(10,25,47,0.12)',
                  border: '1px solid var(--gray-200)',
                  position: 'relative',
                }}
              >
                <img
                  src="/images/hero/hero-aviation-atc.jpg"
                  alt="AVINEX Technologies Aviation & Infrastructure Integration"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '24px 20px',
                    background: 'linear-gradient(to top, rgba(11,18,32,0.92) 0%, rgba(11,18,32,0.5) 60%, transparent 100%)',
                    color: '#fff',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: '#D4AF37',
                      display: 'block',
                      marginBottom: '4px',
                    }}
                  >
                    Official Company Motto
                  </span>
                  <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', lineHeight: 1.4, display: 'block' }}>
                    &ldquo;{COMPANY.tagline}&rdquo;
                  </span>
                </div>
              </div>
              <div className="accent-bar" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Our Project Lifecycle (Portfolio Page 2) ─── */}
      <section className="section" style={{ background: '#0B1220', color: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#D4AF37' }}>
              Standard Operational Methodology
            </span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginTop: '6px' }}>
              Our Project Lifecycle
            </h2>
            <p style={{ color: '#94a3b8', maxWidth: '640px', margin: '8px auto 0', fontSize: '0.9375rem' }}>
              End-to-end technical execution across each stage of critical infrastructure deployment.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '16px',
            }}
          >
            {PROJECT_LIFECYCLE.map((p) => (
              <div
                key={p.step}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '12px',
                  padding: '20px 14px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#D4AF37', marginBottom: '6px' }}>
                  STEP {p.step}
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
                  {p.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.4 }}>
                  {p.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Who We Serve & Designed to Support ─── */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px' }}>
            {/* Who We Serve */}
            <div>
              <div className="section-label">Target Sectors</div>
              <h2 className="section-title" style={{ marginBottom: '24px' }}>
                Who We Serve
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {WHO_WE_SERVE.map((s) => (
                  <div
                    key={s.title}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '18px 20px',
                    }}
                  >
                    <div style={{ fontWeight: 800, color: 'var(--navy)', fontSize: '1rem', marginBottom: '4px' }}>
                      {s.title}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                      {s.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Designed to Support */}
            <div>
              <div className="section-label">Performance Goals</div>
              <h2 className="section-title" style={{ marginBottom: '24px' }}>
                Designed to Support
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {DESIGNED_TO_SUPPORT.map((d) => (
                  <div
                    key={d.title}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '18px 20px',
                    }}
                  >
                    <div style={{ fontWeight: 800, color: 'var(--navy)', fontSize: '1rem', marginBottom: '4px' }}>
                      {d.title}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                      {d.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Our Service Commitment (Portfolio Page 6) ─── */}
      <section className="section" style={{ background: '#f8fafc', borderTop: '1px solid #e5e7eb' }}>
        <div className="container">
          <div
            style={{
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '48px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
              maxWidth: '900px',
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            <div className="section-label" style={{ margin: '0 auto 12px' }}>
              Service Commitment
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '16px' }}>
              Our Service Commitment
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.8, marginBottom: '20px', fontWeight: 500 }}>
              &ldquo;{COMPANY.commitment}&rdquo;
            </p>
            <p style={{ fontSize: '0.9375rem', color: '#64748b', lineHeight: 1.7, marginBottom: '32px' }}>
              {COMPANY.objective}
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#D4AF37', fontWeight: 800, fontSize: '1.1rem', background: '#0B1220', padding: '10px 24px', borderRadius: '30px' }}>
              <span>{COMPANY.tagline}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Contact CTA ─── */}
      <section className="home-contact-cta" id="about-cta">
        <div className="container">
          <div className="home-contact-center">
            <span className="home-contact-label">Get In Touch</span>
            <h2 className="home-contact-heading">
              Ready to Work With Us?
            </h2>
            <p className="home-contact-text">
              Connect with AVINEX TECHNOLOGIES for your next project. Let's
              discuss how we can support your mission-critical requirements.
            </p>
            <div className="home-contact-actions">
              <Link to="/contact-us" className="home-contact-btn-primary">
                Contact Us <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
