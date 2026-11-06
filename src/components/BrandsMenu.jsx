import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, ShieldCheck, Building2, Radio } from 'lucide-react';
import { client } from '../sanity/client';
import { urlFor } from '../sanity/image';

// Mock brands removed — only live Sanity manufacturers are loaded
const DEFAULT_BRANDS = [];

export default function BrandsMenu({ isMobile = false, onItemClick, theme = 'dark' }) {
  const isLight = theme === 'light';
  const [isOpen, setIsOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [activeBrandName, setActiveBrandName] = useState('');
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);

  // Fetch manufacturers and their products from Sanity
  useEffect(() => {
    let isMounted = true;

    async function loadSanityBrands() {
      try {
        const sanityManufacturers = await client.fetch(
          `*[_type == "manufacturer"] | order(name asc){
            _id,
            name,
            "slug": slug.current,
            partnershipLevel,
            logo,
            description,
            "products": *[_type == "product" && references(^._id)]{
              _id,
              "id": coalesce(slug.current, _id),
              name,
              model,
              image,
              "categorySlug": coalesce(category->slug.current, "radios")
            }
          }`
        );

        if (sanityManufacturers && sanityManufacturers.length > 0 && isMounted) {
          setBrands(sanityManufacturers);
          setActiveBrandName(sanityManufacturers[0]?.name || '');
        } else if (isMounted) {
          setBrands([]);
          setActiveBrandName('');
        }
      } catch (err) {
        console.warn('Could not fetch manufacturers from Sanity:', err);
      }
    }

    loadSanityBrands();

    return () => {
      isMounted = false;
    };
  }, []);

  // Desktop hover interactions
  const handleMouseEnter = () => {
    if (isMobile) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  // Close when clicked outside
  useEffect(() => {
    if (isMobile) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile]);

  if (brands.length === 0) {
    return null;
  }

  const activeBrand = brands.find((b) => b.name === activeBrandName) || brands[0];

  if (isMobile) {
    return (
      <div style={{ borderBottom: '1px solid var(--gray-200)', padding: '8px 0' }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '10px 16px',
            background: 'none',
            border: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--navy)',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building2 size={18} color="var(--red)" /> Brands & Dealerships
          </span>
          <ChevronDown
            size={18}
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s ease',
            }}
          />
        </button>

        {isOpen && (
          <div style={{ paddingLeft: '16px', paddingRight: '16px', marginTop: '8px' }}>
            {brands.map((b) => (
              <div key={b._id || b.name} style={{ marginBottom: '16px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: 700,
                    color: 'var(--navy)',
                    fontSize: '0.9375rem',
                    marginBottom: '6px',
                  }}
                >
                  <span>{b.name}</span>
                  {b.partnershipLevel && (
                    <span
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--gold-dark)',
                        background: 'rgba(212, 175, 55, 0.12)',
                        padding: '2px 6px',
                        borderRadius: '4px',
                      }}
                    >
                      {b.partnershipLevel}
                    </span>
                  )}
                </div>

                {b.products && b.products.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '12px' }}>
                    {b.products.map((p) => (
                      <Link
                        key={p.id || p._id}
                        to={`/products/${p.categorySlug || 'radios'}`}
                        onClick={onItemClick}
                        style={{
                          fontSize: '0.875rem',
                          color: 'var(--gray-600)',
                          textDecoration: 'none',
                          padding: '4px 0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span>{p.name}</span>
                        {p.model && (
                          <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)', fontFamily: 'monospace' }}>
                            {p.model}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    to="/products"
                    onClick={onItemClick}
                    style={{ fontSize: '0.8125rem', color: 'var(--gray-500)', paddingLeft: '12px', display: 'block' }}
                  >
                    View Products
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="nav-pill-link"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 16px',
          fontSize: '0.9375rem',
          fontWeight: 700,
          color: isLight ? 'var(--navy-deep, #07152B)' : '#ffffff',
          textShadow: isLight ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.7), 0 1px 3px rgba(0, 0, 0, 0.9)',
          background: isOpen ? (isLight ? 'rgba(7, 21, 43, 0.08)' : 'rgba(255, 255, 255, 0.18)') : 'transparent',
          border: 'none',
          borderRadius: '9999px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        aria-expanded={isOpen}
      >
        <span>Brands</span>
        <ChevronDown
          size={13}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s ease',
            opacity: 0.8,
          }}
        />
      </button>

      {/* Mega Dropdown Panel */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            right: '-100px',
            width: '620px',
            background: 'var(--white)',
            borderRadius: '12px',
            boxShadow: '0 12px 36px rgba(10, 25, 47, 0.16)',
            border: '1px solid var(--gray-200)',
            zIndex: 1100,
            display: 'grid',
            gridTemplateColumns: '230px 1fr',
            overflow: 'hidden',
            animation: 'fadeIn 0.18s ease-out',
          }}
        >
          {/* Left: Manufacturers List */}
          <div
            style={{
              background: 'var(--gray-50)',
              borderRight: '1px solid var(--gray-200)',
              padding: '16px 12px',
            }}
          >
            <div
              style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                color: 'var(--gray-400)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '4px 8px 8px',
              }}
            >
              Dealerships & Partners
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {brands.map((b) => {
                const isActive = b.name === activeBrandName;
                return (
                  <button
                    key={b._id || b.name}
                    onMouseEnter={() => setActiveBrandName(b.name)}
                    onClick={() => setActiveBrandName(b.name)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: 'none',
                      background: isActive ? 'var(--white)' : 'transparent',
                      boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
                      {b.logo ? (
                        <img
                          src={urlFor(b.logo).width(36).height(36).url()}
                          alt={b.name}
                          style={{ width: '18px', height: '18px', objectFit: 'contain' }}
                        />
                      ) : (
                        <ShieldCheck size={16} color={isActive ? 'var(--red)' : 'var(--gray-500)'} />
                      )}
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          color: isActive ? 'var(--navy)' : 'var(--gray-700)',
                        }}
                      >
                        {b.name}
                      </span>
                    </div>

                    {b.partnershipLevel && (
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          color: isActive ? 'var(--red)' : 'var(--gray-500)',
                          fontWeight: 600,
                          marginTop: '2px',
                          paddingLeft: '26px',
                        }}
                      >
                        {b.partnershipLevel}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Selected Manufacturer Items */}
          <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column' }}>
            {activeBrand ? (
              <>
                <div style={{ marginBottom: '16px', borderBottom: '1px solid var(--gray-100)', paddingBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h4
                      style={{
                        margin: 0,
                        fontSize: '1.0625rem',
                        fontWeight: 800,
                        color: 'var(--navy)',
                        fontFamily: 'var(--font-heading)',
                      }}
                    >
                      {activeBrand.name} Equipment
                    </h4>
                    {activeBrand.partnershipLevel && (
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          color: 'var(--gold-dark)',
                          background: 'rgba(212, 175, 55, 0.12)',
                          padding: '3px 8px',
                          borderRadius: '12px',
                        }}
                      >
                        {activeBrand.partnershipLevel}
                      </span>
                    )}
                  </div>
                  {activeBrand.description && (
                    <p style={{ margin: '6px 0 0', fontSize: '0.8125rem', color: 'var(--gray-600)', lineHeight: 1.5 }}>
                      {activeBrand.description}
                    </p>
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      color: 'var(--gray-400)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '8px',
                    }}
                  >
                    Featured Products ({activeBrand.products?.length || 0})
                  </div>

                  {activeBrand.products && activeBrand.products.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {activeBrand.products.map((p) => (
                        <Link
                          key={p.id || p._id}
                          to={`/products/${p.categorySlug || 'radios'}`}
                          onClick={() => setIsOpen(false)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 12px',
                            borderRadius: '8px',
                            background: 'var(--gray-50)',
                            textDecoration: 'none',
                            transition: 'all 0.15s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(212, 175, 55, 0.08)';
                            e.currentTarget.style.transform = 'translateX(3px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'var(--gray-50)';
                            e.currentTarget.style.transform = 'none';
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {p.image ? (
                              <img
                                src={urlFor(p.image).width(48).height(48).fit('crop').url()}
                                alt={p.name}
                                style={{
                                  width: '32px',
                                  height: '32px',
                                  borderRadius: '6px',
                                  objectFit: 'cover',
                                  background: '#fff',
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: '32px',
                                  height: '32px',
                                  borderRadius: '6px',
                                  background: 'rgba(10, 25, 47, 0.08)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: 'var(--navy)',
                                }}
                              >
                                <Radio size={16} />
                              </div>
                            )}

                            <div>
                              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--navy)' }}>
                                {p.name}
                              </div>
                              {p.model && (
                                <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', fontFamily: 'monospace' }}>
                                  Model: {p.model}
                                </div>
                              )}
                            </div>
                          </div>

                          <ArrowRight size={14} color="var(--red)" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div style={{ padding: '16px 0', color: 'var(--gray-500)', fontSize: '0.8125rem' }}>
                      No individual products tagged yet. Add products with this manufacturer in Sanity Studio!
                    </div>
                  )}
                </div>

                <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--gray-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Link
                    to={`/products?brand=${encodeURIComponent(activeBrand.name.toLowerCase())}`}
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      color: 'var(--red)',
                      textDecoration: 'none',
                    }}
                  >
                    View All {activeBrand.name} Gear <ArrowRight size={14} />
                  </Link>
                  <Link
                    to="/products"
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--gray-500)',
                      textDecoration: 'none',
                    }}
                  >
                    All Categories →
                  </Link>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
