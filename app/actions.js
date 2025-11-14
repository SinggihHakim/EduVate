'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
// Pastikan path relative ini benar (naik satu folder ke lib)
import { supabaseAdmin } from '../lib/supabase-admin';

// --- FUNGSI AUTENTIKASI ---

export async function login(formData) {
  const username = formData.get('username');
  const password = formData.get('password');

  if (
    username === process.env.ADMIN_USERNAME && 
    password === process.env.ADMIN_PASSWORD
  ) {
    // NEXT.JS 15/16 WAJIB AWAIT COOKIES
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'true', { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 60 * 60 * 24, // 24 jam
      path: '/',
    });
    
    return { success: true };
  }

  return { success: false, message: 'Username atau Password salah!' };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/login');
}

// --- ARTIKEL (C, U, D) ---

export async function createArticle(formData) {
  const cookieStore = await cookies();
  if (!cookieStore.has('admin_session')) return { message: 'Unauthorized' };

  const title = formData.get('title');
  const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

  const { error } = await supabaseAdmin.from('articles').insert({
    title,
    slug,
    excerpt: formData.get('excerpt'),
    content: formData.get('content'),
    cover_image: formData.get('image'),
    author: 'Admin',
  });

  if (error) return { message: 'Gagal: ' + error.message };

  revalidatePath('/artikel');
  revalidatePath('/');
  return { message: 'Sukses! Artikel diterbitkan.' };
}

export async function updateArticle(formData) {
  const cookieStore = await cookies();
  if (!cookieStore.has('admin_session')) return { message: 'Unauthorized' };
  
  const id = formData.get('id');
  const { error } = await supabaseAdmin.from('articles').update({
    title: formData.get('title'),
    excerpt: formData.get('excerpt'),
    content: formData.get('content'),
    cover_image: formData.get('image'),
  }).eq('id', id);

  if (error) return { message: 'Gagal Update: ' + error.message };

  revalidatePath('/artikel');
  revalidatePath('/');
  return { message: 'Sukses! Artikel diperbarui.' };
}

export async function deleteArticle(id) {
  const cookieStore = await cookies();
  if (!cookieStore.has('admin_session')) return { message: 'Unauthorized' };

  const { error } = await supabaseAdmin.from('articles').delete().eq('id', id);
  if (error) return { message: 'Gagal hapus.' };

  revalidatePath('/artikel');
  revalidatePath('/');
  return { message: 'Artikel dihapus.' };
}

// --- KURSUS (C, U, D) ---

export async function createCourse(formData) {
  const cookieStore = await cookies();
  if (!cookieStore.has('admin_session')) return { message: 'Unauthorized' };

  const { error } = await supabaseAdmin.from('courses').insert({
    title: formData.get('title'),
    description: formData.get('description'),
    platform: formData.get('platform'),
    link: formData.get('link'),
    image: formData.get('image'),
  });

  if (error) return { message: 'Gagal: ' + error.message };

  revalidatePath('/kursus');
  revalidatePath('/');
  return { message: 'Sukses! Kursus ditambahkan.' };
}

export async function updateCourse(formData) {
  const cookieStore = await cookies();
  if (!cookieStore.has('admin_session')) return { message: 'Unauthorized' };

  const id = formData.get('id');
  const { error } = await supabaseAdmin.from('courses').update({
    title: formData.get('title'),
    description: formData.get('description'),
    platform: formData.get('platform'),
    link: formData.get('link'),
    image: formData.get('image'),
  }).eq('id', id);

  if (error) return { message: 'Gagal Update: ' + error.message };

  revalidatePath('/kursus');
  revalidatePath('/');
  return { message: 'Sukses! Kursus diperbarui.' };
}

export async function deleteCourse(id) {
  const cookieStore = await cookies();
  if (!cookieStore.has('admin_session')) return { message: 'Unauthorized' };

  const { error } = await supabaseAdmin.from('courses').delete().eq('id', id);
  if (error) return { message: 'Gagal hapus.' };

  revalidatePath('/kursus');
  revalidatePath('/');
  return { message: 'Kursus dihapus.' };
}

// --- WEBINAR (Updated with Image) ---

export async function createWebinar(formData) {
  const cookieStore = await cookies();
  if (!cookieStore.has('admin_session')) return { message: 'Unauthorized' };

  const { error } = await supabaseAdmin.from('webinars').insert({
    title: formData.get('title'),
    speaker: formData.get('speaker'),
    date_time: formData.get('date_time'),
    registration_link: formData.get('registration_link'),
    image: formData.get('image'), // <--- TAMBAHAN BARU
  });

  if (error) return { message: 'Gagal: ' + error.message };

  revalidatePath('/webinar');
  revalidatePath('/'); 
  return { message: 'Sukses! Webinar dijadwalkan.' };
}

export async function updateWebinar(formData) {
  const cookieStore = await cookies();
  if (!cookieStore.has('admin_session')) return { message: 'Unauthorized' };

  const id = formData.get('id');
  const { error } = await supabaseAdmin.from('webinars').update({
    title: formData.get('title'),
    speaker: formData.get('speaker'),
    date_time: formData.get('date_time'),
    registration_link: formData.get('registration_link'),
    image: formData.get('image'), // <--- TAMBAHAN BARU
  }).eq('id', id);

  if (error) return { message: 'Gagal Update: ' + error.message };

  revalidatePath('/webinar');
  revalidatePath('/');
  return { message: 'Sukses! Webinar diperbarui.' };
}

export async function deleteWebinar(id) {
  const cookieStore = await cookies();
  if (!cookieStore.has('admin_session')) return { message: 'Unauthorized' };

  const { error } = await supabaseAdmin.from('webinars').delete().eq('id', id);
  if (error) return { message: 'Gagal hapus.' };

  revalidatePath('/webinar');
  return { message: 'Webinar dihapus.' };
}