/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Save, 
  Trash2, 
  RotateCcw, 
  Eye, 
  Edit3, 
  Sparkles, 
  Check, 
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import Markdown from 'react-markdown';
import { BlogPost, InsuranceType } from '../../types';
import { blogCategories, calculateReadingTime, saveBlogPost, deleteBlogPost, resetBlogPostsToDefault } from '../../data/blogData';

interface BlogAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: BlogPost[];
  onPostsUpdated: (posts: BlogPost[]) => void;
  initialTab?: 'list' | 'editor';
}

export default function BlogAdminModal({ 
  isOpen, 
  onClose, 
  posts, 
  onPostsUpdated,
  initialTab = 'list'
}: BlogAdminModalProps) {
  const [activeTab, setActiveTab] = useState<'list' | 'editor'>(initialTab);
  const [previewMode, setPreviewMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Seguro Auto');
  const [categoryId, setCategoryId] = useState('auto');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('Equipe Técnica BQ Seguros');
  const [authorRole, setAuthorRole] = useState('Consultoria Especializada em Seguros');
  const [readingTime, setReadingTime] = useState(4);
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&auto=format&fit=crop&q=80');
  const [imageAlt, setImageAlt] = useState('');
  const [tagsInput, setTagsInput] = useState('Dicas BQ, Seguros');
  const [featured, setFeatured] = useState(false);
  const [popular, setPopular] = useState(false);
  const [relatedInsuranceId, setRelatedInsuranceId] = useState<InsuranceType>('auto');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDesc, setSeoDesc] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!editingId) {
      const s = generateSlug(newTitle);
      setSlug(s);
      setSeoTitle(`${newTitle} | BQ Seguros`);
    }
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    const rt = calculateReadingTime(newContent);
    setReadingTime(rt);
  };

  const handleCategoryChange = (catName: string) => {
    setCategory(catName);
    const found = blogCategories.find(c => c.name === catName);
    if (found) {
      setCategoryId(found.id);
    }
  };

  const handleStartNew = () => {
    setEditingId(null);
    setTitle('');
    setSlug('');
    setCategory('Seguro Auto');
    setCategoryId('auto');
    setSummary('');
    setContent(`### Introdução ao Tema\n\nEscreva aqui a introdução respondendo diretamente à dúvida principal do leitor com clareza e autoridade.\n\n---\n\n### Como Funciona na Prática?\n\n* **Ponto 1**: Detalhes sobre a cobertura e regras da seguradora;\n* **Ponto 2**: Documentos necessários e orientações;\n* **Ponto 3**: Dicas para economizar e escolher a franquia certa.\n\n---\n\n> **Dica do Especialista BQ:** Sempre confira as cláusulas particulares com o seu corretor credenciado.`);
    setAuthorName('Equipe Técnica BQ Seguros');
    setAuthorRole('Consultoria Especializada em Seguros');
    setReadingTime(4);
    setCoverImage('https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1200&auto=format&fit=crop&q=80');
    setImageAlt('Dicas sobre seguros');
    setTagsInput('Seguros, Dicas BQ, Economia');
    setFeatured(false);
    setPopular(false);
    setRelatedInsuranceId('auto');
    setSeoTitle('');
    setSeoDesc('');
    setActiveTab('editor');
    setPreviewMode(false);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setTitle(post.title);
    setSlug(post.slug);
    setCategory(post.category);
    setCategoryId(post.categoryId);
    setSummary(post.summary);
    setContent(post.content);
    setAuthorName(post.author.name);
    setAuthorRole(post.author.role);
    setReadingTime(post.readingTime);
    setCoverImage(post.coverImage);
    setImageAlt(post.imageAlt || post.title);
    setTagsInput(post.tags.join(', '));
    setFeatured(Boolean(post.featured));
    setPopular(Boolean(post.popular));
    setRelatedInsuranceId(post.relatedInsuranceId || 'auto');
    setSeoTitle(post.seo?.title || '');
    setSeoDesc(post.seo?.description || '');
    setActiveTab('editor');
    setPreviewMode(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const postSlug = slug.trim() || generateSlug(title);

    const postToSave: BlogPost = {
      id: editingId || `post-${Date.now()}`,
      slug: postSlug,
      title: title.trim(),
      summary: summary.trim() || title.trim(),
      content: content.trim(),
      category,
      categoryId,
      author: {
        name: authorName.trim() || 'Equipe Técnica BQ Seguros',
        role: authorRole.trim() || 'Consultoria Especializada em Seguros',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&auto=format&fit=crop&q=80'
      },
      publishedAt: editingId 
        ? (posts.find(p => p.id === editingId)?.publishedAt || new Date().toLocaleDateString('pt-BR'))
        : new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }),
      readingTime: Number(readingTime) || 4,
      featured,
      popular,
      coverImage: coverImage.trim() || 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1200&auto=format&fit=crop&q=80',
      imageAlt: imageAlt.trim() || title.trim(),
      tags,
      relatedInsuranceId,
      seo: {
        title: seoTitle.trim() || `${title.trim()} | BQ Seguros`,
        description: seoDesc.trim() || summary.trim(),
        keywords: tags
      }
    };

    const updated = saveBlogPost(postToSave);
    onPostsUpdated(updated);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setActiveTab('list');
    }, 1200);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza de que deseja excluir este artigo do blog?')) {
      const updated = deleteBlogPost(id);
      onPostsUpdated(updated);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Restaurar os artigos originais de demonstração da BQ Seguros?')) {
      const reset = resetBlogPostsToDefault();
      onPostsUpdated(reset);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/75 backdrop-blur-xs" 
      />

      {/* Modal Window */}
      <div className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[92vh] flex flex-col z-10 text-slate-800">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-primary-50 text-primary-700 px-2.5 py-0.5 rounded-md border border-primary-200">
                Painel Editorial BQ Seguros
              </span>
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 mt-1">
              Central de Gestão e Publicação do Blog
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Fechar painel"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between py-3 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('list')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'list' 
                  ? 'bg-primary-500 text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Todos os Artigos ({posts.length})
            </button>
            <button
              type="button"
              onClick={handleStartNew}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'editor' && !editingId
                  ? 'bg-accent-500 text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Plus size={14} />
              <span>Novo Artigo</span>
            </button>
          </div>

          {activeTab === 'list' && (
            <button
              type="button"
              onClick={handleResetDefaults}
              className="text-[11px] font-semibold text-slate-500 hover:text-red-600 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw size={12} />
              <span>Restaurar Artigos Originais</span>
            </button>
          )}
        </div>

        {/* Modal Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto py-4">
          
          {/* TAB 1: LIST OF ARTICLES */}
          {activeTab === 'list' && (
            <div className="space-y-3">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200 bg-slate-200"
                    />
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary-100 text-primary-700">
                          {post.category}
                        </span>
                        {post.featured && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                            ★ Em Destaque
                          </span>
                        )}
                        <span className="text-[11px] text-slate-400 font-mono">
                          {post.readingTime} min • {post.publishedAt}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 line-clamp-1">
                        {post.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        /{post.slug}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => handleEdit(post)}
                      className="px-3 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Edit3 size={13} />
                      <span>Editar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(post.id)}
                      className="p-2 rounded-xl bg-white hover:bg-red-50 border border-slate-200 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                      title="Excluir artigo"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: EDITOR (WRITE / EDIT) */}
          {activeTab === 'editor' && (
            <form onSubmit={handleSave} className="space-y-6">
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-slate-700">
                  {editingId ? 'Editando Artigo Existente' : 'Criando Novo Artigo para o Blog BQ Seguros'}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPreviewMode(!previewMode)}
                    className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye size={14} />
                    <span>{previewMode ? 'Voltar ao Editor' : 'Visualizar Prévia'}</span>
                  </button>
                </div>
              </div>

              {!previewMode ? (
                <div className="space-y-4">
                  {/* Title & Slug */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Título do Artigo *</label>
                      <input
                        required
                        type="text"
                        value={title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="Ex: Seguro Auto cobre enchente?"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-accent-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Slug (URL amigável) *</label>
                      <input
                        required
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="ex: seguro-auto-cobre-enchente"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:outline-hidden focus:border-accent-500"
                      />
                    </div>
                  </div>

                  {/* Category & Related Insurance CTA */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Categoria Editorial</label>
                      <select
                        value={category}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden cursor-pointer"
                      >
                        {blogCategories.filter(c => c.id !== 'all').map(c => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">CTA de Cotação Relacionado</label>
                      <select
                        value={relatedInsuranceId}
                        onChange={(e) => setRelatedInsuranceId(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden cursor-pointer"
                      >
                        <option value="auto">Seguro Auto</option>
                        <option value="home">Seguro Residencial</option>
                        <option value="life">Seguro de Vida</option>
                        <option value="enterprise">Seguro Empresarial</option>
                        <option value="travel">Seguro Viagem</option>
                        <option value="equipment">Seguro Equipamentos</option>
                        <option value="motorhome">Seguro Carga / Frota</option>
                        <option value="others">Geral / Consultoria</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Tempo de Leitura (minutos)</label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={readingTime}
                        onChange={(e) => setReadingTime(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Summary / Excerpt */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Resumo / Subtítulo (Exibido no card e topo do artigo) *</label>
                    <textarea
                      required
                      rows={2}
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      placeholder="Breve resumo conciso de 1 a 2 frases para atrair o leitor e resumir a dúvida principal."
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-accent-500"
                    />
                  </div>

                  {/* Markdown Content */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700">Conteúdo Completo (Suporta formatação Markdown) *</label>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {content.split(/\s+/).filter(Boolean).length} palavras
                      </span>
                    </div>
                    <textarea
                      required
                      rows={12}
                      value={content}
                      onChange={(e) => handleContentChange(e.target.value)}
                      placeholder="Escreva seu artigo estruturado com títulos (###), tópicos (*), destaques (**negrito**) e citações (>)..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-xs text-slate-900 font-mono leading-relaxed focus:outline-hidden focus:border-accent-500"
                    />
                  </div>

                  {/* Cover Image URL & Tags */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">URL da Imagem de Capa</label>
                      <input
                        type="url"
                        value={coverImage}
                        onChange={(e) => setCoverImage(e.target.value)}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Tags (Separadas por vírgula)</label>
                      <input
                        type="text"
                        value={tagsInput}
                        onChange={(e) => setTagsInput(e.target.value)}
                        placeholder="Seguro Auto, Enchente, Sinistro"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Checkboxes: Featured & Popular */}
                  <div className="flex flex-wrap gap-6 pt-2">
                    <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                        className="rounded text-accent-500 focus:ring-accent-400 w-4 h-4 cursor-pointer"
                      />
                      <span>Fixar como Artigo em Destaque Principal no Topo do Blog</span>
                    </label>

                    <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={popular}
                        onChange={(e) => setPopular(e.target.checked)}
                        className="rounded text-accent-500 focus:ring-accent-400 w-4 h-4 cursor-pointer"
                      />
                      <span>Destacar na seção "Mais Lidos / Recomendados"</span>
                    </label>
                  </div>

                  {/* SEO Meta Fields */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                    <span className="text-xs font-bold text-slate-700 block">Configurações de SEO</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={seoTitle}
                        onChange={(e) => setSeoTitle(e.target.value)}
                        placeholder="Meta Title personalizado para o Google"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-hidden"
                      />
                      <input
                        type="text"
                        value={seoDesc}
                        onChange={(e) => setSeoDesc(e.target.value)}
                        placeholder="Meta Description personalizada"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* LIVE PREVIEW SCREEN */
                <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 max-w-3xl mx-auto shadow-sm">
                  <span className="text-xs font-bold bg-primary-50 text-primary-700 px-3 py-1 rounded-full border border-primary-200">
                    {category}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
                    {title || 'Título do Artigo'}
                  </h1>
                  <p className="text-slate-600 text-sm italic border-l-4 border-accent-500 pl-3">
                    {summary || 'Resumo do artigo...'}
                  </p>
                  <img src={coverImage} alt="Prévia" className="w-full h-48 rounded-2xl object-cover" />
                  <div className="prose prose-slate max-w-none text-xs sm:text-sm">
                    <Markdown>{content}</Markdown>
                  </div>
                </div>
              )}

              {/* Form Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab('list')}
                  className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="bg-accent-500 hover:bg-accent-600 active:bg-accent-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md shadow-accent-500/20 flex items-center gap-2 cursor-pointer min-h-[44px]"
                  id="btn-save-blog-article"
                >
                  {saveSuccess ? (
                    <>
                      <Check size={16} className="text-white" />
                      <span>Artigo Salvo com Sucesso!</span>
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      <span>{editingId ? 'Salvar Alterações' : 'Publicar Artigo no Blog'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
