// components/Card.jsx
'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, User, Star, ArrowUpRight } from 'lucide-react';

export default function Card({ title, description, image, link, category, duration, instructor, rating }) {
  // Cek link eksternal
  const isExternal = link?.startsWith('http');
  // Gambar default
  const defaultImage = 'https://placehold.co/600x400/1e293b/64748b?text=EduVate';

  // Teks tombol CTA berdasarkan kategori (Opsional, agar lebih relevan)
  const getCtaText = () => {
    if (category === 'Webinar') return 'Daftar Webinar';
    if (category === 'Insight') return 'Baca Artikel';
    if (category === 'Live Event') return 'Lihat Event';
    return 'Lihat Detail';
  };

  const CardContent = () => (
    <>
      {/* Hover Glow Layer */}
      <div className="absolute inset-0 bg-linear-to-br from-cyan-500/0 via-blue-500/0 to-lime-400/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/5 group-hover:to-lime-400/5 transition-all duration-700 rounded-3xl" />
      
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image 
          src={image || defaultImage} 
          alt={title} 
          fill 
          className="object-cover transition-all duration-700 group-hover:scale-110"
          // --- PERBAIKAN PENTING: Mencegah error optimasi gambar ---
          unoptimized={true} 
          onError={(e) => e.currentTarget.src = defaultImage}
        />
        
        {/* Overlay linear */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
        
        {/* Category Badge */}
        {category && (
          <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-900/20">
            {category}
          </div>
        )}

        {/* Rating Badge */}
        {rating && (
          <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-full text-xs font-semibold text-amber-300 flex items-center gap-1 border border-amber-500/30">
            <Star className="w-3 h-3 fill-current" />
            {rating}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 relative">
        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300 line-clamp-2 leading-tight min-h-[3.5rem]">
          {title}
        </h3>
        
        <p className="text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed flex-1 min-h-[2.5rem]">
          {description}
        </p>

        {/* Meta Information */}
        {(duration || instructor) && (
          <div className="flex items-center justify-between text-slate-500 text-xs mb-5 border-b border-white/5 pb-4">
            {duration && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-500" />
                <span>{duration}</span>
              </div>
            )}
            
            {instructor && (
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-lime-400" />
                <span className="truncate max-w-[100px]">{instructor}</span>
              </div>
            )}
          </div>
        )}

        {/* CTA Button */}
        <div className="flex items-center justify-between pt-2 mt-auto">
          <span className="text-cyan-400 text-sm font-bold group-hover:text-lime-300 transition-colors duration-300">
            {getCtaText()}
          </span>
          <div className="p-2 bg-white/5 rounded-lg group-hover:bg-cyan-500/20 transition-all duration-300 group-hover:rotate-45">
            <ArrowUpRight className="w-4 h-4 text-cyan-400 group-hover:text-lime-300 transition-all duration-300" />
          </div>
        </div>
      </div>
    </>
  );

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full group"
    >
      {isExternal ? (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block relative bg-slate-900/40 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden h-full flex-col transition-all duration-500 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10"
        >
          <CardContent />
        </a>
      ) : (
        <Link 
          href={link || '#'}
          className="block relative bg-slate-900/40 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden h-full flex-col transition-all duration-500 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10"
        >
          <CardContent />
        </Link>
      )}
    </motion.div>
  );
}