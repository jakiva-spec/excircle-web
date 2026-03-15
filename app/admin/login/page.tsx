'use client';

import { useActionState } from 'react';
import { login } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
    // useActionState is available in React 19 (which is used here)
    // If not, we might need a simpler form approach or useFormState
    // Let's use standard form action for simplicity first to avoid hook compatibility issues if any.
    // Actually, useActionState might be experimental or named useFormState in some versions.
    // Let's stick to a simple form with action for now, or use a client wrapper.

    // Simple client validation or status can be added later.

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                        <ShieldCheck size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
                    <p className="text-sm text-gray-500 mt-2">관리자 암호를 입력해주세요.</p>
                </div>

                <form action={async (formData) => {
                    const result = await login(formData);
                    if (result?.error) {
                        alert(result.error);
                    }
                }} className="space-y-4">
                    <div>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            className="h-12 text-lg"
                        />
                    </div>
                    <Button type="submit" className="w-full h-12 text-lg font-medium">
                        로그인
                    </Button>
                </form>
            </div>
        </div>
    );
}
