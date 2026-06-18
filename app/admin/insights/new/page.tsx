'use client'

import { createInsight } from '../actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function NewInsightPage() {
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

            let cover_image_url = '';

            // 1. Upload file via API route if selected
            if (file && file.size > 0) {
                const uploadData = new FormData();
                uploadData.append('file', file);

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
                
                cover_image_url = data.url;
            }

            // 2. Send data to Server Action as a plain object
            const tagsString = formData.get('tags') as string;
            const tags = tagsString ? tagsString.split(',').map(tag => tag.trim()).filter(Boolean) : [];

            await createInsight({
                title: formData.get('title') as string,
                slug: formData.get('slug') as string,
                excerpt: formData.get('excerpt') as string,
                content: formData.get('content') as string,
                tags,
                cover_image_url
            });
        } catch (err: any) {
            console.error('Submission error:', err);
            
            // Next.js redirect() throws an error with this message, we MUST re-throw it!
            if (err.message === 'NEXT_REDIRECT' || err?.digest?.startsWith('NEXT_REDIRECT')) {
                throw err;
            }

            setErrorMsg(err.message || '알 수 없는 오류가 발생했습니다.');
            setIsSubmitting(false);
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/insights">
                        <ChevronLeft size={20} />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Write New Insight</h1>
            </div>

            {errorMsg && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-200">
                    {errorMsg}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Title (제목) *</label>
                            <Input name="title" required placeholder="통찰력 있는 제목을 입력하세요" disabled={isSubmitting} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Slug (URL 주소) *</label>
                            <Input name="slug" required placeholder="예: effective-decision-making" disabled={isSubmitting} />
                            <p className="text-xs text-gray-500 mt-1">글의 고유한 URL 주소가 됩니다. 중복될 수 없습니다.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Tags (태그)</label>
                            <Input name="tags" placeholder="예: 리더십, 의사결정, 조직문화 (콤마로 구분)" disabled={isSubmitting} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Cover Image (커버 이미지 첨부)</label>
                            <Input type="file" name="cover_image" accept="image/*" disabled={isSubmitting} className="cursor-pointer file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                            <p className="text-xs text-gray-500 mt-1">PC에 있는 이미지 파일을 직접 선택하세요. (자동으로 업로드됩니다)</p>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="block text-sm font-medium mb-1">Excerpt (요약설명) *</label>
                        <Textarea name="excerpt" required disabled={isSubmitting} className="flex-1 h-full min-h-[150px]" placeholder="글의 핵심 내용을 2-3문장으로 요약해주세요." />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Content (본문 / Markdown) *</label>
                    <div className="mb-2 text-xs text-gray-500 bg-gray-50 p-2 rounded">
                        Tip: **굵게**, # 제목, - 리스트 등 마크다운 문법을 사용할 수 있습니다.
                    </div>
                    <Textarea name="content" required disabled={isSubmitting} className="min-h-[500px] font-mono text-sm leading-relaxed" placeholder="# 여기에 글을 작성하세요..." />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline" type="button" disabled={isSubmitting} asChild>
                        <Link href="/admin/insights">Cancel</Link>
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Publishing...
                            </>
                        ) : 'Publish Insight'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
