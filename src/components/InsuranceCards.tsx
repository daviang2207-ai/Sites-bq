/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ArrowRight, CheckCircle2, X, ChevronRight, Layers, ShieldCheck, Car, Heart, Home, Building2, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { insuranceProducts } from '../data/insuranceData';
import { InsuranceProduct } from '../types';
import LucideIcon from './LucideIcon';

const productImages: Record<string, string> = {
  auto: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&auto=format&fit=crop&q=80",
  home: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=80",
  life: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=500&auto=format&fit=crop&q=80",
  enterprise: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format&fit=crop&q=80",
  travel: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&auto=format&fit=crop&q=80",
  equipment: "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=500&auto=format&fit=crop&q=80",
  motorhome: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=500&auto=format&fit=crop&q=80",
  others: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&auto=format&fit=crop&q=80"
};

interface InsuranceCardsProps {
  onSelectInsurance: (type: string) => void;
  onNavigate: (section: string) => void;
}

type NeedCategory = 'all' | 'vehicles' | 'family' | 'property' | 'business';

const needFilters: { id: NeedCategory; label: string; icon: any; productIds: string[] }[] = [
  { id: 'all', label: 'Todos os Seguros', icon: Layers, productIds: [] },
  { id: 'vehicles', label: 'Veículos & Cargas', icon: Car, productIds: ['auto', 'motorhome'] },
  { id: 'family', label: 'Família & Vida', icon: Heart, productIds: ['life', 'travel'] },
  { id: 'property', label: 'Imóveis & Bens', icon: Home, productIds: ['home', 'equipment'] },
  { id: 'business', label: 'Empresas & Negócios', icon: Building2, productIds: ['enterprise', 'others'] }
];

export default function InsuranceCards({ onSelectInsurance, onNavigate }: InsuranceCardsProps) {
  const [selectedProduct, setSelectedProduct] = useState<InsuranceProduct | null>(null);
  const [isAllModalOpen, setIsAllModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<NeedCategory>('all');

  const handleSimulateProduct = (product: InsuranceProduct) => {
    onSelectInsurance(product.id);
    setSelectedProduct(null);
    setIsAllModalOpen(false);
    onNavigate('simulator');
    setTimeout(() => {
      const el = document.getElementById('simulator');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const filteredProducts = activeFilter === 'all'
    ? insuranceProducts
    : insuranceProducts.filter(p => {
        const filter = needFilters.find(f => f.id === activeFilter);
        return filter?.productIds.includes(p.id);
      });

  return (
    <section id="insurances" className="py-20 md:py-24 bg-slate-50 relative overflow-hidden">
      {/* Ambient background soft light */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading - Orientado por Necessidade */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-accent-500/10 text-accent-700 border border-accent-500/20 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck size={14} className="text-accent-600" />
            <span>O Que Você Quer Proteger?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-slate-900 tracking-tight" id="insurances-title">
            Encontre a proteção ideal para o seu momento
          </h2>
          
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed" id="insurances-subtitle">
            Selecione por categoria para descobrir coberturas sob medida, comparadas nas principais seguradoras do Brasil.
          </p>
        </div>

        {/* Category Need Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10" role="tablist" aria-label="Filtrar por necessidade">
          {needFilters.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(filter.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer min-h-[44px] ${
                  isActive
                    ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                    : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
                }`}
                id={`filter-tab-${filter.id}`}
              >
                <Icon size={16} className={isActive ? 'text-white' : 'text-slate-500'} />
                <span>{filter.label}</span>
              </button>
            );
          })}
        </div>

        {/* 8 Cards Grid with Permanent, Non-Hover Affordance */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" 
          id="insurances-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              const coverImage = productImages[product.id] || productImages.auto;
              return (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-slate-200/90 rounded-2xl transition-all duration-200 flex flex-col overflow-hidden group shadow-xs hover:shadow-lg hover:border-accent-300"
                  id={`card-insurance-${product.id}`}
                >
                  {/* Image Container */}
                  <div className="relative h-40 w-full overflow-hidden bg-slate-900 shrink-0">
                    <img
                      src={coverImage}
                      alt={product.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent z-10" />
                    
                    {/* Category Icon Badge */}
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-primary-600 p-2.5 rounded-xl border border-slate-200/50 shadow-md z-20">
                      <LucideIcon name={product.iconName} size={18} />
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="font-display font-bold text-base text-slate-900 group-hover:text-primary-600 transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
                        {product.shortDesc}
                      </p>
                    </div>

                    {/* Permanent Clear Action Buttons (No hover dependence) */}
                    <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSimulateProduct(product);
                        }}
                        className="w-full bg-accent-500 hover:bg-accent-600 active:bg-accent-700 text-white font-bold text-xs py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-accent-500/20 cursor-pointer min-h-[40px]"
                        id={`btn-quote-${product.id}`}
                      >
                        <span>Calcular este seguro</span>
                        <ArrowRight size={14} />
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedProduct(product)}
                        className="w-full text-center text-[11px] font-semibold text-slate-500 hover:text-primary-600 py-1 cursor-pointer transition-colors"
                      >
                        Ver coberturas e detalhes
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Section Bottom Conversion & Catalog Bridge */}
        <div className="mt-12 max-w-3xl mx-auto bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-display font-bold text-slate-900 text-sm sm:text-base">
              Precisa de uma cobertura específica ou personalizada?
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Temos soluções completas para frotas, equipamentos, transportes e patrimônio.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                onNavigate('simulator');
                setTimeout(() => {
                  const el = document.getElementById('simulator');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
              }}
              className="bg-accent-500 hover:bg-accent-600 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-md shadow-accent-500/20 flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              id="btn-choose-insurance-cta"
            >
              <span>Calcular meu seguro</span>
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => setIsAllModalOpen(true)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs px-4 py-3 rounded-xl transition-colors cursor-pointer"
              id="btn-see-all-insurances"
            >
              Ver todos
            </button>
          </div>
        </div>

      </div>

      {/* Single Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs"
              id="modal-backdrop"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] z-10 text-slate-800"
              id="insurance-details-modal"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                id="modal-close-btn"
                aria-label="Fechar modal"
              >
                <X size={18} />
              </button>

              <div className="space-y-6">
                {/* Modal Title */}
                <div className="flex items-center gap-3.5 border-b border-slate-100 pb-4">
                  <div className="bg-primary-50 text-primary-600 p-3 rounded-2xl border border-primary-100">
                    <LucideIcon name={selectedProduct.iconName} size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-accent-600 uppercase tracking-widest block">Solução BQ Seguros</span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900">
                      {selectedProduct.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed">
                  {selectedProduct.description}
                </p>

                {/* Coverages & Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <h4 className="font-sans font-bold text-xs text-slate-900 uppercase tracking-wider">
                      Principais Coberturas
                    </h4>
                    <ul className="space-y-2">
                      {selectedProduct.coverages.map((cov, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-600 leading-snug">
                          <CheckCircle2 size={15} className="text-accent-500 shrink-0 mt-0.5" />
                          <span>{cov}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <h4 className="font-sans font-bold text-xs text-slate-900 uppercase tracking-wider">
                      Vantagens & Assistência
                    </h4>
                    <ul className="space-y-2">
                      {selectedProduct.benefits.map((ben, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-600 leading-snug">
                          <CheckCircle2 size={15} className="text-accent-500 shrink-0 mt-0.5" />
                          <span>{ben}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-xs text-slate-500 font-mono">
                    38+ anos de consultoria técnica personalizada
                  </span>
                  <button
                    onClick={() => handleSimulateProduct(selectedProduct)}
                    className="bg-accent-500 hover:bg-accent-600 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-md shadow-accent-500/20 flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto min-h-[44px]"
                    id="modal-btn-simulate"
                  >
                    <span>Calcular {selectedProduct.title}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* All Insurances Overview Modal */}
      <AnimatePresence>
        {isAllModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAllModalOpen(false)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[85vh] z-10 text-slate-800"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                    Catálogo Completo de Seguros
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Escolha uma modalidade para atendimento consultivo
                  </p>
                </div>
                <button
                  onClick={() => setIsAllModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-xl bg-slate-100 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Fechar"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {insuranceProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSimulateProduct(p)}
                    className="p-4 rounded-2xl border border-slate-200/80 hover:border-accent-500 bg-slate-50 hover:bg-white transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-primary-50 text-primary-600 group-hover:bg-accent-500 group-hover:text-white transition-colors">
                        <LucideIcon name={p.iconName} size={18} />
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 group-hover:text-primary-600 transition-colors">
                        {p.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {p.shortDesc}
                    </p>
                    <span className="text-[11px] font-bold text-accent-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Calcular este seguro</span>
                      <ArrowRight size={12} />
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
