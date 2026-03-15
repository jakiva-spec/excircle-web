'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
    const password = formData.get('password') as string;
    const correctPassword = process.env.ADMIN_PASSWORD;

    if (!correctPassword) {
        return { error: 'Admin password is not configured.' };
    }

    if (password === correctPassword) {
        // Next.js 15: cookies() is async
        const cookieStore = await cookies();
        cookieStore.set('admin_session', password, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 1 week
        });
    } else {
        return { error: 'Invalid password.' };
    }

    redirect('/admin');
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
    redirect('/admin/login');
}
