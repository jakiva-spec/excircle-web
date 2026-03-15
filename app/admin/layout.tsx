import Link from 'next/link';
import { LayoutDashboard, BookText, FileHeart, Lightbulb, LogOut } from 'lucide-react';
import { logout } from './login/actions';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r flex flex-col">
                <div className="h-16 flex items-center px-6 border-b">
                    <h2 className="text-xl font-bold text-primary">Admin Panel</h2>
                </div>
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700">
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>
                    <Link href="/admin/books" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700">
                        <BookText size={20} />
                        <span>Books (저서)</span>
                    </Link>
                    <Link href="/admin/cases" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700">
                        <FileHeart size={20} />
                        <span>Case Studies</span>
                    </Link>
                    <Link href="/admin/insights" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700">
                        <Lightbulb size={20} />
                        <span>Insights</span>
                    </Link>
                </nav>
                <div className="p-4 border-t">
                    <form action={logout}>
                        <button type="submit" className="flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-red-50 text-red-600 transition-colors">
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
