import { supabase } from '../../lib/supabase';
import Card from '../../components/Card';
import SearchInput from '../../components/SearchInput';
import { BookOpen, SearchX } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getArticles(query) {
  let supabaseQuery = supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  if (query) {
    supabaseQuery = supabaseQuery.ilike('title', `%${query}%`);
  }

  const { data: articles, error } = await supabaseQuery;

  if (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
  return articles;
}

export default async function ArtikelPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const query = resolvedParams?.q || '';
  
  const articles = await getArticles(query);

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 bg-linear-to-br from-slate-900 via-slate-900 to-cyan-950">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-linear-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
              <BookOpen className="w-10 h-10 text-cyan-400" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-linear-to-r from-cyan-400 to-lime-300 bg-clip-text text-transparent">
              Artikel
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Jelajahi wawasan teknologi terkini dan panduan mendalam untuk mengasah skill digital Anda
          </p>
        </div>

        {/* Search Section */}
        <div className="flex justify-center mb-12">
          <div className="w-full max-w-2xl">
            <SearchInput placeholder="Cari artikel (AI, Web Development, Data Science)..." />
          </div>
        </div>

        {/* Search Results Info */}
        {query && (
          <div className="text-center mb-8">
            <p className="text-slate-400">
              Menampilkan hasil untuk:{' '}
              <span className="text-cyan-400 font-semibold">"{query}"</span>
            </p>
          </div>
        )}

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Card 
                key={article.id}
                title={article.title}
                description={article.excerpt}
                image={article.cover_image}
                link={`/artikel/${article.slug}`}
                category="Article"
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-700/50 rounded-2xl bg-slate-800/30 backdrop-blur-sm">
            <div className="p-6 bg-slate-700/50 rounded-2xl mb-6">
              <SearchX className="w-16 h-16 text-slate-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Tidak ada artikel ditemukan</h3>
            <p className="text-slate-400 text-center max-w-md mb-6">
              {query 
                ? `Tidak ada hasil untuk "${query}". Coba kata kunci yang berbeda.`
                : 'Belum ada artikel yang tersedia. Silakan kembali lagi nanti.'
              }
            </p>
            {query && (
              <button 
                onClick={() => window.location.href = '/artikel'}
                className="px-6 py-3 bg-linear-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
              >
                Lihat Semua Artikel
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}