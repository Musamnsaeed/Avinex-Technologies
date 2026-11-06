import React from 'react';
import { ArrowRight, Download, Radio, ShieldCheck, ChevronRight, Zap, Shield } from 'lucide-react';
import { COMPANY } from '../data/siteData';
import { COMPANY_DETAILS } from '../data/compliance';

export function Hero({ onOpenRFQ, onExploreProducts, onOpenBrochures, onOpenComplianceModal }) {
  return (
    <section id="overview" className="relative bg-white pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden border-b border-slate-100">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-radial-[at_top_right] from-rose-50/60 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Corporate Positioning */}
          <div className="lg:col-span-7 text-left">
            {/* Government Credibility Ticker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>SECP & FBR Compliant Wholesale, Import & Integration Firm</span>
              <button 
                onClick={onOpenComplianceModal}
                className="text-[#800020] hover:underline flex items-center gap-0.5 ml-1 font-bold"
              >
                Verify Badges <ChevronRight size={12} />
              </button>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Next-Gen Telecommunications, <br />
              <span className="text-[#800020]">Enterprise Security</span> & Power Solutions
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              <strong>{COMPANY.legalName}</strong> &mdash; {COMPANY.subHeadline}
            </p>

            {/* Quick Strategic Badges */}
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold">
              <span className="badge-clean-burgundy">Telecommunication Transceivers</span>
              <span className="badge-clean-compliance">Enterprise CCTV & Access Control</span>
              <span className="badge-clean-burgundy">Industrial Online UPS & AVR</span>
              <span className="badge-clean-compliance">SECP & FBR Licensed Importer</span>
            </div>

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenRFQ ? onOpenRFQ() : (window.location.href = '/contact-us')}
                className="btn-primary-burgundy text-sm py-3.5 px-6 font-bold flex items-center gap-2"
              >
                <span>GET PROCUREMENT QUOTE</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => onExploreProducts ? onExploreProducts() : (window.location.href = '/services')}
                className="btn-secondary-white text-sm py-3.5 px-6 font-bold flex items-center gap-2"
              >
                <span>EXPLORE SYSTEMS & SCOPE</span>
                <ArrowRight size={16} className="text-[#800020]" />
              </button>

              {onOpenBrochures && (
                <button
                  onClick={onOpenBrochures}
                  className="btn-download-brochure text-sm py-3.5 px-5 flex items-center gap-2"
                >
                  <Download size={16} />
                  <span>Brochures</span>
                </button>
              )}
            </div>

            {/* Trust Markers Bar */}
            <div className="mt-10 pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div>
                <div className="text-2xl font-extrabold text-[#800020] font-mono">100%</div>
                <div className="text-xs text-slate-500 mt-0.5">Tender Compliance</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-slate-800 font-mono">SECP</div>
                <div className="text-xs text-slate-500 mt-0.5">Reg # {COMPANY_DETAILS.secpRegNumber}</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-emerald-600 font-mono">FBR</div>
                <div className="text-xs text-slate-500 mt-0.5">Wholesale & Import</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-slate-800 font-mono">Tier-1</div>
                <div className="text-xs text-slate-500 mt-0.5">OEM Direct Sourcing</div>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Hardware Spotlight Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-7 relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100 text-[#800020]">
                    <Radio size={22} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#800020] font-bold">
                      Telecommunication Systems
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      AVX-TR10M Transceiver Station
                    </h3>
                  </div>
                </div>
                <span className="badge-clean-compliance">MIL-SPEC</span>
              </div>

              {/* Hardware Specifications Preview */}
              <div className="mt-5 space-y-2.5 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">RF Output Power:</span>
                  <span className="font-bold text-[#800020]">10W Carrier (40W PEP)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Operation Mode:</span>
                  <span className="font-bold text-slate-800">Fixed / Vehicle-Mounted</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Integration:</span>
                  <span className="font-medium text-slate-800">Long-Range & Two-Way</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Environmental:</span>
                  <span className="font-bold text-emerald-700">IP67 Ingress Rated</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Target Facility:</span>
                  <span className="text-slate-800">Mission-Critical Fleet & Security</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={onOpenBrochures}
                  className="btn-download-brochure text-xs py-2 px-3 flex-1"
                >
                  <Download size={13} />
                  <span>Download Spec PDF</span>
                </button>
                <button
                  onClick={() => onOpenRFQ ? onOpenRFQ('avx-tr10m') : (window.location.href = '/contact-us')}
                  className="btn-primary-burgundy text-xs py-2 px-4 flex-1"
                >
                  <span>Request Quote</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
