import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, FileText, Landmark, Copy, Check, Award, Briefcase, Layers } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/compliance';

export function ComplianceModal({ isOpen, onClose, onOpenRFQ }) {
  const [copiedField, setCopiedField] = useState(null);

  if (!isOpen) return null;

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Compliance &amp; Legal Information</h3>
              <p className="text-xs text-slate-400">Official Corporate Identifiers for Tender &amp; Procurement Verification</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 text-xs overflow-y-auto">
          {/* Company Legal Entity Banner */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="text-slate-400 font-mono text-[11px] uppercase tracking-wider">Official Legal Entity Name</div>
              <div className="text-base font-bold text-white mt-0.5">{COMPANY_DETAILS.legalName}</div>
              <div className="text-slate-400 mt-0.5">Corporate Structure: {COMPANY_DETAILS.secpStatus}</div>
            </div>
            <div className="shrink-0">
              <span className="badge-compliance text-xs">SECP Verified Active</span>
            </div>
          </div>

          {/* Section 4 Mandated Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* SECP Incorporation Status */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="font-semibold text-slate-300">SECP Incorporation Status</span>
                  <Landmark size={15} className="text-amber-400" />
                </div>
                <div className="text-sm font-mono font-bold text-amber-300 mt-1">
                  {COMPANY_DETAILS.secpStatus}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Registered under Companies Act, 2017 &bull; Reg # {COMPANY_DETAILS.secpRegNumber}
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(COMPANY_DETAILS.secpRegNumber, 'secp')}
                className="mt-3 text-[11px] text-slate-400 hover:text-white flex items-center gap-1 font-mono"
              >
                {copiedField === 'secp' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                <span>{copiedField === 'secp' ? 'Copied' : 'Copy SECP Reg #'}</span>
              </button>
            </div>

            {/* Primary FBR Classification */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="font-semibold text-slate-300">Primary FBR Classification</span>
                  <CheckCircle2 size={15} className="text-emerald-400" />
                </div>
                <div className="text-sm font-mono font-bold text-emerald-300 mt-1">
                  {COMPANY_DETAILS.fbrClassification}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Active Taxpayer List (ATL Validated) &bull; NTN: {COMPANY_DETAILS.ntn}
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(COMPANY_DETAILS.ntn, 'ntn')}
                className="mt-3 text-[11px] text-slate-400 hover:text-white flex items-center gap-1 font-mono"
              >
                {copiedField === 'ntn' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                <span>{copiedField === 'ntn' ? 'Copied' : 'Copy NTN'}</span>
              </button>
            </div>

            {/* Business Operations */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="font-semibold text-slate-300">Business Operations</span>
                  <Briefcase size={15} className="text-blue-400" />
                </div>
                <div className="text-sm font-mono font-bold text-blue-300 mt-1">
                  {COMPANY_DETAILS.businessOperations}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  STRN: {COMPANY_DETAILS.strn} &bull; Official Import &amp; Wholesale Licensee
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(COMPANY_DETAILS.strn, 'strn')}
                className="mt-3 text-[11px] text-slate-400 hover:text-white flex items-center gap-1 font-mono"
              >
                {copiedField === 'strn' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                <span>{copiedField === 'strn' ? 'Copied' : 'Copy STRN'}</span>
              </button>
            </div>

            {/* Registered Sector Coverage */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="font-semibold text-slate-300">Registered Sector Coverage</span>
                  <Layers size={15} className="text-rose-400" />
                </div>
                <div className="text-xs font-mono font-bold text-rose-300 mt-1 leading-snug">
                  {COMPANY_DETAILS.registeredSectors}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Public Procurement (PPRA / EPADS) Tier-1 Verified Vendor
                </div>
              </div>
              <span className="mt-3 text-[11px] text-emerald-400 flex items-center gap-1">
                <CheckCircle2 size={12} />
                <span>Compliant with PPRA Rule 36(b)</span>
              </span>
            </div>
          </div>

          {/* Corporate Details */}
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-2 text-slate-300">
            <div className="font-semibold text-white">Corporate Governance &amp; Contact:</div>
            <ul className="list-disc list-inside space-y-1 text-slate-400 text-xs">
              <li><strong>Full Legal Name:</strong> {COMPANY_DETAILS.legalName}</li>
              <li><strong>Corporate Address:</strong> {COMPANY_DETAILS.corporateAddress}</li>
              <li><strong>Primary Business Line:</strong> {COMPANY_DETAILS.primaryBusinessLine}</li>
              <li><strong>Copyright Notice:</strong> {COMPANY_DETAILS.copyright}</li>
            </ul>
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-slate-400 font-mono text-[11px]">
              Tender Desk: <span className="text-amber-400">{COMPANY_DETAILS.officialEmails.tenders}</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="btn-secondary text-xs py-2 px-4"
              >
                Close
              </button>
              <button
                onClick={() => { onClose(); onOpenRFQ ? onOpenRFQ() : (window.location.href = '/contact-us'); }}
                className="btn-primary text-xs py-2 px-4"
              >
                Get Procurement Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
