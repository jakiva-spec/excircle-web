'use server'

import { supabaseAdmin } from '@/lib/supabase-admin';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createInsight(formData: FormData) {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const tags = (formData.get('tags') as string)?.split(',').map(tag => tag.trim()).filter(Boolean);

    let cover_image_url = formData.get('cover_image_url') as string || ''; // Fallback for existing texts if any
    const imageFile = formData.get('cover_image') as File | null;

    if (imageFile && imageFile.size > 0) {
        const bucketName = 'images';
        
        // Ensure bucket exists (it will fail silently if it already exists, which is fine)
        await supabaseAdmin.storage.createBucket(bucketName, { public: true }).catch(() => {});

        const fileExt = imageFile.name.split('.').pop();
        const fileName = `insights/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const { data: uploadData, error: uploadError } = await supabaseAdmin
            .storage
            .from(bucketName)
            .upload(fileName, buffer, {
                contentType: imageFile.type,
                upsert: false
            });

        if (uploadError) {
            console.error('Image upload failed:', uploadError);
            throw new Error('Failed to upload image: ' + uploadError.message);
        }

        const { data: publicUrlData } = supabaseAdmin.storage.from(bucketName).getPublicUrl(fileName);
        cover_image_url = publicUrlData.publicUrl;
    }

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
