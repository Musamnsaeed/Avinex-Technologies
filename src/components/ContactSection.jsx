import React, { useState } from 'react';
import { Mail, MapPin, Building, Send, CheckCircle2, Phone, Clock, ShieldCheck } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/compliance';

export function ContactSection({ onOpenRFQ }) {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleGeneralInquiry = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#800020] font-mono">
            Corporate & Institutional Liaison
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
            Contact Our Engineering & Procurement Desk
          </h2>
          <div className="w-12 h-1 bg-[#800020] mx-auto mt-3 rounded-full"></div>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Direct communication channels for government procurement officers, tender evaluation committees, and international OEM partners.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Official Department Mailboxes & Facilities */}
          <div className="lg:col-span-5 space-y-6">
            {/* Department Email Hub */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-[#800020] mb-4 flex items-center gap-2">
                <Mail size={16} />
                <span>Dedicated Department Inboxes</span>
              </h3>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-white border border-slate-200 flex justify-between items-center shadow-xs">
                  <div>
                    <div className="text-slate-400 text-[10px]">Tender & EPADS Submissions</div>
                    <a href={`mailto:${COMPANY_DETAILS.officialEmails.tenders}`} className="text-[#800020] font-bold hover:underline">
                      {COMPANY_DETAILS.officialEmails.tenders}
                    </a>
                  </div>
                  <span className="badge-clean-burgundy text-[9px]">Priority</span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200 flex justify-between items-center shadow-xs">
                  <div>
                    <div className="text-slate-400 text-[10px]">OEM & Foreign Sourcing Desk</div>
                    <a href={`mailto:${COMPANY_DETAILS.officialEmails.procurement}`} className="text-slate-800 font-bold hover:underline">
                      {COMPANY_DETAILS.officialEmails.procurement}
                    </a>
                  </div>
                  <span className="text-[10px] text-slate-500 font-sans font-semibold">Global Import</span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200 flex justify-between items-center shadow-xs">
                  <div>
                    <div className="text-slate-400 text-[10px]">Commercial & Enterprise Sales</div>
                    <a href={`mailto:${COMPANY_DETAILS.officialEmails.sales}`} className="text-slate-800 font-bold hover:underline">
                      {COMPANY_DETAILS.officialEmails.sales}
                    </a>
                  </div>
                  <span className="badge-clean-compliance text-[9px]">Active</span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200 flex justify-between items-center shadow-xs">
                  <div>
                    <div className="text-slate-400 text-[10px]">Engineering & Systems Support</div>
                    <a href={`mailto:${COMPANY_DETAILS.officialEmails.engineering}`} className="text-slate-800 font-bold hover:underline">
                      {COMPANY_DETAILS.officialEmails.engineering}
                    </a>
                  </div>
                  <span className="text-[9px] text-slate-500 font-sans font-semibold">24/7 SLA</span>
                </div>
              </div>
            </div>

            {/* Regional Operational Offices */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
              <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-slate-700 mb-2 flex items-center gap-2">
                <MapPin size={16} className="text-[#800020]" />
                <span>Operational Locations</span>
              </h3>

              {COMPANY_DETAILS.offices.map((office, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs shadow-xs">
                  <div className="font-bold text-slate-900 mb-1">{office.city}</div>
                  <div className="text-slate-600 leading-relaxed mb-2">{office.address}</div>
                  <div className="text-[11px] text-[#800020] font-mono font-medium">Role: {office.focus}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Direct Engineering Inquiry Portal */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md relative">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 gap-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Vendor & Technical Inquiry Form</h3>
                  <p className="text-xs text-slate-500">Submit requests directly to our Islamabad and Karachi engineering teams</p>
                </div>
                <button
                  onClick={() => onOpenRFQ()}
                  className="btn-primary-burgundy text-xs py-2 px-3.5 self-start sm:self-auto font-bold uppercase"
                >
                  Urgent Tender RFQ
                </button>
              </div>

              {formSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Inquiry Transmitted Successfully</h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Our engineering management has received your message. You will receive an official response from our team within 1 business day.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="btn-secondary-white text-xs py-2 px-4 mt-2"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleGeneralInquiry} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Your Name & Designation *</label>
                      <input
                        type="text"
                        required
                        placeholder="Engineer / Procurement Officer"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#800020]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Organization / Department *</label>
                      <input
                        type="text"
                        required
                        placeholder="Civil Aviation, Defense Wing, Public Sector"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#800020]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Official Corporate / Institutional Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="name@dept.gov.pk or official email"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#800020]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Inquiry Purpose *</label>
                      <select className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#800020]">
                        <option value="vendor">New Vendor Registration / PPRA Bidding</option>
                        <option value="technical">Technical Clarification on Specifications</option>
                        <option value="oem">OEM Foreign Manufacturer Representation</option>
                        <option value="tender">Public Tender Pre-Bid Coordination</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Message / Technical Scope *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Specify your technical parameters, frequency band, quantities required, or integration criteria..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#800020] text-xs"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="btn-primary-burgundy text-xs py-2.5 px-6 flex items-center gap-2 font-bold"
                    >
                      <Send size={14} />
                      <span>Transmit Message to Engineering Desk</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
