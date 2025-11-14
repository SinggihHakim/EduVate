// components/Footer.jsx
'use client';
import { Sparkles, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    'Produk': [
      'Kursus AI',
      'Seri Webinar', 
      'Program Mentorship',
      'Solusi Perusahaan',
      'Sertifikasi'
    ],
    'Perusahaan': [
      'Tentang Kami',
      'Karir',
      'Blog',
      'Media Kit',
      'Partner'
    ],
    'Sumber Belajar': [
      'Dokumentasi',
      'Pusat Bantuan',
      'Forum Komunitas',
      'Jalur Belajar',
      'Studi Kasus'
    ],
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-cyan-400 w-6 h-6" />
              <span className="text-xl font-bold text-white">
                EduVate
              </span>
            </div>
            
            <p className="text-slate-400 mb-4 text-sm">
              Memberdayakan inovator digital dengan pendidikan terkini dalam AI, teknologi, dan disiplin kreatif.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>hello@eduvate.id</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>+62 812-3456-7890</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>Bandarlampung, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#"
                      className="text-slate-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-6 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Copyright */}
            <div className="text-slate-500 text-sm">
              © {new Date().getFullYear()} EduVate. Semua hak dilindungi.
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {[
                { 
                  name: 'Twitter', 
                  url: 'https://x.com/sgghhkm'
                },
                { 
                  name: 'LinkedIn', 
                  url: 'https://linkedin.com/in/singgihainurhakim'
                },
                { 
                  name: 'GitHub', 
                  url: 'https://github.com/SinggihHakim'
                },
                { 
                  name: 'YouTube', 
                  url: 'https://youtube.com/@singgihhakim666'
                },
                { 
                  name: 'Instagram', 
                  url: 'https://www.instagram.com/singgihsudahsembuh/'
                }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
                  aria-label={`Ikuti kami di ${social.name}`}
                >
                  {social.name}
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4 text-slate-500 text-sm">
              <a href="#" className="hover:text-cyan-400 transition-colors duration-200">
                Privasi
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors duration-200">
                Syarat Layanan
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors duration-200">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}