'use server'

import { supabaseAdmin } from '@/lib/supabase-admin';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createInsight(formData: FormData) {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const cover_image_url = formData.get('cover_image_url') as string;
    const tags = (formData.get('tags') as string)?.split(',').map(tag => tag.trim()).filter(Boolean);

    const { error } = await supabaseAdmin
        .from('insights')
        .insert([{
            title,
            slug,
            excerpt,
            content,
            cover_image_url,
            tags
        }]);

    if (error) {
        throw new Error('Failed to create insight: ' + error.message);
    }

    revalidatePath('/admin/insights');
    redirect('/admin/insights');
}

export async function deleteInsight(formData: FormData) {
    const id = formData.get('id') as string;

    const { error } = await supabaseAdmin
        .from('insights')
        .delete()
        .eq('id', id);

    if (error) {
        throw new Error('Failed to delete insight');
    }

    revalidatePath('/admin/insights');
}
