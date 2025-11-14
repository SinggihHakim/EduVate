'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // Daftar halaman yang TIDAK boleh ada Navbar/Footer
  const isHiddenPage = pathname?.startsWith('/admin') || pathname?.startsWith('/login');

  return (
    <>
      {/* Tampilkan Navbar KECUALI di halaman admin/login */}
      {!isHiddenPage && <Navbar />}
      
      {children}
      
      {/* Tampilkan Footer KECUALI di halaman admin/login */}
      {!isHiddenPage && <Footer />}
    </>
  );
}