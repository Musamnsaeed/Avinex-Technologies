import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import {
  ArrowRight, ArrowLeft, Download, ShieldCheck, Building2,
  CheckCircle2, Clock, ExternalLink, ChevronRight, Layers,
  FileBarChart2, Tag, ZoomIn, Mail
} from 'lucide-react';
import { PRODUCT_CATEGORIES, COMPANY } from '../data/siteData';
import { PRODUCTS } from '../data/products';
import { client } from '../sanity/client';
import { urlFor } from '../sanity/image';
import { parseProductDetails } from '../utils/productUtils';
import { useSEO } from '../utils/useSEO';

/* ─── Utility: Partnership level badge color ─── */
function partnerColor(level = '') {
  const l = level.toLowerCase();
  if (l.includes('authorized')) return { bg: 'rgba(37,99,235,0.08)', color: '#1d4ed8', border: 'rgba(37,99,235,0.25)' };
  if (l.includes('direct')) return { bg: 'rgba(22,163,74,0.08)', color: '#15803d', border: 'rgba(22,163,74,0.25)' };
  if (l.includes('certified')) return { bg: 'rgba(234,88,12,0.08)', color: '#c2410c', border: 'rgba(234,88,12,0.25)' };
  return { bg: 'rgba(10,25,47,0.06)', color: 'var(--navy)', border: 'rgba(10,25,47,0.14)' };
}

/* ─── Single product card component ─── */
function ProductCard({ product }) {
  const [imgError, setImgError] = useState(false);

  const specEntries = useMemo(() => (
    Array.isArray(product.specs)
      ? product.specs.map((s) => [s.key, s.value])
      : product.specs && typeof product.specs === 'object'
        ? Object.entries(product.specs)
        : []
  ), [product.specs]);

  const { intro, bullets, details: allSpecs } = useMemo(
    () => parseProductDetails(product.tagline, specEntries),
    [product.tagline, specEntries]
  );

  const complianceList = Array.isArray(product.compliance) ? product.compliance : [];
  const mfg = product.manufacturer;
  const pc = mfg?.partnershipLevel ? partnerColor(mfg.partnershipLevel) : null;

  // Combine main image + gallery images
  const allImages = useMemo(() => {
    const list = [];
    if (product.image && urlFor(product.image).url()) {
      list.push(product.image);
    }
    if (Array.isArray(product.gallery)) {
      product.gallery.forEach((g) => {
        if (g && urlFor(g).url()) {
          list.push(g);
        }
      });
    }
    return list;
  }, [product.image, product.gallery]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomOrigin({ x, y });
  };

  const currentImage = allImages[activeImageIndex] || allImages[0] || (product.image ? product.image : null);
  const currentImageUrl = currentImage && !imgError
    ? urlFor(currentImage).width(1200).height(900).fit('max').auto('format').url()
    : null;

  return (
    <article
      className="fade-up"
      id={`product-${product.id || product._id}`}
      style={{
        background: 'var(--white)',
        border: '1px solid var(--gray-200)',
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: 'minmax(360px, 420px) 1fr',
        minHeight: '360px',
        boxShadow: '0 2px 12px rgba(10,25,47,0.05)',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(10,25,47,0.12)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(10,25,47,0.05)';
        e.currentTarget.style.transform = 'none';
      }}
    >
      {/* ── Left: Image & Gallery Panel ── */}
      <div
        style={{
          position: 'relative',
          background: '#ffffff',
          borderRight: '1px solid var(--gray-200)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px 16px',
          minHeight: '360px',
          overflow: 'hidden',
        }}
      >
        {/* Decorative background pattern */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.035,
          backgroundImage: 'radial-gradient(circle, #0a192f 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }} />

        {/* Featured badge */}
        {product.featured && (
          <div style={{
            position: 'absolute', top: '12px', left: '12px',
            background: 'var(--red)', color: '#fff',
            fontSize: '0.6875rem', fontWeight: 800,
            padding: '3px 10px', borderRadius: '20px',
            textTransform: 'uppercase', letterSpacing: '0.08em',
            zIndex: 2,
          }}>
            ★ Featured
          </div>
        )}

        {/* Multi-image photo count badge */}
        {allImages.length > 1 && (
          <div style={{
            position: 'absolute', top: '12px', right: '12px',
            background: 'rgba(10,25,47,0.82)', color: '#fff',
            fontSize: '0.7rem', fontWeight: 700,
            padding: '4px 10px', borderRadius: '12px',
            zIndex: 2,
            backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', gap: '4px',
            letterSpacing: '0.03em',
          }}>
            <span>{activeImageIndex + 1} / {allImages.length}</span>
          </div>
        )}

        {/* Main image view with interactive cursor-tracking zoom */}
        <div
          onMouseEnter={() => setIsZoomed(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            setIsZoomed(false);
            setZoomOrigin({ x: 50, y: 50 });
          }}
          style={{
            width: '100%',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '280px',
            position: 'relative',
            padding: '8px 0',
            overflow: 'hidden',
            borderRadius: '12px',
            cursor: currentImageUrl ? 'zoom-in' : 'default',
            background: isZoomed ? '#ffffff' : 'transparent',
            transition: 'background 0.2s ease',
          }}
        >
          {currentImageUrl ? (
            <>
              <img
                key={activeImageIndex}
                src={currentImageUrl}
                alt={product.name}
                onError={() => setImgError(true)}
                style={{
                  maxWidth: '100%',
                  maxHeight: allImages.length > 1 ? '300px' : '340px',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  position: 'relative',
                  zIndex: 1,
                  filter: 'none',
                  transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                  transform: isZoomed ? 'scale(2.35)' : 'scale(1)',
                  transition: isZoomed ? 'transform 0.05s linear' : 'transform 0.25s ease',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              />

              {/* Hover to zoom badge hint */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '8px',
                  background: 'rgba(10,25,47,0.72)',
                  color: '#fff',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  padding: '3px 8px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  pointerEvents: 'none',
                  opacity: isZoomed ? 0 : 0.85,
                  transition: 'opacity 0.2s ease',
                  zIndex: 2,
                }}
              >
                <ZoomIn size={12} />
                <span>Hover to zoom</span>
              </div>
            </>
          ) : (
            <div style={{
              width: '140px', height: '140px',
              borderRadius: '16px',
              background: 'rgba(10,25,47,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: '10px',
            }}>
              <Layers size={40} color="rgba(10,25,47,0.2)" />
              <span style={{ fontSize: '0.75rem', color: 'rgba(10,25,47,0.35)', fontWeight: 600 }}>
                No Image
              </span>
            </div>
          )}
        </div>

        {/* Gallery thumbnails when multiple photos exist */}
        {allImages.length > 1 && (
          <div style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            paddingTop: '10px',
            position: 'relative',
            zIndex: 2,
            overflowX: 'auto',
          }}>
            {allImages.map((img, idx) => {
              const thumbUrl = urlFor(img).width(120).height(90).fit('crop').url();
              const isActive = idx === activeImageIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex(idx);
                  }}
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: isActive ? '2px solid #0284c7' : '1px solid var(--gray-200)',
                    padding: '3px',
                    background: '#fff',
                    cursor: 'pointer',
                    opacity: isActive ? 1 : 0.65,
                    transform: isActive ? 'scale(1.04)' : 'none',
                    transition: 'all 0.18s ease',
                    boxShadow: isActive ? '0 2px 8px rgba(2,132,199,0.25)' : 'none',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.opacity = '0.65';
                  }}
                >
                  <img
                    src={thumbUrl}
                    alt={`Photo ${idx + 1}`}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                </button>
              );
            })}
          </div>
        )}

        {/* Manufacturer logo watermark at bottom */}
        {mfg?.logo && urlFor(mfg.logo).url() && (
          <div style={{
            position: 'absolute',
            bottom: allImages.length > 1 ? '60px' : '10px',
            right: '10px',
            background: 'rgba(255,255,255,0.92)',
            borderRadius: '6px',
            padding: '3px 7px',
            border: '1px solid var(--gray-200)',
            zIndex: 3,
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}>
            <img
              src={urlFor(mfg.logo).width(64).height(32).fit('max').url()}
              alt={mfg.name}
              style={{ height: '20px', width: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </div>
        )}
      </div>

      {/* ── Right: Details Panel ── */}
      <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Top row: Manufacturer badge + Classification */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          {mfg && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '4px 12px',
              borderRadius: '20px',
              background: pc ? pc.bg : 'rgba(10,25,47,0.05)',
              border: `1px solid ${pc ? pc.border : 'rgba(10,25,47,0.12)'}`,
            }}>
              {mfg.logo && urlFor(mfg.logo).url() ? (
                <img
                  src={urlFor(mfg.logo).width(32).height(32).url()}
                  alt={mfg.name}
                  style={{ width: '14px', height: '14px', objectFit: 'contain' }}
                />
              ) : (
                <ShieldCheck size={12} color={pc ? pc.color : 'var(--navy)'} />
              )}
              <span style={{
                fontSize: '0.75rem', fontWeight: 800,
                color: pc ? pc.color : 'var(--navy)',
                letterSpacing: '0.03em',
              }}>
                {mfg.name}
              </span>
              {mfg.partnershipLevel && (
                <span style={{
                  fontSize: '0.6875rem', fontWeight: 700,
                  color: pc ? pc.color : 'var(--red)',
                  opacity: 0.85,
                }}>
                  · {mfg.partnershipLevel}
                </span>
              )}
            </div>
          )}
          {product.classification && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              fontSize: '0.6875rem', fontWeight: 700,
              color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '0.1em',
              padding: '4px 10px', borderRadius: '20px',
              background: 'rgba(217,35,44,0.07)', border: '1px solid rgba(217,35,44,0.2)',
            }}>
              <Tag size={10} />
              {product.classification}
            </span>
          )}
        </div>

        {/* Product Name & Model */}
        <div>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
            color: 'var(--navy)',
            fontWeight: 800,
            margin: '0 0 6px',
            lineHeight: 1.25,
          }}>
            {product.name}
          </h2>
          {product.model && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontSize: '0.8125rem', color: 'var(--gray-500)',
              fontFamily: 'monospace', fontWeight: 600,
              background: 'var(--gray-50)',
              border: '1px solid var(--gray-200)',
              padding: '3px 10px', borderRadius: '6px',
            }}>
              <FileBarChart2 size={12} />
              {product.model}
            </div>
          )}
        </div>

        {/* Overview / Clean Intro */}
        {intro && (
          <p style={{
            color: 'var(--gray-600)', lineHeight: 1.65, fontSize: '0.9rem',
            margin: 0,
            paddingBottom: '14px',
            borderBottom: '1px solid var(--gray-100)',
          }}>
            {intro}
          </p>
        )}

        {/* Bullet points if present */}
        {bullets.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '2px 0' }}>
            {bullets.map((bullet, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.85rem', color: 'var(--gray-700)' }}>
                <CheckCircle2 size={15} color="var(--red)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        )}

        {/* Separated Details & Specifications Grid */}
        {allSpecs.length > 0 && (
          <div>
            <div style={{
              fontSize: '0.6875rem', fontWeight: 700, color: 'var(--gray-400)',
              textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px',
            }}>
              Product Specifications & Details
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '8px',
            }}>
              {allSpecs.slice(0, 8).map(([key, val]) => (
                <div
                  key={key}
                  style={{
                    padding: '9px 12px',
                    background: 'var(--gray-50)',
                    borderRadius: '8px',
                    border: '1px solid var(--gray-200)',
                  }}
                >
                  <div style={{
                    fontSize: '0.6875rem',
                    color: 'var(--gray-400)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: '3px',
                  }}>
                    {key}
                  </div>
                  <div style={{
                    fontSize: '0.8125rem',
                    color: 'var(--navy)',
                    fontWeight: 700,
                    wordBreak: 'break-word',
                  }}>
                    {val}
                  </div>
                </div>
              ))}
            </div>
            {allSpecs.length > 8 && (
              <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginTop: '6px' }}>
                +{allSpecs.length - 8} more specs in datasheet
              </div>
            )}
          </div>
        )}

        {/* Compliance badges */}
        {complianceList.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
            <ShieldCheck size={13} color="var(--gray-400)" />
            {complianceList.map((c) => (
              <span
                key={c}
                style={{
                  fontSize: '0.6875rem', fontWeight: 700,
                  color: '#0f766e',
                  background: 'rgba(15,118,110,0.07)',
                  border: '1px solid rgba(15,118,110,0.2)',
                  padding: '3px 9px', borderRadius: '12px',
                }}
              >
                {c}
              </span>
            ))}
          </div>
        )}

        {/* Lead time + Tender note */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'flex-start' }}>
          {product.leadTime && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              fontSize: '0.8rem', color: 'var(--gray-600)',
              background: 'var(--gray-50)', border: '1px solid var(--gray-200)',
              padding: '4px 10px', borderRadius: '8px',
            }}>
              <Clock size={12} color="var(--red)" />
              Lead time: <strong style={{ color: 'var(--navy)' }}>{product.leadTime}</strong>
            </div>
          )}
        </div>

        {product.tenderNotes && (
          <div style={{
            padding: '12px 14px',
            background: 'rgba(217,35,44,0.04)',
            borderRadius: '8px',
            borderLeft: '3px solid var(--red)',
          }}>
            <div style={{ fontSize: '0.6875rem', fontWeight: 800, color: 'var(--red)', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Tender / Procurement Note
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--gray-600)', lineHeight: 1.6 }}>
              {product.tenderNotes}
            </div>
          </div>
        )}

        {/* CTA row */}
        <div style={{ marginTop: 'auto', paddingTop: '8px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {/* View Full Details — navigates to dedicated product detail page */}
          <Link
            to={`/products/${product.category?.slug || product.categorySlug || 'products'}/${product.slug || product.id || product._id}`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              padding: '9px 20px', borderRadius: '8px',
              border: '1.5px solid var(--navy)',
              color: 'var(--navy)', fontWeight: 700, fontSize: '0.8125rem',
              textDecoration: 'none', transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--navy)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--navy)';
            }}
          >
            <ArrowRight size={14} /> View Full Details
          </Link>

          {product.brochureUrl ? (
            <a
              href={product.brochureUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '7px',
                padding: '9px 20px', borderRadius: '8px',
                border: '1.5px solid var(--gray-300)',
                color: 'var(--gray-600)', fontWeight: 700, fontSize: '0.8125rem',
                textDecoration: 'none', transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--gray-100)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <Download size={14} /> Datasheet
            </a>
          ) : null}

          <Link
            to="/contact-us"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              padding: '9px 20px', borderRadius: '8px',
              background: 'var(--red)', color: '#fff',
              fontWeight: 700, fontSize: '0.8125rem',
              textDecoration: 'none', transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.87'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
          >
            Request Quote <ChevronRight size={14} />
          </Link>
        </div>

      </div>
    </article>
  );
}

/* ─── Main ProductCategory page ─── */
export default function ProductCategory() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const brandParam = searchParams.get('brand') || '';

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedManufacturer, setSelectedManufacturer] = useState(() => brandParam || 'all');

  const catName = category?.name || category?.title || slug?.replace(/-/g, ' ').toUpperCase() || 'Products';
  useSEO({
    title: `${catName} | Equipment Specifications`,
    description: category?.short || `Explore institutional specifications, models, and datasheets for ${catName} at AVINEX Technologies.`,
    canonical: `/products/${slug}`,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (brandParam) {
      setSelectedManufacturer(brandParam);
    } else {
      setSelectedManufacturer('all');
    }
  }, [slug, brandParam]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    async function loadData() {
      try {
        const slugWithS = slug.endsWith('s') ? slug : slug + 's';
        const slugWithoutS = slug.endsWith('s') ? slug.slice(0, -1) : slug;

        const sanityCategory = await client.fetch(
          `*[_type == "category" && (
            lower(slug.current) == lower($slug) ||
            lower(title) == lower($slug) ||
            slug.current in [$slug, $slugWithS, $slugWithoutS]
          )][0]{
            _id,
            "id": slug.current,
            "name": title,
            "short": description,
            "slug": slug.current
          }`,
          { slug, slugWithS, slugWithoutS }
        );

        if (sanityCategory) {
          const sanityProducts = await client.fetch(
            `*[_type == "product" && (
              category._ref == $catId ||
              lower(category->slug.current) == lower($slug) ||
              lower(category->title) == lower($slug)
            )] | order(featured desc, name asc){
              _id,
              "id": coalesce(slug.current, _id),
              name,
              model,
              manufacturer->{
                _id,
                name,
                "slug": slug.current,
                partnershipLevel,
                logo,
                website
              },
              tagline,
              classification,
              featured,
              leadTime,
              image,
              gallery,
              compliance,
              specs,
              tenderNotes,
              "brochureUrl": brochure.asset->url
            }`,
            { slug, catId: sanityCategory._id }
          );

          if (isMounted) {
            setCategory(sanityCategory);
            setProducts(sanityProducts || []);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Sanity fetch error, using fallback:', err);
      }

      // If not found in Sanity, check category definition without mock products
      const staticCat = PRODUCT_CATEGORIES.find((c) => c.slug === slug);
      if (isMounted) {
        setCategory(staticCat || null);
        setProducts([]);
        setLoading(false);
      }
    }

    loadData();
    return () => { isMounted = false; };
  }, [slug]);

  // Extract unique manufacturers
  const availableManufacturers = useMemo(() => {
    const map = new Map();
    products.forEach((p) => {
      if (p.manufacturer?.name) map.set(p.manufacturer.name, p.manufacturer);
    });
    return Array.from(map.values());
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!selectedManufacturer || selectedManufacturer === 'all') return products;
    const target = selectedManufacturer.toLowerCase();
    return products.filter((p) => {
      const mfgName = (p.manufacturer?.name || '').toLowerCase();
      return mfgName === target || mfgName.includes(target) || target.includes(mfgName);
    });
  }, [products, selectedManufacturer]);

  // Intersection observer for fade-up
  useEffect(() => {
    const els = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.06 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [slug, filteredProducts, loading]);

  /* ── Loading state ── */
  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '50%',
          border: '4px solid var(--gray-200)', borderTopColor: 'var(--red)',
          animation: 'spin 0.8s linear infinite',
        }} />
        <p style={{ color: 'var(--gray-400)', fontSize: '0.9375rem', fontWeight: 600 }}>Loading products…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  /* ── Not found ── */
  if (!category) {
    return (
      <>
        <div className="page-banner">
          <div className="container">
            <div className="breadcrumb">
              <Link to="/">Home</Link><span>/</span>
              <Link to="/products">Products</Link><span>/</span>
              <span>Not Found</span>
            </div>
            <h1>Category Not Found</h1>
            <p>The product category you are looking for does not exist.</p>
          </div>
        </div>
        <section className="section">
          <div className="container" style={{ textAlign: 'center' }}>
            <Link to="/products" className="btn btn-navy">
              <ArrowLeft size={16} /> Back to Products
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* ─── Page Banner ─── */}
      <div className="page-banner" id={`category-banner-${category.id}`}>
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>/</span>
            <Link to="/products">Products</Link><span>/</span>
            <span>{category.name}</span>
          </div>
          <h1>{category.name}</h1>
          {category.short && <p>{category.short}</p>}
        </div>
      </div>

      {/* ─── Products Section ─── */}
      <section className="section" id="category-products">
        <div className="container">

          {/* Manufacturer Filter Bar */}
          {availableManufacturers.length > 0 && (
            <div
              style={{
                marginBottom: '40px',
                padding: '18px 24px',
                background: 'var(--white)',
                borderRadius: '14px',
                border: '1px solid var(--gray-200)',
                boxShadow: '0 2px 10px rgba(10,25,47,0.05)',
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              <div style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                fontWeight: 800, fontSize: '0.8125rem', color: 'var(--navy)',
                marginRight: '4px', whiteSpace: 'nowrap',
              }}>
                <Building2 size={15} color="var(--red)" />
                Filter by Brand:
              </div>

              {/* All button */}
              <button
                onClick={() => setSelectedManufacturer('all')}
                style={{
                  padding: '7px 18px', borderRadius: '24px',
                  border: '1.5px solid',
                  borderColor: selectedManufacturer === 'all' ? 'var(--navy)' : 'var(--gray-300)',
                  background: selectedManufacturer === 'all' ? 'var(--navy)' : 'transparent',
                  color: selectedManufacturer === 'all' ? '#fff' : 'var(--gray-600)',
                  fontWeight: 700, fontSize: '0.8125rem',
                  cursor: 'pointer', transition: 'all 0.2s ease',
                }}
              >
                All Brands ({products.length})
              </button>

              {availableManufacturers.map((mfg) => {
                const count = products.filter((p) => p.manufacturer?.name === mfg.name).length;
                const active = selectedManufacturer === mfg.name;
                return (
                  <button
                    key={mfg._id || mfg.name}
                    onClick={() => setSelectedManufacturer(mfg.name)}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      padding: '7px 16px', borderRadius: '24px',
                      border: '1.5px solid',
                      borderColor: active ? 'var(--red)' : 'var(--gray-300)',
                      background: active ? 'var(--red)' : 'transparent',
                      color: active ? '#fff' : 'var(--gray-700)',
                      fontWeight: 700, fontSize: '0.8125rem',
                      cursor: 'pointer', transition: 'all 0.2s ease',
                    }}
                  >
                    {mfg.logo && (
                      <img
                        src={urlFor(mfg.logo).width(32).height(32).url()}
                        alt={mfg.name}
                        style={{
                          width: '16px', height: '16px', objectFit: 'contain',
                          filter: active ? 'brightness(0) invert(1)' : 'none',
                        }}
                      />
                    )}
                    <span>{mfg.name}</span>
                    <span style={{ opacity: 0.75, fontSize: '0.75rem' }}>({count})</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Results count */}
          <div style={{
            fontSize: '0.875rem', color: 'var(--gray-500)', fontWeight: 600,
            marginBottom: '20px',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <CheckCircle2 size={15} color="var(--red)" />
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            {selectedManufacturer !== 'all' && ` · ${selectedManufacturer}`}
          </div>

          {/* Product Cards */}
          {filteredProducts.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '60px 20px',
              color: 'var(--gray-400)', fontSize: '1rem',
            }}>
              No products available for this selection.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id || product._id} product={product} />
              ))}
            </div>
          )}

          {/* Back link */}
          <div style={{ marginTop: '52px', textAlign: 'center' }}>
            <Link to="/products" className="btn btn-outline">
              <ArrowLeft size={16} /> All Categories
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="home-contact-cta" id="category-cta">
        <div className="container">
          <div className="home-contact-center">
            <span className="home-contact-label">Pricing & Procurement</span>
            <h2 className="home-contact-heading">
              Interested in Our {category.name}?
            </h2>
            <p className="home-contact-text">
              Request detailed pricing, compliance documentation, and lead-time
              estimates from our engineering team.
            </p>
            <div className="home-contact-actions">
              <Link to="/contact-us" className="home-contact-btn-primary">
                Request a Quote <ArrowRight size={16} />
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

      {/* Responsive styles for card layout */}
      <style>{`
        @media (max-width: 768px) {
          #category-products article[id^="product-"] {
            grid-template-columns: 1fr !important;
          }
          #category-products article[id^="product-"] > div:first-child {
            min-height: 220px !important;
            border-right: none !important;
            border-bottom: 1px solid var(--gray-200);
          }
        }
      `}</style>
    </>
  );
}
