import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, Terminal } from 'lucide-react';

import Logo from './Logo';
import BrandsMenu from './BrandsMenu';
import ProductsMenu from './ProductsMenu';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="header-inner">
        {/* Left: Brand Logo */}
        <Link to="/" className="logo-link" id="header-logo" aria-label="AVINEX Home">
          <Logo height={72} showTagline={false} theme="light" />
        </Link>

        {/* Right Group: Navigation Links (Pushed to Right) + Request Quote CTA */}
        <div className="header-right-group">
          <nav className="header-main-nav" id="desktop-nav">
            <NavLink
              to="/about-us"
              className={({ isActive }) => (isActive ? 'nav-pill-link active' : 'nav-pill-link')}
            >
              About Us
            </NavLink>
            <ProductsMenu theme="light" />
            <BrandsMenu theme="light" />
            <NavLink
              to="/services"
              className={({ isActive }) => (isActive ? 'nav-pill-link active' : 'nav-pill-link')}
            >
              Services
            </NavLink>
          </nav>

          <Link to="/contact-us" className="header-cta-pill" id="header-contact-btn">
            <span className="cta-cli-icon font-mono">&gt;_</span>
            <span>Request Quote</span>
          </Link>

          {/* Mobile Toggle */}
          <button
            className={`mobile-toggle${mobileOpen ? ' open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            id="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer Overlay */}
      {mobileOpen && (
        <nav className="mobile-nav-panel open" id="mobile-nav">
          <NavLink to="/" end onClick={() => setMobileOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/about-us" onClick={() => setMobileOpen(false)}>
            About Us
          </NavLink>
          <NavLink to="/products" onClick={() => setMobileOpen(false)}>
            Products
          </NavLink>
          <BrandsMenu isMobile onItemClick={() => setMobileOpen(false)} theme="dark" />
          <NavLink to="/services" onClick={() => setMobileOpen(false)}>
            Services
          </NavLink>
          <Link to="/contact-us" className="mobile-cta-btn" onClick={() => setMobileOpen(false)}>
            <span>Contact Us &amp; Procurement</span> <ArrowRight size={15} />
          </Link>
        </nav>
      )}
    </header>
  );
}
