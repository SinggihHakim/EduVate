'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  createArticle, updateArticle, deleteArticle, 
  createCourse, updateCourse, deleteCourse, 
  createWebinar, updateWebinar, deleteWebinar, 
  logout 
} from '../actions';
import { 
  Plus, Trash2, LogOut, 
  BookOpen, Cpu, Video, Pencil,
  BarChart3, Users, Settings,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- FUNGSI BARU: Helper Zona Waktu ---
// Mengubah string UTC dari database (misal: "2025-11-15T12:00:00+00:00")
// menjadi format input lokal (misal: "2025-11-15T19:00" untuk WIB/GMT+7)
function convertUTCtoLocalInputString(utcDateString) {
  if (!utcDateString) return '';
  
  const date = new Date(utcDateString);
  
  // Ambil komponen waktu LOKAL (bukan UTC)
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  // Gabungkan kembali
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
// --- Akhir Helper ---

// --- KOMPONEN UI PEMBANTU (Di luar agar performa stabil) ---
const SidebarItem = ({ id, label, icon: Icon, count, isActive, onClick }) => (
  <motion.button
    whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }} onClick={onClick}
    className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all duration-300 w-full group ${
      isActive 
      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10' 
      : 'text-slate-400 hover:bg-slate-800/50 hover:text-white border border-transparent'
    }`}
  >
    <div className="flex items-center gap-3">
      <Icon size={20} className={isActive ? 'text-cyan-400' : 'text-slate-500'} />
      <span className="whitespace-nowrap">{label}</span>
    </div>
    {count > 0 && (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${ isActive ? 'bg-cyan-500 text-white' : 'bg-slate-700 text-slate-300' }`}>
        {count}
      </span>
    )}
  </motion.button>
);

const StatCard = ({ title, value, icon: Icon, color }) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.02 }}
    className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
      <div className={`p-3 rounded-xl ${color}`}><Icon className="w-6 h-6 text-white" /></div>
    </div>
  </motion.div>
);

// --- KOMPONEN UTAMA ---
export default function AdminClientComponent({ initialArticles, initialCourses, initialWebinars }) {
  const [activeMenu, setActiveMenu] = useState('articles');
  const [viewMode, setViewMode] = useState('list');
  const [articles, setArticles] = useState(initialArticles);
  const [courses, setCourses] = useState(initialCourses);
  const [webinars, setWebinars] = useState(initialWebinars);
  const [editingItem, setEditingItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  // Filter Logic
  const filteredData = {
    articles: articles.filter(item => item.title?.toLowerCase().includes(searchTerm.toLowerCase())),
    courses: courses.filter(item => item.title?.toLowerCase().includes(searchTerm.toLowerCase())),
    webinars: webinars.filter(item => item.title?.toLowerCase().includes(searchTerm.toLowerCase()))
  };

  // --- HANDLERS ---
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    let response;

    // --- PERBAIKAN ZONA WAKTU (SAAT SUBMIT) ---
    // Konversi waktu input lokal ke string ISO (UTC) sebelum kirim ke server
    if (activeMenu === 'webinars') {
      const localDateTimeString = formData.get('date_time'); // misal: "2025-11-15T19:00"
      if (localDateTimeString) {
        const localDate = new Date(localDateTimeString);
        formData.set('date_time', localDate.toISOString()); // misal: "2025-11-15T12:00:00.000Z"
      }
    }
    // --- AKHIR PERBAIKAN ---

    try {
      if (editingItem) {
        formData.append('id', editingItem.id);
        if (activeMenu === 'articles') response = await updateArticle(formData);
        if (activeMenu === 'courses') response = await updateCourse(formData);
        if (activeMenu === 'webinars') response = await updateWebinar(formData);
      } else {
        if (activeMenu === 'articles') response = await createArticle(formData);
        if (activeMenu === 'courses') response = await createCourse(formData);
        if (activeMenu === 'webinars') response = await createWebinar(formData);
      }
      if (response?.message) alert(response.message);
      if (response?.message?.includes('Sukses')) window.location.reload();
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id, action, type) => {
    if (confirm('Hapus data ini?')) {
      await action(id);
      if (type === 'articles') setArticles(articles.filter(i => i.id !== id));
      if (type === 'courses') setCourses(courses.filter(i => i.id !== id));
      if (type === 'webinars') setWebinars(webinars.filter(i => i.id !== id));
      router.refresh();
    }
  };

  const handleMenuChange = (menu) => {
    setActiveMenu(menu); setViewMode('list'); setEditingItem(null); setSearchTerm('');
  };
  const handleShowCreate = () => { setEditingItem(null); setViewMode('create'); };
  const handleShowEdit = (item) => { setEditingItem(item); setViewMode('create'); };
  const handleCancel = () => { setEditingItem(null); setViewMode('list'); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950 p-6">
      <div className="max-w-7xl mx-auto">
        
        <motion.header 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 bg-slate-800/30 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 shadow-2xl"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Admin<span className="bg-gradient-to-r from-cyan-400 to-lime-300 bg-clip-text text-transparent">Dashboard</span>
            </h1>
            <p className="text-slate-400">Kelola konten EduVate</p>
          </div>
          <form action={logout} className="mt-4 lg:mt-0">
            <button className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl text-sm font-medium transition-all border border-red-500/20">
              <LogOut size={16} /> Keluar
            </button>
          </form>
        </motion.header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Artikel" value={articles.length} icon={BookOpen} color="bg-cyan-500/20" />
          <StatCard title="Kursus Aktif" value={courses.length} icon={Cpu} color="bg-blue-500/20" />
          <StatCard title="Webinar" value={webinars.length} icon={Video} color="bg-lime-500/20" />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="w-full lg:w-80 shrink-0">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-4 lg:sticky lg:top-6">
              <div className="text-xs font-semibold text-slate-500 uppercase mb-3 px-2">Menu Utama</div>
              <nav className="space-y-2">
                <SidebarItem id="articles" label="Artikel" icon={BookOpen} count={articles.length} isActive={activeMenu === 'articles'} onClick={() => handleMenuChange('articles')} />
                <SidebarItem id="courses" label="Kursus" icon={Cpu} count={courses.length} isActive={activeMenu === 'courses'} onClick={() => handleMenuChange('courses')} />
                <SidebarItem id="webinars" label="Webinar" icon={Video} count={webinars.length} isActive={activeMenu === 'webinars'} onClick={() => handleMenuChange('webinars')} />
              </nav>
            </div>
          </aside>
          
          <main className="flex-1 min-w-0">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
              <h2 className="text-2xl font-bold text-white capitalize">
                {viewMode === 'list' ? `Kelola ${activeMenu}` : (editingItem ? 'Edit Item' : 'Tambah Baru')}
              </h2>
              <div className="flex items-center gap-3">
                {viewMode === 'list' ? (
                  <>
                    <div className="relative flex-1 lg:flex-none">
                      <input type="text" placeholder="Cari..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full lg:w-64 pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-cyan-500/50" />
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    </div>
                    <button onClick={handleShowCreate} className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all">
                      <Plus size={18} /> Tambah
                    </button>
                  </>
                ) : ( <button onClick={handleCancel} className="px-4 py-2 text-slate-400 hover:text-white">Batal</button> )}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {viewMode === 'list' && (
                <motion.div key="list" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-700/20 border-b border-slate-700/50">
                        <tr>
                          <th className="p-4 text-left text-slate-400 text-sm">Judul / Nama</th>
                          <th className="p-4 text-left text-slate-400 text-sm hidden lg:table-cell">Info</th>
                          <th className="p-4 text-right text-slate-400 text-sm">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700/50">
                        {filteredData[activeMenu].map((item) => (
                          <tr key={item.id} className="hover:bg-slate-700/20 transition-colors">
                            <td className="p-4">
                              <div className="font-semibold text-white">{item.title}</div>
                              <div className="text-slate-400 text-sm line-clamp-1">{item.excerpt || item.platform || item.speaker}</div>
                            </td>
                            <td className="p-4 text-slate-500 hidden lg:table-cell" suppressHydrationWarning>
                              {item.created_at ? new Date(item.created_at).toLocaleDateString() : (item.date_time ? new Date(item.date_time).toLocaleString() : '-')}
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex justify-end gap-2">
                                <button onClick={() => handleShowEdit(item)} className="p-2 text-cyan-400 hover:bg-cyan-500/10 rounded-lg"><Pencil size={16}/></button>
                                <button onClick={() => handleDelete(item.id, activeMenu === 'articles' ? deleteArticle : activeMenu === 'courses' ? deleteCourse : deleteWebinar, activeMenu)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 size={16}/></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredData[activeMenu].length === 0 && <div className="p-8 text-center text-slate-500">Data tidak ditemukan.</div>}
                  </div>
                </motion.div>
              )}

              {viewMode === 'create' && (
                <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                  <form action={handleFormSubmit} className="space-y-6">
                    
                    {activeMenu === 'articles' && (
                      <>
                        <input name="title" required placeholder="Judul Artikel" defaultValue={editingItem?.title} className="w-full bg-neutral-900 border border-slate-700/50 p-3 rounded-xl text-white" />
                        <textarea name="excerpt" required placeholder="Ringkasan" defaultValue={editingItem?.excerpt} className="w-full bg-neutral-900 border border-slate-700/50 p-3 rounded-xl text-white" />
                        <input name="image" placeholder="URL Gambar" defaultValue={editingItem?.cover_image} className="w-full bg-neutral-900 border border-slate-700/50 p-3 rounded-xl text-white" />
                        <textarea name="content" required rows="10" placeholder="Isi Artikel" defaultValue={editingItem?.content} className="w-full bg-neutral-900 border border-slate-700/50 p-3 rounded-xl text-white" />
                      </>
                    )}

                    {activeMenu === 'courses' && (
                      <>
                        <input name="title" required placeholder="Nama Kursus" defaultValue={editingItem?.title} className="w-full bg-neutral-900 border border-slate-700/50 p-3 rounded-xl text-white" />
                        <textarea name="description" required placeholder="Deskripsi" defaultValue={editingItem?.description} className="w-full bg-neutral-900 border border-slate-700/50 p-3 rounded-xl text-white" />
                        <div className="grid grid-cols-2 gap-4">
                          <input name="platform" required placeholder="Platform" defaultValue={editingItem?.platform} className="w-full bg-neutral-900 border border-slate-700/50 p-3 rounded-xl text-white" />
                          <input name="link" required placeholder="Link" defaultValue={editingItem?.link} className="w-full bg-neutral-900 border border-slate-700/50 p-3 rounded-xl text-white" />
                        </div>
                        <input name="image" placeholder="URL Thumbnail" defaultValue={editingItem?.image} className="w-full bg-neutral-900 border border-slate-700/50 p-3 rounded-xl text-white" />
                      </>
                    )}

                    {activeMenu === 'webinars' && (
                      <>
                        <input name="title" required placeholder="Judul Webinar" defaultValue={editingItem?.title} className="w-full bg-neutral-900 border border-slate-700/50 p-3 rounded-xl text-white" />
                        <input name="speaker" required placeholder="Pembicara" defaultValue={editingItem?.speaker} className="w-full bg-neutral-900 border border-slate-700/50 p-3 rounded-xl text-white" />
                        <input name="image" placeholder="URL Poster" defaultValue={editingItem?.image} className="w-full bg-neutral-900 border border-slate-700/50 p-3 rounded-xl text-white" />
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">Waktu (Tanggal & Jam)</label>
                            <input 
                              name="date_time" 
                              type="datetime-local" 
                              required 
                              // --- PERBAIKAN: Gunakan helper untuk konversi UTC ke Lokal ---
                              defaultValue={convertUTCtoLocalInputString(editingItem?.date_time)} 
                              className="w-full bg-neutral-900 border border-slate-700/50 p-3 rounded-xl text-white" 
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">Link Pendaftaran</label>
                            <input 
                              name="registration_link" 
                              required 
                              placeholder="https://..." 
                              defaultValue={editingItem?.registration_link} 
                              className="w-full bg-neutral-900 border border-slate-700/50 p-3 rounded-xl text-white" 
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <button disabled={isSubmitting} className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 rounded-xl hover:shadow-lg disabled:opacity-50">
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Menyimpan...
                        </span>
                      ) : (
                        editingItem ? 'Update Data' : 'Simpan Data'
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}