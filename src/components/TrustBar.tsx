/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Award, UserCheck, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function TrustBar() {
  const trustItems = [
    {
      icon: Award,
      title: '38+ anos de experiência',
      subtitle: 'Tradição sólida no mercado desde 1988'
    },
    {
      icon: UserCheck,
      title: 'Atendimento personalizado',
      subtitle: 'Consultoria humanizada e próxima'
    },
    {
      icon: ShieldCheck,
      title: 'Principais seguradoras',
      subtitle: 'Parcerias com as maiores companhias do país'
    },
    {
      icon: Sparkles,
      title: 'Seguros para todos os momentos',
      subtitle: 'Soluções sob medida para você e sua empresa'
    }
  ];

  return (
    <section className="relative z-20 bg-white border-y border-slate-200/80 shadow-xs" id="trust-bar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="flex items-center gap-3.5 group"
                id={`trust-item-${idx}`}
              >
                <div className="w-11 h-11 rounded-xl bg-primary-50 text-primary-500 flex items-center justify-center shrink-0 border border-primary-100 transition-colors group-hover:bg-primary-500 group-hover:text-white">
                  <Icon size={20} className="stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-sans font-bold text-sm text-slate-900 leading-snug tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-[12px] text-slate-500 leading-normal truncate">
                    {item.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
