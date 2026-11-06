import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  ArrowRight,
  ChevronRight,
  Radio,
  Plane,
  Server,
  Zap,
  Shield,
  Camera,
  RadioTower,
  Network,
  Cpu,
  Settings,
  Layers,
} from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../data/siteData';
import { PRODUCTS } from '../data/products';
import { client } from '../sanity/client';

// ─── Supported Icon Dictionary ──────────────────────────────────────────────
const ICON_COMPONENT_MAP = {
  Radio,
  Plane,
  Server,
  Zap,
  Shield,
  Camera,
  RadioTower,
  Network,
  Cpu,
  Settings,
  Layers,
};

// Fallback resolver if no icon explicitly selected in Sanity
const getIcon = (iconName, slug = '', name = '') => {
  // If explicitly set to none, return null (no icon)
  if (iconName === 'none' || iconName === 'no') return null;

  // Direct match from Sanity option
  if (iconName && ICON_COMPONENT_MAP[iconName]) {
    return ICON_COMPONENT_MAP[iconName];
  }

  // Domain keyword fallback
  const str = `${slug} ${name}`.toLowerCase();
  if (/radio|walkie|lmr|land/i.test(str)) return Radio;
  if (/aviation|air|flight/i.test(str)) return Plane;
  if (/defense|server|computing|it|rugged/i.test(str)) return Server;
  if (/power|ups|battery|energy/i.test(str)) return Zap;
  if (/cctv|camera|surveil/i.test(str)) return Camera;
  if (/tower|atc|radar/i.test(str)) return RadioTower;
  if (/network|switch|comm/i.test(str)) return Network;

  return null;
};

// Static category id to slug mapping
const CAT_SLUG_MAP = {
  aviation: 'aviation-electronics',
  radios: 'two-way-radios',
  it_hardware: 'enterprise-it',
  power: 'power-ups',
  systems_integration: 'systems-integration',
};

export default function ProductsMenu({ theme = 'dark' }) {
  const isLight = theme === 'light';
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState(PRODUCT_CATEGORIES);
  // products indexed by category slug → array of {name, slug, id}
  const [productsByCategory, setProductsByCategory] = useState({});
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);
  const location = useLocation();

  // Close mega menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // ── Fetch categories + products from Sanity ──
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const [sanityCats, sanityProds] = await Promise.all([
          client.fetch(
            `*[_type == "category"] | order(title asc){
              _id,
              "name": title,
              "slug": slug.current,
              icon,
              subcategories
            }`
          ),
          client.fetch(
            `*[_type == "product"] | order(featured desc, name asc){
              _id,
              name,
              "slug": coalesce(slug.current, _id),
              "categorySlug": category->slug.current,
              category
            }`
          ),
        ]);

        if (!isMounted) return;

        // Use Sanity categories if present, otherwise default categories
        if (sanityCats && sanityCats.length > 0) {
          setCategories(sanityCats);
        }

        // Index products by category slug using live Sanity products only
        const byCategory = {};
        const addProduct = (catKey, p) => {
          if (!catKey) return;
          if (!byCategory[catKey]) byCategory[catKey] = [];
          if (!byCategory[catKey].some((item) => (item._id || item.id) === (p._id || p.id))) {
            byCategory[catKey].push(p);
          }
        };

        const allProds = sanityProds && sanityProds.length > 0 ? sanityProds : [];
        allProds.forEach((p) => {
          const catSlug = p.categorySlug || p.category?.slug;
          if (catSlug) {
            addProduct(catSlug, p);
            const matchedKey = Object.keys(CAT_SLUG_MAP).find((k) => CAT_SLUG_MAP[k] === catSlug);
            if (matchedKey) addProduct(matchedKey, p);
          }
          if (p.category && typeof p.category === 'string') {
            addProduct(p.category, p);
            if (CAT_SLUG_MAP[p.category]) addProduct(CAT_SLUG_MAP[p.category], p);
          }
        });

        setProductsByCategory(byCategory);
      } catch (err) {
        console.warn('ProductsMenu: Sanity fetch error, using static fallback:', err);
        const byCategory = {};
        PRODUCTS.forEach((p) => {
          const catKey = p.category;
          if (!byCategory[catKey]) byCategory[catKey] = [];
          byCategory[catKey].push(p);
          if (CAT_SLUG_MAP[catKey]) {
            if (!byCategory[CAT_SLUG_MAP[catKey]]) byCategory[CAT_SLUG_MAP[catKey]] = [];
            byCategory[CAT_SLUG_MAP[catKey]].push(p);
          }
        });
        setProductsByCategory(byCategory);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // ── Hover handlers ──
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 220);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Build display columns (up to 4 categories)
  const displayColumns = categories.slice(0, 4).map((cat) => {
    const slug = cat.slug;
    const name = cat.name || cat.title || '';
    const catProducts = (productsByCategory[slug] || productsByCategory[cat.id] || []).slice(0, 7);

    return {
      title: name,
      slug,
      icon: getIcon(cat.icon, slug, name),
      products: catProducts,
      subcategories: Array.isArray(cat.subcategories) ? cat.subcategories : [],
    };
  });

  const isActive = location.pathname.startsWith('/products');

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {/* Main Header Link */}
      <Link
        to="/products"
        onClick={() => setIsOpen(false)}
        className={`nav-pill-link ${isActive ? 'active' : ''}`}
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
          textDecoration: 'none',
          transition: 'all 0.2s ease',
          borderRadius: '9999px',
        }}
      >
        <span>Products</span>
        <ChevronDown
          size={13}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s ease',
            opacity: 0.8,
          }}
        />
      </Link>

      {/* ─── Mega Dropdown (No photos, clean category names + product links) ─── */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            right: '-160px',
            width: '960px',
            maxWidth: 'calc(100vw - 32px)',
            background: '#ffffff',
            borderRadius: '14px',
            boxShadow: '0 24px 64px rgba(10,25,47,0.16), 0 4px 16px rgba(10,25,47,0.06)',
            border: '1px solid var(--gray-200)',
            zIndex: 1200,
            overflow: 'hidden',
            animation: 'fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* ── Category Columns Grid ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${Math.min(displayColumns.length, 4)}, 1fr)`,
              background: '#ffffff',
            }}
          >
            {displayColumns.map((col, idx) => {
              const Icon = col.icon;
              const isLastCol = idx === displayColumns.length - 1;
              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '24px 20px 22px',
                    borderRight: !isLastCol ? '1px solid var(--gray-100)' : 'none',
                    background: '#ffffff',
                  }}
                >
                  {/* ── Category Header (Clean title, optional icon if chosen) ── */}
                  <Link
                    to={`/products/${col.slug}`}
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: Icon ? '9px' : '0px',
                      textDecoration: 'none',
                      paddingBottom: '12px',
                      borderBottom: '2px solid var(--gray-100)',
                      marginBottom: '14px',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderBottomColor = 'var(--red)';
                      const titleEl = e.currentTarget.querySelector('.cat-title');
                      if (titleEl) titleEl.style.color = 'var(--red)';
                      const iconWrap = e.currentTarget.querySelector('.cat-icon-wrap');
                      if (iconWrap) {
                        iconWrap.style.background = 'var(--red)';
                        iconWrap.style.color = '#fff';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderBottomColor = 'var(--gray-100)';
                      const titleEl = e.currentTarget.querySelector('.cat-title');
                      if (titleEl) titleEl.style.color = 'var(--navy)';
                      const iconWrap = e.currentTarget.querySelector('.cat-icon-wrap');
                      if (iconWrap) {
                        iconWrap.style.background = 'rgba(10,25,47,0.06)';
                        iconWrap.style.color = 'var(--navy)';
                      }
                    }}
                  >
                    {Icon && (
                      <div
                        className="cat-icon-wrap"
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '6px',
                          background: 'rgba(10,25,47,0.06)',
                          color: 'var(--navy)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <Icon size={15} />
                      </div>
                    )}
                    <span
                      className="cat-title"
                      style={{
                        fontSize: '0.8125rem',
                        fontWeight: 800,
                        color: 'var(--navy)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        lineHeight: 1.3,
                        fontFamily: 'var(--font-heading)',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {col.title}
                    </span>
                  </Link>

                  {/* ── Category Items / Products List (No photos, just names) ── */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1 }}>
                    {col.products.length > 0 ? (
                      col.products.map((prod, pIdx) => {
                        const productSlug = prod.slug || prod.id || prod._id;
                        return (
                          <Link
                            key={pIdx}
                            to={`/products/${col.slug}/${productSlug}`}
                            onClick={() => setIsOpen(false)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '8px',
                              padding: '7px 8px',
                              borderRadius: '6px',
                              textDecoration: 'none',
                              fontSize: '0.8125rem',
                              color: 'var(--gray-700)',
                              fontWeight: 500,
                              lineHeight: 1.35,
                              transition: 'all 0.15s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(10,25,47,0.04)';
                              e.currentTarget.style.color = 'var(--red)';
                              e.currentTarget.style.paddingLeft = '12px';
                              const arrow = e.currentTarget.querySelector('.item-arrow');
                              if (arrow) arrow.style.opacity = '1';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.color = 'var(--gray-700)';
                              e.currentTarget.style.paddingLeft = '8px';
                              const arrow = e.currentTarget.querySelector('.item-arrow');
                              if (arrow) arrow.style.opacity = '0';
                            }}
                          >
                            <span
                              style={{
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                              }}
                            >
                              {prod.name}
                            </span>
                            <ChevronRight
                              className="item-arrow"
                              size={12}
                              style={{
                                flexShrink: 0,
                                opacity: 0,
                                color: 'var(--red)',
                                transition: 'opacity 0.15s ease',
                              }}
                            />
                          </Link>
                        );
                      })
                    ) : (
                      /* If no individual products loaded, show subcategories */
                      (col.subcategories.length > 0 ? col.subcategories : [`Explore ${col.title}`]).map(
                        (sub, sIdx) => (
                          <Link
                            key={sIdx}
                            to={`/products/${col.slug}`}
                            onClick={() => setIsOpen(false)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '7px 8px',
                              fontSize: '0.8125rem',
                              color: 'var(--gray-600)',
                              textDecoration: 'none',
                              fontWeight: 500,
                              borderRadius: '6px',
                              transition: 'all 0.15s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = 'var(--red)';
                              e.currentTarget.style.paddingLeft = '12px';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = 'var(--gray-600)';
                              e.currentTarget.style.paddingLeft = '8px';
                            }}
                          >
                            <span style={{ color: 'var(--gray-400)', fontSize: '0.75rem' }}>›</span>
                            <span>{sub}</span>
                          </Link>
                        )
                      )
                    )}
                  </div>

                  {/* ── View All in Category ── */}
                  <Link
                    to={`/products/${col.slug}`}
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      marginTop: '14px',
                      paddingTop: '10px',
                      borderTop: '1px solid var(--gray-100)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--red)',
                      textDecoration: 'none',
                      transition: 'opacity 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.75';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                  >
                    <span>View all {col.title.split(' ')[0]}</span>
                    <ArrowRight size={11} />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* ── Footer Bar ── */}
          <div
            style={{
              background: 'var(--gray-50)',
              borderTop: '1px solid var(--gray-200)',
              padding: '12px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8125rem',
                color: 'var(--gray-600)',
              }}
            >
              <Layers size={14} color="var(--navy)" />
              <span>Full equipment catalog, technical datasheets & specifications</span>
            </div>
            <Link
              to="/products"
              onClick={() => setIsOpen(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 16px',
                borderRadius: '6px',
                background: 'var(--navy)',
                color: '#fff',
                fontSize: '0.8125rem',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              <span>View All Products</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
