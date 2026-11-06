import React from 'react';
import { ShieldCheck, CheckCircle2, Award, Globe, Building2, Cpu, ArrowRight } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/compliance';

export function AboutSection({ onOpenRFQ, onOpenComplianceModal }) {
  return (
    <section id="about" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Corporate Profile */}
          <div className="lg:col-span-7">
            <span className="text-xs font-bold uppercase tracking-wider text-[#800020] font-mono">
              About AVINEX TECHNOLOGIES (PVT) LTD
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1 leading-tight">
              Aviation Electronics, Communication Systems & Navigation Solutions
            </h2>
            <div className="w-12 h-1 bg-[#800020] mt-3 mb-6 rounded-full"></div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
              <strong>AVINEX TECHNOLOGIES (PVT) LTD</strong> is a corporate supplier and systems integrator registered under the Securities and Exchange Commission of Pakistan (SECP). We bridge the gap between world-class international original equipment manufacturers (OEMs) and national procurement bodies including defense agencies, airport authorities, and public sector organizations.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Our core competencies encompass aeronautical transceivers (VHF-AM), radio navigation aids, MOTOTRBO-standard DMR two-way dispatch networks, and turnkey mission-critical command centers.
            </p>

            {/* Credibility Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs mb-1">
                  <CheckCircle2 size={16} />
                  <span>SECP & FBR Registered</span>
                </div>
                <p className="text-xs text-slate-500">
                  Full corporate compliance with verified NTN, STRN, and active taxpayer (ATL) status.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <div className="flex items-center gap-2 text-[#800020] font-bold text-xs mb-1">
                  <Award size={16} />
                  <span>PPRA & EPADS Ready</span>
                </div>
                <p className="text-xs text-slate-500">
                  Certified bidder for single-stage two-envelope public tenders and e-procurement systems.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={onOpenComplianceModal}
                className="btn-primary-burgundy text-xs py-2.5 px-5 font-bold"
              >
                <span>Verify Legal Dossier</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={() => onOpenRFQ()}
                className="btn-secondary-white text-xs py-2.5 px-5 font-bold"
              >
                <span>Vendor Inquiry</span>
              </button>
            </div>
          </div>

          {/* Right Column: Key Metrics & Technical Pillars */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-6">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Building2 size={18} className="text-[#800020]" />
                <span>Operational Pillars & Standards</span>
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-rose-50 text-[#800020] shrink-0">
                    <Globe size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Global Back-to-Back Import Channels</h4>
                    <p className="text-slate-500 mt-0.5">
                      Direct bilateral procurement agreements with FAA, EASA, and AS9100 certified aerospace manufacturers worldwide.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-rose-50 text-[#800020] shrink-0">
                    <Cpu size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Pre-Delivery FAT/SAT Quality Testing</h4>
                    <p className="text-slate-500 mt-0.5">
                      Laboratory frequency spectrum analysis and stress diagnostics at our Karachi logistics and integration depot before dispatch.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-rose-50 text-[#800020] shrink-0">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Local Spares Bank & Engineering SLA</h4>
                    <p className="text-slate-500 mt-0.5">
                      Continuous maintenance and spare parts inventory in Islamabad and Karachi for rapid emergency flight-line turnaround.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
