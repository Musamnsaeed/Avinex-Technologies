import React, { useState } from 'react';
import { Radio, Server, Zap, Network, Search, ArrowRight, Eye, Download, SlidersHorizontal, CheckCircle2 } from 'lucide-react';
import { PRODUCTS, PRODUCT_CATEGORIES } from '../data/products';

export function CatalogSection({ onOpenRFQ, onOpenSpecSheet, selectedCategory, onSelectCategory }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          Object.values(product.specs).some(val => val.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="products" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Azam Enterprises style) */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#800020] font-mono">
            Commercial & Institutional Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
            Our Product Lineup
          </h2>
          <div className="w-12 h-1 bg-[#800020] mx-auto mt-3 rounded-full"></div>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Directly sourced and certified hardware engineered for aerospace ground support, institutional defense communications, mission-critical datacenters, and power infrastructure.
          </p>
        </div>

        {/* Tab Navigation & Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10 pb-2 border-b border-slate-200">
          {/* Custom Tabs (Azam Enterprises Style) */}
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {PRODUCT_CATEGORIES.map(category => (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={`azam-tab-btn ${selectedCategory === category.id ? 'active' : ''}`}
              >
                {category.id === 'aviation' && <Radio size={16} />}
                {category.id === 'radios' && <Radio size={16} />}
                {category.id === 'it_hardware' && <Server size={16} />}
                {category.id === 'power' && <Zap size={16} />}
                {category.id === 'systems_integration' && <Network size={16} />}
                {category.id === 'all' && <SlidersHorizontal size={16} />}
                <span>{category.label}</span>
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[260px] self-end lg:self-auto">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search model, frequency, standard..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#800020] transition-colors"
            />
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="clean-product-card group relative"
            >
              <div>
                {/* Category & Status */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#800020] font-bold">
                    {product.classification}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                    {product.leadTime}
                  </span>
                </div>

                {/* Title & Model */}
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#800020] transition-colors">
                  {product.name}
                </h3>
                <div className="font-mono text-xs text-[#800020] font-bold mt-0.5">
                  Model: {product.model}
                </div>

                <p className="mt-2.5 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {product.tagline}
                </p>

                {/* Compliance Badges */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {product.compliance.map((comp, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700">
                      {comp}
                    </span>
                  ))}
                </div>

                {/* Key Parameters Table Snapshot */}
                <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-100 font-mono text-[11px] space-y-1.5">
                  <div className="text-[10px] text-slate-500 uppercase font-sans font-bold mb-1">
                    Certified Technical Parameters
                  </div>
                  {Object.entries(product.specs).slice(0, 3).map(([key, val], idx) => (
                    <div key={idx} className="flex justify-between items-start gap-2">
                      <span className="text-slate-500 truncate">{key}:</span>
                      <span className="text-slate-800 font-semibold text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons (Azam style: Download Brochure + RFQ) */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onOpenSpecSheet(product)}
                  className="btn-download-brochure flex-1 text-xs py-2 px-3 flex items-center justify-center gap-1.5"
                  title="View Spec Sheet & PDF Dossier"
                >
                  <Download size={13} className="text-[#800020]" />
                  <span>Brochure ({product.brochureSize || 'PDF'})</span>
                </button>

                <button
                  onClick={() => onOpenRFQ(product.id)}
                  className="btn-primary-burgundy text-xs py-2 px-3.5 flex items-center justify-center gap-1"
                  title="Request Formal Procurement Quote"
                >
                  <span>RFQ</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 p-8 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-slate-500 text-sm">No hardware found matching your criteria.</p>
            <button
              onClick={() => { onSelectCategory('all'); setSearchQuery(''); }}
              className="mt-3 btn-secondary-white text-xs py-2 px-4"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
