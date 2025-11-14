// app/page.js
import Hero from "../components/Hero";
import Card from "../components/Card";
import { supabase } from "../lib/supabase";
import { Zap, Brain, Lightbulb, Sparkles, BookOpen, Video } from "lucide-react";

export const revalidate = 60;

async function getData() {
  const { data: articles } = await supabase.from("articles").select("*").limit(3).order("created_at", { ascending: false });

  const { data: courses } = await supabase.from("courses").select("*").limit(3).order("created_at", { ascending: false });

  const { data: webinars } = await supabase.from("webinars").select("*").limit(3).order("date_time", { ascending: true });

  return { articles, courses, webinars };
}

export default async function Home() {
  const { articles, courses, webinars } = await getData();

  return (
    <>
      <Hero />

      {/* Why EduVate Section */}
      <section className="py-24 bg-linear-to-b from-slate-900 to-cyan-950/30 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-lime-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-cyan-400 mr-2" />
              <span className="text-sm font-medium text-cyan-400">Value Proposition</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Mengapa Memilih <span className="bg-linear-to-r from-cyan-400 to-lime-300 bg-clip-text text-transparent">EduVate?</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Di era disrupsi digital, <span className="text-cyan-400 font-semibold">berdiam diri berarti tertinggal</span>. 
              Kami menyediakan kurasi konten terbaik yang dirancang khusus untuk mempersiapkan Anda menghadapi gelombang transformasi digital.
            </p>
          </div>

          {/* Main Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { 
                title: "Kurasi AI & Teknologi Mutakhir", 
                icon: <Brain className="w-8 h-8 text-cyan-400" />, 
                desc: "Akses materi terupdate tentang Artificial Intelligence, Machine Learning, dan teknologi disruptif lainnya yang dikurasi oleh expert industry.",
                features: ["Update real-time trend AI", "Kurasi oleh praktisi", "Case study terkini"],
                stat: "50+",
                statLabel: "Materi AI"
              },
              { 
                title: "Skill Praktis & Aplikatif", 
                icon: <Zap className="w-8 h-8 text-lime-400" />, 
                desc: "Belajar skill yang langsung bisa diaplikasikan di dunia kerja dengan project-based learning dan mentorship langsung dari profesional.",
                features: ["Project-based learning", "Portfolio building", "Industry mentorship"],
                stat: "12x",
                statLabel: "Lebih Efektif"
              },
              { 
                title: "Wawasan & Inovasi Terkini", 
                icon: <Lightbulb className="w-8 h-8 text-amber-400" />, 
                desc: "Dapatkan insight tentang tren teknologi terbaru dan peluang di masa depan melalui webinar eksklusif dan research papers.",
                features: ["Webinar bulanan", "Research papers", "Industry insights"],
                stat: "100+",
                statLabel: "Insight Baru"
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative p-8 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl hover:border-cyan-500/30 transition-all duration-500 overflow-hidden hover:-translate-y-2"
              >
                {/* linear Overlay on Hover */}
                <div className="absolute inset-0 bg-linear-to-br from-cyan-500/0 to-lime-500/0 group-hover:from-cyan-500/5 group-hover:to-lime-500/5 transition-all duration-500 rounded-2xl"></div>
                
                {/* Icon Container */}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-linear-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  
                  {/* Stat Badge */}
                  <div className="absolute top-6 right-6 text-right">
                    <div className="text-2xl font-bold bg-linear-to-r from-cyan-400 to-lime-300 bg-clip-text text-transparent">
                      {item.stat}
                    </div>
                    <div className="text-xs text-slate-400 font-medium">{item.statLabel}</div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-300 transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                    {item.desc}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3">
                    {item.features.map((feature, featureIdx) => (
                      <li key={featureIdx} className="flex items-center gap-3 text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full shrink-0"></div>
                        <span className="text-sm font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Value Props */}
          <div className="bg-linear-to-r from-slate-800/50 to-cyan-900/20 rounded-2xl border border-cyan-500/20 p-8 backdrop-blur-sm">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { number: "10K+", label: "Professionals Terbantu", color: "text-cyan-400" },
                { number: "98%", label: "Kepuasan Pengguna", color: "text-lime-400" },
                { number: "24/7", label: "Akses Learning", color: "text-amber-400" },
                { number: "500+", label: "Hours Content", color: "text-purple-400" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
                  <div className="text-slate-400 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
              <a
                href="/kursus"
                className="px-8 py-4 bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 flex items-center gap-3 hover:scale-105"
              >
                <BookOpen className="w-5 h-5" />
                Mulai Perjalanan Belajar
              </a>
              <a
                href="/webinar"
                className="px-8 py-4 border border-slate-600 text-slate-300 font-semibold rounded-xl hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300 flex items-center gap-3 hover:scale-105"
              >
                <Video className="w-5 h-5" />
                Lihat Webinar Mendatang
              </a>
            </div>
            <p className="text-slate-500 text-sm mt-4">
              Bergabung dengan <span className="text-cyan-400 font-semibold">5,000+ professionals</span> yang sudah memulai perjalanan belajar mereka
            </p>
          </div>
        </div>
      </section>

      {/* Artikel Terbaru Section */}
      <section className="py-20 bg-linear-to-b from-cyan-950/30 to-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Artikel <span className="bg-linear-to-r from-cyan-400 to-lime-300 bg-clip-text text-transparent">Terbaru</span>
              </h2>
              <p className="text-slate-400">Eksplorasi wawasan teknologi terkini</p>
            </div>
            <a href="/artikel" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
              Lihat Semua
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {articles?.length > 0 ? (
              articles.map((article) => (
                <Card 
                  key={article.id} 
                  title={article.title} 
                  description={article.excerpt} 
                  image={article.cover_image} 
                  link={`/artikel/${article.slug}`} 
                  category="Article" 
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-slate-400">Belum ada artikel terbaru</div>
            )}
          </div>
        </div>
      </section>

      {/* Kursus Pilihan Section */}
      <section className="py-20 bg-linear-to-b from-slate-900 to-cyan-950/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Kursus <span className="bg-linear-to-r from-cyan-400 to-lime-300 bg-clip-text text-transparent">Pilihan</span>
              </h2>
              <p className="text-slate-400">Kurasi kursus terbaik untuk skill digital</p>
            </div>
            <a href="/kursus" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
              Lihat Semua
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {courses?.length > 0 ? (
              courses.map((course) => (
                <Card 
                  key={course.id} 
                  title={course.title} 
                  description={course.description} 
                  image={course.image} 
                  link={course.link} 
                  category={course.platform} 
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-slate-400">Belum ada rekomendasi kursus</div>
            )}
          </div>
        </div>
      </section>

      {/* Webinar Mendatang Section */}
      <section className="py-20 bg-linear-to-b from-cyan-950/30 to-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Jadwal <span className="bg-linear-to-r from-cyan-400 to-lime-300 bg-clip-text text-transparent">Webinar</span>
              </h2>
              <p className="text-slate-400">Sesi berbagi ilmu dengan para ahli</p>
            </div>
            <a href="/webinar" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
              Lihat Jadwal
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {webinars?.length > 0 ? (
              webinars.map((web) => (
                <Card
                  key={web.id}
                  title={web.title}
                  description={`Speaker: ${web.speaker} • ${new Date(web.date_time).toLocaleDateString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })} WIB`}
                  image={web.image}
                  link={web.registration_link}
                  category="Live Event"
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-slate-400">Belum ada jadwal webinar mendatang</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}