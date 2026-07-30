/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, User, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { mockTestimonials } from '../data/insuranceData';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? mockTestimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === mockTestimonials.length - 1 ? 0 : prev + 1));
  };

  const active = mockTestimonials[currentIndex];

  return (
    <section id="testimonials" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative Glow elements */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-primary-500 tracking-tight" id="testimonials-title">
            Quem protege seu patrimônio conosco aprova
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed" id="testimonials-subtitle">
            Agilidade na contratação, suporte descomplicado e parceria verdadeira nos momentos em que você mais precisa.
          </p>
        </div>

        {/* Testimonials Slider Body */}
        <div className="relative min-h-[340px] flex flex-col justify-between" id="testimonials-carousel-container">
          
          <div className="relative overflow-visible px-4 sm:px-12">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="bg-white border border-slate-200/80 p-8 sm:p-12 rounded-3xl shadow-lg relative flex flex-col justify-between md:flex-row gap-8 items-center"
                id={`active-testimonial-${active.id}`}
              >
                {/* Quotation Icon watermark */}
                <Quote className="absolute right-8 top-8 text-slate-100/80 w-16 h-16 pointer-events-none" />

                <div className="space-y-6 flex-1">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1">
                    {[...Array(active.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Testimonial Quote text */}
                  <p className="text-slate-700 text-sm sm:text-base italic leading-relaxed font-medium">
                    "{active.quote}"
                  </p>

                  {/* Profile info on bottom/inside card */}
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                    {active.avatar ? (
                      <img
                        src={active.avatar}
                        alt={active.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-full object-cover border-2 border-accent-500/10 shadow-sm"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-slate-200 shadow-sm flex items-center justify-center text-slate-500 shrink-0">
                        <User size={22} className="text-slate-400" />
                      </div>
                    )}
                    <div>
                      <span className="font-display font-bold text-sm sm:text-base text-slate-800 block">
                        {active.name}
                      </span>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-500 mt-1">
                        <span>{active.role}</span>
                        <span className="hidden sm:inline w-1.5 h-1.5 rounded-full bg-slate-300" />
                        <span className="text-accent-600 font-semibold">{active.city}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 px-4 sm:px-12">
            {/* Dots Indicator */}
            <div className="flex gap-2">
              {mockTestimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx ? 'bg-accent-500 w-6' : 'bg-slate-200 hover:bg-slate-300 w-2.5'
                  }`}
                  aria-label={`Ir para depoimento ${idx + 1}`}
                />
              ))}
            </div>

            {/* Left/Right Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="p-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-full hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer"
                aria-label="Depoimento Anterior"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                className="p-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-full hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer"
                aria-label="Próximo Depoimento"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

        </div>

        {/* Google Reviews Direct Link Badge */}
        <div className="mt-12 text-center">
          <a
            href="https://www.google.com/search?q=BQ+SEGUROS&oq=BQ+SEGUROS+&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQIxgnMgkIAhAAGA0YgAQyCQgDEAAYDRiABDIJCAQQABgNGIAEMgYIBRBFGDwyBggGEEUYQTIGCAcQRRg90gEINDU0MmowajeoAgCwAgA&sourceid=chrome&source=chrome.ob&ie=UTF-8#lrd=0xa221ea9c1fade7:0x2bf850d9b64b2cc2,1,,,,"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-6 py-3.5 rounded-full border border-slate-200 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 group"
            id="google-reviews-link"
          >
            <div className="flex items-center gap-1 text-amber-400">
              <Star size={18} className="fill-amber-400" />
              <Star size={18} className="fill-amber-400" />
              <Star size={18} className="fill-amber-400" />
              <Star size={18} className="fill-amber-400" />
              <Star size={18} className="fill-amber-400" />
            </div>
            <span className="text-sm font-bold text-slate-800">
              Ver todas as avaliações de clientes no Google
            </span>
            <ExternalLink size={16} className="text-slate-400 group-hover:text-primary-600 transition-colors" />
          </a>
        </div>

      </div>
    </section>
  );
}
