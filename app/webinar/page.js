import { supabase } from '@/lib/supabase';
import { Calendar, Clock, Video, Mic } from 'lucide-react';

export const revalidate = 0;

export default async function WebinarPage() {
  const { data: webinars } = await supabase
    .from('webinars')
    .select('*')
    .order('date_time', { ascending: true });

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 bg-linear-to-br from-slate-900 via-slate-900 to-cyan-950">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-linear-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
              <Video className="w-10 h-10 text-cyan-400" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-linear-to-r from-cyan-400 to-lime-300 bg-clip-text text-transparent">
              Webinar
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Jangan lewatkan sesi berbagi ilmu langsung dengan para ahli di industri teknologi dan kreatif
          </p>
        </div>

        {/* Webinar List */}
        <div className="space-y-6">
          {webinars?.length > 0 ? (
            webinars.map((web) => (
              <div 
                key={web.id} 
                className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 p-6 rounded-2xl hover:border-cyan-500/30 transition-all duration-300 shadow-lg"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  
                  {/* Webinar Info */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">{web.title}</h3>
                    <p className="text-slate-300 mb-4 flex items-center gap-2">
                      <Mic className="w-5 h-5 text-cyan-400" /> 
                      Speaker: {web.speaker}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="flex items-center gap-2 bg-slate-700/50 px-4 py-2 rounded-xl text-cyan-400 border border-cyan-500/30">
                        <Calendar className="w-4 h-4" /> 
                        {new Date(web.date_time).toLocaleDateString('id-ID', { 
                          weekday: 'long', 
                          day: 'numeric', 
                          month: 'long' 
                        })}
                      </span>
                      <span className="flex items-center gap-2 bg-slate-700/50 px-4 py-2 rounded-xl text-lime-400 border border-lime-500/30">
                        <Clock className="w-4 h-4" />
                        {new Date(web.date_time).toLocaleTimeString('id-ID', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })} WIB
                      </span>
                    </div>
                  </div>
                  
                  {/* Register Button */}
                  <a 
                    href={web.registration_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="lg:shrink-0 inline-flex items-center justify-center px-8 py-3 bg-linear-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                  >
                    Daftar Sekarang
                  </a>
                </div>
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-700/50 rounded-2xl bg-slate-800/30 backdrop-blur-sm">
              <div className="p-6 bg-slate-700/50 rounded-2xl mb-6">
                <Video className="w-16 h-16 text-slate-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Belum ada webinar tersedia</h3>
              <p className="text-slate-400 text-center max-w-md">
                Webinar akan segera dijadwalkan. Silakan kembali lagi nanti.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}