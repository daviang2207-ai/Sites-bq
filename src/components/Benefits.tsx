/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Zap, HeartHandshake, UserCheck, ShieldCheck, Award, Star, Compass, ShieldAlert } from 'lucide-react';
import { motion, useInView } from 'motion/react';

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  suffix?: string;
}

function AnimatedCounter({ value, duration = 1500, suffix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!isInView) return;

    const end = parseInt(value.replace(/\D/g, ''), 10) || 0;
    if (end === 0) {
      return;
    }

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad
      const easeProgress = progress * (2 - progress);
      const currentCount = Math.floor(easeProgress * end);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function Benefits() {
  const stats = [
    { value: "38", suffix: "+ Anos", label: "Histórico de Tradição" },
    { value: "10", suffix: "k+ Atendimentos", label: "Clientes Protegidos" },
    { value: "12", suffix: " Líderes", label: "Seguradoras Parceiras" },
    { value: "24", suffix: "h/7", label: "Suporte e Assistência" }
  ];

  const benefitCards = [
    {
      icon: <Zap className="text-accent-500 group-hover:text-white transition-all" size={20} />,
      title: 'Emissão Expressa',
      description: 'Cote e receba sua proposta em minutos. Processos 100% simplificados, sem papelada ou burocracia.'
    },
    {
      icon: <HeartHandshake className="text-accent-500 group-hover:text-white transition-all" size={20} />,
      title: 'Atendimento Próximo',
      description: 'Consultores especialistas dedicados à sua apólice, prestando suporte humano acolhedor e próximo.'
    },
    {
      icon: <UserCheck className="text-accent-500 group-hover:text-white transition-all" size={20} />,
      title: 'Defesa em Sinistros',
      description: 'No momento mais difícil, nós agimos por você. Cuidamos de toda a regulação burocrática junto às companhias.'
    },
    {
      icon: <ShieldCheck className="text-accent-500 group-hover:text-white transition-all" size={20} />,
      title: 'Credibilidade SUSEP',
      description: 'Tradição sólida no mercado desde 1988, garantindo transparência técnica e respeito ao seu patrimônio.'
    }
  ];

  return (
    <section id="benefits" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-primary-500 tracking-tight" id="benefits-title">
            Por que escolher a BQ Seguros?
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto" id="benefits-subtitle">
            Unimos mais de 38 anos de credibilidade inabalável no mercado nacional à comodidade de uma jornada 100% digital e atendimento personalizado.
          </p>
        </div>

        {/* Animated Stats Section */}
        <div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20 border-b border-slate-100 pb-16"
          id="benefits-stats"
        >
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center space-y-1"
            >
              <span className="block text-4xl sm:text-5xl font-display font-black text-primary-500 tracking-tight">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-xs sm:text-sm text-slate-500 font-bold uppercase tracking-wider block">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" id="benefits-grid">
          {benefitCards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-slate-50/50 border border-slate-200/60 p-6 rounded-2xl hover:border-accent-500/30 hover:bg-white transition-all duration-300 relative group shadow-sm hover:shadow-lg"
              id={`benefit-card-${idx}`}
            >
              {/* Top ambient color glow */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-500/0 via-accent-500/0 to-transparent group-hover:via-accent-500/30 transition-all duration-300 rounded-t-2xl" />

              <div className="space-y-4">
                <div className="bg-accent-500/10 text-accent-700 p-3.5 rounded-xl inline-block border border-accent-500/10 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                  {card.icon}
                </div>
                <h4 className="font-display font-bold text-base text-primary-500">
                  {card.title}
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
