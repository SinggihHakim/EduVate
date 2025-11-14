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

  // Filter data berdasarkan search
  const filteredData = {
    articles: articles.filter(item => 
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    courses: courses.filter(item =>
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.platform?.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    webinars: webinars.filter(item =>
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.speaker?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    let response;

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
      
      if (response?.message) {
        alert(response.message);
      }
      
      if (response?.message?.includes('Sukses')) {
        window.location.reload();
      }
    } catch (error) {
      alert('Terjadi kesalahan: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id, action, type) => {
    if (confirm('Yakin ingin menghapus data ini?')) {
      try {
        await action(id);
        if (type === 'articles') setArticles(articles.filter(i => i.id !== id));
        if (type === 'courses') setCourses(courses.filter(i => i.id !== id));
        if (type === 'webinars') setWebinars(webinars.filter(i => i.id !== id));
        router.refresh();
      } catch (error) {
        alert('Gagal menghapus: ' + error.message);
      }
    }
  };

  const handleShowCreateForm = () => {
    setEditingItem(null);
    setViewMode('create');
  };

  const handleShowEditForm = (item) => {
    setEditingItem(item);
    setViewMode('create');
  };
  
  const handleCancelForm = () => {
    setEditingItem(null);
    setViewMode('list');
  };

  const SidebarItem = ({ id, label, icon: Icon, count }) => (
    <motion.button
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => { setActiveMenu(id); setViewMode('list'); setEditingItem(null); setSearchTerm(''); }}
      className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all duration-300 w-full group ${
        activeMenu === id 
        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10' 
        : 'text-slate-400 hover:bg-slate-800/50 hover:text-white border border-transparent'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon size={20} className={activeMenu === id ? 'text-cyan-400' : 'text-slate-500'} />
        <span className="whitespace-nowrap">{label}</span>
      </div>
      {count > 0 && (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          activeMenu === id ? 'bg-cyan-500 text-white' : 'bg-slate-700 text-slate-300'
        }`}>
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
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 bg-slate-800/30 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 shadow-2xl"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Admin<span className="bg-gradient-to-r from-cyan-400 to-lime-300 bg-clip-text text-transparent">Dashboard</span>
            </h1>
            <p className="text-slate-400">Kelola konten dan monitor performa platform EduVate</p>
          </div>
          <form action={logout} className="mt-4 lg:mt-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl text-sm font-medium transition-all duration-300 border border-red-500/20"
            >
              <LogOut size={16} /> Keluar
            </motion.button>
          </form>
        </motion.header>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <StatCard 
            title="Total Artikel" 
            value={articles.length} 
            icon={BookOpen}
            color="bg-cyan-500/20" 
          />
          <StatCard 
            title="Kursus Aktif" 
            value={courses.length} 
            icon={Cpu}
            color="bg-blue-500/20" 
          />
          <StatCard 
            title="Webinar Mendatang" 
            value={webinars.filter(w => new Date(w.date_time) > new Date()).length} 
            icon={Video}
            color="bg-lime-500/20" 
          />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* SIDEBAR */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-80 shrink-0"
          >
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-4">
              <div className="text-xs font-semibold text-slate-500 uppercase mb-3 px-2 tracking-wider">Menu Utama</div>
              <nav className="space-y-2">
                <SidebarItem id="articles" label="Artikel" icon={BookOpen} count={articles.length} />
                <SidebarItem id="courses" label="Kursus" icon={Cpu} count={courses.length} />
                <SidebarItem id="webinars" label="Webinar" icon={Video} count={webinars.length} />
              </nav>

              <div className="mt-6 pt-6 border-t border-slate-700/50">
                <div className="text-xs font-semibold text-slate-500 uppercase mb-3 px-2 tracking-wider">Tools</div>
                <div className="space-y-2">
                  <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800/50 hover:text-white transition-all duration-300 w-full group">
                    <BarChart3 size={20} />
                    <span>Analytics</span>
                  </button>
                  <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800/50 hover:text-white transition-all duration-300 w-full group">
                    <Users size={20} />
                    <span>Users</span>
                  </button>
                  <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800/50 hover:text-white transition-all duration-300 w-full group">
                    <Settings size={20} />
                    <span>Settings</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* MAIN CONTENT */}
          <motion.main
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 min-w-0"
          >
            
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1 capitalize">
                  {viewMode === 'list' ? `Kelola ${activeMenu}` : (editingItem ? `Edit ${activeMenu.slice(0, -1)}` : `Buat ${activeMenu.slice(0, -1)} Baru`)}
                </h2>
                <p className="text-slate-400 text-sm">
                  {viewMode === 'list' 
                    ? `Total ${filteredData[activeMenu].length} item` 
                    : (editingItem ? 'Edit item yang dipilih' : 'Tambahkan item baru ke platform')
                  }
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                {viewMode === 'list' && (
                  <>
                    <div className="relative flex-1 lg:flex-none">
                      <input
                        type="text"
                        placeholder="Cari..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full lg:w-64 pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleShowCreateForm}
                      className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold px-4 py-2 rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                    >
                      <Plus size={18} /> Tambah Baru
                    </motion.button>
                  </>
                )}
                {viewMode === 'create' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCancelForm}
                    className="px-4 py-2 text-slate-400 hover:text-white text-sm font-medium transition-colors"
                  >
                    ← Kembali
                  </motion.button>
                )}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {/* --- LIST DATA --- */}
              {viewMode === 'list' && (
                <motion.div
                  key="list"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden"
                >
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-700/20 border-b border-slate-700/50">
                        <tr>
                          <th className="p-4 text-left text-slate-400 font-semibold text-sm">Item</th>
                          <th className="p-4 text-left text-slate-400 font-semibold text-sm hidden lg:table-cell">Detail</th>
                          <th className="p-4 text-left text-slate-400 font-semibold text-sm hidden md:table-cell">Status</th>
                          <th className="p-4 text-right text-slate-400 font-semibold text-sm">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700/50">
                        
                        {activeMenu === 'articles' && filteredData.articles.map((item) => (
                          <motion.tr 
                            key={item.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="hover:bg-slate-700/20 transition-colors duration-200"
                          >
                            <td className="p-4">
                              <div>
                                <div className="font-semibold text-white mb-1">{item.title}</div>
                                <div className="text-slate-400 text-sm line-clamp-1">{item.excerpt}</div>
                              </div>
                            </td>
                            <td className="p-4 text-slate-500 hidden lg:table-cell">
                              {new Date(item.created_at).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </td>
                            <td className="p-4 hidden md:table-cell">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                                Published
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <motion.button 
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleShowEditForm(item)} 
                                  className="p-2 text-slate-400 hover:text-cyan-400 transition-colors rounded-lg hover:bg-cyan-500/10"
                                >
                                  <Pencil size={16}/>
                                </motion.button>
                                <motion.button 
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleDelete(item.id, deleteArticle, 'articles')} 
                                  className="p-2 text-slate-400 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10"
                                >
                                  <Trash2 size={16}/>
                                </motion.button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}

                        {activeMenu === 'courses' && filteredData.courses.map((item) => (
                          <motion.tr 
                            key={item.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="hover:bg-slate-700/20 transition-colors duration-200"
                          >
                            <td className="p-4">
                              <div>
                                <div className="font-semibold text-white mb-1">{item.title}</div>
                                <div className="text-slate-400 text-sm">{item.platform}</div>
                              </div>
                            </td>
                            <td className="p-4 text-slate-500 hidden lg:table-cell">
                              {item.description?.substring(0, 60)}...
                            </td>
                            <td className="p-4 hidden md:table-cell">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                                Active
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <motion.button 
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleShowEditForm(item)} 
                                  className="p-2 text-slate-400 hover:text-cyan-400 transition-colors rounded-lg hover:bg-cyan-500/10"
                                >
                                  <Pencil size={16}/>
                                </motion.button>
                                <motion.button 
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleDelete(item.id, deleteCourse, 'courses')} 
                                  className="p-2 text-slate-400 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10"
                                >
                                  <Trash2 size={16}/>
                                </motion.button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}

                        {activeMenu === 'webinars' && filteredData.webinars.map((item) => (
                          <motion.tr 
                            key={item.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="hover:bg-slate-700/20 transition-colors duration-200"
                          >
                            <td className="p-4">
                              <div>
                                <div className="font-semibold text-white mb-1">{item.title}</div>
                                <div className="text-slate-400 text-sm">Oleh: {item.speaker}</div>
                              </div>
                            </td>
                            <td className="p-4 text-slate-500 hidden lg:table-cell">
                              {item.date_time ? new Date(item.date_time).toLocaleString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              }) : 'N/A'}
                            </td>
                            <td className="p-4 hidden md:table-cell">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                new Date(item.date_time) > new Date() 
                                  ? 'bg-lime-500/20 text-lime-400' 
                                  : 'bg-slate-500/20 text-slate-400'
                              }`}>
                                {new Date(item.date_time) > new Date() ? 'Upcoming' : 'Completed'}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <motion.button 
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleShowEditForm(item)} 
                                  className="p-2 text-slate-400 hover:text-cyan-400 transition-colors rounded-lg hover:bg-cyan-500/10"
                                >
                                  <Pencil size={16}/>
                                </motion.button>
                                <motion.button 
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleDelete(item.id, deleteWebinar, 'webinars')} 
                                  className="p-2 text-slate-400 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10"
                                >
                                  <Trash2 size={16}/>
                                </motion.button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}

                      </tbody>
                    </table>
                    
                    {filteredData[activeMenu].length === 0 && (
                      <div className="p-12 text-center">
                        <div className="text-slate-500 mb-2">Tidak ada data yang ditemukan</div>
                        {searchTerm && (
                          <button 
                            onClick={() => setSearchTerm('')}
                            className="text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                          >
                            Reset pencarian
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* --- CREATE/EDIT FORMS --- */}
              {viewMode === 'create' && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6"
                >
                  
                  {activeMenu === 'articles' && (
                    <form action={handleFormSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Judul Artikel</label>
                        <input 
                          name="title" 
                          required 
                          placeholder="Masukkan judul artikel yang menarik..."
                          defaultValue={editingItem?.title} 
                          className="w-full bg-slate-800/50 border border-slate-700/50 p-3 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Ringkasan</label>
                        <textarea 
                          name="excerpt" 
                          required 
                          placeholder="Tulis ringkasan singkat yang menarik perhatian pembaca..."
                          defaultValue={editingItem?.excerpt} 
                          rows="3"
                          className="w-full bg-slate-800/50 border border-slate-700/50 p-3 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">URL Gambar Cover</label>
                        <input 
                          name="image" 
                          placeholder="https://example.com/image.jpg"
                          defaultValue={editingItem?.cover_image} 
                          className="w-full bg-slate-800/50 border border-slate-700/50 p-3 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Konten Artikel</label>
                        <textarea 
                          name="content" 
                          required 
                          rows="12" 
                          placeholder="Tulis isi artikel Anda di sini..."
                          defaultValue={editingItem?.content} 
                          className="w-full bg-slate-800/50 border border-slate-700/50 p-3 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors resize-vertical" 
                        />
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-4 rounded-xl hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Menyimpan...
                          </span>
                        ) : (
                          editingItem ? 'Update Artikel' : 'Terbitkan Artikel'
                        )}
                      </motion.button>
                    </form>
                  )}

                  {activeMenu === 'courses' && (
                    <form action={handleFormSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Nama Kursus</label>
                        <input 
                          name="title" 
                          required 
                          placeholder="e.g., Master Python untuk Data Science"
                          defaultValue={editingItem?.title} 
                          className="w-full bg-slate-800/50 border border-slate-700/50 p-3 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Deskripsi Kursus</label>
                        <textarea 
                          name="description" 
                          required 
                          placeholder="Jelaskan apa yang akan dipelajari dalam kursus ini..."
                          defaultValue={editingItem?.description} 
                          rows="4"
                          className="w-full bg-slate-800/50 border border-slate-700/50 p-3 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none" 
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Platform</label>
                          <input 
                            name="platform" 
                            required 
                            placeholder="e.g., Udemy, Coursera, YouTube"
                            defaultValue={editingItem?.platform} 
                            className="w-full bg-slate-800/50 border border-slate-700/50 p-3 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Link Tujuan</label>
                          <input 
                            name="link" 
                            required 
                            placeholder="https://..."
                            defaultValue={editingItem?.link} 
                            className="w-full bg-slate-800/50 border border-slate-700/50 p-3 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors" 
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">URL Gambar Thumbnail</label>
                        <input 
                          name="image" 
                          placeholder="https://example.com/thumbnail.jpg"
                          defaultValue={editingItem?.image} 
                          className="w-full bg-slate-800/50 border border-slate-700/50 p-3 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors" 
                        />
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-4 rounded-xl hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Menyimpan...
                          </span>
                        ) : (
                          editingItem ? 'Update Kursus' : 'Simpan Kursus'
                        )}
                      </motion.button>
                    </form>
                  )}

                  {activeMenu === 'webinars' && (
                    <form action={handleFormSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Judul Webinar</label>
                        <input 
                          name="title" 
                          required 
                          placeholder="e.g., Workshop AI untuk Pemula"
                          defaultValue={editingItem?.title} 
                          className="w-full bg-slate-800/50 border border-slate-700/50 p-3 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Nama Pembicara</label>
                        <input 
                          name="speaker" 
                          required 
                          placeholder="Nama lengkap pembicara"
                          defaultValue={editingItem?.speaker} 
                          className="w-full bg-slate-800/50 border border-slate-700/50 p-3 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">URL Poster/Gambar</label>
                        <input 
                          name="image" 
                          placeholder="https://..."
                          defaultValue={editingItem?.image} 
                          className="w-full bg-slate-800/50 border border-slate-700/50 p-3 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors" 
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Waktu Pelaksanaan</label>
                          <input 
                            name="date_time" 
                            type="datetime-local" 
                            required 
                            defaultValue={editingItem?.date_time ? editingItem.date_time.slice(0, 16) : ''} 
                            className="w-full bg-slate-800/50 border border-slate-700/50 p-3 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-colors" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Link Pendaftaran</label>
                          <input 
                            name="registration_link" 
                            required 
                            placeholder="https://..."
                            defaultValue={editingItem?.registration_link} 
                            className="w-full bg-slate-800/50 border border-slate-700/50 p-3 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors" 
                          />
                        </div>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-4 rounded-xl hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Menyimpan...
                          </span>
                        ) : (
                          editingItem ? 'Update Webinar' : 'Jadwalkan Webinar'
                        )}
                      </motion.button>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.main>
        </div>
      </div>
    </div>
  );
}