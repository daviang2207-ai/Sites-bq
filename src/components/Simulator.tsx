/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft, Shield, Check, Loader2, Info, Send, Sparkles, Phone, Lock, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QuoteProposal, CarrierOption } from '../types';
import { insuranceProducts } from '../data/insuranceData';
import LucideIcon from './LucideIcon';

interface SimulatorProps {
  selectedInsuranceType: string;
  onAddProposal: (proposal: QuoteProposal) => void;
  onNavigate: (section: string) => void;
}

export default function Simulator({ selectedInsuranceType, onAddProposal, onNavigate }: SimulatorProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const isInitialMount = useRef(true);

  // Form states
  const [insuranceType, setInsuranceType] = useState<string>('auto');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [docType, setDocType] = useState<'cpf' | 'cnpj'>('cpf');
  const [cep, setCep] = useState('');
  const [state, setState] = useState('MG');

  // Specific States
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  const autoYearsRange = Array.from({ length: 30 }, (_, i) => String(nextYear - i));

  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleYear, setVehicleYear] = useState(String(nextYear));
  const [vehicleUsage, setVehicleUsage] = useState<'particular' | 'comercial'>('particular');
  const [residenceType, setResidenceType] = useState<'house' | 'apartment' | 'condo'>('house');
  const [residenceNumber, setResidenceNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [occupation, setOccupation] = useState('');
  const [coParticipation, setCoParticipation] = useState('Não');
  const [companyName, setCompanyName] = useState('');
  const [companyActivity, setCompanyActivity] = useState('');
  const [travelDestination, setTravelDestination] = useState('Europa');
  const [travelDays, setTravelDays] = useState('15');
  const [equipmentType, setEquipmentType] = useState('Smartphone');
  const [equipmentValue, setEquipmentValue] = useState('');
  const [petSpecies, setPetSpecies] = useState('Cão');
  const [petName, setPetName] = useState('');
  const [petAge, setPetAge] = useState('2');
  const [motorhomeModel, setMotorhomeModel] = useState('');
  const [motorhomeValue, setMotorhomeValue] = useState('');
  const [otherInsuranceType, setOtherInsuranceType] = useState('Seguro Fiança');
  const [otherDetails, setOtherDetails] = useState('');

  // Sync selected type from cards
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (selectedInsuranceType) {
        setInsuranceType(selectedInsuranceType);
      }
      return;
    }

    if (selectedInsuranceType) {
      setInsuranceType(selectedInsuranceType);
      setCurrentStep(2); // Automatically advance to step 2 for lower friction
      const el = document.getElementById('simulator');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [selectedInsuranceType]);

  const formatCPF = (value: string) => {
    const numeric = value.replace(/\D/g, '');
    return numeric
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .substring(0, 14);
  };

  const formatCNPJ = (value: string) => {
    const numeric = value.replace(/\D/g, '');
    return numeric
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
      .substring(0, 18);
  };

  const formatPhone = (value: string) => {
    const numeric = value.replace(/\D/g, '');
    if (numeric.length <= 10) {
      return numeric.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    }
    return numeric.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').substring(0, 15);
  };

  const isStep2Valid = () => {
    // Basic checks based on insurance type
    if (insuranceType === 'auto') return vehicleModel.trim().length >= 2;
    if (insuranceType === 'home') return residenceNumber.trim().length >= 1;
    if (insuranceType === 'life') return birthDate.trim().length > 0;
    if (insuranceType === 'enterprise') return companyName.trim().length >= 2;
    if (insuranceType === 'travel') return travelDestination.length > 0;
    if (insuranceType === 'equipment') return equipmentValue.trim().length > 0;
    if (insuranceType === 'motorhome') return motorhomeModel.trim().length >= 2;
    return true;
  };

  const isStep3Valid = () => {
    const unmaskedDoc = cpf.replace(/\D/g, '');
    const unmaskedPhone = phone.replace(/\D/g, '');
    const isDocValid = docType === 'cpf' ? unmaskedDoc.length === 11 : unmaskedDoc.length === 14;
    return (
      name.trim().length >= 3 &&
      email.includes('@') &&
      unmaskedPhone.length >= 10 &&
      isDocValid &&
      cep.replace(/\D/g, '').length >= 8
    );
  };

  const getWhatsAppMessage = () => {
    const product = insuranceProducts.find(p => p.id === insuranceType);

    let detailsText = '';
    if (insuranceType === 'auto') {
      detailsText = `- *Veículo:* ${vehicleModel || 'Não informado'} (${vehicleYear})\n- *Uso:* ${vehicleUsage === 'particular' ? 'Particular / Passeio' : 'Comercial / Trabalho'}`;
    } else if (insuranceType === 'home') {
      detailsText = `- *Tipo de Imóvel:* ${residenceType === 'house' ? 'Casa' : 'Apartamento'}\n- *Nº Residência:* ${residenceNumber || 'Não informado'}`;
    } else if (insuranceType === 'life') {
      detailsText = `- *Data Nasc:* ${birthDate ? birthDate.split('-').reverse().join('/') : 'Não informada'}\n- *Profissão:* ${occupation || 'Não informada'}`;
    } else if (insuranceType === 'health') {
      detailsText = `- *Coparticipação:* ${coParticipation}`;
    } else if (insuranceType === 'enterprise') {
      detailsText = `- *Empresa:* ${companyName || 'Não informada'}\n- *Ramo:* ${companyActivity || 'Não informado'}`;
    } else if (insuranceType === 'travel') {
      detailsText = `- *Destino:* ${travelDestination}\n- *Duração:* ${travelDays} dias`;
    } else if (insuranceType === 'equipment') {
      detailsText = `- *Aparelho:* ${equipmentType}\n- *Valor Estimado:* ${equipmentValue || 'Não informado'}`;
    } else if (insuranceType === 'pet') {
      detailsText = `- *Espécie:* ${petSpecies}\n- *Nome do Pet:* ${petName || 'Não informado'}\n- *Idade:* ${petAge} anos`;
    } else if (insuranceType === 'motorhome') {
      detailsText = `- *Caminhão / Frota:* ${motorhomeModel || 'Não informado'}\n- *Valor Estimado da Carga:* R$ ${motorhomeValue || 'Não informado'}`;
    } else if (insuranceType === 'others') {
      detailsText = `- *Proteção Desejada:* ${otherInsuranceType}\n- *Detalhes:* ${otherDetails || 'Não informados'}`;
    }

    return `Olá BQ Seguros! Gostaria de receber uma cotação personalizada.\n\n` +
      `📋 *DADOS DO CLIENTE*\n` +
      `- *Nome:* ${name}\n` +
      `- *WhatsApp:* ${phone}\n` +
      `- *${docType === 'cpf' ? 'CPF' : 'CNPJ'}:* ${cpf}\n` +
      `- *E-mail:* ${email}\n` +
      `- *CEP:* ${cep} (${state})\n\n` +
      `🛡️ *DETALHES DO SEGURO*\n` +
      `- *Tipo de Seguro:* ${product?.title || 'Seguro'}\n` +
      detailsText + `\n\n` +
      `*ID da Solicitação:* BQ-SOL-${Math.floor(1000 + Math.random() * 9000)}\n` +
      `Estou no aguardo do contato do especialista!`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep3Valid()) return;

    setLoading(true);

    setTimeout(() => {
      const simId = `BQ-SOL-${Math.floor(1000 + Math.random() * 9000)}`;
      const baseProduct = insuranceProducts.find(p => p.id === insuranceType) || insuranceProducts[0];
      const baseVal = baseProduct.basePrice || 120;
      const mockCarriersList: CarrierOption[] = [
        {
          carrierName: 'Porto Seguro',
          logo: 'Porto',
          monthlyPremium: baseVal,
          yearlyPremium: baseVal * 11,
          deductible: insuranceType === 'auto' ? 'R$ 1.950,00' : 'R$ 450,00',
          highlights: ['Selo Ouro SUSEP', 'Atendimento Humanizado 24h', 'Socorro Mecânico Ilimitado']
        }
      ];

      const newProposal: QuoteProposal = {
        id: simId,
        createdAt: new Date().toLocaleDateString('pt-BR'),
        status: 'pending',
        selectedCarrier: 'Porto Seguro',
        input: {
          type: insuranceType as any,
          name,
          email,
          phone,
          cpf: cpf.replace(/\D/g, ''),
          state,
          cep: cep.replace(/\D/g, ''),
          vehicleModel: insuranceType === 'auto' ? vehicleModel : undefined,
          vehicleYear: insuranceType === 'auto' ? vehicleYear : undefined,
          vehicleUsage: insuranceType === 'auto' ? vehicleUsage : undefined,
          residenceType: insuranceType === 'home' ? residenceType : undefined,
          birthDate: ['life', 'health'].includes(insuranceType) ? birthDate : undefined,
          occupation: insuranceType === 'life' ? occupation : undefined
        },
        options: mockCarriersList
      };

      onAddProposal(newProposal);

      const finalMsg = getWhatsAppMessage();
      window.open(`https://wa.me/5532998800325?text=${encodeURIComponent(finalMsg)}`, '_blank');

      setLoading(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setName('');
    setEmail('');
    setPhone('');
    setCpf('');
    setDocType('cpf');
    setCep('');
    setVehicleModel('');
    setResidenceNumber('');
    setBirthDate('');
    setOccupation('');
    setCompanyName('');
    setCompanyActivity('');
    setEquipmentValue('');
    setPetName('');
  };

  const selectedProduct = insuranceProducts.find(p => p.id === insuranceType) || insuranceProducts[0];

  return (
    <section id="simulator" className="py-20 bg-white relative border-t border-slate-100 overflow-hidden">
      {/* Ambient background accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Block with Step Tracker */}
        <div className="text-center mb-8 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-accent-500/10 text-accent-700 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-accent-500/20 shadow-xs">
            <Sparkles size={13} className="text-accent-600" />
            <span>Cotação Rápida & Sem Burocracia</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-slate-900 tracking-tight" id="simulator-title">
            Calcule Seu Seguro
          </h2>
          
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Receba uma análise comparativa das principais seguradoras com consultoria personalizada.
          </p>

          {/* Stepper Progress Bar */}
          {!isSubmitted && (
            <div className="pt-4 max-w-xl mx-auto">
              <div className="flex items-center justify-between gap-2">
                {[
                  { step: 1, title: '1. Tipo de Seguro' },
                  { step: 2, title: '2. Detalhes' },
                  { step: 3, title: '3. Seus Dados' }
                ].map((s) => (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => {
                      if (s.step < currentStep) setCurrentStep(s.step as any);
                    }}
                    className={`flex-1 py-2 px-3 rounded-xl border text-center transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      currentStep === s.step
                        ? 'bg-accent-500 text-white font-bold border-accent-500 shadow-sm'
                        : currentStep > s.step
                        ? 'bg-emerald-50 text-emerald-700 font-semibold border-emerald-200 hover:bg-emerald-100'
                        : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}
                  >
                    {currentStep > s.step ? (
                      <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                    ) : (
                      <span className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ${
                        currentStep === s.step ? 'bg-white text-accent-700' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {s.step}
                      </span>
                    )}
                    <span className="text-xs truncate">{s.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key={`step-wrapper-${currentStep}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="bg-slate-50/70 border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm max-w-3xl mx-auto"
              id="simulator-container"
            >
              {/* STEP 1: SELECT INSURANCE TYPE */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <h3 className="font-display font-bold text-base text-slate-900">
                        Passo 1 de 3: Qual seguro você quer calcular?
                      </h3>
                      <p className="text-xs text-slate-500">
                        Selecione a modalidade desejada para avançar
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {insuranceProducts.map((p) => (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => {
                          setInsuranceType(p.id);
                        }}
                        className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 relative min-h-[90px] ${
                          insuranceType === p.id
                            ? 'bg-accent-500 text-white font-bold border-accent-500 shadow-md shadow-accent-500/20'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                        }`}
                        id={`sim-select-${p.id}`}
                      >
                        <div className={`p-2 rounded-xl transition-colors ${insuranceType === p.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                          <LucideIcon name={p.iconName} size={20} />
                        </div>
                        <span className="text-xs block font-medium tracking-tight leading-tight">{p.title}</span>
                      </button>
                    ))}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="bg-accent-500 hover:bg-accent-600 active:bg-accent-700 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all shadow-md shadow-accent-500/20 flex items-center gap-2 cursor-pointer"
                      id="btn-step1-next"
                    >
                      <span>Avançar para Detalhes</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: PRODUCT-SPECIFIC DETAILS */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent-600">Passo 2 de 3</span>
                      <h3 className="font-display font-bold text-base text-slate-900">
                        Detalhes para o {selectedProduct.title}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
                    >
                      Alterar modalidade
                    </button>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                    {/* AUTO */}
                    {insuranceType === 'auto' && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700">Marca / Modelo do Veículo *</label>
                          <input
                            required
                            type="text"
                            value={vehicleModel}
                            onChange={(e) => setVehicleModel(e.target.value)}
                            placeholder="Ex: Corolla, HB20, Compass"
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-accent-500"
                            id="spec-auto-model"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700">Ano de Fabricação / Modelo</label>
                          <select
                            value={vehicleYear}
                            onChange={(e) => setVehicleYear(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden cursor-pointer"
                            id="spec-auto-year"
                          >
                            {autoYearsRange.map(y => (
                              <option key={y} value={y}>{y}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700">Finalidade do Uso</label>
                          <div className="grid grid-cols-2 gap-2">
                            {(['particular', 'comercial'] as const).map((u) => (
                              <button
                                type="button"
                                key={u}
                                onClick={() => setVehicleUsage(u)}
                                className={`py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                                  vehicleUsage === u
                                    ? 'bg-accent-500 text-white border-accent-500'
                                    : 'bg-slate-50 border-slate-300 text-slate-700'
                                }`}
                              >
                                {u === 'particular' ? 'Passeio' : 'Comercial'}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* RESIDENTIAL */}
                    {insuranceType === 'home' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700">Tipo de Imóvel</label>
                          <div className="grid grid-cols-2 gap-2">
                            {(['house', 'apartment'] as const).map((t) => (
                              <button
                                type="button"
                                key={t}
                                onClick={() => setResidenceType(t)}
                                className={`py-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                                  residenceType === t
                                    ? 'bg-accent-500 text-white border-accent-500'
                                    : 'bg-slate-50 border-slate-300 text-slate-700'
                                }`}
                              >
                                {t === 'house' ? 'Casa' : 'Apartamento'}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700">Número da Residência *</label>
                          <input
                            required
                            type="text"
                            value={residenceNumber}
                            onChange={(e) => setResidenceNumber(e.target.value)}
                            placeholder="Ex: 152 Bloco B"
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-accent-500"
                            id="spec-res-number"
                          />
                        </div>
                      </div>
                    )}

                    {/* LIFE */}
                    {insuranceType === 'life' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700">Data de Nascimento *</label>
                          <input
                            required
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden"
                            id="spec-life-birth"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700">Profissão Principal</label>
                          <input
                            type="text"
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                            placeholder="Ex: Engenheiro, Advogado, Autônomo"
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden"
                            id="spec-life-job"
                          />
                        </div>
                      </div>
                    )}

                    {/* ENTERPRISE */}
                    {insuranceType === 'enterprise' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700">Nome da Empresa / Fantasia *</label>
                          <input
                            required
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="Ex: Minha Empresa Ltda"
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden"
                            id="spec-enterprise-name"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700">Ramo de Atividade</label>
                          <input
                            type="text"
                            value={companyActivity}
                            onChange={(e) => setCompanyActivity(e.target.value)}
                            placeholder="Ex: Comércio Varejista, Clínica, Indústria"
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden"
                            id="spec-enterprise-activity"
                          />
                        </div>
                      </div>
                    )}

                    {/* TRAVEL */}
                    {insuranceType === 'travel' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700">Destino Principal</label>
                          <select
                            value={travelDestination}
                            onChange={(e) => setTravelDestination(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden cursor-pointer"
                          >
                            {['Europa', 'América do Norte (EUA/Canadá)', 'América do Sul', 'Ásia e Oceania', 'África'].map(d => (
                              <option key={d} value={d}>{d}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700">Duração da Viagem (Dias)</label>
                          <input
                            required
                            type="number"
                            min="1"
                            max="365"
                            value={travelDays}
                            onChange={(e) => setTravelDays(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden"
                          />
                        </div>
                      </div>
                    )}

                    {/* EQUIPMENT */}
                    {insuranceType === 'equipment' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700">Tipo de Equipamento</label>
                          <select
                            value={equipmentType}
                            onChange={(e) => setEquipmentType(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden cursor-pointer"
                          >
                            {['Smartphone / iPhone', 'Notebook / Macbook', 'Câmera / Equipamento Fotográfico', 'Tablet / iPad', 'Drone', 'Painel Solar', 'Outros'].map(t => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700">Valor Estimado do Item (R$) *</label>
                          <input
                            required
                            type="text"
                            value={equipmentValue}
                            onChange={(e) => setEquipmentValue(e.target.value)}
                            placeholder="Ex: 5.000"
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden"
                          />
                        </div>
                      </div>
                    )}

                    {/* CARGO / MOTORHOME */}
                    {insuranceType === 'motorhome' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700">Tipo de Caminhão / Frota *</label>
                          <input
                            required
                            type="text"
                            value={motorhomeModel}
                            onChange={(e) => setMotorhomeModel(e.target.value)}
                            placeholder="Ex: Scania R450 / Volvo / Mercedes"
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700">Valor Médio da Carga (R$)</label>
                          <input
                            type="text"
                            value={motorhomeValue}
                            onChange={(e) => setMotorhomeValue(e.target.value)}
                            placeholder="Ex: 200.000"
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden"
                          />
                        </div>
                      </div>
                    )}

                    {/* OTHERS */}
                    {insuranceType === 'others' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700">Qual Proteção Deseja?</label>
                          <select
                            value={otherInsuranceType}
                            onChange={(e) => setOtherInsuranceType(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden cursor-pointer"
                          >
                            {['Seguro Bike Premium', 'Seguro Fiança Locatícia', 'Consórcio', 'Seguro Náutico', 'Responsabilidade Civil Profissional', 'Outros'].map(t => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700">Detalhes Adicionais (Opcional)</label>
                          <input
                            type="text"
                            value={otherDetails}
                            onChange={(e) => setOtherDetails(e.target.value)}
                            placeholder="Ex: Modelo da bike, valor do aluguel..."
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs px-4 py-3 rounded-xl border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft size={14} />
                      <span>Voltar</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      disabled={!isStep2Valid()}
                      className={`font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                        isStep2Valid()
                          ? 'bg-accent-500 hover:bg-accent-600 text-white shadow-accent-500/20'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                      id="btn-step2-next"
                    >
                      <span>Avançar para Contato</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: CONTACT & SUBMISSION */}
              {currentStep === 3 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent-600">Passo 3 de 3</span>
                      <h3 className="font-display font-bold text-base text-slate-900">
                        Onde enviamos as opções de cotação?
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
                    >
                      Voltar aos detalhes
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="sim-input-name" className="text-xs font-semibold text-slate-700">Seu Nome Completo *</label>
                      <input
                        required
                        id="sim-input-name"
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Rodrigo de Oliveira"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-accent-500 focus-visible:ring-2 focus-visible:ring-accent-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="sim-input-phone" className="text-xs font-semibold text-slate-700">Celular / WhatsApp *</label>
                      <input
                        required
                        id="sim-input-phone"
                        type="tel"
                        name="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(formatPhone(e.target.value))}
                        placeholder="(32) 99880-0325"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-accent-500 focus-visible:ring-2 focus-visible:ring-accent-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label htmlFor="sim-input-cpf" className="text-xs font-semibold text-slate-700">Documento ({docType.toUpperCase()}) *</label>
                        <div className="flex bg-slate-200/60 p-0.5 rounded-lg border border-slate-200 shadow-xs" role="group" aria-label="Tipo de documento">
                          <button
                            type="button"
                            onClick={() => {
                              setDocType('cpf');
                              setCpf('');
                            }}
                            className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                              docType === 'cpf' ? 'bg-white text-accent-700 shadow-xs' : 'text-slate-600'
                            }`}
                          >
                            CPF
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setDocType('cnpj');
                              setCpf('');
                            }}
                            className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                              docType === 'cnpj' ? 'bg-white text-accent-700 shadow-xs' : 'text-slate-600'
                            }`}
                          >
                            CNPJ
                          </button>
                        </div>
                      </div>
                      <input
                        required
                        id="sim-input-cpf"
                        type="text"
                        value={cpf}
                        onChange={(e) => setCpf(docType === 'cpf' ? formatCPF(e.target.value) : formatCNPJ(e.target.value))}
                        placeholder={docType === 'cpf' ? "000.000.000-00" : "00.000.000/0000-00"}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-accent-500 focus-visible:ring-2 focus-visible:ring-accent-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="sim-input-email" className="text-xs font-semibold text-slate-700">E-mail *</label>
                      <input
                        required
                        id="sim-input-email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ex: rodrigo@exemplo.com"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-accent-500 focus-visible:ring-2 focus-visible:ring-accent-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="sim-input-cep" className="text-xs font-semibold text-slate-700">CEP do Local de Pernoite / Residência *</label>
                      <input
                        required
                        id="sim-input-cep"
                        type="text"
                        maxLength={9}
                        value={cep}
                        onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}
                        placeholder="Ex: 36200-068"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-accent-500 focus-visible:ring-2 focus-visible:ring-accent-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="sim-input-state" className="text-xs font-semibold text-slate-700">Estado (UF)</label>
                      <select
                        id="sim-input-state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-hidden cursor-pointer"
                      >
                        {['MG', 'SP', 'RJ', 'ES', 'PR', 'SC', 'RS', 'DF', 'BA', 'PE', 'CE', 'GO'].map((uf) => (
                          <option key={uf} value={uf}>{uf}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Summary of what is being requested */}
                  <div className="bg-sky-50/70 border border-sky-200/80 rounded-2xl p-4 flex items-center justify-between text-xs text-sky-950">
                    <div className="flex items-center gap-2.5">
                      <Shield size={18} className="text-sky-600 shrink-0" />
                      <div>
                        <span className="font-bold block">Seguro Selecionado: {selectedProduct.title}</span>
                        <span className="text-slate-500 text-[11px]">Comparando propostas nas 12 maiores seguradoras</span>
                      </div>
                    </div>
                    <span className="font-mono text-[11px] font-bold text-sky-700 bg-sky-100 px-2.5 py-1 rounded-lg">
                      100% Grátis
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs px-4 py-3.5 rounded-xl border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <ArrowLeft size={14} />
                        <span>Voltar</span>
                      </button>

                      <button
                        type="submit"
                        disabled={loading || !isStep3Valid()}
                        className={`flex-1 font-bold text-xs sm:text-sm py-4 px-6 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md ${
                          isStep3Valid()
                            ? 'bg-accent-500 hover:bg-accent-600 active:bg-accent-700 text-white shadow-accent-500/25 hover:scale-[1.01]'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                        id="sim-submit-lead-form"
                      >
                        {loading ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            <span>Preparando atendimento especializado...</span>
                          </>
                        ) : (
                          <>
                            <span>Calcular meu seguro agora</span>
                            <ArrowRight size={16} />
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                      <Lock size={12} className="text-slate-400" />
                      <span>Seus dados são 100% protegidos sob sigilo e LGPD. Sem compromisso.</span>
                    </div>
                  </div>
                </form>
              )}

            </motion.div>
          ) : (
            // SUCCESS REDIRECTION STATE SCREEN
            <motion.div
              key="success-container"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-6 shadow-xl"
              id="simulator-success-screen"
            >
              <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md shadow-emerald-100/30">
                <Check size={32} />
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-semibold text-2xl text-primary-500">Solicitação Recebida!</h3>
                <p className="text-slate-600 text-xs sm:text-sm">
                  Olá <strong className="text-slate-800">{name}</strong>, preparamos sua solicitação de cálculo para envio direto aos consultores pelo WhatsApp.
                </p>
              </div>

              {/* Info recap block */}
              <div className="bg-emerald-50/50 border border-emerald-200/60 p-4 rounded-2xl text-left text-xs space-y-2 font-mono">
                <div className="flex justify-between"><span className="text-slate-500">Modalidade:</span><span className="text-slate-800 font-semibold uppercase">{selectedProduct.title}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Atendimento:</span><span className="text-emerald-700 font-bold">Corretor Credenciado SUSEP</span></div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-[11px] text-slate-500 leading-relaxed">
                ℹ️ Já abrimos o WhatsApp com os dados estruturados para que nossa equipe te envie as cotações oficiais. Caso não tenha aberto, clique no botão abaixo.
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`https://wa.me/5532998800325?text=${encodeURIComponent(getWhatsAppMessage())}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl text-xs transition-all text-center flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
                  id="btn-manual-whatsapp"
                >
                  <Send size={14} /> Abrir WhatsApp Agora
                </a>
                <button
                  onClick={() => onNavigate('home')}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3.5 px-4 rounded-xl border border-slate-200 text-xs transition-colors cursor-pointer"
                  id="btn-success-portal"
                >
                  Voltar ao Início
                </button>
              </div>

              <button
                onClick={handleReset}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold underline block mx-auto cursor-pointer pt-2"
                id="btn-start-over"
              >
                Fazer Nova Simulação de Seguro
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
