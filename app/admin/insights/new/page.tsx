import { createInsight } from '../actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function NewInsightPage() {
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

            <form action={createInsight} className="bg-white p-6 rounded-xl border shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Title (제목) *</label>
                            <Input name="title" required placeholder="통찰력 있는 제목을 입력하세요" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Slug (URL 주소) *</label>
                            <Input name="slug" required placeholder="예: effective-decision-making (영문 소문자, 하이픈)" />
                            <p className="text-xs text-gray-500 mt-1">글의 고유한 URL 주소가 됩니다. 중복될 수 없습니다.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Tags (태그)</label>
                            <Input name="tags" placeholder="예: 리더십, 의사결정, 조직문화 (콤마로 구분)" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Cover Image (커버 이미지 첨부)</label>
                            <Input type="file" name="cover_image" accept="image/*" className="cursor-pointer file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                            <p className="text-xs text-gray-500 mt-1">PC에 있는 이미지 파일을 직접 선택하세요. (자동으로 업로드됩니다)</p>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="block text-sm font-medium mb-1">Excerpt (요약설명) *</label>
                        <Textarea name="excerpt" required className="flex-1 h-full min-h-[150px]" placeholder="글의 핵심 내용을 2-3문장으로 요약해주세요. 카드 목록에 표시됩니다." />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Content (본문 / Markdown) *</label>
                    <div className="mb-2 text-xs text-gray-500 bg-gray-50 p-2 rounded">
                        Tip: **굵게**, # 제목, - 리스트 등 마크다운 문법을 사용할 수 있습니다.
                    </div>
                    <Textarea name="content" required className="min-h-[500px] font-mono text-sm leading-relaxed" placeholder="# 여기에 글을 작성하세요..." />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline" type="button" asChild>
                        <Link href="/admin/insights">Cancel</Link>
                    </Button>
                    <Button type="submit">Publish Insight</Button>
                </div>
            </form>
        </div>
    );
}
