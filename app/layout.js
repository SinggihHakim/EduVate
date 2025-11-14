import { Outfit } from 'next/font/google';
import ClientLayout from '@/components/ClientLayout'; 
import './globals.css';

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
});

export const metadata = {
  title: 'EduVate | Portal Generasi Disruptif',
  description: 'Platform edukasi AI, Teknologi, dan Kreativitas untuk pemuda.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={outfit.variable}>
      {/* PERBAIKAN: Tambahkan suppressHydrationWarning={true} di sini */}
      <body 
        className="bg-neutral-950 text-gray-100 font-sans antialiased"
        suppressHydrationWarning={true}
      >
        
        {/* Bungkus konten dengan ClientLayout untuk mengatur Navbar/Footer otomatis */}
        <ClientLayout>
          <main className="min-h-screen">
            {children}
          </main>
        </ClientLayout>

      </body>
    </html>
  );
}