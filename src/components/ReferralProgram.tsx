/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Gift, 
  Users, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ChevronRight, 
  Phone, 
  UserPlus, 
  Check, 
  ShieldCheck, 
  Tag, 
  Flame, 
  X, 
  HelpCircle,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import miniAirFryerImg from '../assets/images/mini_air_fryer_1784732411424.jpg';
import riceCookerImg from '../assets/images/rice_cooker_1784732398061.jpg';
import bqBrandedKitImg from '../assets/images/bq_custom_kit_1787060925738.jpg';
import toolKitWithDrillImg from '../assets/images/tool_kit_with_drill_1787061408483.jpg';

interface ReferralProgramProps {
  onNavigate?: (section: string) => void;
}

export default function ReferralProgram({ onNavigate }: ReferralProgramProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTier, setActiveTier] = useState<'1' | '3'>('3');

  // Form State for Referral
  const [referrerName, setReferrerName] = useState('');
  const [referrerPhone, setReferrerPhone] = useState('');
  const [friendName, setFriendName] = useState('');
  const [friendPhone, setFriendPhone] = useState('');
  const [insuranceType, setInsuranceType] = useState('Seguro Auto');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Keyboard accessibility: ESC key to close referral modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const steps = [
    {
      step: '01',
      title: 'Indique',
      desc: 'Indique um amigo, familiar ou conhecido para fazer um seguro com a BQ Seguros.',
      icon: UserPlus
    },
    {
      step: '02',
      title: 'Seu indicado contrata',
      desc: 'Se a pessoa indicada fechar o seguro conosco, você recebe uma recompensa.',
      icon: ShieldCheck
    },
    {
      step: '03',
      title: 'Você escolhe seu brinde',
      desc: 'Escolha entre as opções de brindes disponíveis.',
      icon: Gift
    }
  ];

  const handleOpenReferralModal = () => {
    setIsSubmitted(false);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referrerName || !friendName || !friendPhone) return;

    const message = `*INDICAÇÃO DE CLIENTE - PROGRAMA BQ SEGUROS*%0A%0A` +
      `*Quem está indicando:* ${encodeURIComponent(referrerName)}%0A` +
      `*WhatsApp de quem indica:* ${encodeURIComponent(referrerPhone || 'Não informado')}%0A%0A` +
      `*Pessoa Indicada:* ${encodeURIComponent(friendName)}%0A` +
      `*WhatsApp do Indicado:* ${encodeURIComponent(friendPhone)}%0A` +
      `*Interesse de Seguro:* ${encodeURIComponent(insuranceType)}%0A` +
      (notes ? `*Observações:* ${encodeURIComponent(notes)}%0A` : '') +
      `%0A_Enviado pelo Programa de Indicações do site BQ Seguros_`;

    window.open(`https://wa.me/5532998800325?text=${message}`, '_blank');
    setIsSubmitted(true);
  };

  return (
    <section id="referral-program" className="py-24 bg-white relative overflow-hidden border-t border-slate-200/80">
      {/* Background Subtle Accent Gradients */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-50 border border-accent-200 text-accent-700 text-xs font-bold uppercase tracking-wider">
            <Gift size={14} className="text-accent-600" />
            <span>Programa Exclusivo de Relacionamento</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-display font-semibold text-slate-900 tracking-tight" id="referral-title">
            Indique, ganhe e faça parte da BQ Seguros
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed" id="referral-subtitle">
            Na BQ Seguros, nossos clientes também fazem parte da nossa história. Por isso, criamos um programa especial de indicações para agradecer quem confia no nosso trabalho e nos recomenda.
          </p>
        </div>

        {/* 3 Steps Visual Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16" id="referral-steps">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-4 hover:bg-white hover:border-accent-300 hover:shadow-md transition-all group"
              >
                {/* Step badge */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 border border-primary-100 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-colors">
                    <Icon size={22} className="stroke-[2.2]" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400 bg-white px-2.5 py-1 rounded-lg border border-slate-200/70">
                    Etapa {item.step}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-display font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center text-xs font-semibold text-accent-600">
                  <span className="text-[11px] uppercase tracking-wider">Passo {idx + 1} de 3</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Highlight Callout */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-primary-50 via-sky-50 to-primary-50 border border-primary-100/80 shadow-2xs">
            <Sparkles size={16} className="text-accent-500 animate-pulse" />
            <span className="font-display font-bold text-sm sm:text-base text-primary-700 tracking-tight">
              Quanto mais você indica, mais você ganha.
            </span>
          </div>
        </div>

        {/* Tier Selection & Brindes Presentation */}
        <div className="bg-slate-50/70 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs mb-14" id="referral-rewards-container">
          
          {/* Tier Switcher / Filter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Catálogo de Premiações
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                Opções de Brindes e Recompensas
              </h3>
            </div>

            {/* Toggle Tabs */}
            <div className="flex items-center bg-white p-1.5 rounded-2xl border border-slate-200 shadow-2xs">
              <button
                onClick={() => setActiveTier('1')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTier === '1'
                    ? 'bg-primary-500 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                id="tab-tier-1"
              >
                1 Indicação Convertida
              </button>
              <button
                onClick={() => setActiveTier('3')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTier === '3'
                    ? 'bg-accent-500 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                id="tab-tier-3"
              >
                <Flame size={14} className={activeTier === '3' ? 'text-amber-200' : 'text-accent-500'} />
                <span>3 Indicações Convertidas</span>
              </button>
            </div>
          </div>

          {/* Tier 1 Gifts (1 Indicação) */}
          {activeTier === '1' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
              id="tier-1-content"
            >
              <div className="bg-primary-50/60 border border-primary-100 rounded-2xl p-4 sm:p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-500 text-white flex items-center justify-center font-bold text-sm">
                    1x
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-primary-900">
                      Benefício para 1 indicação com apólice emitida
                    </h4>
                    <p className="text-xs text-primary-700">
                      Escolha uma das opções abaixo assim que seu indicado contratar:
                    </p>
                  </div>
                </div>
                <span className="hidden sm:inline-block text-xs font-semibold bg-white text-primary-700 px-3 py-1 rounded-full border border-primary-200">
                  Prêmio Direto
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Voucher R$ 50 */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-primary-400 hover:shadow-md transition-all group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Tag size={24} />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">Opção 1</span>
                      <h4 className="text-lg font-display font-bold text-slate-900">
                        Voucher de R$ 50
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Valor creditado em voucher para combustível, compras ou abatimento direto.
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-emerald-600">R$ 50,00 Garantidos</span>
                    <CheckCircle2 size={16} className="text-emerald-500" />
                  </div>
                </div>

                {/* Lavagem do Veículo */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-primary-400 hover:shadow-md transition-all group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Sparkles size={24} />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-sky-600 uppercase tracking-wider block">Opção 2</span>
                      <h4 className="text-lg font-display font-bold text-slate-900">
                        Lavagem do Veículo
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Limpeza e higienização completa para manter o seu carro impecável em parceiro credenciado.
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-sky-600">Estética Automotiva</span>
                    <CheckCircle2 size={16} className="text-sky-500" />
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* Tier 3 Gifts (3 Indicações) */}
          {activeTier === '3' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
              id="tier-3-content"
            >
              <div className="bg-accent-50/60 border border-accent-100 rounded-2xl p-4 sm:p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-500 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    3x
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-accent-900">
                      Super Recompensas para 3 indicações convertidas
                    </h4>
                    <p className="text-xs text-accent-700">
                      Ao acumular 3 indicações com apólices ativas, escolha qualquer um dos itens abaixo:
                    </p>
                  </div>
                </div>
                <span className="hidden sm:inline-block text-xs font-semibold bg-white text-accent-700 px-3 py-1 rounded-full border border-accent-200">
                  Prêmios Especiais
                </span>
              </div>

              {/* 5 Distinct Cards for 3 referrals */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* 1. Voucher R$ 150 */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-accent-400 hover:shadow-md transition-all group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Tag size={24} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block">Crédito Direto</span>
                      <h4 className="font-display font-bold text-base text-slate-900">
                        Voucher de R$ 150
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Crédito para livre utilização em compras, abastecimento ou desconto na renovação.
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                    <span className="font-bold text-amber-600">R$ 150,00</span>
                    <CheckCircle2 size={16} className="text-amber-500" />
                  </div>
                </div>

                {/* 2. Mini Air Fryer */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-accent-400 hover:shadow-md transition-all group">
                  <div className="h-36 w-full overflow-hidden bg-slate-100 relative">
                    <img 
                      src={miniAirFryerImg} 
                      alt="Mini air fryer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs text-[10px] font-bold text-slate-800 px-2 py-0.5 rounded-md border border-slate-200">
                      Eletroportátil
                    </div>
                  </div>
                  <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-display font-bold text-base text-slate-900">
                        Mini air fryer
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Praticidade e alimentação saudável sem óleo para a sua rotina diária.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                      <span className="font-semibold text-accent-600">Item mais pedido</span>
                      <CheckCircle2 size={16} className="text-accent-500" />
                    </div>
                  </div>
                </div>

                {/* 3. Panela elétrica de arroz */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-accent-400 hover:shadow-md transition-all group">
                  <div className="h-36 w-full overflow-hidden bg-slate-100 relative">
                    <img 
                      src={riceCookerImg} 
                      alt="Panela elétrica de arroz"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs text-[10px] font-bold text-slate-800 px-2 py-0.5 rounded-md border border-slate-200">
                      Cozinha Prática
                    </div>
                  </div>
                  <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-display font-bold text-base text-slate-900">
                        Panela elétrica de arroz
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Arroz perfeito, legumes no vapor e refeições rápidas com desligamento automático.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                      <span className="font-semibold text-primary-600">Entrega garantida</span>
                      <CheckCircle2 size={16} className="text-primary-500" />
                    </div>
                  </div>
                </div>

                {/* 4. Kit personalizado BQ Seguros */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-accent-400 hover:shadow-md transition-all group">
                  <div className="h-36 w-full overflow-hidden bg-slate-100 relative">
                    <img 
                      src={bqBrandedKitImg} 
                      alt="Kit personalizado BQ Seguros"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs text-[10px] font-bold text-slate-800 px-2 py-0.5 rounded-md border border-slate-200">
                      Exclusivo BQ
                    </div>
                  </div>
                  <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-display font-bold text-base text-slate-900">
                        Kit personalizado BQ Seguros
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Mochila executiva, caderneta e garrafa de água em alumínio personalizadas na identidade BQ Seguros.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                      <span className="font-semibold text-primary-600">Edição Comemorativa</span>
                      <CheckCircle2 size={16} className="text-primary-500" />
                    </div>
                  </div>
                </div>

                {/* 5. Kit de ferramentas com parafusadeira */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-accent-400 hover:shadow-md transition-all group sm:col-span-2 lg:col-span-2">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="h-44 md:h-full md:w-5/12 overflow-hidden bg-slate-100 relative shrink-0">
                      <img 
                        src={toolKitWithDrillImg} 
                        alt="Kit de ferramentas com parafusadeira"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs text-[10px] font-bold text-slate-800 px-2 py-0.5 rounded-md border border-slate-200">
                        Ferramentas & Casa
                      </div>
                    </div>
                    <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Casa & Manutenção</span>
                        <h4 className="font-display font-bold text-base sm:text-lg text-slate-900 mt-1">
                          Kit de ferramentas com parafusadeira
                        </h4>
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                          Maleta completa e resistente equipada com parafusadeira elétrica sem fio, brocas, ponteiras e ferramentas essenciais para reparos domésticos e projetos práticos.
                        </p>
                      </div>
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                        <span className="font-semibold text-accent-600">Completo com parafusadeira</span>
                        <CheckCircle2 size={16} className="text-accent-500" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* Small Print Disclaimer */}
          <div className="mt-8 pt-4 border-t border-slate-200/70 text-center">
            <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed" id="rewards-disclaimer-note">
              * Imagens meramente ilustrativas. Os modelos e opções de prêmios podem ser alterados ou substituídos sem aviso prévio conforme disponibilidade de estoque.
            </p>
          </div>

        </div>

        {/* Main CTA Button */}
        <div className="text-center space-y-4 mb-16">
          <button
            onClick={handleOpenReferralModal}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-accent-500/25 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.99]"
            id="btn-refer-someone"
          >
            <UserPlus size={18} />
            <span>Quero indicar alguém</span>
            <ArrowRight size={16} />
          </button>
          
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Sem burocracia: informe os dados do seu indicado e nós cuidamos de todo o atendimento com a cordialidade BQ Seguros.
          </p>
        </div>

        {/* Small Area for Future Full Program Rules */}
        <div className="pt-8 border-t border-slate-200/80 text-slate-500 text-xs" id="referral-rules-area">
          <div className="flex items-start gap-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200/60 max-w-4xl mx-auto">
            <FileText size={16} className="text-slate-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-slate-700 block">Regras Gerais do Programa de Indicações:</span>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                A recompensa é concedida após a confirmação do pagamento e emissão da primeira parcela da apólice pelo cliente indicado. As imagens são meramente ilustrativas e os itens/marcas dos prêmios podem ser alterados ou substituídos por equivalentes sem aviso prévio conforme disponibilidade de estoque. Válido para novos contratos fechados com a BQ Seguros.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Referral Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs"
              id="referral-modal-backdrop"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] z-10 text-slate-800"
              id="referral-modal-container"
              role="dialog"
              aria-modal="true"
              aria-labelledby="referral-modal-title"
            >
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-900 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-500"
                aria-label="Fechar janela de indicação"
              >
                <X size={18} aria-hidden="true" />
              </button>

              {!isSubmitted ? (
                <div>
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-accent-50 text-accent-600 flex items-center justify-center border border-accent-100">
                      <UserPlus size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-accent-600 uppercase tracking-wider block">Indicação Rápida</span>
                      <h3 id="referral-modal-title" className="text-xl font-display font-bold text-slate-900">
                        Indicar um Amigo ou Conhecido
                      </h3>
                    </div>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label htmlFor="ref-name" className="text-xs font-semibold text-slate-700">Seu Nome Completo *</label>
                      <input
                        id="ref-name"
                        type="text"
                        name="name"
                        autoComplete="name"
                        required
                        placeholder="Ex: João da Silva"
                        value={referrerName}
                        onChange={(e) => setReferrerName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 focus-visible:ring-2 focus-visible:ring-accent-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="ref-phone" className="text-xs font-semibold text-slate-700">Seu WhatsApp</label>
                      <input
                        id="ref-phone"
                        type="tel"
                        name="tel"
                        autoComplete="tel"
                        placeholder="Ex: (32) 99999-9999"
                        value={referrerPhone}
                        onChange={(e) => setReferrerPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 focus-visible:ring-2 focus-visible:ring-accent-500"
                      />
                    </div>

                    <div className="pt-2 border-t border-slate-100 space-y-3">
                      <span className="text-xs font-bold text-primary-700 block">Dados da Pessoa Indicada:</span>
                      
                      <div className="space-y-1">
                        <label htmlFor="ref-friend-name" className="text-xs font-semibold text-slate-700">Nome do Indicado *</label>
                        <input
                          id="ref-friend-name"
                          type="text"
                          required
                          placeholder="Ex: Maria Oliveira"
                          value={friendName}
                          onChange={(e) => setFriendName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 focus-visible:ring-2 focus-visible:ring-accent-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="ref-friend-phone" className="text-xs font-semibold text-slate-700">WhatsApp do Indicado *</label>
                        <input
                          id="ref-friend-phone"
                          type="tel"
                          required
                          placeholder="Ex: (32) 98888-8888"
                          value={friendPhone}
                          onChange={(e) => setFriendPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 focus-visible:ring-2 focus-visible:ring-accent-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="ref-insurance-type" className="text-xs font-semibold text-slate-700">Tipo de Seguro de Interesse</label>
                        <select
                          id="ref-insurance-type"
                          value={insuranceType}
                          onChange={(e) => setInsuranceType(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 focus-visible:ring-2 focus-visible:ring-accent-500 bg-white"
                        >
                          <option value="Seguro Auto">Seguro Auto</option>
                          <option value="Seguro Residencial">Seguro Residencial</option>
                          <option value="Seguro de Vida">Seguro de Vida</option>
                          <option value="Seguro Empresarial">Seguro Empresarial</option>
                          <option value="Seguro de Carga">Seguro de Carga</option>
                          <option value="Seguro Viagem">Seguro Viagem</option>
                          <option value="Seguro para Equipamentos">Seguro para Equipamentos e Instrumentos</option>
                          <option value="Outros Seguros">Outros Seguros / Fiança / Consórcio</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                      <button
                        type="submit"
                        className="w-full py-3.5 px-4 rounded-xl bg-accent-500 hover:bg-accent-600 active:bg-accent-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-accent-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all min-h-[44px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-400"
                        id="submit-referral-btn"
                      >
                        <span>Enviar Indicação via WhatsApp</span>
                        <ArrowRight size={14} aria-hidden="true" />
                      </button>

                      <a
                        href="https://wa.me/5532998800325?text=Ol%C3%A1!%20Gostaria%20de%20indicar%20um%20amigo%20para%20fazer%20um%20seguro%20com%20a%20BQ."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors text-center min-h-[44px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-500"
                      >
                        <Phone size={13} className="text-emerald-600" aria-hidden="true" />
                        <span>Falar diretamente no WhatsApp</span>
                      </a>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="py-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto" aria-hidden="true">
                    <Check size={32} />
                  </div>
                  <h3 className="text-xl font-display font-bold text-slate-900">
                    Indicação Enviada com Sucesso!
                  </h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Muito obrigado por recomendar a BQ Seguros. Nossa equipe entrará em contato com a pessoa indicada com todo o cuidado e profissionalismo.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="min-h-[44px] px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-500"
                  >
                    Fechar
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
