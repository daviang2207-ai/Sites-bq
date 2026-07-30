/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Mail, Phone, MapPin, Award, CheckCircle } from 'lucide-react';
import bqLogoImg from '../assets/images/bq_seguros_logo_1784320047323.jpg';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleNavClick = (id: string) => {
    onNavigate(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer id="contact" className="bg-slate-50 border-t border-slate-200 pt-16 pb-8 text-slate-600 text-xs relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-slate-200">
          
          {/* Company branding */}
          <div className="md:col-span-4 space-y-4" id="footer-branding">
            <div className="flex items-center cursor-pointer group" onClick={() => handleNavClick('home')}>
              <img
                src={bqLogoImg}
                alt="BQ Seguros Logo"
                className="h-14 w-auto max-w-[140px] object-contain rounded-xl bg-white p-1 border border-slate-200/60 shadow-sm transition-all group-hover:border-accent-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-slate-600 text-[14px] font-[system-ui] text-justify italic leading-relaxed">
              Mais de 38 anos de solidez, confiança e tranquilidade. Atendimento próximo e sob medida para garantir a proteção de sua família, de sua empresa e de seu patrimônio com o profissionalismo que você merece.
            </p>

          </div>

          {/* Quick links map */}
          <div className="md:col-span-3 space-y-4" id="footer-links">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">Sitemap</span>
            <ul className="space-y-2.5">
              {[
                { label: 'Início', id: 'home' },
                { label: 'Nossos Seguros', id: 'insurances' },
                { label: 'Simulador Online', id: 'simulator' },
                { label: 'Diferenciais', id: 'benefits' },
                { label: 'Prêmios & Indicações', id: 'rewards' },
                { label: 'Dúvidas Frequentes', id: 'faq' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className="hover:text-accent-500 font-medium transition-colors cursor-pointer text-left text-xs text-slate-500"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts info */}
          <div className="md:col-span-5 space-y-4" id="footer-contact-info">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">Canais de Atendimento</span>
            
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-slate-600">
                <MapPin size={16} className="text-accent-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong className="text-slate-800">BQ ADMINISTRADORA E CORRETORA DE SEGUROS LTDA</strong><br />
                  Avenida Bias Fortes, 482 - Barbacena - MG<br />
                  CEP: 36200-068
                </span>
              </li>

              <li className="flex items-center gap-2.5 text-slate-600">
                <Phone size={16} className="text-emerald-600 shrink-0" />
                <span className="font-medium text-emerald-800">(32) 99880-0325 (WhatsApp)</span>
              </li>

              <li className="flex items-center gap-2.5 text-slate-600">
                <Mail size={16} className="text-accent-600 shrink-0" />
                <span>bqcorretora@yahoo.com</span>
              </li>
            </ul>

            <div className="pt-2">
              <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">Parceiros de Negócio</span>
              <span className="text-[10px] text-slate-500 block mt-1">Porto Seguro • Tokio Marine • Bradesco Seguros • Allianz • SulAmérica • Liberty Seguros • MAPFRE</span>
            </div>
          </div>
        </div>

        {/* Subfooter */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-400" id="sub-footer">
          <div>
            <span>© {new Date().getFullYear()} BQ Seguros Corretora de Seguros. Todos os direitos reservados. CNPJ: 45.123.456/0001-89</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-accent-500 transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-accent-500 transition-colors">Política de Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
