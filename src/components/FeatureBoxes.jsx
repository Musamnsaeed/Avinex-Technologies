import React from 'react';
import { Radio, Server, Zap, Network, ArrowRight } from 'lucide-react';

export function FeatureBoxes({ onSelectCategory, onOpenRFQ }) {
  const boxes = [
    {
      num: '01',
      title: 'TWO WAY RADIO & AVIATION ELECTRONICS',
      subtitle: 'Air-to-Ground VHF & DMR Networks',
      description: '10W vehicle-mounted transceivers, airport ground tower base stations, and professional MOTOTRBO-compatible DMR portable radios for airfields and security forces.',
      categoryId: 'aviation',
      icon: <Radio size={24} className="text-[#800020]" />
    },
    {
      num: '02',
      title: 'ENTERPRISE IT HARDWARE & SERVERS',
      subtitle: 'Data Center & Rugged Computing',
      description: 'Dual-socket high-density compute rack servers, 100GbE core fiber switches, modular SAN storage, and MIL-STD-810H tactical laptops for harsh defense field operations.',
      categoryId: 'it_hardware',
      icon: <Server size={24} className="text-[#800020]" />
    },
    {
      num: '03',
      title: 'ONLINE MODULAR UPS & BATTERIES',
      subtitle: 'Clean Energy & Power Redundancy',
      description: 'High-frequency online double conversion modular UPS (20-120kVA), 48V rack-mount lithium LiFePO4 battery banks, and intelligent SNMP management cards for mission critical sites.',
      categoryId: 'power',
      icon: <Zap size={24} className="text-[#800020]" />
    },
    {
      num: '04',
      title: 'TURNKEY SYSTEMS INTEGRATION',
      subtitle: 'End-to-End Institutional Engineering',
      description: 'Complete airport ground dispatch consoles, defense data center commissioning, secure optical backbones, and PPRA/EPADS compliant tender supply solutions.',
      categoryId: 'systems_integration',
      icon: <Network size={24} className="text-[#800020]" />
    }
  ];

  return (
    <section className="py-12 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {boxes.map((box, idx) => (
            <div 
              key={idx} 
              onClick={() => onSelectCategory(box.categoryId)}
              className="feature-box-card cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="feature-num">{box.num}</span>
                <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-100 group-hover:scale-110 transition-transform">
                  {box.icon}
                </div>
              </div>

              <div className="feature-line"></div>

              <h3 className="text-base font-bold text-slate-900 group-hover:text-[#800020] transition-colors tracking-tight leading-snug">
                {box.title}
              </h3>

              <div className="text-xs font-semibold text-[#800020] mt-1 mb-2">
                {box.subtitle}
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                {box.description}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-[#800020]">
                <span>View Products</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
