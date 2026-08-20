/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, PhoneCall, ChevronRight } from 'lucide-react';
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

  // Keyboard accessibility: ESC key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Navegação: Seguros, Sobre Nós, Blog, Contato
  const navItems = [
    { label: 'Seguros', id: 'insurances' },
    { label: 'Sobre Nós', id: 'about' },
    { label: 'Blog', id: 'blog' },
    { label: 'Contato', id: 'contact' }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
    if (id !== 'blog') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleQuoteClick = () => {
    onNavigate('simulator');
    setIsMobileMenuOpen(false);
    const element = document.getElementById('simulator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      id="app-header"
      role="banner"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-3.5 shadow-xs'
          : 'bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo BQ Seguros - Apenas Nome Tipográfico */}
          <button
            type="button"
            className="flex items-center gap-2 cursor-pointer group text-left rounded-xl focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 py-1"
            onClick={() => handleNavClick('home')}
            id="header-logo"
            aria-label="BQ Seguros - Voltar ao início"
          >
            <div className="flex flex-col">
              <span className={`text-xl sm:text-2xl font-black tracking-tight font-display flex items-center gap-1.5 leading-tight transition-colors ${
                isScrolled ? 'text-primary-500' : 'text-white'
              }`}>
                BQ <span className={isScrolled ? 'text-accent-500 font-bold' : 'text-sky-400 font-bold'}>Seguros</span>
              </span>
              <span className={`text-[9px] font-mono tracking-wider uppercase font-semibold transition-colors ${
                isScrolled ? 'text-slate-600' : 'text-slate-200'
              }`}>
                Desde 1988 • 38+ Anos
              </span>
            </div>
          </button>

          {/* Desktop Navigation - Menu Enxuto */}
          <nav className="hidden md:flex items-center space-x-8" id="desktop-nav" aria-label="Navegação principal">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer relative py-1 rounded-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-500 ${
                  activeSection === item.id
                    ? (isScrolled ? 'text-primary-500 font-bold' : 'text-sky-300 font-bold')
                    : (isScrolled ? 'text-slate-700 hover:text-primary-500' : 'text-slate-200 hover:text-white')
                }`}
                id={`nav-link-${item.id}`}
                aria-current={activeSection === item.id ? 'page' : undefined}
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

          {/* CTA Destaque: "Calcule seu seguro" */}
          <div className="hidden md:flex items-center space-x-3" id="header-ctas">
            <a
              href="https://wa.me/5532998800325?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20um%20especialista%20da%20BQ%20Seguros."
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2.5 rounded-xl transition-all flex items-center justify-center cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-500 ${
                isScrolled
                  ? 'text-slate-700 hover:text-primary-500 hover:bg-slate-100'
                  : 'text-slate-200 hover:text-white bg-white/10 hover:bg-white/20'
              }`}
              title="Fale no WhatsApp"
              aria-label="Fale no WhatsApp com a BQ Seguros"
            >
              <PhoneCall size={16} aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={handleQuoteClick}
              className="bg-accent-500 hover:bg-accent-600 active:bg-accent-700 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all shadow-md shadow-accent-500/20 flex items-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2"
              id="header-btn-cotacao"
            >
              <span>Calcule seu seguro</span>
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>

          {/* Mobile Menu Button & Quick CTA */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              type="button"
              onClick={handleQuoteClick}
              className="min-h-[44px] px-3.5 py-2 bg-accent-500 hover:bg-accent-600 active:bg-accent-700 text-white rounded-xl text-[11px] font-bold uppercase tracking-wider shadow-sm cursor-pointer transition-all active:scale-[0.98] flex items-center justify-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
              id="mobile-header-quote-direct"
            >
              Calcule seu seguro
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`min-h-[44px] min-w-[44px] p-2 rounded-xl cursor-pointer flex items-center justify-center transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-500 ${
                isScrolled
                  ? 'text-slate-800 bg-slate-100 hover:bg-slate-200'
                  : 'text-white bg-white/15 hover:bg-white/25'
              }`}
              id="mobile-menu-toggle"
              aria-label={isMobileMenuOpen ? 'Fechar Menu de Navegação' : 'Abrir Menu de Navegação'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-drawer-panel"
            >
              {isMobileMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 md:hidden"
              id="mobile-drawer-backdrop"
              aria-hidden="true"
            />

            {/* Slide-out Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] sm:w-[360px] bg-white z-50 md:hidden shadow-2xl flex flex-col justify-between"
              id="mobile-drawer-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Menu móvel de navegação"
            >
              {/* Header inside Panel */}
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xl font-black tracking-tight text-slate-900 font-display">
                      BQ <span className="text-accent-500">Seguros</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase font-semibold">
                      Desde 1988 • 38+ Anos
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="min-h-[44px] min-w-[44px] p-2 text-slate-600 hover:text-slate-900 rounded-xl bg-slate-50 border border-slate-200 transition-all cursor-pointer flex items-center justify-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-500"
                    id="mobile-drawer-close"
                    aria-label="Fechar menu"
                  >
                    <X size={18} aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto py-6 px-6 space-y-2 select-none" aria-label="Links do menu móvel">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-3">Navegação Principal</span>
                
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between w-full text-left px-4 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all min-h-[44px] ${
                      activeSection === item.id
                        ? 'bg-primary-50 text-primary-600 border-l-4 border-accent-500'
                        : 'text-slate-800 hover:bg-slate-50 border-l-4 border-transparent'
                    }`}
                    id={`mobile-nav-link-${item.id}`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight size={16} className={activeSection === item.id ? 'text-primary-600' : 'text-slate-400'} aria-hidden="true" />
                  </button>
                ))}
              </nav>

              {/* Call to Actions in Drawer Footer */}
              <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-3">
                <button
                  type="button"
                  onClick={handleQuoteClick}
                  className="min-h-[44px] bg-accent-500 hover:bg-accent-600 text-white font-bold py-3.5 rounded-xl shadow-md shadow-accent-500/10 flex items-center justify-center gap-2 cursor-pointer w-full text-center text-xs uppercase tracking-wider"
                  id="mobile-drawer-btn-quote"
                >
                  <span>Calcule seu seguro</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </button>

                <a
                  href="https://wa.me/5532998800325?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20um%20especialista%20da%20BQ%20Seguros."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-semibold py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer w-full text-center text-xs"
                  id="mobile-drawer-btn-whatsapp"
                >
                  <PhoneCall size={14} className="text-accent-500" aria-hidden="true" />
                  <span>Falar com especialista</span>
                </a>

                <div className="pt-2 text-center text-[10px] text-slate-500">
                  <span>SUSEP nº 232150826 • Barbacena - MG</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
