/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { insuranceProducts } from '../data/insuranceData';
import { InsuranceProduct } from '../types';
import LucideIcon from './LucideIcon';

const productImages: Record<string, string> = {
  auto: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&auto=format&fit=crop&q=80",
  home: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&auto=format&fit=crop&q=80",
  life: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400&auto=format&fit=crop&q=80",
  enterprise: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop&q=80",
  travel: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&auto=format&fit=crop&q=80",
  equipment: "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=400&auto=format&fit=crop&q=80",
  motorhome: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&auto=format&fit=crop&q=80",
  others: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&auto=format&fit=crop&q=80"
};

interface InsuranceCardsProps {
  onSelectInsurance: (type: string) => void;
  onNavigate: (section: string) => void;
}

export default function InsuranceCards({ onSelectInsurance, onNavigate }: InsuranceCardsProps) {
  const [selectedProduct, setSelectedProduct] = useState<InsuranceProduct | null>(null);

  const handleSimulateProduct = (product: InsuranceProduct) => {
    onSelectInsurance(product.id);
    setSelectedProduct(null);
    onNavigate('simulator');
    setTimeout(() => {
      const el = document.getElementById('simulator');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  return (
    <section id="insurances" className="py-20 bg-slate-50 relative">
      {/* Decorative Glow elements */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold text-accent-600 uppercase tracking-widest" id="insurances-tag">
            Nossas Soluções em Proteção
          </h2>
          <h3 className="text-3xl sm:text-4xl font-display font-semibold text-primary-500 tracking-tight" id="insurances-title">
            Encontre o seguro perfeito para cada momento da sua vida
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed" id="insurances-subtitle">
            Seguros digitais, transparentes e sob medida para você, sua família ou sua empresa. Clique em qualquer seguro para explorar as coberturas e benefícios exclusivos.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="insurances-grid">
          {insuranceProducts.map((product) => {
            const coverImage = productImages[product.id] || "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400&auto=format&fit=crop&q=80";
            return (
              <motion.div
                key={product.id}
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedProduct(product)}
                className="bg-white border border-slate-200/80 hover:border-accent-500/40 rounded-2xl cursor-pointer transition-all flex flex-col overflow-hidden group shadow-md hover:shadow-xl shadow-slate-100"
                id={`card-insurance-${product.id}`}
              >
                {/* Image Container with Zoom Effect */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-900 shrink-0">
                  <img
                    src={coverImage}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-108 group-hover:filter group-hover:brightness-105"
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent z-10" />
                  
                  {/* Floating Icon */}
                  <div className="absolute bottom-3 left-4 bg-accent-500 text-white p-2.5 rounded-xl border border-accent-400/20 shadow-lg z-20 transition-all group-hover:bg-primary-500 group-hover:scale-110 duration-300">
                    <LucideIcon name={product.iconName} size={18} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col justify-between flex-1 space-y-3 relative">
                  <div className="space-y-1.5">
                    <h4 className="font-display font-bold text-base text-primary-500 group-hover:text-accent-500 transition-colors">
                      {product.title}
                    </h4>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                      {product.shortDesc}
                    </p>
                  </div>

                  {/* Elegant Dynamic Action Link */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-accent-500 group-hover:text-accent-600 transition-colors">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 group-hover:text-accent-500 font-bold transition-all">
                      Saiba Mais
                    </span>
                    <div className="flex items-center gap-1 bg-accent-50 text-accent-500 p-1.5 rounded-lg group-hover:bg-accent-500 group-hover:text-white transition-all transform group-hover:translate-x-1 duration-300">
                      <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>


      </div>

      {/* Detailed Modal Drawer */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              id="modal-backdrop"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] z-10 scrollbar-thin scrollbar-thumb-slate-200 text-slate-800"
              id="insurance-details-modal"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg bg-slate-100 transition-colors cursor-pointer"
                id="modal-close-btn"
                aria-label="Fechar"
              >
                <X size={20} />
              </button>

              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                  <div className="bg-accent-500/10 text-accent-700 p-3.5 rounded-2xl border border-accent-500/10">
                    <LucideIcon name={selectedProduct.iconName} size={28} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-xl sm:text-2xl text-primary-500">
                      {selectedProduct.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {selectedProduct.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Coverages */}
                  <div className="space-y-3">
                    <h4 className="font-display font-bold text-xs sm:text-sm text-primary-500 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                      O que está incluso?
                    </h4>
                    <ul className="space-y-2">
                      {selectedProduct.coverages.map((cov, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                          <CheckCircle2 size={16} className="text-accent-500 shrink-0 mt-0.5" />
                          <span>{cov}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-3">
                    <h4 className="font-display font-bold text-sm text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                      Benefícios Exclusivos
                    </h4>
                    <ul className="space-y-2">
                      {selectedProduct.benefits.map((ben, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                          <CheckCircle2 size={16} className="text-accent-500 shrink-0 mt-0.5" />
                          <span>{ben}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer and Button */}
                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-end gap-4">
                  <button
                    onClick={() => handleSimulateProduct(selectedProduct)}
                    className="bg-primary-500 hover:bg-primary-600 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-primary-500/10 flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                    id="modal-btn-simulate"
                  >
                    Simular {selectedProduct.title} agora
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
