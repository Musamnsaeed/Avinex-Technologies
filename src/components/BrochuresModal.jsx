import React, { useState } from 'react';
import { X, Download, FileText, Search, Printer, CheckCircle2, ArrowRight } from 'lucide-react';
import { BROCHURES } from '../data/brochures';
import { COMPANY_DETAILS } from '../data/compliance';

export function BrochuresModal({ onClose, onOpenRFQ, onOpenSpecSheetByModel }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBrochures = BROCHURES.filter(b => {
    const matchesCat = activeFilter === 'all' || b.category === activeFilter;
    const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'All Brochures' },
    { id: 'aviation', label: 'Aviation Electronics' },
    { id: 'radios', label: 'Two-Way Radios' },
    { id: 'it_hardware', label: 'Enterprise IT' },
    { id: 'power', label: 'Modular UPS & Power' },
    { id: 'systems_integration', label: 'Systems Integration' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-6">
        {/* Header (Azam Enterprises / Brochures style) */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-950 border border-red-800 text-rose-300">
              <Download size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                Technical Brochures & Data Sheets Directory
              </h2>
              <p className="text-xs text-slate-300">
                Official specification sheets and tender documentation for AVINEX TECHNOLOGIES equipment
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {categories.map(c => (
                <button
                  key={c.id}
                  onClick={() => setActiveFilter(c.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeFilter === c.id
                      ? 'bg-[#800020] text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="relative min-w-[220px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search brochures..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#800020]"
              />
            </div>
          </div>
        </div>

        {/* Brochures List */}
        <div className="p-6 max-h-[60vh] overflow-y-auto divide-y divide-slate-100">
          {filteredBrochures.map(brochure => (
            <div key={brochure.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-slate-50/80 p-3 rounded-xl transition-colors">
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 text-[#800020] shrink-0 mt-0.5">
                  <FileText size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold text-[#800020]">{brochure.model}</span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {brochure.categoryName}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700 font-semibold">{brochure.standards}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">{brochure.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5 max-w-xl">{brochure.description}</p>
                </div>
              </div>

              {/* Download & Preview Actions */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button
                  onClick={() => { onClose(); onOpenSpecSheetByModel(brochure.model); }}
                  className="btn-download-brochure text-xs py-2 px-3 font-semibold flex items-center gap-1.5"
                  title="View Spec Sheet & Print PDF"
                >
                  <Printer size={13} className="text-[#800020]" />
                  <span>View Spec ({brochure.fileSize})</span>
                </button>

                <button
                  onClick={() => { onClose(); onOpenRFQ(brochure.model); }}
                  className="btn-primary-burgundy text-xs py-2 px-3"
                  title="Request Quotation"
                >
                  <span>RFQ</span>
                </button>
              </div>
            </div>
          ))}

          {filteredBrochures.length === 0 && (
            <div className="text-center py-12 text-slate-400 text-sm">
              No technical brochures found matching your search.
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500 font-mono">
          <div>
            Direct Inquiries: <span className="text-[#800020] font-bold">{COMPANY_DETAILS.officialEmails.tenders}</span>
          </div>
          <button
            onClick={onClose}
            className="btn-secondary-white text-xs py-2 px-4"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
}
