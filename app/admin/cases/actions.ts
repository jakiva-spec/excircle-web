'use server'

import { supabaseAdmin } from '@/lib/supabase-admin';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createCase(formData: FormData) {
    const title = formData.get('title') as string;
    const problem = formData.get('problem') as string;
    const solution = formData.get('solution') as string;
    const result = formData.get('result') as string;

    const { error } = await supabaseAdmin
        .from('case_studies')
        .insert([{ title, problem, solution, result }]);

    if (error) {
        throw new Error('Failed to create case study: ' + error.message);
    }

    revalidatePath('/admin/cases');
    redirect('/admin/cases');
}

export async function deleteCase(formData: FormData) {
    const id = formData.get('id') as string;

    const { error } = await supabaseAdmin
        .from('case_studies')
        .delete()
        .eq('id', id);

    if (error) {
        throw new Error('Failed to delete case study');
    }

    revalidatePath('/admin/cases');
}
