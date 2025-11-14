import { Outfit } from 'next/font/google';
import ClientLayout from '@/components/ClientLayout'; 
import './globals.css';

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
});

// --- UBAH DI SINI ---
export const metadata = {
  title: {
    default: 'EduVate - Portal Edukasi AI & Teknologi', // Judul di Halaman Utama
    template: '%s | EduVate', // Judul di halaman lain (%s = judul spesifik)
  },
  description: 'Platform edukasi AI, Teknologi, dan Kreativitas untuk pemuda.',
};
// --- BATAS PERUBAHAN ---

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={outfit.variable}>
      <body 
        className="bg-neutral-950 text-gray-100 font-sans antialiased"
        suppressHydrationWarning={true}
      >
        <ClientLayout>
          <main className="min-h-screen">
            {children}
          </main>
        </ClientLayout>
      </body>
    </html>
  );
}