import React from 'react';
import { Globe, Truck, FileCheck, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { SOURCING_MODEL_STEPS, TENDER_ADVANTAGES } from '../data/compliance';

export function SourcingSection({ onOpenRFQ }) {
  return (
    <section id="sourcing" className="py-20 bg-slate-950/60 border-y border-slate-800/80 relative overflow-hidden">
      {/* Background Decorator */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-950/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 badge-gold mb-3">
            <Globe size={14} />
            <span>Global Supply Chain Integrity</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Back-to-Back Import Model & Certified OEM Sourcing
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Eliminating intermediary risks for government and defense agencies. We procure directly from AS9100, FAA TSO, and ISO-certified aerospace and enterprise IT manufacturers across North America, Europe, and Asia.
          </p>
        </div>

        {/* 4-Step Sourcing Workflow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {SOURCING_MODEL_STEPS.map((item, idx) => (
            <div 
              key={idx} 
              className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black font-mono text-amber-400/80 group-hover:text-amber-300 transition-colors">
                    {item.step}
                  </span>
                  <span className="p-2 rounded-lg bg-red-950/60 border border-red-800/40 text-rose-300">
                    {idx === 0 && <Globe size={16} />}
                    {idx === 1 && <FileCheck size={16} />}
                    {idx === 2 && <Truck size={16} />}
                    {idx === 3 && <Award size={16} />}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-amber-100 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tender Advantages & Bid Assurance Matrix */}
        <div className="rounded-2xl glass-panel-burgundy p-8 sm:p-10 border border-red-900/60 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <span className="badge-burgundy text-xs mb-3">Tender Evaluation Assurance</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Why Procurement Committees Prefer AVINEX
              </h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Government tenders demand flawless documentation, original manufacturer authorizations (MAF), verifiable tax compliance, and local engineering support after commissioning.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => onOpenRFQ()}
                  className="btn-primary text-xs py-3 px-5 flex items-center gap-2"
                >
                  <span>Engage Procurement Desk</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TENDER_ADVANTAGES.map((adv, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs mb-1.5">
                    <CheckCircle2 size={16} className="shrink-0" />
                    <span className="text-white font-sans">{adv.title}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {adv.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
