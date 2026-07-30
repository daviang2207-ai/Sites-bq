/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, User, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

export default function Header({ onNavigate, activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Início', id: 'home' },
    { label: 'Seguros', id: 'insurances' },
    { label: 'Simulador', id: 'simulator' },
    { label: 'Diferenciais', id: 'benefits' },
    { label: 'Prêmios & Indicações', id: 'rewards' },
    { label: 'F.A.Q.', id: 'faq' }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      id="app-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-slate-200/85 py-3 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex flex-col cursor-pointer group"
            onClick={() => handleNavClick('home')}
            id="header-logo"
          >
            <span className={`text-xl sm:text-2xl font-bold tracking-wider font-display flex items-center gap-1.5 transition-colors ${
              isScrolled ? 'text-primary-500' : 'text-white'
            }`}>
              BQ <span className={`font-medium font-sans ${isScrolled ? 'text-accent-500' : 'text-accent-400'}`}>Seguros</span>
            </span>
            <span className={`text-[8px] sm:text-[9px] font-mono tracking-widest uppercase font-semibold transition-colors ${
              isScrolled ? 'text-slate-500' : 'text-slate-300'
            }`}>
              Desde 1988 • Tradição e Confiança
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" id="desktop-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer relative py-1 ${
                  activeSection === item.id
                    ? (isScrolled ? 'text-primary-500' : 'text-accent-400')
                    : (isScrolled ? 'text-slate-600 hover:text-primary-500' : 'text-white/80 hover:text-white')
                }`}
                id={`nav-link-${item.id}`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center space-x-4" id="header-ctas">
            <button
              onClick={() => handleNavClick('simulator')}
              className="bg-primary-500 hover:bg-primary-600 text-white font-bold text-[10px] sm:text-xs uppercase tracking-wider px-3 py-1.5 rounded-xl transition-all shadow-md shadow-primary-500/10 flex items-center gap-1.5 cursor-pointer"
              id="header-btn-simular"
            >
              Fazer Simulação
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Mobile Menu Actions & Button */}
          <div className="flex md:hidden items-center space-x-2">
            <a
              href="https://wa.me/5532998800325?text=Ol%C3%A1%2C+gostaria+de+fazer+uma+cotacao"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-accent-500 hover:bg-accent-600 text-white rounded-xl shadow-md shadow-accent-500/10 cursor-pointer flex items-center justify-center transition-all"
              id="mobile-header-whatsapp-direct"
              aria-label="Falar no WhatsApp"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>

            <button
              onClick={() => handleNavClick('simulator')}
              className="px-3.5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl text-xs font-bold shadow-md shadow-primary-500/10 cursor-pointer flex items-center justify-center transition-all"
              id="mobile-header-simulate-direct"
            >
              Simular
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2.5 rounded-xl cursor-pointer flex items-center justify-center transition-all ${
                isScrolled
                  ? 'text-slate-600 hover:text-slate-950 bg-slate-100'
                  : 'text-white hover:text-white bg-white/10 hover:bg-white/20'
              }`}
              id="mobile-menu-toggle"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden"
              id="mobile-drawer-backdrop"
            />

            {/* Slide-out Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] sm:w-[400px] bg-white z-50 md:hidden shadow-2xl flex flex-col justify-between"
              id="mobile-drawer-panel"
            >
              {/* Header inside Panel */}
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-base font-bold tracking-wider text-slate-900 font-display">
                      BQ <span className="text-sky-600">Seguros</span>
                    </span>
                    <span className="text-[8px] text-slate-400 font-mono tracking-widest uppercase">
                      Corretora Digital
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-slate-500 hover:text-slate-900 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-all cursor-pointer"
                    id="mobile-drawer-close"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto py-6 px-6 space-y-2 select-none">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-4">Navegação</span>
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between w-full text-left px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all ${
                      activeSection === item.id
                        ? 'bg-primary-50 text-primary-600 border-l-4 border-accent-500'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950 border-l-4 border-transparent'
                    }`}
                    id={`mobile-nav-link-${item.id}`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight size={14} className={activeSection === item.id ? 'text-primary-600' : 'text-slate-300'} />
                  </button>
                ))}
              </div>

              {/* Call to Actions & Info in Footer */}
              <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Atendimento Rápido</span>
                
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleNavClick('simulator')}
                    className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-3.5 rounded-xl shadow-md shadow-primary-500/10 flex items-center justify-center gap-2 cursor-pointer w-full text-center text-xs uppercase tracking-wider"
                    id="mobile-btn-simular-drawer"
                  >
                    Simulação Grátis em 5 min
                    <ArrowRight size={14} />
                  </button>

                  <a
                    href="https://wa.me/5532998800325?text=Ol%C3%A1%2C+gostaria+de+fazer+uma+cotacao"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-accent-600 hover:bg-accent-500 text-white font-bold py-3.5 rounded-xl shadow-md shadow-accent-600/10 flex items-center justify-center gap-2 cursor-pointer w-full text-center text-sm"
                    id="mobile-btn-whatsapp-drawer"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Falar com Especialista
                  </a>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span>SUSEP nº 202027419</span>
                  <span>100% Seguro</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
