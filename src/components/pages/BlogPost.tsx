import React from 'react';
import { BlogArticle, NavigationPage } from '../../types';
import { ArrowLeft, Clock, Share2, ShieldCheck, ArrowRight } from 'lucide-react';

interface BlogPostProps {
  article: BlogArticle | null;
  onNavigate: (page: NavigationPage) => void;
}

export const BlogPost: React.FC<BlogPostProps> = ({ article, onNavigate }) => {
  if (!article) {
    return (
      <div className="bg-slate-950 text-white min-h-screen py-20 text-center">
        <p className="text-slate-400">Article not found.</p>
        <button onClick={() => onNavigate('resources')} className="mt-4 px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl">
          Back to Resources
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-white min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Back Link */}
        <button
          onClick={() => onNavigate('resources')}
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Playbooks</span>
        </button>

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-emerald-400 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
              {article.category}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {article.readTime}
            </span>
            <span className="text-xs text-slate-500 font-mono">• Published {article.publishedAt}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {article.title}
          </h1>

          <p className="text-slate-300 text-lg leading-relaxed border-l-2 border-emerald-500 pl-4 py-1 italic">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-10 h-10 rounded-full object-cover border border-emerald-400"
              />
              <div>
                <div className="text-sm font-bold text-white">{article.author.name}</div>
                <div className="text-xs text-slate-400">{article.author.role}</div>
              </div>
            </div>

            <button
              onClick={() => alert('Article link copied to clipboard!')}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Article Body */}
        <div className="prose prose-invert max-w-none space-y-6 text-slate-300 text-base leading-relaxed bg-slate-900/60 p-8 rounded-3xl border border-slate-800">
          <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n\n/g, '<br/><br/>').replace(/### (.*)/g, '<h3 class="text-xl font-bold text-white mt-6 mb-2">$1</h3>').replace(/#### (.*)/g, '<h4 class="text-lg font-bold text-emerald-400 mt-4 mb-2">$1</h4>') }} />
        </div>

        {/* Bottom Author CTA */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <ShieldCheck className="w-10 h-10 text-emerald-400 shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-white">Need help implementing this in your gateway?</h3>
              <p className="text-xs text-slate-400 mt-1">Book a free payment recovery audit with Ashley Lalfam.</p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('book-audit')}
            className="py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-md shadow-emerald-500/20 whitespace-nowrap cursor-pointer flex items-center gap-2"
          >
            <span>Book Recovery Audit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
