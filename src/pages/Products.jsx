import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  Radio,
  Server,
  Zap,
  Settings,
  Plane,
  Building2,
  Layers,
  Search,
  Filter,
  X,
  ChevronRight,
  FileBarChart2,
  Tag,
  ShieldCheck,
} from 'lucide-react';
import { PRODUCT_CATEGORIES, PARTNERS, BRAND_NAMES } from '../data/siteData';
import { PRODUCTS } from '../data/products';
import { client } from '../sanity/client';
import { urlFor } from '../sanity/image';
import { parseProductDetails } from '../utils/productUtils';
import ProductCard from '../components/ProductCard';
import { useSEO } from '../utils/useSEO';

const iconMap = { Radio, Server, Zap, Settings, Plane };

export default function Products() {
  useSEO({
    title: 'Equipment Catalogue | Aviation, Communications & Power Hardware',
    description: 'Browse certified institutional communication systems, aviation radios, repeaters, power protection units, and technical infrastructure hardware.',
    canonical: '/products',
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const urlBrand = searchParams.get('brand') || '';
  const urlCategory = searchParams.get('category') || '';

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Active view tab: 'all' | 'brands'
  const [activeTab, setActiveTab] = useState(() => {
    return 'all';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(urlBrand);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);

  // Sync with URL params if they change
  useEffect(() => {
    if (urlBrand) {
      setSelectedBrand(urlBrand);
      setActiveTab('all');
    }
  }, [urlBrand]);

  // Load data from Sanity
  useEffect(() => {
    let isMounted = true;

    async function loadSanityData() {
      setLoading(true);
      try {
        const [sanityCats, sanityProds, sanityMfg] = await Promise.all([
          client.fetch(
            `*[_type == "category"] | order(title asc){
              _id,
              "id": slug.current,
              "name": title,
              "short": description,
              "slug": slug.current
            }`
          ),
          client.fetch(
            `*[_type == "product"] | order(featured desc, name asc){
              _id,
              "id": coalesce(slug.current, _id),
              name,
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
                logo
              },
              tagline,
              classification,
              featured,
              image,
              gallery,
              compliance,
              specs
            }`
          ),
          client.fetch(
            `*[_type == "manufacturer"] | order(name asc){
              _id,
              name,
              "slug": slug.current,
              partnershipLevel,
              logo,
              description
            }`
          ),
        ]);

        if (isMounted) {
          setCategories(sanityCats && sanityCats.length > 0 ? sanityCats : []);
          setProducts(sanityProds && sanityProds.length > 0 ? sanityProds : []);
          setManufacturers(sanityMfg && sanityMfg.length > 0 ? sanityMfg : []);
        }
      } catch (err) {
        console.warn('Sanity load error on Products hub, using local data:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadSanityData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute product count per brand
  const brandStats = useMemo(() => {
    const counts = {};
    products.forEach((p) => {
      const brandName = p.manufacturer?.name || p.manufacturer || '';
      if (brandName) {
        const k = brandName.toLowerCase();
        counts[k] = (counts[k] || 0) + 1;
      }
    });
    return counts;
  }, [products]);

  // Filtered products for "All Products" / "By Brand" view
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name?.toLowerCase().includes(q);
        const matchesModel = p.model?.toLowerCase().includes(q);
        const matchesTagline = p.tagline?.toLowerCase().includes(q);
        const matchesBrand = (p.manufacturer?.name || p.manufacturer || '')
          .toLowerCase()
          .includes(q);
        if (!matchesName && !matchesModel && !matchesTagline && !matchesBrand) {
          return false;
        }
      }
          
      // Brand filter
      if (selectedBrand) {
        const b = selectedBrand.toLowerCase().trim();
        const pBrand = (p.manufacturer?.name || (typeof p.manufacturer === 'string' ? p.manufacturer : '') || '').toLowerCase().trim();
        const pBrandSlug = (p.manufacturer?.slug || '').toLowerCase().trim();
        const nameMatches = (p.name || '').toLowerCase().includes(b);
        const modelMatches = (p.model || '').toLowerCase().includes(b);
        if (!pBrand.includes(b) && !b.includes(pBrand) && !pBrandSlug.includes(b) && !nameMatches && !modelMatches) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory) {
        const c = selectedCategory.toLowerCase();
        const pCatSlug = (p.category?.slug || p.categorySlug || p.category || '').toLowerCase();
        const pCatName = (p.category?.title || p.categoryName || '').toLowerCase();
        if (!pCatSlug.includes(c) && !pCatName.includes(c)) {
          return false;
        }
      }

      return true;
    });
  }, [products, searchQuery, selectedBrand, selectedCategory]);

  const clearBrandFilter = () => {
    setSelectedBrand('');
    searchParams.delete('brand');
    setSearchParams(searchParams);
  };

  const handleSelectBrandCard = (brandName) => {
    setSelectedBrand(brandName);
    setActiveTab('all');
    setSearchParams({ brand: brandName.toLowerCase() });
    setTimeout(() => {
      const el = document.getElementById('products-hub-main');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  return (
    <>
      {/* ─── Page Banner ─── */}
      <div className="page-banner" id="products-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Products</span>
          </div>
          <h1>Equipment & Product Hub</h1>
          <p>
            Explore our certified equipment catalogue by authorized OEM brand,
            or browse our complete equipment inventory.
          </p>
        </div>
      </div>

      {/* ─── Main Hub Section ─── */}
      <section className="section" id="products-hub-main" style={{ paddingTop: '40px' }}>
        <div className="container">
          {/* Navigation Tabs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              marginBottom: '36px',
            }}
          >
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 26px',
                borderRadius: '30px',
                fontSize: '0.9375rem',
                fontWeight: 700,
                cursor: 'pointer',
                border: activeTab === 'all' ? '2px solid var(--navy)' : '1px solid var(--gray-300)',
                background: activeTab === 'all' ? 'var(--navy)' : '#fff',
                color: activeTab === 'all' ? '#fff' : 'var(--navy)',
                boxShadow: activeTab === 'all' ? '0 4px 16px rgba(10,25,47,0.2)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <Search size={18} />
              <span>All Equipment Catalogue ({products.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('brands')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 26px',
                borderRadius: '30px',
                fontSize: '0.9375rem',
                fontWeight: 700,
                cursor: 'pointer',
                border: activeTab === 'brands' ? '2px solid var(--navy)' : '1px solid var(--gray-300)',
                background: activeTab === 'brands' ? 'var(--navy)' : '#fff',
                color: activeTab === 'brands' ? '#fff' : 'var(--navy)',
                boxShadow: activeTab === 'brands' ? '0 4px 16px rgba(10,25,47,0.2)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <Building2 size={18} />
              <span>Browse by Brand / OEM ({manufacturers.length})</span>
            </button>
          </div>

          {/* Active Brand Filter Banner (if selected) */}
          {selectedBrand && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 20px',
                background: 'rgba(212, 175, 55, 0.08)',
                border: '1.5px solid rgba(212, 175, 55, 0.35)',
                borderRadius: '12px',
                marginBottom: '32px',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    background: 'var(--navy)',
                    color: 'var(--gold-light)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                  }}
                >
                  Active Brand Filter
                </span>
                <span style={{ fontSize: '0.9375rem', color: 'var(--navy)', fontWeight: 700 }}>
                  Showing equipment from OEM: <u>{selectedBrand.toUpperCase()}</u> ({filteredProducts.length} items found)
                </span>
              </div>
              <button
                type="button"
                onClick={clearBrandFilter}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'none',
                  border: '1px solid var(--gray-300)',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: 'var(--gray-700)',
                  cursor: 'pointer',
                }}
              >
                <X size={14} /> Clear Brand Filter
              </button>
            </div>
          )}

          {/* ════════════ TAB: BROWSE BY BRAND / OEM ════════════ */}
          {activeTab === 'brands' && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div className="section-label">Authorized Channel Partnerships</div>
                <h2 className="section-title">Browse by Brand & OEM Partner</h2>
                <p
                  className="section-subtitle"
                  style={{ margin: '0 auto', textAlign: 'center' }}
                >
                  Explore equipment sourced directly from certified international OEMs and technology partners.
                </p>
              </div>

              {/* Brands Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '20px',
                  marginBottom: '40px',
                }}
              >
                {manufacturers.map((mfg) => {
                  const mfgName = mfg.name;
                  const isSelected = selectedBrand.toLowerCase() === mfgName.toLowerCase();
                  const count = brandStats[mfgName.toLowerCase()] || 0;

                  return (
                    <div
                      key={mfgName}
                      onClick={() => handleSelectBrandCard(mfgName)}
                      style={{
                        padding: '24px 20px',
                        borderRadius: '14px',
                        background: isSelected ? 'rgba(212, 175, 55, 0.06)' : '#fff',
                        border: isSelected ? '2px solid var(--gold)' : '1px solid var(--gray-200)',
                        boxShadow: isSelected
                          ? '0 8px 24px rgba(212, 175, 55, 0.2)'
                          : '0 2px 10px rgba(0,0,0,0.04)',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.transform = 'translateY(-3px)';
                          e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.transform = 'none';
                          e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)';
                        }
                      }}
                    >
                      <div
                        style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: '12px',
                          background: 'rgba(10,25,47,0.05)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '14px',
                          border: '1px solid var(--gray-200)',
                          fontSize: '1.25rem',
                          fontWeight: 800,
                          color: 'var(--navy)',
                        }}
                      >
                        {mfg.logo && urlFor(mfg.logo).url() ? (
                          <img
                            src={urlFor(mfg.logo).width(64).height(64).fit('max').url()}
                            alt={mfgName}
                            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                          />
                        ) : (
                          mfg.initials || mfgName.slice(0, 2).toUpperCase()
                        )}
                      </div>

                      <h3
                        style={{
                          fontSize: '1.125rem',
                          fontWeight: 800,
                          color: 'var(--navy)',
                          margin: '0 0 6px',
                        }}
                      >
                        {mfgName}
                      </h3>

                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: isSelected ? 'var(--gold-dark)' : 'var(--navy)',
                          background: isSelected ? 'rgba(212, 175, 55, 0.12)' : 'rgba(10, 27, 61, 0.06)',
                          padding: '3px 10px',
                          borderRadius: '12px',
                          marginBottom: '14px',
                        }}
                      >
                        {mfg.partnershipLevel || mfg.category || 'Authorized OEM Partner'}
                      </span>

                      <div
                        style={{
                          marginTop: 'auto',
                          fontSize: '0.8125rem',
                          fontWeight: 700,
                          color: 'var(--gold-dark)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <span>{isSelected ? 'Viewing Products' : 'View Equipment'}</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Matching Brand Products List */}
              {selectedBrand && (
                <div style={{ marginTop: '20px' }}>
                  <h3
                    style={{
                      fontSize: '1.375rem',
                      fontWeight: 800,
                      color: 'var(--navy)',
                      marginBottom: '20px',
                    }}
                  >
                    Equipment available from {selectedBrand}:
                  </h3>

                  {filteredProducts.length === 0 ? (
                    <div
                      style={{
                        padding: '40px',
                        textAlign: 'center',
                        background: 'var(--gray-50)',
                        borderRadius: '12px',
                        border: '1px solid var(--gray-200)',
                      }}
                    >
                      <p style={{ color: 'var(--gray-600)', margin: 0 }}>
                        No specific products are catalogued under {selectedBrand} yet in the portal. Please contact our procurement desk for ex-stock availability and custom tender pricing.
                      </p>
                      <Link
                        to="/contact-us"
                        className="btn btn-navy"
                        style={{ marginTop: '16px', display: 'inline-flex' }}
                      >
                        Request Quote for {selectedBrand}
                      </Link>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
                        gap: '24px',
                      }}
                    >
                      {filteredProducts.map((product) => (
                        <ProductCard key={product.id || product._id} product={product} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ════════════ TAB 3: ALL EQUIPMENT CATALOGUE ════════════ */}
          {activeTab === 'all' && (
            <div>
              {/* Search & Filter Control Bar */}
              <div
                style={{
                  background: 'var(--white)',
                  padding: '24px',
                  borderRadius: '16px',
                  border: '1px solid var(--gray-200)',
                  boxShadow: '0 2px 12px rgba(10,25,47,0.05)',
                  marginBottom: '36px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '16px',
                  alignItems: 'center',
                }}
              >
                {/* Search input */}
                <div style={{ position: 'relative' }}>
                  <Search
                    size={16}
                    style={{
                      position: 'absolute',
                      left: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--gray-400)',
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Search by model, name, or keyword…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '11px 14px 11px 40px',
                      borderRadius: '8px',
                      border: '1px solid var(--gray-300)',
                      fontSize: '0.875rem',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Brand select */}
                <div>
                  <select
                    value={selectedBrand}
                    onChange={(e) => {
                      setSelectedBrand(e.target.value);
                      if (e.target.value) {
                        setSearchParams({ brand: e.target.value.toLowerCase() });
                      } else {
                        searchParams.delete('brand');
                        setSearchParams(searchParams);
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--gray-300)',
                      fontSize: '0.875rem',
                      background: '#fff',
                      outline: 'none',
                    }}
                  >
                    <option value="">All Brands / OEMs</option>
                    {manufacturers.map((m) => (
                      <option key={m.name} value={m.name}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category select */}
                <div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--gray-300)',
                      fontSize: '0.875rem',
                      background: '#fff',
                      outline: 'none',
                    }}
                  >
                    <option value="">All Categories</option>
                    {categories.map((c) => (
                      <option key={c.id || c._id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Reset button */}
                {(searchQuery || selectedBrand || selectedCategory) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedBrand('');
                      setSelectedCategory('');
                      setSearchParams({});
                    }}
                    style={{
                      padding: '11px 16px',
                      borderRadius: '8px',
                      border: '1px solid var(--gray-300)',
                      background: 'var(--gray-50)',
                      color: 'var(--gray-700)',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Reset Filters
                  </button>
                )}
              </div>

              {/* Products Results Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
                  gap: '24px',
                }}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id || product._id} product={product} />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div
                  style={{
                    padding: '60px 20px',
                    textAlign: 'center',
                    background: 'var(--gray-50)',
                    borderRadius: '12px',
                    border: '1px solid var(--gray-200)',
                  }}
                >
                  <p style={{ color: 'var(--gray-600)', fontSize: '1rem', fontWeight: 600 }}>
                    No equipment matches the selected search filters.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedBrand('');
                      setSelectedCategory('');
                      setSearchParams({});
                    }}
                    style={{
                      marginTop: '12px',
                      padding: '8px 18px',
                      borderRadius: '8px',
                      background: 'var(--navy)',
                      color: '#fff',
                      border: 'none',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

    </>
  );
}
