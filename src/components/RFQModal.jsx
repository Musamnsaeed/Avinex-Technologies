import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, FileText, Send } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { COMPANY_DETAILS } from '../data/compliance';

export function RFQModal({ defaultProductId, onClose }) {
  const [formData, setFormData] = useState({
    organization: '',
    buyerType: 'Defense & Armed Forces Procurement',
    officerName: '',
    designation: '',
    email: '',
    phone: '',
    tenderRef: '',
    selectedProduct: defaultProductId || 'avx-tr10m',
    quantity: '1',
    deliveryTimeline: 'Standard (3-4 Weeks)',
    technicalSpecsNotes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomDocket = 'AVX-RFQ-2026-' + Math.floor(1000 + Math.random() * 9000);
    setTrackingId(randomDocket);
    setSubmitted(true);
  };

  const selectedItem = PRODUCTS.find(p => p.id === formData.selectedProduct);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-950 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-950/90 to-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-red-900/50 border border-red-700/60 text-amber-300">
              <FileText size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Request a Quote (RFQ)</h3>
              <p className="text-xs text-slate-400">Equipment Procurement & Sourcing</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          /* Confirmation Docket Receipt */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
              <CheckCircle2 size={36} />
            </div>

            <div>
              <span className="badge-compliance text-xs mb-2">Request Received</span>
              <h4 className="text-2xl font-bold text-white mt-1">RFQ Reference #{trackingId}</h4>
              <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
                Your quotation inquiry has been received. Our team will review your requirements and send details to:
              </p>
              <div className="mt-3 font-mono text-sm text-amber-300 bg-slate-900/80 py-2 px-4 rounded-xl border border-slate-800 inline-block">
                {formData.email}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-left font-mono text-xs space-y-2 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Organization:</span>
                <span className="text-white font-semibold">{formData.organization}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Equipment Requested:</span>
                <span className="text-amber-300 font-semibold">{selectedItem ? selectedItem.name : 'Custom Sourcing'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Quantity / Units:</span>
                <span className="text-white font-semibold">{formData.quantity} Units</span>
              </div>
              {formData.tenderRef && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Tender Reference #:</span>
                  <span className="text-white">{formData.tenderRef}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-500">Routing Desk:</span>
                <span className="text-emerald-400">{COMPANY_DETAILS.officialEmails.tenders}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={onClose}
                className="btn-primary text-xs py-2.5 px-6"
              >
                Close Portal
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 text-xs font-sans">

            {/* Organization Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Procuring Organization / Entity *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Civil Aviation Authority (CAA), Air HQ, DP"
                  value={formData.organization}
                  onChange={e => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Procurement Sector Type
                </label>
                <select
                  value={formData.buyerType}
                  onChange={e => setFormData({ ...formData, buyerType: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Defense & Armed Forces Procurement">Defense & Armed Forces Procurement</option>
                  <option value="Civil Aviation & Airport Operations">Civil Aviation & Airport Operations</option>
                  <option value="Public Sector Enterprise (PPRA/EPADS)">Public Sector Enterprise (PPRA/EPADS)</option>
                  <option value="Defense Contractor & Prime Integrator">Defense Contractor & Prime Integrator</option>
                  <option value="Government Telecommunications Authority">Government Telecommunications Authority</option>
                </select>
              </div>
            </div>

            {/* Officer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Procurement Officer / Contact Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Full Name & Rank / Title"
                  value={formData.officerName}
                  onChange={e => setFormData({ ...formData, officerName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Official Corporate / Institutional Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@dept.gov.pk or official corporate"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Phone & Tender Ref */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Direct Contact / Landline Phone *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+92 51 XXXXXXX or Mobile"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Tender / RFQ Reference Number (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. PPRA-TNDR-2026/84 or PO-XXX"
                  value={formData.tenderRef}
                  onChange={e => setFormData({ ...formData, tenderRef: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Equipment Selection & Quantity */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-semibold mb-1">
                  Hardware Model / Vertical Required
                </label>
                <select
                  value={formData.selectedProduct}
                  onChange={e => setFormData({ ...formData, selectedProduct: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono text-xs"
                >
                  {PRODUCTS.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.model})
                    </option>
                  ))}
                  <option value="custom">Custom Sourcing / Turnkey Project Spec</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Quantity Required
                </label>
                <input
                  type="text"
                  placeholder="e.g. 5 Units, 25 Sets"
                  value={formData.quantity}
                  onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Technical Specifications Notes */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Specific Technical Parameters or Tender Criteria
              </label>
              <textarea
                rows={3}
                placeholder="Include frequency range, MIL-STD requirements, power output, installation site details or FAT/SAT requirements..."
                value={formData.technicalSpecsNotes}
                onChange={e => setFormData({ ...formData, technicalSpecsNotes: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-xs"
              ></textarea>
            </div>

            {/* Form Footer */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div className="text-[11px] text-slate-400">
                Routed to: <span className="text-amber-400 font-mono">{COMPANY_DETAILS.officialEmails.tenders}</span>
              </div>
              <button
                type="submit"
                className="btn-primary text-xs py-2.5 px-6 flex items-center gap-2"
              >
                <Send size={14} />
                <span>Transmit Formal RFQ</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
