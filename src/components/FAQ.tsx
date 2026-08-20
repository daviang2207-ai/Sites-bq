/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { faqItems } from '../data/insuranceData';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-slate-50 relative">
      {/* Glow */}
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold text-accent-600 uppercase tracking-widest" id="faq-tag">Tire suas dúvidas</h2>
          <h3 className="text-3xl font-display font-semibold text-primary-500 tracking-tight" id="faq-title">
            Perguntas Frequentes
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed" id="faq-subtitle">
            Ainda tem dúvidas sobre como funciona a contratação, franquia ou o papel da BQ Seguros? Encontre as respostas rápidas abaixo.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4" id="faq-accordion-container">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm shadow-slate-100/50"
                id={`faq-item-${index}`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-5 text-left text-slate-900 hover:text-accent-600 transition-colors font-semibold text-sm sm:text-base gap-4 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-inset"
                  id={`faq-btn-trigger-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-content-${index}`}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle size={18} className="text-accent-600 shrink-0" aria-hidden="true" />
                    <span>{item.question}</span>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent-600' : ''}`}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      id={`faq-content-${index}`}
                      role="region"
                      aria-labelledby={`faq-btn-trigger-${index}`}
                    >
                      <div className="p-5 pt-0 text-slate-700 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
