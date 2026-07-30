/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Shield, Sparkles, PhoneCall, Star, Clock, Heart, Gift, ArrowUpRight, Award, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import happyFamilyImg from '../assets/images/happy_family_insurance_1784571500195.jpg';
import VideoBackground from './VideoBackground';

interface HeroProps {
  onNavigate: (section: string) => void;
  onSelectInsurance: (type: string) => void;
}

export default function Hero({ onNavigate, onSelectInsurance }: HeroProps) {
  const quickCategories = [
    { type: 'auto', label: '🚗 Carro' },
    { type: 'home', label: '🏡 Casa' },
    { type: 'life', label: '❤️ Vida' }
  ];

  const handleSimulateClick = (type: string) => {
    onSelectInsurance(type);
    onNavigate('simulator');
    setTimeout(() => {
      const simSelectBtn = document.getElementById(`sim-select-${type}`);
      if (simSelectBtn) {
        simSelectBtn.click();
      }
      const el = document.getElementById('simulator');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleConsultantClick = () => {
    // Open floating chat or scroll to contact
    const chatBtn = document.getElementById('whatsapp-floating-btn');
    if (chatBtn) {
      chatBtn.click();
    } else {
      window.open('https://wa.me/5532998800325?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20seguros%20da%20BQ%20Seguros.', '_blank');
    }
  };

  return (
    <section
      id="home"
      className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-slate-950"
    >
      <VideoBackground />

      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-primary-600/5 rounded-full blur-3xl pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Banner de Destaque: Clube de Prêmios */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 p-4 sm:p-5 bg-slate-900/70 backdrop-blur-md border border-sky-500/30 hover:border-sky-400/50 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl relative overflow-hidden group"
          id="hero-rewards-banner"
        >
          {/* Ambient glow inside the banner */}
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left relative z-10">
             <div className="p-3 bg-sky-500/15 text-sky-300 rounded-xl border border-sky-500/30 shrink-0 self-center">
              <Gift size={24} className="text-sky-400" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                <span className="text-xs font-black uppercase tracking-widest text-sky-400">🎁 CLUBE DE PRÊMIOS BQ ATIVO</span>
                <span className="bg-sky-500/15 text-sky-300 border border-sky-500/25 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Campanha de Indicações</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-3xl">
                Contrate qualquer apólice e garanta seu <strong className="text-sky-300 font-bold">brinde surpresa de boas-vindas</strong> entregue ao nos visitar em nosso escritório. Depois, indique seus amigos para resgatar Mini Air Fryers, Panelas Elétricas, Sanduicheiras, Mochilas Executivas, Kits de Vinho e muito mais!
              </p>
            </div>
          </div>
          
          <button
            onClick={() => {
              const el = document.getElementById('rewards');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="w-full md:w-auto bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-extrabold text-xs uppercase tracking-wider px-5 py-3.5 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-sky-600/20 whitespace-nowrap cursor-pointer hover:scale-[1.02] shrink-0"
          >
            <span>Conhecer Prêmios</span>
            <ArrowUpRight size={14} />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8" id="hero-left-content">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap gap-2.5"
            >
              <div
                className="inline-flex items-center space-x-2 bg-slate-900/60 text-sky-200/90 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-sky-500/25 shadow-sm backdrop-blur-md transition-all"
                id="hero-tradition-tag"
              >
                <Award size={14} className="text-sky-400 shrink-0" />
                <span>Desde 1988 • 38 Anos de Tradição e Excelência 🏆</span>
              </div>

              <div
                className="inline-flex items-center space-x-2 bg-slate-900/40 backdrop-blur-md text-slate-200 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-white/10 shadow-sm"
                id="hero-tag"
              >
                <Shield size={14} className="text-primary-300" />
                <span>Corretora Homologada SUSEP</span>
              </div>

              <button
                onClick={() => {
                  const element = document.getElementById('rewards');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-emerald-500/40 cursor-pointer transition-all shadow-sm"
                id="hero-rewards-promo-tag"
              >
                <span>🎁 Brinde Surpresa de Boas-vindas Ativo</span>
              </button>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold tracking-tight leading-tight text-white drop-shadow-md"
              id="hero-headline"
            >
              Proteção sólida e tranquilidade para o que <span className="text-accent-400 italic">realmente importa</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-200 max-w-xl leading-relaxed drop-shadow-sm"
              id="hero-description"
            >
              Com mais de 38 anos de história e tradição, a BQ Seguros oferece um atendimento verdadeiramente especial e humanizado. Cuidamos de você e da sua família em cada detalhe, com proximidade, dedicação e suporte total a qualquer momento.
            </motion.p>

            {/* Quick Categories Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-3"
              id="hero-quick-sim"
            >
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-widest block">
                Simulação Rápida:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {quickCategories.map((cat) => (
                  <button
                    key={cat.type}
                    onClick={() => handleSimulateClick(cat.type)}
                    className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 text-white hover:bg-white/20 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                    id={`quick-cat-${cat.type}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
              id="hero-ctas"
            >
              <button
                onClick={() => handleSimulateClick('auto')}
                className="bg-accent-500 hover:bg-accent-600 text-white font-extrabold uppercase tracking-wider text-xs px-8 py-4.5 rounded-2xl transition-all shadow-lg shadow-accent-500/10 text-center flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
                id="hero-btn-simulate"
              >
                Começar Simulação Grátis
              </button>
              <button
                onClick={handleConsultantClick}
                className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold uppercase tracking-wider text-xs px-8 py-4.5 rounded-2xl transition-all text-center flex items-center justify-center gap-2.5 cursor-pointer shadow-md"
                id="hero-btn-consultant"
              >
                <PhoneCall size={14} className="text-accent-400 animate-pulse" />
                Falar com Especialista
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 max-w-lg"
              id="hero-stats"
            >
              <div>
                <span className="block text-2xl sm:text-3xl font-display font-bold text-accent-400">R$ 15M+</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-300 font-bold">Indenizações Pagas</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-display font-bold text-accent-400">10 mil+</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-300 font-bold">Clientes Atendidos</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-display font-bold text-accent-400">5</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1 flex-wrap">
                  Nota Google
                  <span className="inline-flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className="fill-amber-400 text-amber-400" />
                    ))}
                  </span>
                </span>
              </div>
            </motion.div>
          </div>

          {/* Hero Right Visual Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative mt-8 lg:mt-0"
            id="hero-right-visual"
          >
            {/* Interactive Mockup Container with Family Focus */}
            <div className="relative mx-auto max-w-sm sm:max-w-md bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-2xl overflow-hidden group">
              {/* Internal glow */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-accent-500/10 transition-all" />

              {/* Family Image container */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 border border-slate-100 shadow-sm bg-slate-900">
                <img
                  src={happyFamilyImg}
                  alt="Família feliz protegida pela BQ Seguros"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  id="hero-family-image"
                />
                
                {/* Overlay floating badge */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-primary-500 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-slate-200/50 flex items-center gap-1 shadow-sm">
                  <Heart size={10} className="text-accent-500 fill-accent-500 animate-pulse" />
                  <span>Sua Família Protegida</span>
                </div>
              </div>

              {/* Content and Caring Message */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 bg-accent-100 text-accent-700 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-accent-200 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-ping" />
                    Atendimento Especial
                  </div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-primary-500 leading-snug">
                    Nós nos preocupamos com você e com quem você ama
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Na BQ Seguros, cada cliente é tratado como parte da nossa história. Nosso compromisso vai muito além de vender apólices: oferecemos presença constante, suporte ágil e um atendimento acolhedor para que você sinta total tranquilidade e segurança.
                </p>

                {/* Bullet benefits of the caring customer support */}
                <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-lg bg-primary-50 text-primary-600">
                      <Heart size={12} className="fill-primary-50" />
                    </div>
                    <span className="font-medium text-slate-700">Atendimento Especial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-lg bg-accent-50 text-accent-600 border border-accent-100">
                      <Shield size={12} />
                    </div>
                    <span className="font-medium text-slate-700">Segurança e Cuidado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-lg bg-accent-50 text-accent-600 border border-accent-100">
                      <Clock size={12} />
                    </div>
                    <span className="font-medium text-slate-700">Suporte 24h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-lg bg-amber-50 text-amber-500 border border-amber-200">
                      <Star size={12} className="fill-amber-400 text-amber-500" />
                    </div>
                    <span className="font-medium text-slate-700">Satisfação Máxima</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center select-none">
        <motion.button
          onClick={() => {
            const el = document.getElementById('insurances');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: 0.8 },
            y: { repeat: Infinity, duration: 1.8, ease: "easeInOut" }
          }}
          className="p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/25 hover:border-white/45 text-white/95 cursor-pointer shadow-lg transition-colors flex items-center justify-center group"
          id="hero-scroll-indicator"
          aria-label="Rolar para seguros"
        >
          <ChevronDown size={18} className="group-hover:scale-110 transition-transform text-accent-400" />
        </motion.button>
      </div>
    </section>
  );
}
