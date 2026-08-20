/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import InsuranceCards from './components/InsuranceCards';
import ReferralProgram from './components/ReferralProgram';
import CallToAction from './components/CallToAction';
import Simulator from './components/Simulator';
import AboutUs from './components/AboutUs';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import BlogTeaser from './components/BlogTeaser';
import BlogHome from './components/blog/BlogHome';
import BlogPostView from './components/blog/BlogPostView';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import { QuoteProposal, BlogPost } from './types';
import { getSavedBlogPosts } from './data/blogData';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedInsuranceType, setSelectedInsuranceType] = useState<string>('auto');
  const [proposals, setProposals] = useState<QuoteProposal[]>([]);
  
  // Blog State & Navigation
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => getSavedBlogPosts());
  const [currentView, setCurrentView] = useState<'home' | 'blog' | 'blog-post'>('home');
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);

  // Sync with browser history / URL path
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      if (path.startsWith('/blog/') && path.length > 6) {
        const slug = path.replace('/blog/', '').replace(/\/$/, '');
        setCurrentSlug(slug);
        setCurrentView('blog-post');
        setActiveSection('blog');
      } else if (path === '/blog' || path === '/blog/') {
        setCurrentSlug(null);
        setCurrentView('blog');
        setActiveSection('blog');
      } else {
        setCurrentView('home');
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Smooth Intersection Observer to update current active header menu link on scroll (Home view only)
  useEffect(() => {
    if (currentView !== 'home') return;

    const handleScroll = () => {
      const sections = ['home', 'insurances', 'about', 'simulator', 'contact'];
      const scrollPosition = window.scrollY + 180;

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
  }, [currentView]);

  const handleOpenBlog = () => {
    setCurrentView('blog');
    setCurrentSlug(null);
    setActiveSection('blog');
    try {
      window.history.pushState({}, '', '/blog');
    } catch {
      // safe fallback for preview sandbox
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPost = (slug: string) => {
    setCurrentSlug(slug);
    setCurrentView('blog-post');
    setActiveSection('blog');
    try {
      window.history.pushState({}, '', `/blog/${slug}`);
    } catch {
      // safe fallback for preview sandbox
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'blog') {
      handleOpenBlog();
      return;
    }

    if (currentView !== 'home') {
      setCurrentView('home');
      setCurrentSlug(null);
      try {
        window.history.pushState({}, '', '/');
      } catch {
        // fallback
      }
    }

    setActiveSection(sectionId);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  const handleSelectInsurance = (type: string) => {
    setSelectedInsuranceType(type);
  };

  const handleAddProposal = (proposal: QuoteProposal) => {
    setProposals((prev) => [proposal, ...prev]);
  };

  const handlePostsUpdated = (updated: BlogPost[]) => {
    setBlogPosts(updated);
  };

  // Find currently active post
  const activePost = currentSlug ? blogPosts.find(p => p.slug === currentSlug) || blogPosts[0] : null;

  return (
    <div className="relative min-h-screen font-sans antialiased text-slate-800 bg-[#f8fafc]" id="app-wrapper">
        {/* Skip to Main Content Link for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-accent-600 focus:text-white focus:rounded-xl focus:shadow-2xl focus:font-bold focus:outline-hidden focus:ring-2 focus:ring-white"
          id="skip-to-content"
        >
          Pular para o conteúdo principal
        </a>

        {/* Header Fixo e Elegante */}
        <Header onNavigate={handleNavigate} activeSection={activeSection} />

        {/* Main Semantic Landmark Container */}
        <main id="main-content" tabIndex={-1} className="focus:outline-hidden">
          {currentView === 'home' && (
            <>
              {/* 1. Hero Section de Alto Impacto */}
              <Hero onNavigate={handleNavigate} onSelectInsurance={handleSelectInsurance} />

              {/* 2. Faixa de Confiança (38+ anos, Atendimento personalizado, Principais seguradoras) */}
              <TrustBar />

              {/* 3. Seção de Categorias de Seguros (Cards Modernos + "Ver todos os seguros") */}
              <InsuranceCards onSelectInsurance={handleSelectInsurance} onNavigate={handleNavigate} />

              {/* 4. Programa de Indicações e Brindes */}
              <ReferralProgram onNavigate={handleNavigate} />

              {/* 5. Chamada de Alta Conversão para Cotação */}
              <CallToAction onNavigate={handleNavigate} />

              {/* 6. Simulador / Cotação Rápida */}
              <Simulator
                selectedInsuranceType={selectedInsuranceType}
                onAddProposal={handleAddProposal}
                onNavigate={handleNavigate}
              />

              {/* 7. Sobre Nós - Solidez, 38+ anos de história e parceiros oficiais */}
              <AboutUs />

              {/* 8. Central de Conteúdo & Blog Teaser */}
              <BlogTeaser
                posts={blogPosts}
                onOpenBlog={handleOpenBlog}
                onSelectPost={handleSelectPost}
              />

              {/* 9. Depoimentos Verificados */}
              <Testimonials />

              {/* 10. Perguntas Frequentes */}
              <FAQ />
            </>
          )}

          {currentView === 'blog' && (
            <BlogHome
              posts={blogPosts}
              onSelectPost={handleSelectPost}
              onNavigate={handleNavigate}
              onPostsUpdated={handlePostsUpdated}
            />
          )}

          {currentView === 'blog-post' && activePost && (
            <BlogPostView
              post={activePost}
              allPosts={blogPosts}
              onBackToBlog={handleOpenBlog}
              onSelectPost={handleSelectPost}
              onNavigate={handleNavigate}
              onSelectInsurance={handleSelectInsurance}
            />
          )}
        </main>

        {/* 11. Rodapé Institucional */}
        <Footer onNavigate={handleNavigate} />

        {/* Botão Flutuante de Atendimento WhatsApp */}
        <WhatsAppWidget />
      </div>
  );
}

