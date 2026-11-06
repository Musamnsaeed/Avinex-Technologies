import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Zap,
  Settings,
  CheckCircle2,
  RadioTower,
  Activity,
  Flame,
  Shield,
  BatteryCharging,
  PackageCheck,
  Building2,
  Plane,
  ShieldCheck,
  Check,
  ChevronDown,
} from 'lucide-react';
import { SERVICES, COMPANY, PROJECT_LIFECYCLE, WHO_WE_SERVE, DESIGNED_TO_SUPPORT } from '../data/siteData';
import { useSEO } from '../utils/useSEO';

const iconMap = {
  RadioTower,
  Zap,
  BatteryCharging,
  Activity,
  Flame,
  Shield,
  Settings,
  PackageCheck,
};

export default function Services() {
  useSEO({
    title: 'Critical Infrastructure & Avionics Engineering Services',
    description: 'Explore our 8 core engineering disciplines: CNS aviation communications, power protection, AVR conditioning, fire safety, CCTV security, and turn-key integration.',
    canonical: '/services',
  });

  const [activeCard, setActiveCard] = useState(null);
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
      <div className="page-banner" id="services-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Services</span>
          </div>
          <h1>Engineering &amp; Technology for Critical Infrastructure</h1>
          <p>
            Integrated solutions for aviation, airports, air traffic control facilities,
            government organizations, commercial establishments, and critical infrastructure.
          </p>
        </div>
      </div>

      {/* ─── Project Lifecycle Bar (Light Backbone with Gold Step Accents) ─── */}
      <section style={{ background: '#f8fafc', padding: '52px 0', borderTop: '3px solid var(--gold)', borderBottom: '1px solid var(--gray-200)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span style={{ fontSize: '0.78125rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--gold-dark)' }}>
              Structured Delivery Model
            </span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy-deep)', margin: '6px 0 0' }}>
              Our Project Lifecycle
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '14px',
            }}
          >
            {PROJECT_LIFECYCLE.map((item) => (
              <div
                key={item.step}
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--gray-200)',
                  borderTop: '3px solid var(--gold)',
                  borderRadius: '10px',
                  padding: '18px 14px',
                  textAlign: 'center',
                  position: 'relative',
                  boxShadow: '0 4px 14px rgba(10, 27, 61, 0.05)',
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--gold)', marginBottom: '4px' }}>
                  STEP {item.step}
                </div>
                <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '4px' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--gray-600)', lineHeight: 1.45 }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Core Areas of Expertise ─── */}
      <section className="section" id="services-detail" style={{ background: '#f8fafc', color: 'var(--navy-deep)', padding: '90px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="section-label" style={{ color: 'var(--gold-dark)' }}>Core Capabilities</div>
            <h2 className="section-title" style={{ color: 'var(--navy-deep)' }}>Our 8 Areas of Expertise</h2>
            <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center', maxWidth: '720px', color: 'var(--gray-600)' }}>
              Explore our mission-critical engineering solutions. Hover over each service card to reveal detailed technical scope, equipment deliverables, and support capabilities.
            </p>
          </div>

          <div className="services-reveal-grid">
            {SERVICES.map((svc) => {
              const Icon = iconMap[svc.icon] || Settings;
              const isActive = activeCard === svc.id;

              return (
                <div
                  key={svc.id}
                  className={`service-reveal-card fade-up${isActive ? ' is-active' : ''}`}
                  id={`service-${svc.id}`}
                  onClick={() => setActiveCard(isActive ? null : svc.id)}
                >
                  {/* Background Picture */}
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="service-reveal-bg"
                    loading="lazy"
                  />

                  {/* Scrim Dark Overlay */}
                  <div className="service-reveal-overlay" />

                  {/* Card Content (Hover to reveal text) */}
                  <div className="service-reveal-content">
                    {/* Top Header Row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <span className="service-reveal-badge">
                        AREA {svc.num}
                      </span>
                      <div className="service-reveal-icon-ring">
                        <Icon size={24} />
                      </div>
                    </div>

                    {/* Bottom Body (with revealing text drawer) */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', width: '100%', marginTop: 'auto' }}>
                      <h3 className="service-reveal-title">{svc.title}</h3>
                      <div className="service-reveal-subtitle">{svc.subtitle}</div>
                      <p className="service-reveal-peek">{svc.short}</p>

                      {/* Prompt indicator when not hovered */}
                      <div className="service-reveal-prompt">
                        <span>Hover or tap to reveal full scope</span>
                        <ChevronDown size={14} />
                      </div>

                      {/* The Text Revealed on Hover */}
                      <div className="service-reveal-drawer">
                        <p className="service-reveal-desc">
                          {svc.description}
                        </p>

                        {/* Key Features / Scope Items */}
                        <div style={{ margin: '4px 0' }}>
                          <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#F3C669', marginBottom: '6px' }}>
                            Core Scope &amp; Equipment:
                          </div>
                          <div className="service-reveal-features-grid">
                            {svc.features.map((feat) => (
                              <div key={feat} className="service-reveal-feature-item">
                                <CheckCircle2 size={13} color="#D4AF37" style={{ flexShrink: 0, marginTop: '2px' }} />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Support Callout */}
                        {svc.support && (
                          <div className="service-reveal-support">
                            <strong style={{ color: '#fff', display: 'block', marginBottom: '2px' }}>
                              Engineering &amp; Support Scope:
                            </strong>
                            {svc.support}
                          </div>
                        )}

                        {/* Architecture Concept Chain (if defined in portfolio) */}
                        {svc.concept && (
                          <div style={{ background: 'rgba(212, 175, 55, 0.08)', border: '1px solid rgba(212, 175, 55, 0.3)', borderRadius: '8px', padding: '10px 14px' }}>
                            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#F3C669', textTransform: 'uppercase', marginBottom: '6px' }}>
                              {svc.concept.title}:
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', fontSize: '0.75rem', color: '#fff' }}>
                              {svc.concept.chain.map((node, i) => (
                                <div key={node} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                  <span style={{ background: 'rgba(255,255,255,0.08)', padding: '3px 8px', borderRadius: '4px' }}>
                                    {node}
                                  </span>
                                  {i < svc.concept.chain.length - 1 && (
                                    <ArrowRight size={12} color="#D4AF37" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* CTA Row */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
                          <Link to="/contact-us" className="service-reveal-cta-btn" onClick={(e) => e.stopPropagation()}>
                            Request Technical Quote <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Who We Serve & Designed to Support ─── */}
      <section className="section" style={{ background: '#f8fafc', borderTop: '1px solid #e5e7eb' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px' }}>
            {/* Who We Serve */}
            <div>
              <div className="section-label">Target Sectors</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '20px' }}>
                Who We Serve
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {WHO_WE_SERVE.map((target) => (
                  <div
                    key={target.title}
                    style={{
                      background: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '10px',
                      padding: '16px 20px',
                    }}
                  >
                    <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '0.9375rem', marginBottom: '2px' }}>
                      {target.title}
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                      {target.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Designed to Support */}
            <div>
              <div className="section-label">Core Pillars</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '20px' }}>
                Designed to Support
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {DESIGNED_TO_SUPPORT.map((pillar) => (
                  <div
                    key={pillar.title}
                    style={{
                      background: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '10px',
                      padding: '16px 20px',
                    }}
                  >
                    <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '0.9375rem', marginBottom: '2px' }}>
                      {pillar.title}
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                      {pillar.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Contact CTA ─── */}
      <section className="home-contact-cta" id="services-cta">
        <div className="container">
          <div className="home-contact-center">
            <span className="home-contact-label">Get In Touch</span>
            <h2 className="home-contact-heading">
              Ready to Discuss Your Project Requirements?
            </h2>
            <p className="home-contact-text">
              Contact our engineering and procurement team for technical evaluations,
              system specifications, and tender compliance support.
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
