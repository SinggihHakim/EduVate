import { supabase } from '@/lib/supabase';
import Card from '@/components/Card';
import { Cpu, SearchX } from 'lucide-react';

export const revalidate = 60;

async function getCourses() {
  const { data: courses, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
  return courses;
}

export default async function KursusPage() {
  const courses = await getCourses();

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
              <Cpu className="w-10 h-10 text-cyan-400" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-linear-to-r from-cyan-400 to-lime-300 bg-clip-text text-transparent">
              Kursus
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Kurasi kursus terbaik dari berbagai platform untuk menguasai skill digital yang dibutuhkan industri
          </p>
        </div>

        {/* Courses Grid */}
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Card 
                key={course.id}
                title={course.title}
                description={course.description}
                image={course.image}
                link={course.link}
                category={course.platform}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-700/50 rounded-2xl bg-slate-800/30 backdrop-blur-sm">
            <div className="p-6 bg-slate-700/50 rounded-2xl mb-6">
              <SearchX className="w-16 h-16 text-slate-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Belum ada kursus tersedia</h3>
            <p className="text-slate-400 text-center max-w-md">
              Kursus akan segera ditambahkan. Silakan kembali lagi nanti.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}