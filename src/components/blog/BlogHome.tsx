/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { 
  Search, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  X, 
  BookOpen, 
  Flame, 
  PhoneCall, 
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BlogPost } from '../../types';
import { blogCategories } from '../../data/blogData';
import BlogPostCard from './BlogPostCard';
import BlogAdminModal from './BlogAdminModal';

interface BlogHomeProps {
  posts: BlogPost[];
  onSelectPost: (slug: string) => void;
  onNavigate: (section: string) => void;
  onPostsUpdated: (posts: BlogPost[]) => void;
}

export default function BlogHome({ 
  posts, 
  onSelectPost, 
  onNavigate, 
  onPostsUpdated
}: BlogHomeProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState('all');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const handleCategorySelect = (catId: string) => {
    setActiveCategoryId(catId);
  };

  // Filter posts by category and search query
  const filteredPosts = useMemo(() => {
    let result = posts;

    // Filter by Category
    if (activeCategoryId !== 'all') {
      result = result.filter(p => p.categoryId === activeCategoryId);
    }

    // Filter by Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [posts, activeCategoryId, searchQuery]);

  // Featured Post (first featured post or first post in list)
  const featuredPost = useMemo(() => {
    return posts.find(p => p.featured) || posts[0];
  }, [posts]);

  // Popular / Most read posts
  const popularPosts = useMemo(() => {
    return posts.filter(p => p.popular && p.id !== featuredPost?.id).slice(0, 4);
  }, [posts, featuredPost]);

  // Remaining posts (excluding featured post when in "all" category without search)
  const regularPosts = useMemo(() => {
    if (activeCategoryId === 'all' && !searchQuery.trim()) {
      return filteredPosts.filter(p => p.id !== featuredPost?.id);
    }
    return filteredPosts;
  }, [filteredPosts, activeCategoryId, searchQuery, featuredPost]);

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-28 pb-24 text-slate-800 relative overflow-hidden" id="blog-home-page">
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Top Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary-700 border border-primary-200 text-xs font-bold uppercase tracking-widest">
            <BookOpen size={14} className="text-primary-600" />
            <span>Central de Conteúdo e Educação BQ</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight" id="blog-main-title">
            BLOG BQ SEGUROS
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans max-w-2xl mx-auto">
            Informação clara, técnica e transparente para proteger o que realmente importa. Tire dúvidas reais antes de contratar seu seguro.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-4 text-slate-400 pointer-events-none" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquisar no blog... ex: franquia, enchente, viagem, celular..."
                className="w-full pl-11 pr-10 py-3.5 bg-white border border-slate-300 hover:border-slate-400 focus:border-accent-500 rounded-2xl text-xs sm:text-sm text-slate-900 shadow-xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-500 transition-all placeholder:text-slate-400"
                id="blog-search-input"
                aria-label="Pesquisar artigos no blog"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                  aria-label="Limpar pesquisa"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Filters Pills */}
        <div className="flex items-center justify-between gap-4 mb-10 overflow-x-auto pb-2 scrollbar-none" role="tablist" aria-label="Filtrar artigos por categoria">
          <div className="flex items-center gap-2">
            {blogCategories.map((cat) => {
              const isActive = activeCategoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer min-h-[40px] flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                      : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
                  }`}
                  id={`blog-category-${cat.id}`}
                >
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Editorial Management Trigger for BQ Team */}
          <button
            type="button"
            onClick={() => setIsAdminModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 cursor-pointer transition-colors shrink-0 shadow-2xs"
            title="Adicionar ou gerenciar artigos do Blog"
          >
            <Settings size={14} className="text-slate-500" />
            <span>Gerenciar / Novo Artigo</span>
          </button>
        </div>

        {/* MAIN FEATURED ARTICLE (Rendered when no search and in "all" category) */}
        {!searchQuery.trim() && activeCategoryId === 'all' && featuredPost && (
          <section className="mb-14" aria-label="Artigo em destaque">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-accent-500" />
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Artigo em Destaque Principal</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              onClick={() => onSelectPost(featuredPost.slug)}
              className="bg-white border border-slate-200/90 hover:border-accent-300 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 cursor-pointer group"
              id="featured-post-hero-card"
            >
              {/* Image Section */}
              <div className="lg:col-span-7 relative overflow-hidden bg-slate-900 min-h-[280px] sm:min-h-[360px]">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.imageAlt || featuredPost.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10" />

                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-primary-500 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-md border border-white/20">
                    {featuredPost.category}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 text-white text-xs font-semibold bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                  <Clock size={13} className="text-sky-300" />
                  <span>{featuredPost.readingTime} min de leitura</span>
                </div>
              </div>

              {/* Text Section */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="text-xs font-semibold text-slate-600 block">
                    Publicado em {featuredPost.publishedAt}
                  </span>

                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 leading-tight group-hover:text-primary-600 transition-colors">
                    {featuredPost.title}
                  </h2>

                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-4">
                    {featuredPost.summary}
                  </p>
                </div>

                {/* Author and Read Article button */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center text-xs font-bold">
                      BQ
                    </div>
                    <span className="text-xs font-bold text-slate-800">{featuredPost.author.name}</span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPost(featuredPost.slug);
                    }}
                    className="bg-accent-500 hover:bg-accent-600 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-md shadow-accent-500/20 flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02] min-h-[44px]"
                  >
                    <span>Ler artigo</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* MAIN ARTICLES GRID */}
        <section aria-label="Lista de artigos">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900">
              {searchQuery.trim() 
                ? `Resultados para "${searchQuery}" (${filteredPosts.length})` 
                : activeCategoryId === 'all' 
                ? 'Artigos Recentes' 
                : `${blogCategories.find(c => c.id === activeCategoryId)?.name} (${filteredPosts.length})`}
            </h3>

            {searchQuery.trim() && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs text-accent-600 hover:underline font-semibold cursor-pointer"
              >
                Limpar busca
              </button>
            )}
          </div>

          {regularPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="blog-posts-grid">
              <AnimatePresence mode="popLayout">
                {regularPosts.map((post) => (
                  <BlogPostCard
                    key={post.id}
                    post={post}
                    onSelectPost={onSelectPost}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            /* Empty Search State */
            <div className="text-center py-16 px-4 bg-white border border-slate-200 rounded-3xl space-y-4 max-w-xl mx-auto shadow-xs">
              <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
                <Search size={28} />
              </div>
              <h4 className="font-display font-bold text-lg text-slate-900">
                Nenhum artigo encontrado
              </h4>
              <p className="text-xs sm:text-sm text-slate-500">
                Não encontramos artigos para o termo pesquisado. Tente palavras-chave como <strong>"franquia"</strong>, <strong>"seguro auto"</strong>, <strong>"residencial"</strong> ou <strong>"viagem"</strong>.
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-2">
                {['Seguro Auto', 'Seguro Residencial', 'Franquia', 'Viagem'].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setSearchQuery(term)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* MOST READ / POPULAR HIGHLIGHTS SECTION */}
        {popularPosts.length > 0 && !searchQuery.trim() && (
          <section className="mt-16 pt-12 border-t border-slate-200" aria-label="Conteúdos mais acessados">
            <div className="flex items-center gap-2 mb-6">
              <Flame size={18} className="text-amber-500" />
              <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900">
                Conteúdos Mais Acessados
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {popularPosts.map((popPost) => (
                <div
                  key={popPost.id}
                  onClick={() => onSelectPost(popPost.slug)}
                  className="bg-white border border-slate-200 hover:border-accent-400 rounded-2xl p-4 transition-all cursor-pointer flex flex-col justify-between space-y-3 group shadow-2xs hover:shadow-md"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-accent-600 bg-accent-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {popPost.category}
                    </span>
                    <h4 className="font-display font-bold text-sm text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {popPost.title}
                    </h4>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>{popPost.readingTime} min de leitura</span>
                    <span className="font-bold text-accent-600 group-hover:underline flex items-center gap-0.5">
                      Ler <ArrowRight size={11} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* BOTTOM BLOG CONVERSION CTA */}
        <section className="mt-16 bg-gradient-to-r from-primary-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center sm:text-left border border-slate-800">
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs font-mono text-sky-300 font-bold uppercase tracking-widest block">
                Atendimento Consultivo e Isento
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                Ficou com alguma dúvida sobre seu seguro?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Nossos corretores analisam sua situação sem custo e comparam as melhores opções entre as 19 principais seguradoras do país.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  onNavigate('simulator');
                  setTimeout(() => {
                    const el = document.getElementById('simulator');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                }}
                className="w-full sm:w-auto bg-accent-500 hover:bg-accent-600 active:bg-accent-700 text-white font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-xl shadow-lg shadow-accent-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] min-h-[48px]"
                id="blog-bottom-btn-calculate"
              >
                <span>Calcule seu seguro</span>
                <ArrowRight size={15} />
              </button>

              <a
                href="https://wa.me/5532998800325?text=Ol%C3%A1!%20Estava%20lendo%20o%20Blog%20da%20BQ%20Seguros%20e%20gostaria%20de%20tirar%20d%C3%BAvidas."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs px-6 py-4 rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
                id="blog-bottom-btn-specialist"
              >
                <PhoneCall size={14} className="text-sky-300" />
                <span>Falar com especialista</span>
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* Editorial Admin Modal */}
      <BlogAdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        posts={posts}
        onPostsUpdated={onPostsUpdated}
      />
    </div>
  );
}
