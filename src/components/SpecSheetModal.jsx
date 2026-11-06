import React from 'react';
import { X, Printer, CheckCircle2, ShieldCheck, FileText } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/compliance';

export function SpecSheetModal({ product, onClose, onOpenRFQ }) {
  if (!product) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-950 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8 spec-sheet-modal">
        {/* Top Control Bar (Hidden on print) */}
        <div className="no-print bg-slate-900 border-b border-slate-800 px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="badge-burgundy text-xs">Official Tender Specification Sheet</span>
            <span className="text-xs text-slate-400 font-mono">Ref: AVX-DOC-{product.model}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5"
              title="Print or Save as PDF for Tender Evaluation Dossier"
            >
              <Printer size={14} className="text-amber-400" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={() => { onClose(); onOpenRFQ(product.id); }}
              className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5"
            >
              <FileText size={14} />
              <span>Request Quote for this Model</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Specification Document Content */}
        <div className="p-8 sm:p-10 bg-slate-950 text-slate-100 font-sans print:bg-white print:text-black">
          {/* Document Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-6 border-b border-slate-800 print:border-slate-300">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-950 border border-amber-600/50 flex items-center justify-center text-amber-400 font-bold font-mono">
                  AV
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-white print:text-black">
                    {COMPANY_DETAILS.legalName}
                  </h2>
                  <div className="text-xs text-amber-400 print:text-slate-700 font-mono">
                    {COMPANY_DETAILS.tagline} • Government & Defense Hardware Integrators
                  </div>
                </div>
              </div>
              <div className="mt-3 text-xs text-slate-400 print:text-slate-600 font-mono space-y-0.5">
                <div>SECP Reg No: <strong>{COMPANY_DETAILS.secpRegNumber}</strong> | NTN: <strong>{COMPANY_DETAILS.ntn}</strong> | STRN: <strong>{COMPANY_DETAILS.strn}</strong></div>
                <div>PPRA & EPADS Registered Vendor | Directorate of Procurement Vendor Code: DP-AVX-2024</div>
              </div>
            </div>

            <div className="text-right sm:text-right font-mono text-xs text-slate-400 print:text-slate-600">
              <div className="text-amber-400 font-bold text-sm">TECHNICAL DATA SHEET</div>
              <div>Issue Date: October 2026</div>
              <div>Classification: Unclassified / Public Tender</div>
              <div>Standard: ISO 9001:2015 Verified</div>
            </div>
          </div>

          {/* Product Identification Banner */}
          <div className="my-6 p-4 rounded-xl bg-slate-900/90 border border-slate-800 print:bg-slate-100 print:border-slate-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <span className="text-xs font-mono uppercase text-amber-400 print:text-red-900 font-semibold tracking-wider">
                  Category: {product.categoryName}
                </span>
                <h3 className="text-2xl font-extrabold text-white print:text-black mt-0.5">
                  {product.name}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-slate-400 print:text-slate-600">Official Model Number</span>
                <div className="text-lg font-bold font-mono text-rose-300 print:text-red-900">{product.model}</div>
              </div>
            </div>
            <p className="mt-2 text-sm text-slate-300 print:text-slate-700">
              {product.tagline}
            </p>
          </div>

          {/* Standards & Compliance Bar */}
          <div className="mb-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">
              Regulatory & Military Standards Compliance
            </h4>
            <div className="flex flex-wrap gap-2">
              {product.compliance.map((c, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 print:bg-slate-200 print:text-slate-800">
                  <CheckCircle2 size={12} />
                  <span>{c}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Detailed Technical Parameters Table */}
          <div className="mb-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">
              Certified Technical Parameters & Specifications Matrix
            </h4>
            <div className="overflow-x-auto border border-slate-800 rounded-xl print:border-slate-300">
              <table className="w-full text-left font-mono text-xs divide-y divide-slate-800 print:divide-slate-300">
                <thead className="bg-slate-900 print:bg-slate-200 text-slate-300 print:text-slate-800">
                  <tr>
                    <th className="py-2.5 px-4 font-semibold w-1/3">Parameter</th>
                    <th className="py-2.5 px-4 font-semibold w-2/3">Certified Specification Baseline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 print:divide-slate-200 bg-slate-950/60 print:bg-white text-slate-200 print:text-black">
                  {Object.entries(product.specs).map(([param, val], idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-900/30 print:bg-slate-50' : ''}>
                      <td className="py-2.5 px-4 text-slate-400 print:text-slate-700 font-medium">{param}</td>
                      <td className="py-2.5 px-4 font-semibold text-white print:text-black">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tender Evaluation Committee Notes */}
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/40 print:bg-slate-50 print:border-slate-300 mb-6">
            <h5 className="text-xs font-bold font-mono text-amber-300 print:text-red-900 uppercase">
              Tender Evaluation Committee Advisory
            </h5>
            <p className="mt-1 text-xs text-slate-300 print:text-slate-700">
              {product.tenderNotes} Original Manufacturer Authorization Form (MAF) and Certificate of Conformance (CoC) will be provided alongside financial bid envelope upon request.
            </p>
          </div>

          {/* Corporate Seal & Verification Block */}
          <div className="pt-4 border-t border-slate-800 print:border-slate-300 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 print:text-slate-600 gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck size={28} className="text-emerald-400" />
              <div>
                <div className="font-semibold text-white print:text-black">AVINEX TECHNOLOGIES TECHNICAL DESK</div>
                <div>Authorized Corporate Engineering Verification Seal</div>
              </div>
            </div>
            <div className="font-mono text-right">
              <div>Email: tenders@avinextech.pk</div>
              <div>Verification Hotline: +92 (51) 844-2869</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
