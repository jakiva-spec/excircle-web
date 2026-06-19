'use client'

import { createBook } from '../actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function NewBookPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMsg('');
        
        try {
            const form = e.currentTarget;
            const formData = new FormData(form);
            const fileField = form.elements.namedItem('cover_image') as HTMLInputElement;
            const file = fileField?.files?.[0];

            let image_url = '';

            // 1. Upload file via API route if selected
            if (file && file.size > 0) {
                const uploadData = new FormData();
                uploadData.append('file', file);
                uploadData.append('folder', 'books');

                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: uploadData
                });

                const resText = await res.text();
                let data;
                try {
                    data = JSON.parse(resText);
                } catch (parseErr) {
                    throw new Error(`서버 응답 오류 (${res.status}): JSON 형식이 아닙니다. 파일 용량이 너무 클 수 있습니다.`);
                }

                if (!res.ok) {
                    throw new Error(data.error || `서버 응답 오류 (${res.status})`);
                }
                
                image_url = data.url;
            }

            // 2. Send data to Server Action as a plain object
            await createBook({
                title: formData.get('title') as string,
                publisher: formData.get('publisher') as string,
                year: formData.get('year') as string,
                description: formData.get('description') as string,
                image_url: image_url,
                link: formData.get('link') as string,
            });
        } catch (err: any) {
            console.error('Submission error:', err);
            
            // Next.js redirect() throws an error with this message, we MUST re-throw it!
            if (err.message === 'NEXT_REDIRECT' || err?.digest?.startsWith('NEXT_REDIRECT')) {
                throw err;
            }

            setErrorMsg(err.message || '업로드 중 알 수 없는 오류가 발생했습니다.');
            setIsSubmitting(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="icon" disabled={isSubmitting} asChild>
                    <Link href="/admin/books">
                        <ChevronLeft size={20} />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Add New Book</h1>
            </div>

            {errorMsg && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-200">
                    {errorMsg}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border shadow-sm space-y-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title (도서명) *</label>
                        <Input name="title" required placeholder="예: 피터 드러커 경영수업" disabled={isSubmitting} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Publisher (출판사)</label>
                            <Input name="publisher" placeholder="예: 북이십일" disabled={isSubmitting} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Year (출판연도)</label>
                            <Input name="year" placeholder="예: 2016" disabled={isSubmitting} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description (설명)</label>
                        <Textarea name="description" rows={4} placeholder="책에 대한 간략한 소개를 적어주세요..." disabled={isSubmitting} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Cover Image (표지 이미지 첨부)</label>
                        <Input type="file" name="cover_image" accept="image/*" disabled={isSubmitting} className="cursor-pointer file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                        <p className="text-xs text-gray-500 mt-1">PC에 있는 이미지 파일을 직접 선택하세요. (자동으로 업로드됩니다)</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Link (안내/구매 링크)</label>
                        <Input name="link" placeholder="예: https://..." disabled={isSubmitting} />
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline" type="button" disabled={isSubmitting} asChild>
                        <Link href="/admin/books">Cancel</Link>
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : 'Save Book'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
