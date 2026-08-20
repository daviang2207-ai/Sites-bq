/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BookOpen, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { BlogPost } from '../types';

interface BlogTeaserProps {
  posts: BlogPost[];
  onOpenBlog: () => void;
  onSelectPost: (slug: string) => void;
}

export default function BlogTeaser({ posts, onOpenBlog, onSelectPost }: BlogTeaserProps) {
  const latestPosts = posts.slice(0, 3);

  return (
    <section id="blog-teaser" className="py-20 bg-white border-y border-slate-200/80 relative overflow-hidden" aria-label="Central de Conteúdo e Blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-wider border border-primary-200">
              <BookOpen size={13} className="text-primary-600" />
              <span>Central de Conteúdo & Educação</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              Blog BQ Seguros: Informação que Protege
            </h2>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Tire dúvidas práticas sobre coberturas, franquias, sinistros e descubra como economizar na contratação do seu seguro com orientações de especialistas.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenBlog}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-primary-500/20 cursor-pointer self-start md:self-auto hover:scale-[1.02] min-h-[44px]"
            id="btn-see-all-blog-posts"
          >
            <span>Acessar Blog Completo</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* 3 Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              onClick={() => onSelectPost(post.slug)}
              className="bg-[#f8fafc] border border-slate-200/90 hover:border-accent-300 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Image */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                  <img
                    src={post.coverImage}
                    alt={post.imageAlt || post.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent z-10" />

                  <div className="absolute top-3 left-3 z-20">
                    <span className="bg-primary-500/95 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-xs">
                      {post.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1 text-white text-[11px] font-semibold bg-slate-950/60 backdrop-blur-md px-2 py-0.5 rounded-md">
                    <Clock size={11} className="text-sky-300" />
                    <span>{post.readingTime} min de leitura</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 space-y-2.5">
                  <span className="text-[11px] text-slate-400 font-medium block">
                    {post.publishedAt}
                  </span>

                  <h3 className="font-display font-bold text-base text-slate-900 leading-snug group-hover:text-primary-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-slate-200/60 mt-auto">
                <span className="text-[11px] text-slate-500 truncate max-w-[140px] font-medium">
                  {post.author.name}
                </span>

                <span className="inline-flex items-center gap-1 text-xs font-bold text-accent-600 group-hover:text-accent-700">
                  <span>Ler artigo</span>
                  <ArrowRight size={13} className="transform group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
