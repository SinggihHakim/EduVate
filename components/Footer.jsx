// components/Footer.jsx
'use client';
import { Sparkles, Mail, MapPin, Phone, Send, Download, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // untuk link dibawah belum bisa digunakan karena masih belum ada rencana ingin seperti apa jadi hanya show saja agar penuh.
  const footerLinks = {
    'Products': [
      'AI Courses',
      'Webinar Series', 
      'Mentorship Program',
      'Enterprise Solutions',
      'Certification'
    ],
    'Company': [
      'About Us',
      'Careers',
      'Blog',
      'Press Kit',
      'Partners'
    ],
    'Resources': [
      'Documentation',
      'Help Center',
      'Community Forum',
      'Learning Paths',
      'Case Studies'
    ],
   
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Simulate API call
      setTimeout(() => {
        setIsSubscribed(true);
        setEmail('');
      }, 1000);
    }
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
              Empowering digital innovators with cutting-edge education in AI, technology, and creative disciplines.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>hello@eduvate.com</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>San Francisco, CA</span>
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
              © {new Date().getFullYear()} EduVate. All rights reserved.
            </div>

            {/* Social Links */}
<div className="flex items-center gap-4">
  {[
    { 
      name: 'Twitter', 
      url: 'https://x.com/sgghhkm',
      icon: null // Bisa ditambahkan icon jika mau
    },
    { 
      name: 'LinkedIn', 
      url: 'https://linkedin.com/in/singgihainurhakim',
      icon: null
    },
    { 
      name: 'GitHub', 
      url: 'https://github.com/SinggihHakim',
      icon: null
    },
    { 
      name: 'YouTube', 
      url: 'https://youtube.com/@singgihhakim666?si=Rs8tWbZHaRHLZsPp',
      icon: null
    },
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/singgihsudahsembuh/',
      icon: null
    }
  ].map((social) => (
    <a
      key={social.name}
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-slate-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
      aria-label={`Follow us on ${social.name}`}
    >
      {social.name}
    </a>
  ))}
</div>

            {/* Legal Links */}
            <div className="flex items-center gap-4 text-slate-500 text-sm">
              <a href="#" className="hover:text-cyan-400 transition-colors duration-200">
                Privacy
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors duration-200">
                Terms
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