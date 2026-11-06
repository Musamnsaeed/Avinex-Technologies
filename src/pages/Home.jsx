import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Plane,
  Radio,
  Server,
  Zap,
  Settings,
  Mail,
} from 'lucide-react';
import {
  HERO_SLIDES,
  PRODUCT_CATEGORIES,
  COMPANY,
} from '../data/siteData';
import { PRODUCTS } from '../data/products';
import { client } from '../sanity/client';
import { urlFor } from '../sanity/image';
import NavigationSolutionsBanner from '../components/NavigationSolutionsBanner';
import { parseProductDetails } from '../utils/productUtils';
import { SignalWave, RadarSweep, TechnicalGrid } from '../components/EngineeringMotifs';
import { useSEO } from '../utils/useSEO';

const iconMap = { Radio, Server, Zap, Settings, Plane };

export default function Home() {
  useSEO({
    title: 'AVINEX Technologies',
    description: 'AVINEX Technologies delivers mission-critical aviation electronics, airport ground communications, power protection, and systems integration in Pakistan.',
    canonical: '/',
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Scroll animation
  useEffect(() => {
    const els = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Fetch featured products from Sanity (only live products, zero mock fallback)
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function loadSanityFeatured() {
      try {
        const query = `*[_type == "product"] | order(featured desc, _createdAt desc)[0...6]{
          _id,
          name,
          tagline,
          model,
          compliance,
          leadTime,
          "categorySlug": category->slug.current,
          "categoryName": category->title,
          image
        }`;
        const data = await client.fetch(query);
        if (isMounted && data && data.length > 0) {
          setFeaturedProducts(data);
        } else if (isMounted) {
          setFeaturedProducts([]);
        }
      } catch (err) {
        console.warn('Sanity fetch failed on Home.', err);
      }
    }

    loadSanityFeatured();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {/* ─── Hero Section with Atmospheric Horizon & Scroll Flow ─── */}
      <section className="hero" id="hero-section">
        {/* Technical Blueprint Grid Pattern */}
        <TechnicalGrid opacity={0.06} />

        {/* Dynamic Aerospace Radar Sweep Motif */}
        <RadarSweep size={440} opacity={0.2} className="hero-radar-motif" />

        {/* Animated RF Signal Wave across base */}
        <SignalWave height={90} opacity={0.35} />

        {/* Ambient Atmospheric Center Spotlight */}
        <div className="hero-ambient-spotlight" />

        {/* Background Slides */}
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`hero-slide${i === currentSlide ? ' active' : ''}`}
          >
            <div
              className="hero-slide-bg"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="hero-slide-overlay" />

            {/* Depth Watermark Backdrop Text */}
            <div className="hero-watermark-text" aria-hidden="true">
              AVINEX
            </div>

            <div className="hero-content">
              {slide.tag ? (
                <div className="hero-telemetry-badge">
                  <span className="pulse-dot" />
                  <span>{slide.tag}</span>
                </div>
              ) : (
                <div className="hero-telemetry-badge">
                  <span className="pulse-dot" />
                  <span>MIL-SPEC &bull; CNS &bull; AVIONICS TELEMETRY</span>
                </div>
              )}

              <h1 className="hero-headline">
                {slide.heading}
              </h1>

              <p className="hero-subtext">{slide.subtext}</p>

              <div className="hero-tech-actions">
                <Link to="/contact-us" className="hero-btn-teal-pill">
                  <span>Request Procurement Quote</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/services" className="hero-btn-glass-pill">
                  <span>Explore Systems &amp; Scope</span>
                  <ChevronRight size={16} />
                </Link>
              </div>

              {/* Strategic Telemetry Strip */}
              <div className="hero-telemetry-strip">
                <div className="telemetry-item">
                  <span className="telemetry-val">SECP</span>
                  <span className="telemetry-lbl">Licensed Importer</span>
                </div>
                <div className="telemetry-sep" />
                <div className="telemetry-item">
                  <span className="telemetry-val">FBR</span>
                  <span className="telemetry-lbl">Wholesale &amp; Retail</span>
                </div>
                <div className="telemetry-sep" />
                <div className="telemetry-item">
                  <span className="telemetry-val">100%</span>
                  <span className="telemetry-lbl">Tender Compliance</span>
                </div>
                <div className="telemetry-sep" />
                <div className="telemetry-item">
                  <span className="telemetry-val">TIER-1</span>
                  <span className="telemetry-lbl">OEM Sourcing</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <div className="hero-arrows">
          <button className="hero-arrow" onClick={prevSlide} aria-label="Previous slide">
            <ChevronLeft size={20} />
          </button>
          <button className="hero-arrow" onClick={nextSlide} aria-label="Next slide">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Navigation Dots */}
        <div className="hero-dots">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              className={`hero-dot${i === currentSlide ? ' active' : ''}`}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Seamless Atmospheric Scroll Blend into Next Section */}
        <div className="hero-bottom-blend" />

        {/* Animated Scroll Down Indicator */}
        <div
          className="hero-scroll-cue"
          onClick={() => {
            const nextSec = document.getElementById('services-overview');
            if (nextSec) nextSec.scrollIntoView({ behavior: 'smooth' });
          }}
          role="button"
          tabIndex={0}
          aria-label="Scroll to explore"
        >
          <span className="scroll-cue-text">SCROLL TO EXPLORE</span>
          <div className="scroll-cue-pill">
            <div className="scroll-cue-dot" />
          </div>
        </div>
      </section>


      {/* ─── Services Overview ─── */}
      <section className="services-overview-dark" id="services-overview">
        <TechnicalGrid opacity={0.04} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="fade-up" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span className="services-overview-label">What We Do</span>
            <h2 className="services-overview-heading">{COMPANY.headline}</h2>
            <p className="services-overview-subtext" style={{ maxWidth: '720px', margin: '0 auto' }}>
              {COMPANY.subtitle}
            </p>
          </div>

          <div className="fade-up">
            <NavigationSolutionsBanner />
          </div>

          <div style={{ textAlign: 'center', marginTop: '28px', marginBottom: '4px' }} className="fade-up">
            <Link to="/services" className="services-overview-cta">
              View Detailed Scope &amp; Specifications <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Featured Products (Only rendered when live products exist in Sanity) ─── */}
      {featuredProducts.length > 0 && (
        <section
          id="featured-products"
          style={{
            padding: '96px 0',
            background: 'linear-gradient(180deg, #ffffff 0%, #f7f8fa 100%)',
          }}
        >
        <div className="container">
          {/* Header */}
          <div
            className="fade-up"
            style={{ textAlign: 'center', marginBottom: '56px' }}
          >
            <span
              style={{
                display: 'inline-block',
                padding: '4px 14px',
                borderRadius: '100px',
                background: 'rgba(0, 49, 83, 0.08)',
                color: 'var(--navy)',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              Featured Equipment
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 800,
                color: 'var(--gray-900)',
                lineHeight: 1.2,
                margin: '0 0 16px',
              }}
            >
              Mission-Critical Products
            </h2>
            <p
              style={{
                fontSize: '1.0625rem',
                color: 'var(--gray-500)',
                maxWidth: '560px',
                margin: '0 auto',
                lineHeight: 1.7,
              }}
            >
              Equipment designed for aviation, telecommunication, and enterprise deployments — sourced from international manufacturers.
            </p>
          </div>

          {/* Product Grid */}
          <div
            className="fade-up"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
              gap: '28px',
            }}
          >
            {featuredProducts.map((product) => {
              const cat = PRODUCT_CATEGORIES.find(
                (c) => c.id === product.category
              );
              const targetSlug = product.categorySlug || cat?.slug || 'radio';
              const categoryBadge =
                product.categoryName?.split(' ')[0] ||
                cat?.name?.split(' ')[0] ||
                'Equipment';
              const CatIcon = iconMap[cat?.icon] || Plane;

              return (
                <Link
                  key={product.id || product._id}
                  to={`/products/${targetSlug}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: '#fff',
                    border: '1px solid var(--gray-200)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    textDecoration: 'none',
                    transition: 'transform 0.28s ease, box-shadow 0.28s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,49,83,0.13)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                  }}
                >
                  {/* Image Area */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '220px',
                      overflow: 'hidden',
                      flexShrink: 0,
                      background: 'linear-gradient(135deg, #001f38 0%, #003153 100%)',
                    }}
                  >
                    {product.image ? (
                      <img
                        src={urlFor(product.image).width(700).height(450).fit('crop').url()}
                        alt={product.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center',
                          display: 'block',
                          transition: 'transform 0.4s ease',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'linear-gradient(135deg, #001f38 0%, #003153 100%)',
                        }}
                      >
                        <CatIcon size={56} color="rgba(255,255,255,0.18)" />
                      </div>
                    )}
                    {/* Dark gradient overlay at bottom */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '80px',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)',
                        pointerEvents: 'none',
                      }}
                    />
                    {/* Category Badge */}
                    <span
                      style={{
                        position: 'absolute',
                        top: '14px',
                        left: '14px',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        background: 'var(--navy)',
                        color: '#fff',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.09em',
                        textTransform: 'uppercase',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                      }}
                    >
                      {categoryBadge}
                    </span>
                    {/* Model tag bottom-left overlay */}
                    {product.model && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '12px',
                          left: '14px',
                          fontSize: '0.68rem',
                          fontWeight: 600,
                          color: 'rgba(255,255,255,0.85)',
                          letterSpacing: '0.06em',
                          fontFamily: 'monospace',
                        }}
                      >
                        {product.model}
                      </span>
                    )}
                  </div>

                  {/* Card Body */}
                  <div
                    style={{
                      padding: '22px 24px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      gap: '10px',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: 'var(--gray-900)',
                        lineHeight: 1.35,
                        margin: 0,
                      }}
                    >
                      {product.name}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--gray-500)',
                        lineHeight: 1.6,
                        margin: 0,
                        flex: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {parseProductDetails(product.tagline, product.specs).cleanTagline || product.tagline}
                    </p>

                    {/* Compliance chips */}
                    {product.compliance && product.compliance.length > 0 && (
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '6px',
                          marginTop: '4px',
                        }}
                      >
                        {product.compliance.slice(0, 2).map((c) => (
                          <span
                            key={c}
                            style={{
                              padding: '2px 8px',
                              borderRadius: '3px',
                              background: 'rgba(212, 175, 55, 0.1)',
                              color: 'var(--gold-dark)',
                              fontSize: '0.67rem',
                              fontWeight: 600,
                              letterSpacing: '0.04em',
                              border: '1px solid rgba(212, 175, 55, 0.25)',
                            }}
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* CTA Row */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '14px',
                        marginTop: '4px',
                        borderTop: '1px solid var(--gray-100)',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          color: 'var(--navy)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                        }}
                      >
                        View Details <ArrowRight size={14} />
                      </span>
                      {product.leadTime && (
                        <span
                          style={{
                            fontSize: '0.68rem',
                            color: 'var(--gray-400)',
                            fontWeight: 500,
                          }}
                        >
                          Ex-Stock
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* View All CTA */}
          <div
            style={{ textAlign: 'center', marginTop: '52px' }}
            className="fade-up"
          >
            <Link
              to="/products"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 36px',
                borderRadius: '8px',
                background: 'var(--gold-gradient)',
                color: 'var(--navy-deep)',
                fontSize: '0.9375rem',
                fontWeight: 800,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 20px rgba(212, 175, 55, 0.4)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--gold-light)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(212, 175, 55, 0.5)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--navy)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Browse Full Catalogue <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      )}

      {/* ─── Contact / Email Us CTA ─── */}
      <section className="home-contact-cta" id="contact-cta">
        <SignalWave height={80} opacity={0.3} />
        <div className="container">
          <div className="home-contact-center">
            <span className="home-contact-label">Get In Touch</span>
            <h2 className="home-contact-heading">
              Ready to Discuss Your Project Requirements?
            </h2>
            <p className="home-contact-text">
              Contact us to discuss your equipment, importation, or maintenance requirements.
            </p>
            <div className="home-contact-actions">
              <Link to="/contact-us" className="home-contact-btn-primary">
                Contact Us <ArrowRight size={16} />
              </Link>
              <a
                href={`mailto:${COMPANY.email}`}
                className="home-contact-btn-email"
              >
                <Mail size={16} />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
