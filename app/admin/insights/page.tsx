import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { deleteInsight } from './actions';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function AdminInsightsPage() {
    const { data: insights, error } = await supabaseAdmin
        .from('insights')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        return <div>Error loading insights</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Insights</h1>
                <Button asChild>
                    <Link href="/admin/insights/new" className="gap-2">
                        <Plus size={16} /> Add New Insight
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {insights?.map((item) => (
                    <div key={item.id} className="bg-white border rounded-xl overflow-hidden shadow-sm flex flex-col">
                        <div className="relative h-48 w-full bg-gray-100">
                            {item.cover_image_url?.trim() ? (
                                <Image
                                    src={item.cover_image_url.trim().startsWith('/') || item.cover_image_url.trim().startsWith('http') ? item.cover_image_url.trim() : `/${item.cover_image_url.trim()}`}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                            )}
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                            <div className="flex gap-2 mb-3">
                                {item.tags?.map((tag: string, i: number) => (
                                    <span key={i} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">#{tag}</span>
                                ))}
                            </div>
                            <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">{item.excerpt}</p>

                            <div className="flex justify-between items-center mt-auto pt-4 border-t">
                                <span className="text-xs text-gray-400 font-mono">/{item.slug}</span>
                                <div className="flex gap-2">
                                    <form action={deleteInsight}>
                                        <input type="hidden" name="id" value={item.id} />
                                        <Button type="submit" size="sm" className="bg-red-500 text-white hover:bg-red-600 gap-1">
                                            <Trash2 size={14} /> Delete
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {insights?.length === 0 && (
                    <div className="col-span-full py-12 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed">
                        No insights found. Share your wisdom!
                    </div>
                )}
            </div>
        </div>
    );
}
