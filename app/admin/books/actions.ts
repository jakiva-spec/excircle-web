'use server'

import { supabaseAdmin } from '@/lib/supabase-admin';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createBook(data: {
    title: string;
    publisher: string;
    year: string;
    description: string;
    image_url: string;
    link: string;
}) {
    try {
        const { title, publisher, year, description, image_url, link } = data;

        const { error } = await supabaseAdmin
            .from('books')
            .insert([{ title, publisher, year, description, image_url, link }]);

        if (error) {
            throw new Error('Failed to create book: ' + error.message);
        }
    } catch (e: any) {
        if (e.message === 'NEXT_REDIRECT' || e?.digest?.startsWith('NEXT_REDIRECT')) throw e;
        throw e;
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
