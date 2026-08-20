/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  User, 
  Share2, 
  Check, 
  ArrowRight, 
  PhoneCall, 
  ExternalLink,
  Sparkles,
  Award,
  BookOpen,
  Info,
  RefreshCw
} from 'lucide-react';
import { BlogPost } from '../../types';
import BlogPostCard from './BlogPostCard';
import pedroMascotImg from '../../assets/images/pedro_bq_mascot_1784731525933.jpg';

interface BlogPostViewProps {
  post: BlogPost;
  allPosts: BlogPost[];
  onBackToBlog: () => void;
  onSelectPost: (slug: string) => void;
  onNavigate: (section: string) => void;
  onSelectInsurance: (type: string) => void;
}

export default function BlogPostView({
  post,
  allPosts,
  onBackToBlog,
  onSelectPost,
  onNavigate,
  onSelectInsurance
}: BlogPostViewProps) {
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // SEO: Update page title and meta description dynamically
  useEffect(() => {
    const originalTitle = document.title;
    if (post.seo?.title) {
      document.title = post.seo.title;
    } else {
      document.title = `${post.title} | Blog BQ Seguros`;
    }

    let metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    if (metaDesc && (post.seo?.description || post.summary)) {
      metaDesc.setAttribute('content', post.seo?.description || post.summary);
    }

    window.scrollTo({ top: 0, behavior: 'instant' });

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      document.title = originalTitle;
      if (metaDesc && originalDesc) {
        metaDesc.setAttribute('content', originalDesc);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [post]);

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const shareText = encodeURIComponent(`Confira este artigo da BQ Seguros: "${post.title}"`);
  const shareUrl = encodeURIComponent(window.location.href);

  // Filter 3 related articles
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id && (p.categoryId === post.categoryId || p.tags.some(t => post.tags.includes(t))))
    .slice(0, 3);

  // If not enough by category, complete with recent posts
  const finalRelatedPosts = relatedPosts.length >= 2 
    ? relatedPosts 
    : [...relatedPosts, ...allPosts.filter(p => p.id !== post.id && !relatedPosts.some(r => r.id === p.id))].slice(0, 3);

  const handleCalculateForInsurance = () => {
    if (post.relatedInsuranceId) {
      onSelectInsurance(post.relatedInsuranceId);
    }
    onNavigate('simulator');
    setTimeout(() => {
      const el = document.getElementById('simulator');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSpecialistClick = () => {
    const text = encodeURIComponent(`Olá! Li o artigo "${post.title}" no Blog da BQ Seguros e gostaria de tirar dúvidas com um especialista.`);
    window.open(`https://wa.me/5532998800325?text=${text}`, '_blank');
  };

  const handleRelatedClick = (targetSlug: string) => {
    onSelectPost(targetSlug);
  };

  return (
    <article 
      id={`blog-article-${post.slug}`}
      className="min-h-screen bg-white pt-28 pb-20 text-slate-800 relative"
    >
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-200 z-50">
        <div
          className="h-full bg-accent-500 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumbs & Back */}
        <div className="flex items-center justify-between pb-8 border-b border-slate-100">
          <button
            type="button"
            onClick={onBackToBlog}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-accent-600 transition-colors py-2 px-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer min-h-[44px]"
            id="btn-back-to-blog-header"
          >
            <ArrowLeft size={16} />
            <span>Voltar para todos os artigos</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600 font-medium">
            <span className="cursor-pointer hover:underline" onClick={() => onNavigate('home')}>Início</span>
            <span>/</span>
            <span className="cursor-pointer hover:underline" onClick={onBackToBlog}>Blog</span>
            <span>/</span>
            <span className="text-primary-600 font-bold truncate max-w-[200px]">{post.category}</span>
          </div>
        </div>

        {/* Article Header */}
        <header className="py-8 space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-primary-50 text-primary-600 text-xs font-bold px-3.5 py-1.5 rounded-full border border-primary-200">
              {post.category}
            </span>
            
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <Calendar size={13} className="text-slate-400" />
              <span>Publicado em: <strong>{post.publishedAt}</strong></span>
            </div>

            {post.updatedAt && (
              <div className="flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                <RefreshCw size={11} className="text-emerald-600 animate-pulse" />
                <span>Atualizado em: <strong>{post.updatedAt}</strong></span>
              </div>
            )}

            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold ml-auto sm:ml-0">
              <Clock size={13} className="text-accent-500" />
              <span>{post.readingTime} min de leitura</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 leading-[1.18] tracking-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans border-l-4 border-accent-400 pl-4 py-1">
            {post.summary}
          </p>

          {/* Author Line & Share */}
          <div className="pt-2 flex items-center justify-between flex-wrap gap-4 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-sm shadow-xs overflow-hidden">
                {post.author.avatar ? (
                  <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
                ) : (
                  <User size={18} />
                )}
              </div>
              <div>
                <span className="font-bold text-xs text-slate-900 block">{post.author.name}</span>
                <span className="text-[11px] text-slate-600 block">{post.author.role} • BQ Seguros (SUSEP nº 232150826)</span>
              </div>
            </div>

            {/* Quick Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600 mr-1 hidden sm:inline">Compartilhar:</span>
              
              <a
                href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center justify-center cursor-pointer min-h-[40px] min-w-[40px]"
                title="Compartilhar no WhatsApp"
                aria-label="Compartilhar no WhatsApp"
              >
                <Share2 size={16} />
              </a>

              <button
                type="button"
                onClick={handleCopyLink}
                className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors min-h-[40px]"
                title="Copiar Link"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} />}
                <span>{copied ? 'Copiado!' : 'Copiar Link'}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="my-6 rounded-3xl overflow-hidden shadow-md border border-slate-200 bg-slate-900 relative aspect-video max-h-[440px]">
          <img
            src={post.coverImage}
            alt={post.imageAlt || post.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body - Constrained Width & Editorial Typography */}
        <div className="max-w-3xl mx-auto py-6">
          <div className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed font-sans space-y-5">
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mt-10 mb-4 pb-2 border-b border-slate-100 tracking-tight">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-800 mt-8 mb-3 tracking-tight">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-base sm:text-[17px] text-slate-700 leading-[1.8] my-4">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="my-5 space-y-2.5 list-disc pl-6 text-base text-slate-700">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="my-5 space-y-2.5 list-decimal pl-6 text-base text-slate-700">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="leading-relaxed pl-1">{children}</li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="my-6 p-5 rounded-2xl bg-sky-50/90 border-l-4 border-accent-500 text-slate-800 text-sm sm:text-base font-medium shadow-2xs">
                    {children}
                  </blockquote>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-slate-900">{children}</strong>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-600 hover:text-accent-700 font-semibold underline decoration-accent-300 hover:decoration-accent-600 transition-colors inline-flex items-center gap-1"
                  >
                    <span>{children}</span>
                    <ExternalLink size={12} className="inline opacity-70" />
                  </a>
                ),
                table: ({ children }) => (
                  <div className="my-8 overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
                    <table className="w-full text-left text-xs sm:text-sm text-slate-700 border-collapse bg-white">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                    {children}
                  </thead>
                ),
                tbody: ({ children }) => (
                  <tbody className="divide-y divide-slate-100">
                    {children}
                  </tbody>
                ),
                tr: ({ children }) => (
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    {children}
                  </tr>
                ),
                th: ({ children }) => (
                  <th className="p-3.5 sm:p-4 font-bold text-slate-900 whitespace-nowrap">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="p-3.5 sm:p-4 align-top leading-relaxed">
                    {children}
                  </td>
                ),
                hr: () => <hr className="my-10 border-slate-200" />
              }}
            >
              {post.content}
            </Markdown>
          </div>

          {/* Contextual In-Article Conversion Box */}
          <div 
            className="mt-12 mb-8 bg-gradient-to-br from-primary-900 via-slate-900 to-primary-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-primary-800/60 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/15 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-500/20 text-sky-300 text-xs font-bold uppercase tracking-wider border border-accent-400/30">
                <Sparkles size={13} />
                <span>Consultoria BQ Seguros</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                Quer entender qual proteção faz sentido para você?
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                A BQ Seguros analisa detalhadamente o seu perfil com as maiores seguradoras autorizadas pela SUSEP, garantindo clareza nas coberturas e o melhor custo-benefício.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={handleCalculateForInsurance}
                  className="bg-accent-500 hover:bg-accent-600 active:bg-accent-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-accent-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] min-h-[44px]"
                  id="article-cta-calculate"
                >
                  <span>Calcule seu seguro</span>
                  <ArrowRight size={15} />
                </button>

                <button
                  type="button"
                  onClick={handleSpecialistClick}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs px-5 py-3.5 rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                  id="article-cta-specialist"
                >
                  <PhoneCall size={14} className="text-sky-300" />
                  <span>Falar com um especialista</span>
                </button>
              </div>
            </div>
          </div>

          {/* Official Sources Section */}
          {post.sources && post.sources.length > 0 && (
            <div className="my-8 p-5 sm:p-6 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="flex items-center gap-2 mb-3 text-slate-900 font-display font-bold text-sm sm:text-base">
                <BookOpen size={18} className="text-accent-600" />
                <h4>Fontes e referências oficiais consultadas</h4>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                Para assegurar máxima precisão técnica e regulatória, este artigo foi fundamentado nas seguintes fontes oficiais:
              </p>
              <ul className="space-y-2">
                {post.sources.map((src, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0" />
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-600 hover:text-accent-800 font-semibold hover:underline inline-flex items-center gap-1.5"
                    >
                      <span>{src.title}</span>
                      <ExternalLink size={12} className="opacity-60" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Legal Responsibility Disclaimer */}
          <div className="my-6 p-4 rounded-xl bg-slate-100/70 border border-slate-200/80 text-[11px] sm:text-xs text-slate-500 leading-relaxed flex items-start gap-2.5">
            <Info size={16} className="text-slate-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-600">Aviso importante: </span>
              {post.disclaimer || 'As informações deste artigo têm caráter educativo e geral. As coberturas, condições, limites, franquias, carências, exclusões e demais características dos seguros podem variar conforme o produto, a seguradora e o contrato. Para uma análise adequada ao seu caso, consulte um corretor de seguros autorizado pela SUSEP.'}
            </div>
          </div>

          {/* Tags */}
          <div className="pt-4 pb-6 border-b border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Tags:</span>
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-slate-200 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Author Box */}
          <div className="my-8 bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-primary-500 text-white flex items-center justify-center font-bold text-xl shadow-xs shrink-0 overflow-hidden">
              {post.author.avatar ? (
                <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
              ) : (
                <Award size={28} />
              )}
            </div>
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                <h4 className="font-display font-bold text-slate-900 text-base">{post.author.name}</h4>
                <span className="text-[11px] bg-primary-100 text-primary-700 px-2 py-0.5 rounded-md font-bold">Autorizado SUSEP</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {post.author.bio || 'Equipe técnica da BQ Seguros, corretora consolidada no mercado desde 1988 com mais de 38 anos de experiência na proteção de vidas e patrimônios.'}
              </p>
              <div className="pt-1 text-[11px] text-slate-500 font-mono">
                SUSEP nº 232150826 • CNPJ: 52.389.487/0001-40
              </div>
            </div>
          </div>

        </div>

        {/* Related Articles Section */}
        {finalRelatedPosts.length > 0 && (
          <section className="mt-12 pt-12 border-t border-slate-200" aria-label="Artigos relacionados">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold text-accent-600 uppercase tracking-widest block">Conteúdos Recomendados</span>
                <h3 className="text-2xl font-display font-bold text-slate-900">
                  Você também pode gostar
                </h3>
              </div>

              <button
                type="button"
                onClick={onBackToBlog}
                className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-accent-600 hover:text-accent-700 cursor-pointer"
              >
                <span>Ver todos no Blog</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {finalRelatedPosts.map((relPost) => (
                <BlogPostCard
                  key={relPost.id}
                  post={relPost}
                  onSelectPost={(slug) => handleRelatedClick(slug)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Back to top or blog bottom action */}
        <div className="pt-12 text-center">
          <button
            type="button"
            onClick={onBackToBlog}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer min-h-[44px]"
            id="btn-back-to-blog-bottom"
          >
            <ArrowLeft size={16} />
            <span>Voltar para a página principal do Blog</span>
          </button>
        </div>

      </div>
    </article>
  );
}

