import { supabase } from '../../../lib/supabase'; 
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';

export const revalidate = 60;

async function getArticle(slug) {
  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !article) {
    return null;
  }
  return article;
}

export async function generateMetadata({ params }) {
  const { slug } = await params; 
  const article = await getArticle(slug);
  
  if (!article) {
    return { title: 'Artikel Tidak Ditemukan | EduVate' };
  }
  
  return {
    title: `${article.title} | EduVate`,
    description: article.excerpt,
  };
}

export default async function ArticleDetail({ params }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const readingTime = Math.ceil(article.content.split(/\s+/).length / 200);

  return (
    <article className="pt-28 pb-20 min-h-screen bg-linear-to-br from-slate-900 via-slate-900 to-cyan-950">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6">
        
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/artikel" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-all duration-300 font-medium group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Semua Artikel
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium border border-cyan-500/30">
              Article
            </span>
            <span className="text-slate-500 text-sm">•</span>
            <div className="flex items-center gap-1 text-slate-500 text-sm">
              <Clock className="w-4 h-4" />
              <span>{readingTime} min read</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-xl text-slate-400 mb-8 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-slate-400 border-b border-slate-700/50 pb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">{article.author}</p>
                <p className="text-sm">Author</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-400" />
              <span className="text-sm">
                {new Date(article.created_at).toLocaleDateString('id-ID', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {article.cover_image && (
          <div className="relative w-full h-64 md:h-80 lg:h-96 mb-12 rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl">
            <Image 
              src={article.cover_image} 
              alt={article.title} 
              fill 
              className="object-cover"
              priority 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/20 to-transparent" />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="
            prose-headings:font-bold 
            prose-h1:text-4xl 
            prose-h2:text-3xl 
            prose-h3:text-2xl
            prose-h4:text-xl
            prose-p:text-slate-300 
            prose-p:leading-relaxed
            prose-p:text-lg
            prose-a:text-cyan-400 
            prose-a:no-underline
            prose-a:border-b-2
            prose-a:border-cyan-400/30
            prose-a:transition-all
            prose-a:hover:border-cyan-400
            prose-strong:text-white
            prose-strong:font-semibold
            prose-ul:text-slate-300
            prose-ol:text-slate-300
            prose-li:leading-relaxed
            prose-blockquote:border-l-4
            prose-blockquote:border-cyan-400
            prose-blockquote:bg-slate-800/30
            prose-blockquote:py-2
            prose-blockquote:px-6
            prose-blockquote:rounded-r-xl
            prose-blockquote:text-slate-300
            prose-pre:bg-slate-800/50
            prose-pre:border
            prose-pre:border-slate-700/50
            prose-pre:rounded-2xl
            prose-code:text-cyan-400
            prose-code:bg-slate-800/50
            prose-code:px-2
            prose-code:py-1
            prose-code:rounded-lg
            prose-img:rounded-2xl
            prose-img:border
            prose-img:border-slate-700/50
            prose-img:shadow-lg
          ">
            <div className="whitespace-pre-wrap leading-relaxed">
              {article.content}
            </div>
          </div>
        </div>

       
      </div>
    </article>
  );
}