'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function MainLayout({ children }) {
  const pathname = usePathname();

  // Cek apakah kita sedang di halaman Admin atau Login
  const isAdminPage = pathname?.startsWith('/admin') || pathname?.startsWith('/login');

  // Jika di halaman Admin/Login, TAMPILKAN KONTEN SAJA (Tanpa Navbar/Footer)
  if (isAdminPage) {
    return <>{children}</>;
  }

  // Jika di halaman Publik, TAMPILKAN NAVBAR & FOOTER
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}