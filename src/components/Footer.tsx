/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Mail, Phone, MapPin, Award, Shield, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleNavClick = (id: string) => {
    onNavigate(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navLinks = [
    { label: 'Início', id: 'home' },
    { label: 'Seguros', id: 'insurances' },
    { label: 'Blog & Dicas', id: 'blog' },
    { label: 'Programa de Indicações', id: 'referral-program' },
    { label: 'Sobre Nós', id: 'about' },
    { label: 'Simulador / Cotação', id: 'simulator' },
    { label: 'Contato', id: 'contact' }
  ];

  return (
    <footer id="contact" className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-8 text-xs relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-850">
          
          {/* Company Branding & Summary */}
          <div className="md:col-span-4 space-y-4" id="footer-branding">
            <div
              className="flex items-center gap-2 cursor-pointer group inline-flex rounded-xl focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-500"
              onClick={() => handleNavClick('home')}
            >
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white font-display tracking-tight flex items-center gap-1">
                  BQ <span className="text-accent-400 font-bold">Seguros</span>
                </span>
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                  Desde 1988 • 38+ Anos
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
              Mais de 38 anos de experiência e dedicação na proteção de famílias, veículos, imóveis e empresas. Atendimento próximo, ético e as melhores soluções do mercado segurador brasileiro.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/bq.seguros/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-accent-500 hover:text-white text-slate-300 transition-colors border border-slate-800 text-xs font-semibold group"
                aria-label="Instagram @bq.seguros"
              >
                <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>@bq.seguros</span>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/1LnBwA97k6/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-accent-500 hover:text-white text-slate-300 transition-colors border border-slate-800 text-xs font-semibold group"
                aria-label="Facebook Bq Seguros"
              >
                <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.889C10.667 0 9 1.583 9 4.667V8z" />
                </svg>
                <span>Bq Seguros</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-accent-500 hover:text-white text-slate-300 flex items-center justify-center transition-colors border border-slate-800"
                aria-label="LinkedIn da BQ Seguros"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Principais */}
          <div className="md:col-span-3 space-y-4" id="footer-links">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">Links Principais</span>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className="hover:text-accent-400 font-medium transition-colors cursor-pointer text-left text-xs text-slate-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato & WhatsApp */}
          <div className="md:col-span-5 space-y-4" id="footer-contact-info">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">Atendimento & Endereço</span>
            
            <ul className="space-y-3.5">
              {/* WhatsApp em destaque */}
              <li>
                <a
                  href="https://wa.me/5532998800325?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20pela%20BQ%20Seguros."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all font-semibold"
                >
                  <Phone size={15} className="text-emerald-400 shrink-0" />
                  <span>WhatsApp: (32) 99880-0325</span>
                  <ArrowUpRight size={14} />
                </a>
              </li>

              <li className="flex items-start gap-2.5 text-slate-300">
                <MapPin size={16} className="text-accent-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong className="text-white">BQ Corretora de Seguros LTDA</strong><br />
                  Avenida Bias Fortes, 482 - Centro<br />
                  Barbacena - MG, CEP: 36200-068
                </span>
              </li>

              <li className="flex items-center gap-2.5 text-slate-300">
                <Mail size={16} className="text-accent-400 shrink-0" />
                <span>bqcorretora@yahoo.com</span>
              </li>
            </ul>

            <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-850">
              <span className="block">Registro SUSEP: <strong>232150826</strong></span>
              <span className="block mt-0.5">CNPJ: <strong>52.389.487/0001-40</strong></span>
            </div>
          </div>
        </div>

        {/* Sub-footer / Legal Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400" id="sub-footer">
          <div>
            <span>© {new Date().getFullYear()} BQ Administradora e Corretora de Seguros LTDA. Todos os direitos reservados.</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Barbacena - MG • Atendimento em todo o Brasil</span>
            <span>•</span>
            <span className="text-slate-400" title="Em conformidade com a LGPD e regulamentações da SUSEP">
              Privacidade e Proteção de Dados (LGPD)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
