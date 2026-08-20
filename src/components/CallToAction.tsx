/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, PhoneCall, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface CallToActionProps {
  onNavigate: (section: string) => void;
}

export default function CallToAction({ onNavigate }: CallToActionProps) {
  const handleQuoteClick = () => {
    onNavigate('simulator');
    const el = document.getElementById('simulator');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5532998800325?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20personalizada.', '_blank');
  };

  return (
    <section className="py-20 md:py-24 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white relative overflow-hidden" id="cta-conversion">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        {/* Subtle trust badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-sky-200"
        >
          <ShieldCheck size={16} className="text-sky-300" />
          <span>Atendimento Ágil e Especializado BQ Seguros</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-white max-w-3xl mx-auto leading-tight"
          id="cta-title"
        >
          Encontre a proteção certa para você.
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed"
          id="cta-subtitle"
        >
          Conte com a experiência da BQ Seguros para encontrar uma solução adequada às suas necessidades.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          id="cta-buttons"
        >
          <button
            onClick={handleQuoteClick}
            className="w-full sm:w-auto bg-accent-500 hover:bg-accent-600 active:bg-accent-700 text-white font-bold text-sm sm:text-base tracking-wide px-9 py-4 rounded-xl shadow-xl shadow-accent-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            id="cta-btn-quote"
          >
            <span>Calcule seu seguro agora</span>
            <ArrowRight size={18} />
          </button>

          <button
            onClick={handleWhatsAppClick}
            className="w-full sm:w-auto bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm tracking-wide px-7 py-4 rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-2.5 cursor-pointer text-center"
            id="cta-btn-whatsapp"
          >
            <PhoneCall size={16} className="text-sky-300" />
            <span>Falar no WhatsApp</span>
          </button>
        </motion.div>

        <p className="text-xs text-slate-300 font-mono tracking-wide pt-2">
          Consultores certificados SUSEP • Resposta rápida e sem compromisso
        </p>
      </div>
    </section>
  );
}
