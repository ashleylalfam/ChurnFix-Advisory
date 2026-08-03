import React, { useState } from 'react';
import { BLOG_ARTICLES } from '../../data/mockData';
import { BlogArticle, NavigationPage } from '../../types';
import { Search, BookOpen, Clock, Tag, ArrowRight, Sparkles } from 'lucide-react';

interface ResourcesProps {
  onNavigate: (page: NavigationPage) => void;
  onSelectArticle: (article: BlogArticle) => void;
}

export const Resources: React.FC<ResourcesProps> = ({ onNavigate, onSelectArticle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Retry Logic', 'Dunning', 'SaaS Metrics', 'Card Updater', 'Billing Infrastructure'];

  const filteredArticles = BLOG_ARTICLES.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          art.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          art.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const featuredArticle = BLOG_ARTICLES.find(a => a.featured) || BLOG_ARTICLES[0];

  const handleReadArticle = (article: BlogArticle) => {
    onSelectArticle(article);
    onNavigate('blog-post');
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 font-mono">
            KNOWLEDGE BASE & GUIDES
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Payment Recovery Playbooks for SaaS
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            In-depth engineering guides, dunning email frameworks, and payment retry optimization tactics written by Ashley Lalfam.
          </p>
        </div>

        {/* Featured Article Hero Card */}
        {featuredArticle && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                  FEATURED PLAYBOOK
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {featuredArticle.readTime}
                </span>
              </div>

              <h2 
                onClick={() => handleReadArticle(featuredArticle)}
                className="text-2xl sm:text-4xl font-extrabold text-white hover:text-emerald-400 cursor-pointer transition-colors leading-tight"
              >
                {featuredArticle.title}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {featuredArticle.excerpt}
              </p>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => handleReadArticle(featuredArticle)}
                  className="py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={featuredArticle.author.avatar}
                  alt={featuredArticle.author.name}
                  className="w-12 h-12 rounded-full object-cover border border-emerald-400"
                />
                <div>
                  <div className="text-sm font-bold text-white">{featuredArticle.author.name}</div>
                  <div className="text-xs text-slate-400">{featuredArticle.author.role}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800">
                {featuredArticle.tags.map((t, i) => (
                  <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search & Category Filter Bar */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search dunning guides, retry rules, stripe logs..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Category Badges */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => handleReadArticle(article)}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all cursor-pointer group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-emerald-400 font-semibold px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                      {article.category}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">By {article.author.name}</span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Guide <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
