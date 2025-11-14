// components/Card.jsx
'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, User, Star, ArrowUpRight, X, Calendar, BookOpen, Target } from 'lucide-react';
import { useState } from 'react';

// Komponen Modal Detail
function CourseDetailModal({ course, isOpen, onClose }) {
  if (!isOpen || !course) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        className="relative bg-slate-900 rounded-2xl border border-slate-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-6 rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-3">
                {course.title}
              </h2>
              <div className="flex flex-wrap gap-2">
                {course.platform && (
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm border border-cyan-500/30">
                    {course.platform}
                  </span>
                )}
                {course.level && (
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30">
                    {course.level}
                  </span>
                )}
                {course.price && (
                  <span className="px-3 py-1 bg-lime-500/20 text-lime-400 rounded-full text-sm border border-lime-500/30 font-semibold">
                    {course.price}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="ml-4 p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Course Image */}
          {course.image && (
            <div className="mb-6">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-64 object-cover rounded-xl bg-slate-800"
              />
            </div>
          )}

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {course.duration && (
              <div className="flex items-center gap-2 text-slate-300 p-3 bg-slate-800/50 rounded-lg">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span className="text-sm">{course.duration}</span>
              </div>
            )}
            {course.instructor && (
              <div className="flex items-center gap-2 text-slate-300 p-3 bg-slate-800/50 rounded-lg">
                <User className="w-4 h-4 text-lime-400" />
                <span className="text-sm">{course.instructor}</span>
              </div>
            )}
            {course.rating && (
              <div className="flex items-center gap-2 text-slate-300 p-3 bg-slate-800/50 rounded-lg">
                <Star className="w-4 h-4 text-amber-400 fill-current" />
                <span className="text-sm">{course.rating}</span>
              </div>
            )}
            {course.created_at && (
              <div className="flex items-center gap-2 text-slate-300 p-3 bg-slate-800/50 rounded-lg">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span className="text-sm">
                  {new Date(course.created_at).toLocaleDateString('id-ID')}
                </span>
              </div>
            )}
          </div>

          {/* Full Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              Deskripsi Lengkap
            </h3>
            <div className="text-slate-300 leading-relaxed whitespace-pre-line bg-slate-800/30 p-4 rounded-lg border border-slate-700">
              {course.description}
            </div>
          </div>

          {/* Learning Objectives - jika ada di database */}
          {course.learning_objectives && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-lime-400" />
                Yang Akan Dipelajari
              </h3>
              <ul className="space-y-2">
                {course.learning_objectives.split('\n').map((objective, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-300">
                    <div className="w-2 h-2 bg-lime-400 rounded-full mt-2 shrink-0" />
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Prerequisites - jika ada di database */}
          {course.prerequisites && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                Prasyarat
              </h3>
              <div className="text-slate-300 bg-slate-800/30 p-4 rounded-lg border border-slate-700">
                {course.prerequisites}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-slate-900 border-t border-slate-700 p-6 rounded-b-2xl">
          <div className="flex flex-col sm:flex-row gap-3">
            {course.link && (
              <a
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg text-center hover:from-cyan-600 hover:to-blue-700 transition-all flex items-center justify-center gap-2"
              >
                <ArrowUpRight className="w-4 h-4" />
                Kunjungi Kursus
              </a>
            )}
            <button
              onClick={onClose}
              className="px-6 py-3 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Tutup Detail
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Card({ 
  title, 
  description, 
  image, 
  link, 
  category, 
  duration, 
  instructor, 
  rating,
  level,
  price,
  created_at,
  learning_objectives,
  prerequisites,
  ...restCourseData 
}) {
  const [showDetail, setShowDetail] = useState(false);
  
  // Gabungkan semua data course
  const courseData = {
    title,
    description,
    image,
    link,
    platform: category,
    duration,
    instructor,
    rating,
    level,
    price,
    created_at,
    learning_objectives,
    prerequisites,
    ...restCourseData
  };

  const defaultImage = 'https://placehold.co/600x400/1e293b/64748b?text=EduVate';

  const handleCardClick = (e) => {
    // Hanya buka modal jika bukan klik link eksternal
    const isLinkClick = e.target.closest('a');
    if (!isLinkClick) {
      setShowDetail(true);
    }
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
          <span className="text-cyan-400 text-sm font-bold group-hover:text-lime-300 transition-colors duration-300 cursor-pointer">
            Lihat Detail
          </span>
          <div className="p-2 bg-white/5 rounded-lg group-hover:bg-cyan-500/20 transition-all duration-300 group-hover:rotate-45 cursor-pointer">
            <ArrowUpRight className="w-4 h-4 text-cyan-400 group-hover:text-lime-300 transition-all duration-300" />
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="h-full group cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="block relative bg-slate-900/40 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden h-full flex-col transition-all duration-500 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10">
          <CardContent />
        </div>
      </motion.div>

      {/* Modal Detail */}
      <CourseDetailModal 
        course={courseData}
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
      />
    </>
  );
}