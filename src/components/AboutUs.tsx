/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Award, ShieldCheck, HeartHandshake, CheckCircle2, Building, Users } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutUs() {
  const pillars = [
    {
      icon: Award,
      title: '38+ Anos de Tradição',
      desc: 'Fundada em 1988, construímos uma história baseada na ética, integridade e proteção de milhares de famílias e patrimônios.'
    },
    {
      icon: HeartHandshake,
      title: 'Atendimento Humanizado',
      desc: 'Aqui você fala diretamente com quem resolve. Nosso suporte é próximo, acolhedor e ágil, especialmente nos momentos de imprevistos.'
    },
    {
      icon: ShieldCheck,
      title: 'Segurança & Credibilidade',
      desc: 'Corretora credenciada pela SUSEP, atuando com as mais conceituadas seguradoras do mercado para assegurar solidez à sua apólice.'
    }
  ];

  const carriers = [
    'Allianz',
    'Bradesco',
    'EZZE',
    'Darwin',
    'Yelum',
    'HDI',
    'Aliro',
    'MAPFRE',
    'Porto Seguro',
    'Itaú',
    'Azul',
    'Mitsui',
    'Sancor',
    'Tokio Marine',
    'Justos',
    'Zurich',
    'PIER',
    'AXA',
    'Suhai'
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-600 text-xs font-bold tracking-wide uppercase">
              <Award size={14} className="text-primary-500" />
              <span>Sobre a BQ Seguros</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-slate-900 tracking-tight leading-tight">
              Mais de três décadas dedicadas a proteger o que é mais valioso para você.
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              A <strong>BQ Seguros</strong> nasceu com a missão de tornar a contratação e gestão de seguros uma experiência simples, transparente e verdadeiramente confiável. Combinamos a solidez de quem conhece profundamente o mercado segurador com a agilidade e modernidade que o mundo atual exige.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
                <CheckCircle2 size={16} className="text-accent-500" />
                <span>Corretora Autorizada SUSEP (nº 232150826)</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
                <CheckCircle2 size={16} className="text-accent-500" />
                <span>Atendimento Consultivo e Isento</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
                <CheckCircle2 size={16} className="text-accent-500" />
                <span>Suporte Dedicado em Sinistros</span>
              </div>
            </div>
          </div>

          {/* Stats Box */}
          <div className="lg:col-span-6">
            <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-2xl border border-slate-800">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 space-y-8">
                <div>
                  <span className="text-xs font-mono text-accent-400 tracking-widest uppercase block mb-1">Nosso Histórico</span>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                    Compromisso comprovado com a sua tranquilidade
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-800">
                  <div>
                    <span className="block text-4xl sm:text-5xl font-display font-bold text-accent-400">38+</span>
                    <span className="text-xs text-slate-300 font-medium mt-1 block">Anos de atuação no mercado</span>
                  </div>
                  <div>
                    <span className="block text-4xl sm:text-5xl font-display font-bold text-accent-400">10k+</span>
                    <span className="text-xs text-slate-300 font-medium mt-1 block">Vidas e patrimônios protegidos</span>
                  </div>
                  <div>
                    <span className="block text-4xl sm:text-5xl font-display font-bold text-accent-400">100%</span>
                    <span className="text-xs text-slate-300 font-medium mt-1 block">Apoio em processos de sinistro</span>
                  </div>
                  <div>
                    <span className="block text-4xl sm:text-5xl font-display font-bold text-accent-400">19</span>
                    <span className="text-xs text-slate-300 font-medium mt-1 block">Principais seguradoras parceiras</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-slate-50 border border-slate-200/70 rounded-2xl p-6 space-y-3 hover:bg-white hover:border-accent-400/40 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-500 text-white flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <h4 className="font-display font-bold text-base text-slate-900">
                  {pillar.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Partner Carriers Marquee / List */}
        <div className="mt-16 pt-10 border-t border-slate-100 text-center space-y-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
            Parceiros Oficiais e Seguradoras Homologadas
          </span>
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 pt-2">
            {carriers.map((carrier, i) => (
              <span
                key={i}
                className="bg-slate-50 border border-slate-200/80 text-slate-700 text-xs font-semibold px-4 py-2 rounded-xl shadow-2xs hover:border-primary-300 transition-colors"
              >
                {carrier}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
