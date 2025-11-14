import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
// Pastikan path relative ini benar (naik dua folder)
import { supabase } from '../../lib/supabase'; 
import AdminClientComponent from './AdminClientComponent'; 

export default async function AdminPage() {
  // NEXT.JS 15/16 WAJIB AWAIT COOKIES
  const cookieStore = await cookies();
  
  if (!cookieStore.has('admin_session')) {
    redirect('/login');
  }

  // Ambil semua data secara parallel
  const [resArticles, resCourses, resWebinars] = await Promise.all([
    supabase.from('articles').select('*').order('created_at', { ascending: false }),
    supabase.from('courses').select('*').order('created_at', { ascending: false }),
    supabase.from('webinars').select('*').order('date_time', { ascending: true })
  ]);

  return (
     <AdminClientComponent 
        initialArticles={resArticles.data || []} 
        initialCourses={resCourses.data || []}
        initialWebinars={resWebinars.data || []}
     />
  );
}