/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Award, Shield, PhoneCall, ArrowRight, ChevronDown, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import happyFamilyImg from '../assets/images/happy_family_insurance_1784571500195.jpg';
import VideoBackground from './VideoBackground';

interface HeroProps {
  onNavigate: (section: string) => void;
  onSelectInsurance: (type: string) => void;
}

export default function Hero({ onNavigate, onSelectInsurance }: HeroProps) {
  const handleCalculateClick = () => {
    onNavigate('simulator');
    const el = document.getElementById('simulator');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSpecialistClick = () => {
    const chatBtn = document.getElementById('whatsapp-floating-btn');
    if (chatBtn) {
      chatBtn.click();
    } else {
      window.open('https://wa.me/5532998800325?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20um%20especialista%20da%20BQ%20Seguros.', '_blank');
    }
  };

  const quickBadges = [
    'Auto', 'Residencial', 'Vida', 'Empresarial', 'Viagem', 'Carga'
  ];

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-slate-950 text-white"
    >
      {/* Background Video with Graceful Fallback & Optimal Contrast Layer */}
      <VideoBackground />

      {/* Subtle Ambient Light Accents */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8" id="hero-main-content">
            
            {/* Experience & Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="flex flex-wrap items-center gap-3"
            >
              {/* Destaque Visualmente a Experiência */}
              <div
                className="inline-flex items-center space-x-2 bg-accent-500/20 backdrop-blur-md text-sky-200 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide border border-accent-400/40 shadow-xs"
                id="hero-experience-badge"
              >
                <Award size={15} className="text-sky-300 shrink-0" />
                <span>38+ anos de tradição no mercado</span>
              </div>

              <div
                className="inline-flex items-center space-x-2 bg-slate-900/60 backdrop-blur-md text-slate-200 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-white/10 shadow-xs"
                id="hero-susep-tag"
              >
                <Shield size={14} className="text-sky-400" />
                <span>Autorizada SUSEP nº 232150826</span>
              </div>
            </motion.div>

            {/* Texto Principal */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold tracking-tight leading-[1.12] text-white drop-shadow-md max-w-3xl"
              id="hero-headline"
            >
              Proteção para o que realmente importa.
            </motion.h1>

            {/* Texto Complementar */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed font-sans drop-shadow-xs"
              id="hero-description"
            >
              Com mais de 38 anos de experiência, comparamos as melhores seguradoras do mercado para encontrar a proteção ideal para seu veículo, família, imóvel e empresa — com atendimento humano e consultoria especializada.
            </motion.p>

            {/* Botões de Ação */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
              id="hero-actions"
            >
              {/* Botão Principal com maior destaque visual */}
              <button
                onClick={handleCalculateClick}
                className="bg-accent-500 hover:bg-accent-600 active:bg-accent-700 text-white font-bold text-sm tracking-wide px-8 py-4 rounded-xl shadow-lg shadow-accent-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] text-center min-h-[48px]"
                id="hero-btn-calculate"
              >
                <span>Calcule seu seguro</span>
                <ArrowRight size={16} />
              </button>

              {/* Botão Secundário */}
              <button
                onClick={handleSpecialistClick}
                className="bg-white/10 hover:bg-white/15 border border-white/20 active:bg-white/20 text-white font-semibold text-sm tracking-wide px-7 py-4 rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-2.5 cursor-pointer text-center min-h-[48px]"
                id="hero-btn-specialist"
              >
                <PhoneCall size={16} className="text-sky-300" />
                <span>Fale com um especialista</span>
              </button>
            </motion.div>

            {/* Quick Segment Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="pt-4 flex flex-wrap items-center gap-2 text-xs text-slate-300"
            >
              <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider mr-1">Cotação Rápida:</span>
              {quickBadges.map((badge, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const keyMap: Record<string, string> = {
                      'Auto': 'auto',
                      'Residencial': 'home',
                      'Vida': 'life',
                      'Empresarial': 'enterprise',
                      'Viagem': 'travel',
                      'Carga': 'motorhome'
                    };
                    onSelectInsurance(keyMap[badge] || 'auto');
                    handleCalculateClick();
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-slate-200 text-[11px] font-medium transition-colors cursor-pointer"
                >
                  {badge}
                </button>
              ))}
            </motion.div>

          </div>

          {/* Right Visual Card - Modern & Prestigious */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-4 hidden lg:block"
            id="hero-visual-card"
          >
            <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-2xl text-slate-800 space-y-5">
              
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xs border border-slate-100 bg-slate-900">
                <img
                  src={happyFamilyImg}
                  alt="Tranquilidade e proteção com a BQ Seguros"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-sky-300 block">
                    Garantia de Solidez
                  </span>
                  <p className="text-xs font-semibold leading-tight mt-0.5">
                    Tranquilidade para sua família e patrimônio
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-accent-500 shrink-0" />
                  <span className="font-medium text-slate-800">Cotações comparativas nas líderes do país</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-accent-500 shrink-0" />
                  <span className="font-medium text-slate-800">Consultoria técnica imparcial e humanizada</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-accent-500 shrink-0" />
                  <span className="font-medium text-slate-800">Suporte completo e ágil no momento do sinistro</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="font-bold text-primary-500">BQ Seguros</span>
                <span className="text-slate-500">Desde 1988</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Smooth Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center select-none">
        <button
          onClick={() => {
            const el = document.getElementById('trust-bar') || document.getElementById('insurances');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          className="text-slate-400 hover:text-white transition-colors cursor-pointer p-2 flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider"
          aria-label="Rolar para baixo"
        >
          <span>Conheça nossos seguros</span>
          <ChevronDown size={14} className="animate-bounce mt-0.5" />
        </button>
      </div>
    </section>
  );
}
