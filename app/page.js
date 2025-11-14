// page.js

import Hero from "../components/Hero";
import Card from "../components/Card";
import { supabase } from "../lib/supabase";
import { Zap, Brain, Lightbulb } from "lucide-react";

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
      <section className="py-20 bg-linear-to-b from-slate-900 to-cyan-950/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Mengapa <span className="bg-linear-to-r from-cyan-400 to-lime-300 bg-clip-text text-transparent">EduVate?</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">Di era disrupsi, berdiam diri berarti tertinggal. Kami menyediakan kurasi konten terbaik agar kamu siap menghadapi masa depan.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Kurasi AI", icon: <Brain className="text-cyan-400" />, desc: "Materi terupdate tentang Artificial Intelligence." },
              { title: "Skill Praktis", icon: <Zap className="text-cyan-400" />, desc: "Langsung bisa diaplikasikan di dunia kerja." },
              { title: "Wawasan Baru", icon: <Lightbulb className="text-cyan-400" />, desc: "Ide dan tren teknologi disruptif terbaru." },
            ].map((item, idx) => (
              <div key={idx} className="p-8 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl hover:border-cyan-500/30 transition-all duration-300">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
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
              articles.map((article) => <Card key={article.id} title={article.title} description={article.excerpt} image={article.cover_image} link={`/artikel/${article.slug}`} category="Article" />)
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
              courses.map((course) => <Card key={course.id} title={course.title} description={course.description} image={course.image} link={course.link} category={course.platform} />)
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
                  image={web.image} // GANTI INI - gunakan gambar dari database
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
