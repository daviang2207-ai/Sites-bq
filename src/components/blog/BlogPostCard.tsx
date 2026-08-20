/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Clock, ArrowRight, Calendar, User } from 'lucide-react';
import { motion } from 'motion/react';
import { BlogPost } from '../../types';

interface BlogPostCardProps {
  post: BlogPost;
  onSelectPost: (slug: string) => void;
}

export default function BlogPostCard({ post, onSelectPost }: BlogPostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      whileHover={{ y: -4 }}
      onClick={() => onSelectPost(post.slug)}
      className="bg-white border border-slate-200/90 hover:border-accent-300 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group cursor-pointer"
      id={`blog-card-${post.id}`}
    >
      <div>
        {/* Card Cover Image */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-900">
          <img
            src={post.coverImage}
            alt={post.imageAlt || post.title}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent z-10" />

          {/* Category Tag */}
          <div className="absolute top-3 left-3 z-20">
            <span className="bg-primary-500/95 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-lg border border-white/20 shadow-xs">
              {post.category}
            </span>
          </div>

          {/* Reading Time Badge */}
          <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 text-white text-xs font-semibold bg-slate-950/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
            <Clock size={12} className="text-sky-300" />
            <span>{post.readingTime} min de leitura</span>
          </div>
        </div>

        {/* Card Text Body */}
        <div className="p-5 space-y-3">
          {/* Publication Date */}
          <div className="flex items-center gap-2 text-[11px] text-slate-600 font-medium">
            <Calendar size={12} className="text-slate-400" />
            <time dateTime={post.publishedAt}>{post.publishedAt}</time>
          </div>

          {/* Title */}
          <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 leading-snug group-hover:text-primary-600 transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
            {post.summary}
          </p>
        </div>
      </div>

      {/* Card Footer Action */}
      <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <User size={13} className="text-slate-400" />
          <span className="truncate max-w-[140px] text-[11px] font-medium">{post.author.name}</span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelectPost(post.slug);
          }}
          className="inline-flex items-center gap-1.5 text-accent-600 group-hover:text-accent-700 font-bold text-xs cursor-pointer py-1 px-2.5 rounded-lg bg-accent-50 group-hover:bg-accent-100 transition-all"
          aria-label={`Ler artigo completo: ${post.title}`}
        >
          <span>Ler artigo</span>
          <ArrowRight size={13} className="transform group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </motion.article>
  );
}
