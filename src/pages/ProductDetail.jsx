import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronRight,
  Download,
  ShieldCheck,
  Building2,
  Clock,
  Layers,
  FileBarChart2,
  Tag,
  CheckCircle2,
  FileText,
  Mail,
  ZoomIn,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { client } from '../sanity/client';
import { urlFor } from '../sanity/image';
import { PRODUCT_BY_SLUG_QUERY } from '../sanity/queries';
import { parseProductDetails } from '../utils/productUtils';
import { useSEO } from '../utils/useSEO';

function partnerColor(level = '') {
  const l = level.toLowerCase();
  if (l.includes('authorized')) return { bg: 'rgba(37,99,235,0.08)', color: '#1d4ed8', border: 'rgba(37,99,235,0.25)' };
  if (l.includes('direct')) return { bg: 'rgba(22,163,74,0.08)', color: '#15803d', border: 'rgba(22,163,74,0.25)' };
  if (l.includes('certified')) return { bg: 'rgba(234,88,12,0.08)', color: '#c2410c', border: 'rgba(234,88,12,0.25)' };
  return { bg: 'rgba(10,25,47,0.06)', color: 'var(--navy)', border: 'rgba(10,25,47,0.14)' };
}

export default function ProductDetail() {
  const { productSlug, slug } = useParams();
  const resolvedSlug = productSlug || slug; // support both routes

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  const prodTitle = product?.name || resolvedSlug?.replace(/-/g, ' ').toUpperCase() || 'Product Detail';
  const prodDesc = product?.tagline || `Technical specifications, compliance certificates, and datasheets for ${prodTitle}.`;
  useSEO({
    title: `${prodTitle} | Specifications & Datasheet`,
    description: prodDesc,
    canonical: `/products/${product?.categorySlug || 'equipment'}/${resolvedSlug}`,
    ogType: 'product',
  });

  // Zoom state
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomOrigin({ x, y });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImageIndex(0);
  }, [resolvedSlug]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    async function fetchProduct() {
      try {
        const data = await client.fetch(
          `*[_type == "product" && (
            lower(slug.current) == lower($slug) ||
            slug.current == $slug ||
            _id == $slug ||
            lower(model) == lower($slug)
          )][0]{
            _id,
            name,
            "slug": coalesce(slug.current, _id),
            model,
            category->{
              _id,
              title,
              "slug": slug.current
            },
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
          { slug: resolvedSlug }
        );

        if (data && isMounted) {
          setProduct(data);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Failed to fetch product from Sanity, falling back to static:', err);
      }

      if (isMounted) {
        setProduct(null);
        setLoading(false);
      }
    }

    fetchProduct();
    return () => {
      isMounted = false;
    };
  }, [resolvedSlug]);

  // Gallery set
  const allImages = useMemo(() => {
    if (!product) return [];
    const list = [];
    if (product.image && urlFor(product.image).url()) list.push(product.image);
    if (Array.isArray(product.gallery)) {
      product.gallery.forEach((g) => {
        if (g && urlFor(g).url()) list.push(g);
      });
    }
    return list;
  }, [product]);

  const currentImage = allImages[activeImageIndex] || allImages[0] || (product?.image || null);
  const currentImageUrl = currentImage && !imgError
    ? urlFor(currentImage).width(1200).height(900).fit('max').auto('format').url()
    : null;

  // Specs entry formatting
  const specEntries = useMemo(() => {
    if (!product) return [];
    if (Array.isArray(product.specs)) return product.specs.map((s) => [s.key, s.value]);
    if (product.specs && typeof product.specs === 'object') return Object.entries(product.specs);
    return [];
  }, [product]);

  const { intro, bullets, details: allSpecs } = useMemo(() => {
    if (!product) return { intro: '', bullets: [], details: [] };
    return parseProductDetails(product.tagline, specEntries);
  }, [product, specEntries]);

  if (loading) {
    return (
      <div style={{ minHeight: '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px solid var(--gray-200)', borderTopColor: 'var(--red)', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ color: 'var(--gray-500)', fontWeight: 600 }}>Loading equipment specifications…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>Equipment Not Found</h2>
        <p style={{ color: 'var(--gray-600)', marginBottom: '24px' }}>
          The product you are looking for does not exist or may have been updated in the portal.
        </p>
        <Link to="/products" className="btn btn-navy">
          <ArrowLeft size={16} /> Return to Products
        </Link>
      </div>
    );
  }

  const categoryTitle = product.category?.title || product.categoryName || 'Equipment';
  const categorySlug = product.category?.slug || product.categorySlug || 'aviation-electronics';
  const mfg = product.manufacturer;
  const pc = mfg?.partnershipLevel ? partnerColor(mfg.partnershipLevel) : null;
  const complianceList = Array.isArray(product.compliance) ? product.compliance : [];

  return (
    <>
      {/* ─── Breadcrumb Banner ─── */}
      <div className="page-banner" style={{ padding: '40px 0 32px' }}>
        <div className="container">
          <div className="breadcrumb" style={{ marginBottom: '12px' }}>
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/products">Products</Link>
            <span>/</span>
            <Link to={`/products/${categorySlug}`}>{categoryTitle}</Link>
            <span>/</span>
            <span style={{ color: 'var(--red)' }}>{product.name}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', margin: 0 }}>
            {product.name}
          </h1>
        </div>
      </div>

      {/* ─── Main Product Detail Section ─── */}
      <section className="section" style={{ paddingTop: '40px', background: '#fff' }}>
        <div className="container">
          {/* Back link */}
          <div style={{ marginBottom: '24px' }}>
            <Link
              to={`/products/${categorySlug}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: 'var(--navy)',
                textDecoration: 'none',
              }}
            >
              <ArrowLeft size={16} color="var(--red)" />
              <span>Back to {categoryTitle}</span>
            </Link>
          </div>

          {/* Two-Column Product Overview: Gallery (Left) & Info (Right) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(340px, 480px) 1fr',
              gap: '48px',
              alignItems: 'start',
              marginBottom: '60px',
            }}
          >
            {/* ── Left Column: Interactive Image Gallery with Hover Zoom ── */}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid var(--gray-200)',
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                boxShadow: '0 2px 12px rgba(10,25,47,0.04)',
              }}
            >
              {/* Photo counter */}
              {allImages.length > 1 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'rgba(10,25,47,0.85)',
                    color: '#fff',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '12px',
                    zIndex: 2,
                  }}
                >
                  {activeImageIndex + 1} / {allImages.length}
                </div>
              )}

              {/* Zoomable Image Container */}
              <div
                onMouseEnter={() => setIsZoomed(true)}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => {
                  setIsZoomed(false);
                  setZoomOrigin({ x: 50, y: 50 });
                }}
                style={{
                  width: '100%',
                  minHeight: '380px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '10px',
                  cursor: currentImageUrl ? 'zoom-in' : 'default',
                  background: '#ffffff',
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
                        maxHeight: '440px',
                        width: 'auto',
                        height: 'auto',
                        objectFit: 'contain',
                        transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                        transform: isZoomed ? 'scale(2.2)' : 'scale(1)',
                        transition: isZoomed ? 'transform 0.05s linear' : 'transform 0.25s ease',
                        userSelect: 'none',
                        pointerEvents: 'none',
                        filter: 'none',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '12px',
                        background: 'rgba(10,25,47,0.72)',
                        color: '#fff',
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        padding: '4px 9px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        opacity: isZoomed ? 0 : 0.85,
                        transition: 'opacity 0.2s ease',
                        pointerEvents: 'none',
                      }}
                    >
                      <ZoomIn size={12} />
                      <span>Hover to zoom</span>
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', color: 'var(--gray-400)' }}>
                    <Layers size={48} />
                    <p style={{ marginTop: '8px', fontSize: '0.8125rem' }}>No image available</p>
                  </div>
                )}
              </div>

              {/* Thumbnails row */}
              {allImages.length > 1 && (
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '16px',
                    overflowX: 'auto',
                    padding: '4px 0',
                  }}
                >
                  {allImages.map((img, idx) => {
                    const thumbUrl = urlFor(img).width(120).height(90).fit('crop').url();
                    const isActive = idx === activeImageIndex;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          border: isActive ? '2px solid #0284c7' : '1px solid var(--gray-200)',
                          padding: '3px',
                          background: '#fff',
                          cursor: 'pointer',
                          opacity: isActive ? 1 : 0.65,
                          transform: isActive ? 'scale(1.04)' : 'none',
                          boxShadow: isActive ? '0 2px 8px rgba(2,132,199,0.25)' : 'none',
                          transition: 'all 0.15s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <img src={thumbUrl} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ── Right Column: Specs, Badges & Procurement CTAs ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Manufacturer Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                {mfg && (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '5px 14px',
                      borderRadius: '20px',
                      background: pc ? pc.bg : 'rgba(10,25,47,0.05)',
                      border: `1px solid ${pc ? pc.border : 'rgba(10,25,47,0.12)'}`,
                    }}
                  >
                    {mfg.logo && urlFor(mfg.logo).url() ? (
                      <img
                        src={urlFor(mfg.logo).width(32).height(32).url()}
                        alt={mfg.name}
                        style={{ width: '16px', height: '16px', objectFit: 'contain' }}
                      />
                    ) : (
                      <ShieldCheck size={14} color={pc ? pc.color : 'var(--navy)'} />
                    )}
                    <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: pc ? pc.color : 'var(--navy)' }}>
                      {mfg.name}
                    </span>
                    {mfg.partnershipLevel && (
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: pc ? pc.color : 'var(--red)', opacity: 0.85 }}>
                        · {mfg.partnershipLevel}
                      </span>
                    )}
                  </div>
                )}

                {product.classification && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--red)',
                      textTransform: 'uppercase',
                      padding: '5px 12px',
                      borderRadius: '20px',
                      background: 'rgba(217,35,44,0.07)',
                      border: '1px solid rgba(217,35,44,0.2)',
                    }}
                  >
                    <Tag size={12} />
                    {product.classification}
                  </span>
                )}
              </div>

              {/* Title & Model */}
              <div>
                <h2
                  style={{
                    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                    color: 'var(--navy)',
                    fontWeight: 900,
                    margin: '0 0 10px',
                    lineHeight: 1.25,
                  }}
                >
                  {product.name}
                </h2>

                {product.model && (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.875rem',
                      color: 'var(--gray-600)',
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      background: 'var(--gray-100)',
                      border: '1px solid var(--gray-300)',
                      padding: '4px 12px',
                      borderRadius: '6px',
                    }}
                  >
                    <FileBarChart2 size={14} color="var(--navy)" />
                    <span>Model: {product.model}</span>
                  </div>
                )}
              </div>

              {/* Description Intro */}
              {intro && (
                <p style={{ color: 'var(--gray-600)', lineHeight: 1.7, fontSize: '0.9375rem', margin: 0 }}>
                  {intro}
                </p>
              )}

              {/* Bullets */}
              {bullets.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {bullets.map((b, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--gray-700)' }}>
                      <CheckCircle2 size={16} color="var(--red)" style={{ flexShrink: 0 }} />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Compliance & Standards */}
              {complianceList.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                    Certified Standards
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {complianceList.map((c) => (
                      <span
                        key={c}
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: '#0f766e',
                          background: 'rgba(15,118,110,0.08)',
                          border: '1px solid rgba(15,118,110,0.22)',
                          padding: '3px 10px',
                          borderRadius: '12px',
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Lead Time */}
              {product.leadTime && (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.8125rem',
                    color: 'var(--gray-700)',
                    background: 'var(--gray-50)',
                    border: '1px solid var(--gray-200)',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    alignSelf: 'flex-start',
                  }}
                >
                  <Clock size={14} color="var(--gold-dark)" />
                  <span>Lead Time: <strong style={{ color: 'var(--navy)' }}>{product.leadTime}</strong></span>
                </div>
              )}

              {/* Action Button: Contact Us */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', paddingTop: '10px' }}>
                <Link
                  to="/contact-us"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 28px',
                    borderRadius: '8px',
                    background: 'var(--gold-gradient)',
                    color: 'var(--navy-deep)',
                    fontWeight: 800,
                    fontSize: '0.9375rem',
                    textDecoration: 'none',
                    boxShadow: '0 4px 16px rgba(212, 175, 55, 0.35)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(212, 175, 55, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(212, 175, 55, 0.35)';
                  }}
                >
                  <Mail size={16} />
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>
          </div>

          {/* ─── Detailed Technical Specifications Table (QYT Radio style) ─── */}
          {allSpecs.length > 0 && (
            <div style={{ marginBottom: '60px' }}>
              <div
                style={{
                  borderBottom: '2px solid var(--navy)',
                  paddingBottom: '12px',
                  marginBottom: '20px',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: 'var(--navy)',
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <FileText size={20} color="var(--red)" />
                  <span>Technical Specifications & Parameters</span>
                </h3>
              </div>

              <div
                style={{
                  background: 'var(--white)',
                  borderRadius: '12px',
                  border: '1px solid var(--gray-200)',
                  overflow: 'hidden',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                }}
              >
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <tbody>
                    {allSpecs.map(([param, value], idx) => (
                      <tr
                        key={idx}
                        style={{
                          background: idx % 2 === 0 ? 'var(--gray-50)' : '#ffffff',
                          borderBottom: '1px solid var(--gray-200)',
                        }}
                      >
                        <td
                          style={{
                            padding: '14px 20px',
                            fontWeight: 700,
                            color: 'var(--gray-700)',
                            fontSize: '0.875rem',
                            width: '35%',
                            borderRight: '1px solid var(--gray-200)',
                          }}
                        >
                          {param}
                        </td>
                        <td
                          style={{
                            padding: '14px 20px',
                            fontWeight: 600,
                            color: 'var(--navy)',
                            fontSize: '0.875rem',
                          }}
                        >
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ─── Tender & Procurement Notes ─── */}
          {product.tenderNotes && (
            <div
              style={{
                marginBottom: '60px',
                padding: '24px',
                borderRadius: '12px',
                background: 'rgba(217,35,44,0.04)',
                borderLeft: '4px solid var(--red)',
                border: '1px solid rgba(217,35,44,0.15)',
              }}
            >
              <h4
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 800,
                  color: 'var(--red)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  margin: '0 0 8px',
                }}
              >
                Institutional Tender & Bidding Notes
              </h4>
              <p style={{ color: 'var(--gray-700)', lineHeight: 1.7, fontSize: '0.9rem', margin: 0 }}>
                {product.tenderNotes}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
