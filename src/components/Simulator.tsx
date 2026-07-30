/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowRight, Shield, Check, Loader2, Info, Send, Gift, Sparkles, Building, Phone, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QuoteInput, QuoteProposal, CarrierOption } from '../types';
import { insuranceProducts } from '../data/insuranceData';
import LucideIcon from './LucideIcon';

interface SimulatorProps {
  selectedInsuranceType: string;
  onAddProposal: (proposal: QuoteProposal) => void;
  onNavigate: (section: string) => void;
}

export default function Simulator({ selectedInsuranceType, onAddProposal, onNavigate }: SimulatorProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
  // Inteligência de geração dinâmica: intervalo de 30 anos onde o último ano é sempre o próximo em relação ao atual
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

  // New States
  const [motorhomeModel, setMotorhomeModel] = useState('');
  const [motorhomeValue, setMotorhomeValue] = useState('');
  const [otherInsuranceType, setOtherInsuranceType] = useState('Seguro Fiança');
  const [otherDetails, setOtherDetails] = useState('');

  // Sync selected type from cards or other parts of the site
  useEffect(() => {
    if (selectedInsuranceType) {
      setInsuranceType(selectedInsuranceType);
      // Smoothly scroll to simulator when selected
      const el = document.getElementById('simulator');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [selectedInsuranceType]);

  const getActiveGift = () => {
    if (insuranceType === 'auto') {
      return 'Lixeirinha para carro, aromatizante, caneta personalizada e abridor de lata personalizado BQ 🎁';
    }
    return 'Brinde Surpresa Exclusivo BQ 🎁';
  };

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

  const validateForm = () => {
    const unmaskedDoc = cpf.replace(/\D/g, '');
    const unmaskedPhone = phone.replace(/\D/g, '');
    const isDocValid = docType === 'cpf' ? unmaskedDoc.length === 11 : unmaskedDoc.length === 14;
    return (
      name.trim().length >= 4 &&
      email.includes('@') &&
      unmaskedPhone.length >= 10 &&
      isDocValid &&
      cep.replace(/\D/g, '').length >= 8
    );
  };

  // Compile formatted WhatsApp message
  const getWhatsAppMessage = () => {
    const product = insuranceProducts.find(p => p.id === insuranceType);
    const gift = getActiveGift();

    let detailsText = '';
    if (insuranceType === 'auto') {
      detailsText = `- *Veículo:* ${vehicleModel || 'Não informado'} (${vehicleYear})\n- *Uso:* ${vehicleUsage === 'particular' ? 'Particular / Passeio' : 'Comercial / Trabalho'}`;
    } else if (insuranceType === 'home') {
      detailsText = `- *Tipo de Imóvel:* ${residenceType === 'house' ? 'Casa' : residenceType === 'apartment' ? 'Apartamento' : 'Condomínio'}\n- *Nº Residência:* ${residenceNumber || 'Não informado'}`;
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
      `🎁 *MEU BRINDE GARANTIDO DE BOAS-VINDAS*\n` +
      `- ${gift}\n\n` +
      `*ID da Solicitação:* BQ-SOL-${Math.floor(1000 + Math.random() * 9000)}\n` +
      `Estou no aguardo do contato do especialista!`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    setTimeout(() => {
      // 1. Create mock proposal data for Portal do Cliente
      const simId = `BQ-SOL-${Math.floor(1000 + Math.random() * 9000)}`;
      const baseProduct = insuranceProducts.find(p => p.id === insuranceType) || insuranceProducts[0];
      const baseVal = baseProduct.basePrice || 150;
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

      // Add to ClientPortal proposals state
      onAddProposal(newProposal);

      // 2. Open WhatsApp Link
      const finalMsg = getWhatsAppMessage();
      window.open(`https://wa.me/5532998800325?text=${encodeURIComponent(finalMsg)}`, '_blank');

      // 3. Set UI state
      setLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setCpf('');
    setDocType('cpf');
    setCep('');
    setVehicleModel('');
    setVehicleUsage('particular');
    setResidenceNumber('');
    setBirthDate('');
    setOccupation('');
    setCompanyName('');
    setCompanyActivity('');
    setEquipmentValue('');
    setPetName('');
  };

  return (
    <section id="simulator" className="py-20 bg-white relative border-t border-slate-100 overflow-hidden">
      {/* Glow ambient background element */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20 shadow-sm">
            <Phone size={12} className="text-emerald-600" /> Cotação Rápida no WhatsApp
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary-500 tracking-tight" id="simulator-title">
            Solicite Sua Cotação em 1 Minuto
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Escolha a categoria desejada, preencha seus dados básicos e vá direto ao nosso WhatsApp para receber uma cotação personalizada e garantir seu brinde de boas-vindas!
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form-container"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              
              {/* LEFT COLUMN: FORM FIELD INPUTS */}
              <div className="lg:col-span-7 bg-slate-50/50 border border-slate-200/85 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between" id="simulator-container">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Category Grid selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 block">Selecione o Seguro Desejado</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {insuranceProducts.map((p) => (
                        <button
                          type="button"
                          key={p.id}
                          onClick={() => setInsuranceType(p.id)}
                          className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 relative overflow-hidden group shadow-sm ${
                            insuranceType === p.id
                              ? 'bg-accent-500/10 border-accent-400 text-accent-700 font-semibold'
                              : 'bg-white border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-800'
                          }`}
                          id={`sim-select-${p.id}`}
                        >
                          <div className={`p-2 rounded-lg transition-colors ${insuranceType === p.id ? 'bg-accent-500/20 text-accent-700' : 'bg-slate-50 text-slate-400 group-hover:text-slate-600'}`}>
                            <LucideIcon name={p.iconName} size={18} />
                          </div>
                          <span className="font-display font-medium text-[10px] sm:text-xs block tracking-tight leading-tight">{p.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-slate-200/60 my-4" />

                  {/* General Profile fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">Seu Nome Completo</label>
                      <input
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Rodrigo de Oliveira"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-accent-500 transition-colors"
                        id="sim-input-name"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">Celular / WhatsApp</label>
                      <input
                        required
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(formatPhone(e.target.value))}
                        placeholder="(32) 99880-0325"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-accent-500 transition-colors"
                        id="sim-input-phone"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-slate-600">Documento</label>
                        <div className="flex bg-slate-200/50 p-0.5 rounded-lg border border-slate-200 shadow-sm">
                          <button
                            type="button"
                            onClick={() => {
                              setDocType('cpf');
                              setCpf('');
                            }}
                            className={`px-2.5 py-0.5 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                              docType === 'cpf'
                                ? 'bg-white text-accent-700 shadow-sm'
                                : 'text-slate-500 hover:text-slate-800'
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
                            className={`px-2.5 py-0.5 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                              docType === 'cnpj'
                                ? 'bg-white text-accent-700 shadow-sm'
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            CNPJ
                          </button>
                        </div>
                      </div>
                      <input
                        required
                        type="text"
                        value={cpf}
                        onChange={(e) => setCpf(docType === 'cpf' ? formatCPF(e.target.value) : formatCNPJ(e.target.value))}
                        placeholder={docType === 'cpf' ? "000.000.000-00" : "00.000.000/0000-00"}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-accent-500 transition-colors"
                        id="sim-input-cpf"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">E-mail</label>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ex: rodrigo@exemplo.com"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-accent-500 transition-colors"
                        id="sim-input-email"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">CEP</label>
                      <input
                        required
                        type="text"
                        maxLength={9}
                        value={cep}
                        onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}
                        placeholder="Ex: 36200-068"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-accent-500 transition-colors"
                        id="sim-input-cep"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">Estado (UF)</label>
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-accent-500 transition-colors cursor-pointer"
                        id="sim-input-state"
                      >
                        {['MG', 'SP', 'RJ', 'ES', 'PR', 'SC', 'RS', 'DF', 'BA', 'PE', 'CE', 'GO'].map((uf) => (
                          <option key={uf} value={uf}>{uf}</option>
                        ))}
                      </select>
                    </div>

                  </div>

                  {/* Dynamic specific details frame */}
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                      <Shield size={14} className="text-accent-500" />
                      <span className="font-display font-bold text-xs text-slate-800 uppercase tracking-wider">
                        Campos específicos para o Seguro {insuranceProducts.find(p => p.id === insuranceType)?.title}
                      </span>
                    </div>

                    {/* AUTO */}
                    {insuranceType === 'auto' && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-500">Marca / Modelo do Veículo</label>
                          <input
                            required
                            type="text"
                            value={vehicleModel}
                            onChange={(e) => setVehicleModel(e.target.value)}
                            placeholder="Ex: Jeep Compass, Corolla"
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-accent-500"
                            id="spec-auto-model"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-500">Ano do Veículo</label>
                          <select
                            value={vehicleYear}
                            onChange={(e) => setVehicleYear(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none cursor-pointer"
                            id="spec-auto-year"
                          >
                            {autoYearsRange.map(y => (
                              <option key={y} value={y}>{y}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-500">Uso do Veículo</label>
                          <div className="grid grid-cols-2 gap-2">
                            {(['particular', 'comercial'] as const).map((u) => (
                              <button
                                type="button"
                                key={u}
                                onClick={() => setVehicleUsage(u)}
                                className={`py-2 rounded-lg border text-[10px] font-medium cursor-pointer transition-all duration-300 ${
                                  vehicleUsage === u
                                    ? 'bg-accent-500/10 border-accent-500 text-accent-700 font-semibold'
                                    : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-700'
                                }`}
                                id={`spec-auto-usage-${u}`}
                              >
                                {u === 'particular' ? 'Particular' : 'Comercial'}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* HOME */}
                    {insuranceType === 'home' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-500">Tipo de Imóvel</label>
                          <div className="grid grid-cols-2 gap-2">
                            {(['house', 'apartment'] as const).map((t) => (
                              <button
                                type="button"
                                key={t}
                                onClick={() => setResidenceType(t)}
                                className={`py-2 rounded-lg border text-[10px] font-medium cursor-pointer transition-colors ${
                                  residenceType === t
                                    ? 'bg-accent-500/10 border-accent-500 text-accent-700 font-semibold'
                                    : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-700'
                                }`}
                                id={`spec-res-type-${t}`}
                              >
                                {t === 'house' ? 'Casa' : 'Apto'}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-500">Número da Residência</label>
                          <input
                            required
                            type="text"
                            value={residenceNumber}
                            onChange={(e) => setResidenceNumber(e.target.value)}
                            placeholder="Ex: 152 A"
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-accent-500"
                            id="spec-res-number"
                          />
                        </div>
                      </div>
                    )}

                    {/* LIFE */}
                    {insuranceType === 'life' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-500">Data de Nascimento</label>
                          <input
                            required
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-accent-500"
                            id="spec-life-birth"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-500">Profissão Principal</label>
                          <input
                            required
                            type="text"
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                            placeholder="Ex: Engenheiro, Comerciante"
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-accent-500"
                            id="spec-life-job"
                          />
                        </div>
                      </div>
                    )}

                    {/* HEALTH */}
                    {insuranceType === 'health' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-500">Opção de Coparticipação</label>
                          <div className="grid grid-cols-2 gap-2">
                            {['Sim', 'Não'].map((opt) => (
                              <button
                                type="button"
                                key={opt}
                                onClick={() => setCoParticipation(opt)}
                                className={`py-2 rounded-lg border text-[10px] font-medium cursor-pointer transition-colors ${
                                  coParticipation === opt
                                    ? 'bg-accent-500/10 border-accent-500 text-accent-700 font-semibold'
                                    : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-700'
                                }`}
                                id={`spec-health-copart-${opt}`}
                              >
                                {opt === 'Sim' ? 'Com Coparticipação' : 'Sem Coparticipação'}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-1 flex flex-col justify-center">
                          <span className="text-[10px] text-slate-500 font-medium">Recomendação:</span>
                          <span className="text-[10px] text-accent-700 bg-accent-500/10 border border-accent-500/20 rounded-lg p-2 mt-0.5 leading-relaxed font-medium">
                            Planos com coparticipação têm mensalidades até 20% menores!
                          </span>
                        </div>
                      </div>
                    )}

                    {/* ENTERPRISE */}
                    {insuranceType === 'enterprise' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-500">Nome da Empresa</label>
                          <input
                            required
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="Ex: AutoPeças BQ Ltda"
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-accent-500"
                            id="spec-enterprise-name"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-500">Ramo de Atividade</label>
                          <input
                            required
                            type="text"
                            value={companyActivity}
                            onChange={(e) => setCompanyActivity(e.target.value)}
                            placeholder="Ex: Comércio, Escritório"
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-accent-500"
                            id="spec-enterprise-activity"
                          />
                        </div>
                      </div>
                    )}

                    {/* TRAVEL */}
                    {insuranceType === 'travel' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-500">Destino Principal</label>
                          <select
                            value={travelDestination}
                            onChange={(e) => setTravelDestination(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none cursor-pointer"
                            id="spec-travel-dest"
                          >
                            {['Europa', 'América do Norte', 'América do Sul', 'Ásia e Oceania', 'África'].map(d => (
                              <option key={d} value={d}>{d}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-500">Duração da Viagem (Dias)</label>
                          <input
                            required
                            type="number"
                            min="1"
                            max="365"
                            value={travelDays}
                            onChange={(e) => setTravelDays(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-accent-500"
                            id="spec-travel-days"
                          />
                        </div>
                      </div>
                    )}

                    {/* EQUIPMENT */}
                    {insuranceType === 'equipment' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-500">Tipo de Aparelho</label>
                          <select
                            value={equipmentType}
                            onChange={(e) => setEquipmentType(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none cursor-pointer"
                            id="spec-equipment-type"
                          >
                            {['Smartphone', 'Notebook', 'Câmera Fotográfica', 'Tablet / iPad', 'Drone', 'Placa Solar', 'Outros'].map(t => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-500">Valor Estimado do Item (R$)</label>
                          <input
                            required
                            type="text"
                            value={equipmentValue}
                            onChange={(e) => setEquipmentValue(e.target.value)}
                            placeholder="Ex: 4.500"
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-accent-500"
                            id="spec-equipment-value"
                          />
                        </div>
                      </div>
                    )}

                    {/* PET */}
                    {insuranceType === 'pet' && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-500">Tipo de Pet</label>
                          <div className="grid grid-cols-2 gap-1.5">
                            {['Cão', 'Gato'].map((spec) => (
                              <button
                                type="button"
                                key={spec}
                                onClick={() => setPetSpecies(spec)}
                                className={`py-2 rounded-lg border text-[10px] font-medium cursor-pointer transition-colors ${
                                  petSpecies === spec
                                    ? 'bg-accent-500/10 border-accent-500 text-accent-700 font-semibold'
                                    : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-700'
                                }`}
                                id={`spec-pet-spec-${spec}`}
                              >
                                {spec}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-500">Nome do Pet</label>
                          <input
                            required
                            type="text"
                            value={petName}
                            onChange={(e) => setPetName(e.target.value)}
                            placeholder="Ex: Toddy"
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                            id="spec-pet-name"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-500">Idade (Anos)</label>
                          <select
                            value={petAge}
                            onChange={(e) => setPetAge(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                            id="spec-pet-age"
                          >
                            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'].map(a => (
                              <option key={a} value={a}>{a} {parseInt(a) <= 1 ? 'ano' : 'anos'}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                    {/* SEGURO DE CARGA / CAMINHÃO */}
                    {insuranceType === 'motorhome' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-500">Modelo do Caminhão / Tipo de Frota</label>
                          <input
                            required
                            type="text"
                            value={motorhomeModel}
                            onChange={(e) => setMotorhomeModel(e.target.value)}
                            placeholder="Ex: Volvo FH 540 / Scania / Mercedes 1620"
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-accent-500"
                            id="spec-truck-model"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-500">Valor Estimado da Carga (R$)</label>
                          <input
                            required
                            type="text"
                            value={motorhomeValue}
                            onChange={(e) => setMotorhomeValue(e.target.value)}
                            placeholder="Ex: 180.000"
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-accent-500"
                            id="spec-truck-value"
                          />
                        </div>
                      </div>
                    )}

                    {/* OTHERS */}
                    {insuranceType === 'others' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-500">Qual Proteção Procura?</label>
                          <select
                            value={otherInsuranceType}
                            onChange={(e) => setOtherInsuranceType(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none cursor-pointer"
                            id="spec-others-type"
                          >
                            {['Seguro Bike Premium', 'Seguro Fiança', 'Consórcio', 'Seguro Náutico (Lancha/Barco)', 'Seguro Agrícola', 'Garantia Contratual', 'Responsabilidade Civil Profissional', 'Outros'].map(t => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-500">Mais Detalhes (Opcional)</label>
                          <input
                            type="text"
                            value={otherDetails}
                            onChange={(e) => setOtherDetails(e.target.value)}
                            placeholder="Ex: Bike aro 29, ou marca/modelo"
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-accent-500"
                            id="spec-others-details"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading || !validateForm()}
                      className={`w-full font-bold text-xs sm:text-sm py-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md ${
                        validateForm()
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
                          : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                      }`}
                      id="sim-submit-lead-form"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Gerando proposta & abrindo WhatsApp...
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          Solicitar Cotação no WhatsApp & Garantir Brinde 🚀
                        </>
                      )}
                    </button>
                  </div>

                </form>
              </div>

              {/* RIGHT COLUMN: BENEFITS & SURPRISE GIFT PROMO CARD */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                
                {/* Visual promo card */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 relative overflow-hidden shadow-sm flex-1 flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <Gift size={16} className="text-emerald-500 animate-bounce" />
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 uppercase tracking-widest font-extrabold shadow-sm">Campanha de Boas-Vindas BQ</span>
                      </div>
                      <span className="text-[10px] text-emerald-900 bg-emerald-100 border-2 border-emerald-400 px-2.5 py-0.5 rounded-full font-mono font-extrabold shadow-sm">BRINDE GARANTIDO 🎁</span>
                    </div>

                    <div className="text-center py-4 bg-emerald-50/70 rounded-2xl border-2 border-emerald-400/80 relative overflow-hidden group shadow-sm">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <Sparkles size={38} className="mx-auto text-emerald-500 animate-pulse mb-2 drop-shadow-sm" />
                      <span className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold block">Garantia BQ Seguros</span>
                      {insuranceType === 'auto' ? (
                        <>
                          <h4 className="text-lg font-bold text-primary-500 font-display tracking-wide mt-1">
                            Kit Auto Exclusivo! 🚗
                          </h4>
                          <p className="text-emerald-800 text-[11px] max-w-xs mx-auto mt-1 leading-relaxed px-4 font-semibold">
                            Lixeirinha para carro, aromatizante, caneta personalizada e um abridor de lata personalizado com a marca BQ garantidos 100% grátis!
                          </p>
                        </>
                      ) : (
                        <>
                          <h4 className="text-lg font-bold text-primary-500 font-display tracking-wide mt-1">
                            Brinde Surpresa Especial! 🎁
                          </h4>
                          <p className="text-slate-600 text-[11px] max-w-xs mx-auto mt-1 leading-relaxed px-4">
                            Um presente incrível premium do nosso catálogo oficial será garantido 100% grátis na contratação do seu seguro.
                          </p>
                        </>
                      )}
                    </div>

                    {/* Benefits & How it works list */}
                    <div className="space-y-3">
                      <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider mb-1">Como Funciona</span>
                      
                      <div className="flex gap-2.5 items-start text-xs text-slate-600">
                        <div className="bg-emerald-500/10 text-emerald-700 p-1 rounded font-bold font-mono text-[10px] mt-0.5 shrink-0 w-5 h-5 flex items-center justify-center border border-emerald-500/20">1</div>
                        <p className="leading-relaxed"><strong className="text-slate-700">Preencha o Formulário:</strong> Escolha a categoria e insira os dados necessários ao lado.</p>
                      </div>
                      
                      <div className="flex gap-2.5 items-start text-xs text-slate-600">
                        <div className="bg-emerald-500/10 text-emerald-700 p-1 rounded font-bold font-mono text-[10px] mt-0.5 shrink-0 w-5 h-5 flex items-center justify-center border border-emerald-500/20">2</div>
                        <p className="leading-relaxed"><strong className="text-slate-700">Chame no WhatsApp:</strong> Você será redirecionado e nossa equipe te enviará as cotações oficiais das maiores seguradoras.</p>
                      </div>

                      <div className="flex gap-2.5 items-start text-xs text-slate-600">
                        <div className="bg-emerald-500/15 text-emerald-800 p-1 rounded font-bold font-mono text-[10px] mt-0.5 shrink-0 w-5 h-5 flex items-center justify-center border border-emerald-500/30">3</div>
                        <p className="leading-relaxed"><strong className="text-slate-700">Ganhe Seu Brinde:</strong> Após escolher e formalizar a sua apólice, você ganha seu brinde exclusivo!</p>
                      </div>
                    </div>
                  </div>

                  {/* Trust indicator */}
                  <div className="space-y-4 mt-6 pt-4 border-t border-slate-100">
                    <div className="bg-slate-50 rounded-xl p-3 flex gap-2.5 items-center border border-slate-200">
                      <Shield size={16} className="text-accent-600 shrink-0" />
                      <p className="text-[10px] text-slate-500 leading-normal">
                        Seus dados estão protegidos sob rígido protocolo de segurança LGPD e serão utilizados exclusivamente para a elaboração de suas cotações oficiais.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

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
                  Olá <strong className="text-slate-800">{name}</strong>, já geramos a sua solicitação com nossa equipe e preparamos os seus dados para envio direto no WhatsApp.
                </p>
              </div>

              {/* Info recap block */}
              <div className="bg-emerald-50/50 border border-emerald-200/60 p-4 rounded-2xl text-left text-xs space-y-2 font-mono">
                <div className="flex justify-between"><span className="text-slate-500">Modalidade:</span><span className="text-slate-800 font-semibold uppercase">{insuranceType}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Atendimento:</span><span className="text-emerald-700 font-bold">Especialista pelo WhatsApp</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Brinde Garantido:</span><span className="text-emerald-700 font-semibold">{getActiveGift()}</span></div>
              </div>

              <div className="bg-slate-50 border border-slate-150 p-3 rounded-xl text-[11px] text-slate-500 leading-relaxed">
                ℹ️ Já abrimos o seu WhatsApp Web ou aplicativo de celular para que você envie a mensagem pré-formatada. Caso não tenha aberto, clique no botão verde abaixo.
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`https://wa.me/5532998800325?text=${encodeURIComponent(getWhatsAppMessage())}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all text-center flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
                  id="btn-manual-whatsapp"
                >
                  <Send size={14} /> Reabrir WhatsApp
                </a>
                <button
                  onClick={() => onNavigate('home')}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-xl border border-slate-200 text-xs transition-colors cursor-pointer"
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
                Fazer Nova Solicitação de Cotação
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
