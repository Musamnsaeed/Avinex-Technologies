import React from 'react';
import { ShieldCheck, CheckCircle2, Landmark, FileSpreadsheet, Lock, Briefcase, Layers } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/compliance';

export function ComplianceBar({ onOpenComplianceModal }) {
  const credentials = [
    {
      label: 'SECP Incorporation Status',
      value: COMPANY_DETAILS.secpStatus || 'Fully Incorporated Private Limited Company',
      subtext: `Reg No. ${COMPANY_DETAILS.secpRegNumber}`,
      icon: <Landmark size={18} className="text-amber-400" />
    },
    {
      label: 'Primary FBR Classification',
      value: 'Wholesale & Import Licensee',
      subtext: 'Electronic & Telecom Equipment and Parts',
      icon: <CheckCircle2 size={18} className="text-emerald-400" />
    },
    {
      label: 'Business Operations',
      value: 'Supply, Import, Wholesale',
      subtext: 'Installation & Engineering Maintenance',
      icon: <Briefcase size={18} className="text-blue-400" />
    },
    {
      label: 'Registered Sector Coverage',
      value: 'Telecom, Security & Power',
      subtext: 'Defense & Electronic Systems Integration',
      icon: <ShieldCheck size={18} className="text-rose-400" />
    }
  ];

  return (
    <section className="relative z-20 -mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl glass-panel p-5 border border-slate-800 shadow-xl bg-slate-950/80 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-800/80">
          <div>
            <div className="text-xs uppercase font-mono text-amber-400 font-semibold tracking-wider flex items-center gap-2">
              <Lock size={14} />
              <span>Section 4: Compliance & Legal Information</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
              Verified Legal Credentials for Public Procurement & Defense Systems Supply
            </h2>
          </div>
          <button 
            onClick={onOpenComplianceModal}
            className="btn-outline-gold text-xs py-2 px-4 self-start md:self-auto"
          >
            <span>View Full Compliance Dossier</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {credentials.map((cred, idx) => (
            <div 
              key={idx} 
              className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
                  {cred.icon}
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">{cred.label}</div>
                  <div className="text-sm font-bold text-white font-mono mt-0.5">{cred.value}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{cred.subtext}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
