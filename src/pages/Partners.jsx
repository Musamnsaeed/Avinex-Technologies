import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, ExternalLink } from 'lucide-react';
import { PARTNERS } from '../data/siteData';
import { client } from '../sanity/client';
import { urlFor } from '../sanity/image';
import { useSEO } from '../utils/useSEO';

export default function Partners() {
  useSEO({
    title: 'Technology Partners & Authorized OEM Manufacturers',
    description: 'AVINEX Technologies collaborates with global avionics, telecom, and electronic system manufacturers for institutional procurement and integration.',
    canonical: '/partners',
  });

  const [partnersList, setPartnersList] = useState(PARTNERS);

  useEffect(() => {
    let isMounted = true;
    async function loadSanityPartners() {
      try {
        const data = await client.fetch(`*[_type == "manufacturer"] | order(name asc){
          _id,
          name,
          "slug": slug.current,
          partnershipLevel,
          logo,
          website,
          description
        }`);
        if (data && data.length > 0 && isMounted) {
          const sanityNames = new Set(data.map((m) => m.name.toLowerCase()));
          const remainingStatic = PARTNERS.filter((p) => !sanityNames.has(p.name.toLowerCase()));
          setPartnersList([...data, ...remainingStatic]);
        }
      } catch (err) {
        console.warn('Failed to fetch Sanity manufacturers:', err);
      }
    }
    loadSanityPartners();
    return () => { isMounted = false; };
  }, []);

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
  }, [partnersList]);

  return (
    <>
      {/* ─── Page Banner ─── */}
      <div className="page-banner" id="partners-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Partners</span>
          </div>
          <h1>Our Partners</h1>
          <p>
            We work with leading global OEMs and technology manufacturers to
            deliver best-in-class solutions.
          </p>
        </div>
      </div>

      {/* ─── Partners Grid ─── */}
      <section className="section" id="partners-list">
        <div className="container">
          <div className="fade-up">
            <div className="section-label">Technology Partners</div>
            <h2 className="section-title">Brands & Manufacturers</h2>
            <p className="section-subtitle">
              Click any brand to explore equipment and product lines.
            </p>
          </div>

          <div className="partners-grid fade-up">
            {partnersList.map((partner) => {
              const brandSlug = partner.name.toLowerCase();
              return (
                <Link
                  key={partner.name}
                  to={`/products?brand=${encodeURIComponent(brandSlug)}`}
                  className="partner-card"
                  id={`partner-${(partner.initials || partner.name).toLowerCase().replace(/[^a-z0-9]/g, '')}`}
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.25s ease',
                    cursor: 'pointer',
                  }}
                  title={`View ${partner.name} products`}
                >
                  <div className="partner-card-logo">
                    {partner.logo && urlFor(partner.logo).url() ? (
                      <img
                        src={urlFor(partner.logo).width(64).height(64).fit('max').url()}
                        alt={partner.name}
                        style={{ width: '36px', height: '36px', objectFit: 'contain' }}
                      />
                    ) : (
                      partner.initials || partner.name.slice(0, 2).toUpperCase()
                    )}
                  </div>
                  <h3>{partner.name}</h3>
                  <p>{partner.category || partner.partnershipLevel || 'Equipment Manufacturer'}</p>
                  <div style={{
                    marginTop: 'auto',
                    paddingTop: '12px',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    color: 'var(--gold-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}>
                    <span>View Products</span>
                    <ArrowRight size={14} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* End Partners Section */}

    </>
  );
}
