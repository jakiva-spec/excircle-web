import { createCase } from '../actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function NewCasePage() {
    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/cases">
                        <ChevronLeft size={20} />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Add New Case Study</h1>
            </div>

            <form action={createCase} className="bg-white p-6 rounded-xl border shadow-sm space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-1">Client / Title (고객사 및 프로젝트명) *</label>
                    <Input name="title" required placeholder="예: A사 (제조업 중견기업)" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Problem (문제점) *</label>
                    <Textarea name="problem" rows={3} required placeholder="조직이 겪고 있던 핵심적인 어려움..." />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Solution (해결책) *</label>
                    <Textarea name="solution" rows={3} required placeholder="제공한 컨설팅 및 코칭 솔루션 내용..." />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Result (결과) *</label>
                    <Textarea name="result" rows={3} required placeholder="정량적/정성적 성과 (예: 이직률 10% 감소)" />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline" type="button" asChild>
                        <Link href="/admin/cases">Cancel</Link>
                    </Button>
                    <Button type="submit">Save Case Study</Button>
                </div>
            </form>
        </div>
    );
}
