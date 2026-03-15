import { createBook } from '../actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function NewBookPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/books">
                        <ChevronLeft size={20} />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Add New Book</h1>
            </div>

            <form action={createBook} className="bg-white p-6 rounded-xl border shadow-sm space-y-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title (도서명) *</label>
                        <Input name="title" required placeholder="예: 피터 드러커 경영수업" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Publisher (출판사)</label>
                            <Input name="publisher" placeholder="예: 북이십일" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Year (출판연도)</label>
                            <Input name="year" placeholder="예: 2016" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description (설명)</label>
                        <Textarea name="description" rows={4} placeholder="책에 대한 간략한 소개를 적어주세요..." />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Image URL (표지 이미지 경로)</label>
                        <Input name="image_url" placeholder="예: /images/book-management-class.jpg" />
                        <p className="text-xs text-gray-500 mt-1">서버 내의 public/images 폴더에 위치한 파일명이나 외부 URL 주소를 입력하세요.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Link (안내/구매 링크)</label>
                        <Input name="link" placeholder="예: https://..." />
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline" type="button" asChild>
                        <Link href="/admin/books">Cancel</Link>
                    </Button>
                    <Button type="submit">Save Book</Button>
                </div>
            </form>
        </div>
    );
}
