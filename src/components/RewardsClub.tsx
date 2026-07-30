/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Gift, Users, Award, HelpCircle, ArrowRight, CheckCircle2, ChevronRight, Sparkles, Trophy, Flame, Share2, Sparkle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import bqLogoImg from '../assets/images/bq_seguros_logo_1784320047323.jpg';
import riceCookerImg from '../assets/images/rice_cooker_1784732398061.jpg';
import miniAirFryerImg from '../assets/images/mini_air_fryer_1784732411424.jpg';
import sandwichMakerImg from '../assets/images/sandwich_maker_1784732420643.jpg';
import wineKitImg from '../assets/images/wine_gift_kit_1784573460236.jpg';
import bbqKitImg from '../assets/images/bbq_gift_kit_1784573475863.jpg';

interface RewardTier {
  referrals: number;
  reward: string;
  value: string;
  description: string;
  tag: string;
  highlightColor: string;
  badgeStyle: string;
  iconBoxStyle?: string;
  options: {
    title: string;
    description: string;
    icon: string;
    image?: string;
  }[];
}

interface InsuranceGift {
  type: string;
  name: string;
  icon: string;
  instantGift: string;
  referralTiers: RewardTier[];
}

export default function RewardsClub() {
  const [referralCount, setReferralCount] = useState<number>(3);

  const currentCategoryData: InsuranceGift = {
    type: 'auto',
    name: '🚗 Seguro Automotivo',
    icon: '🚗',
    instantGift: 'KIT DO SEGURADO BQ: Lixeirinha em couro, aromatizante premium, caneta personalizada e abridor exclusivo com a nossa marca! 🎁',
    referralTiers: [
      {
        referrals: 1,
        reward: 'Voucher de R$ 50 ou Lavagem Automotiva ⛽🚿',
        value: 'R$ 50',
        description: 'Seu primeiro amigo fechou a apólice? Escolha o seu prêmio de entrada imediatamente!',
        tag: 'Prêmio Bronze 🥉',
        highlightColor: 'from-amber-800/20 via-amber-700/15 to-amber-900/20 border-amber-600 text-amber-950',
        badgeStyle: 'bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-amber-50 border-amber-600 font-extrabold shadow-md',
        iconBoxStyle: 'bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 text-amber-50 border-amber-600 shadow-amber-900/30',
        options: [
          {
            title: 'Voucher de Combustível R$ 50,00',
            description: 'Abasteça o seu carro de graça em qualquer posto de gasolina.',
            icon: '⛽'
          },
          {
            title: 'Lavagem Automotiva Profissional',
            description: 'Deixe seu carro brilhando com uma limpeza completa no capricho.',
            icon: '🚿'
          }
        ]
      },
      {
        referrals: 3,
        reward: 'Air Fryer, Panela de Arroz ou Sanduicheira 🍚🍳🥪',
        value: 'R$ 200',
        description: 'Indique 3 amigos que fechem com a BQ e escolha o seu eletrodoméstico favorito entregue direto na sua casa!',
        tag: 'Mais Desejado! 🔥 Prata 🥈',
        highlightColor: 'from-slate-300/30 via-zinc-200/20 to-slate-300/30 border-slate-400 text-slate-950 shadow-md',
        badgeStyle: 'bg-gradient-to-r from-slate-300 via-zinc-200 to-slate-400 text-slate-900 border-slate-400 font-extrabold shadow-sm',
        iconBoxStyle: 'bg-gradient-to-br from-slate-400 via-slate-500 to-zinc-600 text-white border-slate-300 shadow-slate-500/30',
        options: [
          {
            title: 'Panela Elétrica de Arroz',
            description: 'Arroz quentinho, soltinho e no ponto certo em minutos, sem risco de queimar!',
            icon: '🍚',
            image: riceCookerImg
          },
          {
            title: 'Mini Air Fryer Digital',
            description: 'Frituras sem óleo super crocantes, rápidas e saudáveis para a sua rotina!',
            icon: '🍳',
            image: miniAirFryerImg
          },
          {
            title: 'Sanduicheira & Grill Antiaderente',
            description: 'Lanches crocantes e mistos-quentes douradinhos e deliciosos em instantes.',
            icon: '🥪',
            image: sandwichMakerImg
          }
        ]
      },
      {
        referrals: 5,
        reward: 'Kit de Vinhos Finos ou Kit de Churrasco Luxo 🍷🥩',
        value: 'R$ 300',
        description: 'Conquiste o topo da nossa tabela de indicações e escolha um kit de celebração supremo!',
        tag: 'Prêmio Supremo! 🏆 Ouro 🥇',
        highlightColor: 'from-amber-400/30 via-yellow-300/25 to-amber-500/30 border-amber-500 ring-4 ring-amber-400/30 text-amber-950 shadow-lg',
        badgeStyle: 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-amber-950 border-amber-500 font-extrabold shadow-md',
        iconBoxStyle: 'bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 text-amber-950 border-amber-400 shadow-amber-500/40',
        options: [
          {
            title: 'Kit de Vinhos Selecionados',
            description: 'Garrafas de vinhos nobres importados, acompanhadas de saca-rolhas elétrico e acessórios premium na caixa.',
            icon: '🍷',
            image: wineKitImg
          },
          {
            title: 'Kit de Churrasco Master',
            description: 'Conjunto de alta qualidade com facas artesanais de alta precisão e talheres profissionais em aço inox.',
            icon: '🥩',
            image: bbqKitImg
          }
        ]
      }
    ]
  };

  const handleShareReferral = () => {
    const text = `Oi! Estou indicando a BQ Seguros. Se você fizer uma cotação gratuita de seguro com eles (Auto, Residencial, Vida, Pet, etc.) e fechar, nós dois ganhamos prêmios incríveis! Eles têm um clube de prêmios fantástico que dá de presente Mini Air Fryers, Panelas Elétricas, Sanduicheiras, Kits de Vinho, Churrasco e muito mais. Solicite sua cotação gratuita aqui: https://wa.me/5532998800325?text=${encodeURIComponent('Olá, vim por indicação de um amigo e gostaria de fazer uma cotação gratuita!')}`;
    window.open(text, '_blank');
  };

  return (
    <section id="rewards" className="py-20 bg-slate-50 relative overflow-hidden border-t border-b border-slate-200/50">
      {/* Background radial spotlights */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-700 px-3.5 py-1 rounded-full text-xs font-bold border border-emerald-500/20">
            <Gift size={14} className="text-emerald-600 animate-bounce" />
            Clube de Prêmios BQ
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary-500 tracking-tight">
            Indique a BQ Seguros & Ganhe Prêmios 🎁
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            Sua confiança vale muito para nós. Além do brinde exclusivo de boas-vindas que você ganha ao fechar o seu seguro, criamos o maior clube de indicações. Indique seus amigos e acumule pontos para escolher presentes excelentes!
          </p>
        </div>

        {/* Grid Area: Visualizer on Left & Referral Calculator on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT COLUMN: GIFT REVEAL */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-xl shadow-slate-100/50">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] bg-emerald-500/10 text-emerald-700 px-2.5 py-1 rounded-full font-bold uppercase tracking-widest flex items-center gap-1 border border-emerald-500/20">
                  <Flame size={12} className="text-emerald-600 animate-pulse" /> Brinde de Contratação
                </span>
                <span className="text-xs text-primary-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-emerald-600" /> 100% Garantido
                </span>
              </div>

              <div>
                <h3 className="font-display font-bold text-xl text-primary-500">Seu Brinde de Boas-Vindas</h3>
                <p className="text-slate-600 text-xs mt-1">
                  Fechou sua apólice? Seu brinde exclusivo de boas-vindas já está garantido e será entregue a você quando nos visitar em nosso escritório!
                </p>
              </div>

              {/* Gift Visual display */}
              <div className="bg-emerald-50/50 border border-emerald-200/60 rounded-2xl p-4 flex items-start gap-3.5 my-4">
                <div className="bg-emerald-500/15 text-emerald-700 p-3 rounded-xl border border-emerald-500/20 shrink-0 self-center">
                  <Gift size={24} className="text-emerald-600" />
                </div>
                <div>
                  <span className="text-[10px] text-emerald-800 uppercase tracking-wider font-bold block">Kit do Proprietário BQ</span>
                  <span className="text-xs sm:text-sm text-slate-800 font-medium block mt-0.5 leading-relaxed">
                    {currentCategoryData.instantGift}
                  </span>
                </div>
              </div>
            </div>

            {/* Company Logo Showcase Card */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[190px] my-4 group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative z-10 flex flex-col items-center">
                <img
                  src={bqLogoImg}
                  alt="BQ Seguros Logo"
                  className="h-24 w-auto max-w-[180px] object-contain rounded-xl bg-white p-2 border border-slate-200 shadow-sm transition-transform group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="mt-4">
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-700 px-3 py-0.5 rounded-full font-bold uppercase tracking-widest border border-emerald-500/20">
                    Sua Parceira de Confiança
                  </span>
                  <h4 className="text-sm font-bold text-primary-500 tracking-wide mt-2">
                    BQ Seguros • Corretora Tradicional
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 max-w-xs leading-relaxed">
                    Protegendo você e quem você ama com o melhor atendimento próximo e os maiores prêmios do Brasil.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#simulator"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer text-center shadow-md shadow-emerald-600/20 uppercase tracking-wider"
              >
                Cote Agora e Garanta seu Brinde <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: REFERRAL CAMPAIGN & INTERACTIVE CALCULATOR */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative shadow-xl shadow-slate-100/50">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between">
                <span className="text-[10px] bg-emerald-500/10 text-emerald-700 px-2.5 py-1 rounded-full font-bold uppercase tracking-widest flex items-center gap-1 border border-emerald-500/20">
                  <Users size={12} className="text-emerald-600" /> Campanha Indique e Ganhe
                </span>
                <span className="text-xs text-teal-700 font-bold bg-teal-500/10 px-2.5 py-1 rounded-lg border border-teal-500/20 flex items-center gap-1">
                  <Sparkles size={12} className="text-teal-600 animate-spin-slow" /> Indicações Ilimitadas
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-display font-bold text-xl text-primary-500">Quais Prêmios Você Quer Ganhar?</h3>
                <p className="text-slate-600 text-xs">
                  Compartilhe seu link de indicação com amigos e familiares. Quando eles fecharem qualquer seguro conosco, você acumula pontos na tabela e escolhe presentes excelentes:
                </p>
              </div>

              {/* Tabela Visual de Prêmios */}
              <div className="grid grid-cols-1 gap-4" id="referral-tiers-list">
                {currentCategoryData.referralTiers.map((tier) => {
                  const isActiveTier = referralCount >= tier.referrals;
                  return (
                    <div
                      key={tier.referrals}
                      className={`border p-5 rounded-2xl transition-all duration-300 ease-out transform relative overflow-hidden ${
                        isActiveTier
                          ? `bg-gradient-to-br ${tier.highlightColor} border-l-4 border-emerald-500 scale-[1.01] shadow-md`
                          : 'bg-slate-50/50 border-slate-150 opacity-70 hover:opacity-100 hover:bg-slate-50/85 scale-100'
                      }`}
                      id={`tier-${tier.referrals}`}
                    >
                      {/* Premium Top ribbon on Active Tiers */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3.5">
                          <div className={`p-2.5 rounded-xl text-xs font-bold shrink-0 flex flex-col items-center justify-center w-12 h-12 shadow-md border transition-all duration-300 ${
                            isActiveTier 
                              ? (tier.iconBoxStyle || 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 text-emerald-50 border-emerald-400 shadow-emerald-500/30 scale-105') 
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}>
                            <span className="text-sm font-extrabold leading-none drop-shadow-sm">{tier.referrals}</span>
                            <span className="text-[7px] uppercase tracking-wider mt-1 font-extrabold">Amigo{tier.referrals > 1 ? 's' : ''}</span>
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs sm:text-sm font-extrabold text-slate-800 tracking-tight">{tier.reward}</span>
                              <span className={`text-[8px] font-bold uppercase px-2 py-0.5 rounded-full border tracking-wide transition-all duration-300 ${
                                isActiveTier 
                                  ? tier.badgeStyle + ' animate-pulse'
                                  : 'bg-slate-100 text-slate-500 border-slate-200'
                              }`}>
                                {tier.tag}
                              </span>
                            </div>
                            <p className="text-[10px] sm:text-xs text-slate-500 mt-1 leading-relaxed">{tier.description}</p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="block text-[8px] text-slate-400 uppercase tracking-widest font-semibold">Valor Médio</span>
                          <span className={`text-xs sm:text-sm font-bold font-mono block mt-0.5 transition-colors duration-300 ${isActiveTier ? 'text-primary-600' : 'text-slate-500'}`}>
                            {tier.value},00
                          </span>
                        </div>
                      </div>

                      {/* Explicit Visual Options Grid */}
                      <div className="mt-4 pt-3.5 border-t border-dashed border-slate-200/60">
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Suas Opções de Escolha neste Nível:</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {tier.options.map((option, idx) => (
                            <div 
                              key={idx}
                              className={`p-3 rounded-xl border flex items-center gap-3 transition-all duration-300 ${
                                isActiveTier 
                                  ? 'bg-white border-slate-200 hover:border-emerald-400 hover:shadow-md' 
                                  : 'bg-white/80 border-slate-150'
                              }`}
                            >
                              {option.image ? (
                                <div className="w-14 h-14 rounded-lg overflow-hidden border border-slate-200 shrink-0 shadow-sm bg-slate-50 group">
                                  <img 
                                    src={option.image} 
                                    alt={option.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                              ) : (
                                <div className="text-xl bg-slate-100 border border-slate-200 w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                                  {option.icon}
                                </div>
                              )}
                              <div className="space-y-0.5 min-w-0 flex-1">
                                <span className="text-[12px] font-bold text-slate-800 leading-snug block truncate">{option.title}</span>
                                <span className="text-[10px] text-slate-500 leading-normal block line-clamp-2">{option.description}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Interactive Slide Calculator */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4.5 space-y-4">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-600">Arraste para ver o que você ganha ao convidar:</span>
                  <span className="text-emerald-700 font-bold bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20 flex items-center gap-1.5 shadow-sm transition-all duration-200">
                    <Users size={13} className="text-emerald-600" /> {referralCount} {referralCount === 1 ? 'amigo convidado' : 'amigos convidados'}
                  </span>
                </div>

                <div className="relative flex items-center py-2">
                  <input
                    type="range"
                    min="1"
                    max="6"
                    step="1"
                    value={referralCount}
                    onChange={(e) => setReferralCount(parseInt(e.target.value))}
                    style={{
                      background: `linear-gradient(to right, #059669 0%, #10b981 ${((referralCount - 1) / 5) * 100}%, #cbd5e1 ${((referralCount - 1) / 5) * 100}%, #cbd5e1 100%)`
                    }}
                    className="w-full h-2.5 rounded-full appearance-none cursor-pointer transition-all duration-200 touch-pan-x
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 
                      [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-emerald-500 [&::-webkit-slider-thumb]:to-emerald-600 
                      [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white 
                      [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-emerald-600/40 
                      [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:ease-out 
                      [&::-webkit-slider-thumb]:hover:scale-115 [&::-webkit-slider-thumb]:active:scale-125
                      [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 
                      [&::-moz-range-thumb]:bg-emerald-600 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white 
                      [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-lg"
                    id="referral-range-slider"
                  />
                </div>

                <div className="flex justify-between text-[9px] text-slate-400 font-bold px-1 uppercase tracking-wider">
                  <span>1 Indicação</span>
                  <span>3 Indicações</span>
                  <span>5+ Indicações</span>
                </div>
              </div>

            </div>

            {/* CTA share button */}
            <div className="pt-6 border-t border-slate-100 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left text-[11px] text-slate-400 max-w-sm leading-relaxed">
                *Os prêmios são enviados em até 30 dias após a confirmação da emissão e o pagamento da primeira parcela do seguro pelo seu amigo indicado. (Deverá manter o seu seguro até o final da vigência).
              </div>
              <button
                onClick={handleShareReferral}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3 rounded-xl text-xs transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-emerald-600/20 shrink-0 w-full sm:w-auto justify-center"
              >
                <Share2 size={14} />
                Indicar & Ganhar no WhatsApp 🚀
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
