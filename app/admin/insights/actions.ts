'use server'

import { supabaseAdmin } from '@/lib/supabase-admin';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createInsight(data: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    tags: string[];
    cover_image_url: string;
}) {
    try {
        const { title, slug, excerpt, content, tags, cover_image_url } = data;

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
            return redirect('/admin/insights/new?error=db_' + encodeURIComponent(error.message));
        }
    } catch (e: any) {
        if (e.message === 'NEXT_REDIRECT') throw e;
        return redirect('/admin/insights/new?error=fatal_' + encodeURIComponent(e.message || 'unknown_error'));
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
