/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import InsuranceCards from './components/InsuranceCards';
import Simulator from './components/Simulator';
import Benefits from './components/Benefits';
import RewardsClub from './components/RewardsClub';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import { QuoteProposal } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedInsuranceType, setSelectedInsuranceType] = useState<string>('auto');
  const [proposals, setProposals] = useState<QuoteProposal[]>([]);

  // Smooth Intersection Observer to update current active header menu link on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'insurances', 'simulator', 'benefits', 'rewards', 'faq'];
      const scrollPosition = window.scrollY + 160;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const handleSelectInsurance = (type: string) => {
    setSelectedInsuranceType(type);
  };

  const handleAddProposal = (proposal: QuoteProposal) => {
    setProposals((prev) => [proposal, ...prev]);
  };

  return (
    <div className="relative min-h-screen font-sans antialiased text-slate-800 bg-[#f8fafc]" id="app-wrapper">
      {/* Fixed Ambient Glow Circles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-sky-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Header */}
      <Header onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Hero Section */}
      <Hero onNavigate={handleNavigate} onSelectInsurance={handleSelectInsurance} />

      {/* Insurance Products Bento Grid catalog */}
      <InsuranceCards onSelectInsurance={handleSelectInsurance} onNavigate={handleNavigate} />

      {/* Multi-step Interactive Simulator Quote Engine */}
      <Simulator
        selectedInsuranceType={selectedInsuranceType}
        onAddProposal={handleAddProposal}
        onNavigate={handleNavigate}
      />

      {/* Features/USPs list */}
      <Benefits />

      {/* Interactive Reward/Gift Simulator with lucky wheel & referral calculator */}
      <RewardsClub />

      {/* Client Reviews Carousel */}
      <Testimonials />

      {/* Custom Accordion FAQ list */}
      <FAQ />

      {/* Professional SUSEP branded Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Interactive WhatsApp agent box */}
      <WhatsAppWidget />
    </div>
  );
}
