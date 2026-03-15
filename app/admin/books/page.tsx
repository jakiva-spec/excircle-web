import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { deleteBook } from './actions';
import Image from 'next/image';

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

export default async function AdminBooksPage() {
    const { data: books, error } = await supabaseAdmin
        .from('books')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        return <div>Error loading books</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Books</h1>
                <Button asChild>
                    <Link href="/admin/books/new" className="gap-2">
                        <Plus size={16} /> Add New Book
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books?.map((book) => (
                    <div key={book.id} className="bg-white border rounded-xl overflow-hidden shadow-sm flex flex-col">
                        <div className="relative aspect-[1/1.4] w-full bg-gray-100">
                            {book.image_url?.trim() ? (
                                <Image
                                    src={book.image_url.trim().startsWith('/') || book.image_url.trim().startsWith('http') ? book.image_url.trim() : `/${book.image_url.trim()}`}
                                    alt={book.title}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                            )}
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                            <h3 className="font-bold text-lg mb-1 line-clamp-1">{book.title}</h3>
                            <p className="text-sm text-gray-500 mb-2">{book.publisher}, {book.year}</p>
                            <p className="text-sm text-gray-600 mb-4 flex-1 whitespace-pre-wrap">{book.description}</p>

                            <div className="flex justify-between items-center mt-auto pt-4 border-t">
                                <span className="text-xs text-gray-400">ID: {book.id.slice(0, 8)}...</span>
                                <form action={deleteBook}>
                                    <input type="hidden" name="id" value={book.id} />
                                    <Button type="submit" size="sm" className="bg-red-500 text-white hover:bg-red-600 gap-1">
                                        <Trash2 size={14} /> Delete
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                ))}

                {books?.length === 0 && (
                    <div className="col-span-full py-12 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed">
                        No books found. Create your first book!
                    </div>
                )}
            </div>
        </div>
    );
}
