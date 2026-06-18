import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;

        if (!file || file.size === 0) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const bucketName = 'images';
        const fileExt = file.name.split('.').pop();
        const fileName = `insights/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        const arrayBuffer = await file.arrayBuffer();

        const { data: uploadData, error: uploadError } = await supabaseAdmin
            .storage
            .from(bucketName)
            .upload(fileName, arrayBuffer, {
                contentType: file.type,
                upsert: false
            });

        if (uploadError) {
            console.error('Supabase upload error:', uploadError);
            return NextResponse.json({ error: uploadError.message }, { status: 500 });
        }

        const { data: publicUrlData } = supabaseAdmin.storage.from(bucketName).getPublicUrl(fileName);
        
        return NextResponse.json({ url: publicUrlData.publicUrl });
    } catch (e: any) {
        console.error('API route error:', e);
        return NextResponse.json({ error: e.message || 'Unknown error' }, { status: 500 });
    }
}
