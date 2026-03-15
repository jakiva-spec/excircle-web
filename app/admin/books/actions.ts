'use server'

import { supabaseAdmin } from '@/lib/supabase-admin';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createBook(formData: FormData) {
    const title = formData.get('title') as string;
    const publisher = formData.get('publisher') as string;
    const year = formData.get('year') as string;
    const description = formData.get('description') as string;
    const image_url = formData.get('image_url') as string;
    const link = formData.get('link') as string;

    const { error } = await supabaseAdmin
        .from('books')
        .insert([{ title, publisher, year, description, image_url, link }]);

    if (error) {
        throw new Error('Failed to create book: ' + error.message);
    }

    revalidatePath('/admin/books');
    redirect('/admin/books');
}

export async function deleteBook(formData: FormData) {
    const id = formData.get('id') as string;

    const { error } = await supabaseAdmin
        .from('books')
        .delete()
        .eq('id', id);

    if (error) {
        throw new Error('Failed to delete book');
    }

    revalidatePath('/admin/books');
}
