import React, { useState } from 'react';
import { ShieldCheck, FileText, Phone, Mail, Search, ChevronDown, Menu, X, Download } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/compliance';

export function Navbar({ onOpenRFQ, onOpenComplianceModal, onOpenBrochures, onSelectCategory }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-xs">
      {/* Top Corporate & Compliance Bar */}
      <div className="bg-slate-900 text-slate-300 py-2 px-4 text-xs font-mono-spec border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              ATL ACTIVE TAXPAYER
            </span>
            <span className="text-slate-600">|</span>
            <span>SECP REG: <strong className="text-white">{COMPANY_DETAILS.secpRegNumber}</strong></span>
            <span className="text-slate-600">|</span>
            <span>NTN: <strong className="text-white">{COMPANY_DETAILS.ntn}</strong></span>
            <span className="text-slate-600">|</span>
            <span className="hidden md:inline text-amber-300">PPRA & EPADS TIER-1 CERTIFIED BIDDER</span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <a href={`mailto:${COMPANY_DETAILS.officialEmails.tenders}`} className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
              <Mail size={13} className="text-rose-400" />
              <span>{COMPANY_DETAILS.officialEmails.tenders}</span>
            </a>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <a href={`tel:${COMPANY_DETAILS.phones.islamabad}`} className="hover:text-amber-300 transition-colors hidden sm:flex items-center gap-1.5">
              <Phone size={13} className="text-emerald-400" />
              <span>{COMPANY_DETAILS.phones.islamabad}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Clean Corporate Navigation (Azam Enterprises Style) */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-6">
          {/* Logo & Corporate Identity */}
          <a href="#" className="flex items-center gap-3.5 group no-underline">
            {/* Clean Hexagon AV Monogram */}
            <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
                <polygon 
                  points="50,4 92,27 92,73 50,96 8,73 8,27" 
                  fill="#800020" 
                  stroke="#c5a880" 
                  strokeWidth="3.5"
                />
                <circle cx="50" cy="50" r="28" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 3" />
                <path 
                  d="M32 68 L50 26 L68 68 M38 56 L62 56" 
                  stroke="#ffffff" 
                  strokeWidth="6" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  fill="none"
                />
                <path 
                  d="M50 48 L50 74" 
                  stroke="#c5a880" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-[#800020] transition-colors">
                  AVINEX TECHNOLOGIES
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-rose-50 text-[#800020] border border-rose-200">
                  (PVT) LTD
                </span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium tracking-wide">
                Avionics & Technology Integration • Specialized Hardware Partners
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7 text-xs font-bold tracking-wider uppercase text-slate-700">
            <a href="#overview" className="hover:text-[#800020] transition-colors py-2">
              HOME
            </a>

            <a href="#about" className="hover:text-[#800020] transition-colors py-2">
              ABOUT US
            </a>

            {/* Products Dropdown */}
            <div 
              className="relative py-2"
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              <a 
                href="#products" 
                className="hover:text-[#800020] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>PRODUCTS</span>
                <ChevronDown size={14} />
              </a>

              {productsDropdownOpen && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-3 z-50 text-left normal-case">
                  <div className="px-4 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Product Verticals
                  </div>
                  <button 
                    onClick={() => { onSelectCategory('aviation'); setProductsDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-[#800020] flex items-center justify-between"
                  >
                    <span>Aviation Electronics & Ground Support</span>
                    <span className="text-[10px] text-slate-400">10W VHF</span>
                  </button>
                  <button 
                    onClick={() => { onSelectCategory('radios'); setProductsDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-[#800020] flex items-center justify-between"
                  >
                    <span>Two-Way Radio Systems</span>
                    <span className="text-[10px] text-slate-400">DMR/VHF</span>
                  </button>
                  <button 
                    onClick={() => { onSelectCategory('it_hardware'); setProductsDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-[#800020] flex items-center justify-between"
                  >
                    <span>Enterprise IT & Servers</span>
                    <span className="text-[10px] text-slate-400">Blade/SAN</span>
                  </button>
                  <button 
                    onClick={() => { onSelectCategory('power'); setProductsDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-[#800020] flex items-center justify-between"
                  >
                    <span>Power & Modular UPS</span>
                    <span className="text-[10px] text-slate-400">Online UPS</span>
                  </button>
                  <button 
                    onClick={() => { onSelectCategory('systems_integration'); setProductsDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-[#800020] flex items-center justify-between"
                  >
                    <span>Turnkey Systems Integration</span>
                    <span className="text-[10px] text-slate-400">Airfield NOC</span>
                  </button>
                </div>
              )}
            </div>

            {/* Dedicated Brochures Menu Button (Like Azam Enterprises) */}
            <button 
              onClick={onOpenBrochures}
              className="hover:text-[#800020] transition-colors py-2 flex items-center gap-1 font-bold text-xs"
            >
              <Download size={14} className="text-[#800020]" />
              <span>BROCHURES</span>
            </button>

            <a href="#sourcing" className="hover:text-[#800020] transition-colors py-2">
              OEM SOURCING
            </a>

            <button
              onClick={onOpenComplianceModal}
              className="hover:text-[#800020] transition-colors py-2 text-xs uppercase"
            >
              COMPLIANCE & TENDERS
            </button>

            <a href="#contact" className="hover:text-[#800020] transition-colors py-2">
              CONTACT US
            </a>
          </div>

          {/* Right Action CTA (Azam Enterprises style quote button) */}
          <div className="hidden sm:flex items-center gap-3">
            <button 
              onClick={() => onOpenRFQ()}
              className="btn-primary-burgundy text-xs py-2.5 px-4 font-bold tracking-wider uppercase"
            >
              <FileText size={14} />
              <span>GET A QUOTE / RFQ</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden p-2 text-slate-700 hover:text-black rounded-lg bg-slate-100 border border-slate-300"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-200 flex flex-col gap-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 pb-2">
            <a href="#overview" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#800020]">HOME</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#800020]">ABOUT US</a>
            <a href="#products" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#800020]">PRODUCTS & HARDWARE</a>
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenBrochures(); }} 
              className="text-left py-2 text-[#800020] flex items-center gap-1.5 font-bold"
            >
              <Download size={14} />
              <span>DOWNLOAD BROCHURES (PDF)</span>
            </button>
            <a href="#sourcing" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#800020]">OEM SOURCING MODEL</a>
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenComplianceModal(); }} 
              className="text-left py-2 hover:text-[#800020]"
            >
              SECP & PPRA COMPLIANCE
            </button>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#800020]">CONTACT US</a>
            
            <div className="pt-2">
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenRFQ(); }}
                className="btn-primary-burgundy w-full text-xs justify-center font-bold tracking-wider uppercase py-2.5"
              >
                <FileText size={14} />
                <span>REQUEST A QUOTE (RFQ)</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
