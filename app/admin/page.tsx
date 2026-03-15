import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col h-full">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Books</h3>
                    <p className="text-gray-500 mb-4 flex-1">웹사이트 About 페이지에 표시될 저서 목록을 추가하고 수정합니다.</p>
                    <Button variant="outline" asChild className="w-full">
                        <Link href="/admin/books">Manage Books</Link>
                    </Button>
                </div>
                <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col h-full">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Case Studies</h3>
                    <p className="text-gray-500 mb-4 flex-1">홈페이지에 노출될 비즈니스 컨설팅 성공 사례 데이터를 관리합니다.</p>
                    <Button variant="outline" asChild className="w-full">
                        <Link href="/admin/cases">Manage Cases</Link>
                    </Button>
                </div>
                <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col h-full">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Insights</h3>
                    <p className="text-gray-500 mb-4 flex-1">통찰력 있는 블로그 아티클을 작성하고 목록을 관리합니다.</p>
                    <Button variant="outline" asChild className="w-full">
                        <Link href="/admin/insights">Manage Insights</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
