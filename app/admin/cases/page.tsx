import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { deleteCase } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminCasesPage() {
    const { data: cases, error } = await supabaseAdmin
        .from('case_studies')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        return <div>Error loading cases</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Case Studies</h1>
                <Button asChild>
                    <Link href="/admin/cases/new" className="gap-2">
                        <Plus size={16} /> Add New Case
                    </Link>
                </Button>
            </div>

            <div className="grid gap-6">
                {cases?.map((item) => (
                    <div key={item.id} className="bg-white border rounded-xl p-6 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                            <form action={deleteCase}>
                                <input type="hidden" name="id" value={item.id} />
                                <Button type="submit" variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                    <Trash2 size={18} />
                                </Button>
                            </form>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Problem</span>
                                <p className="text-sm text-gray-800">{item.problem}</p>
                            </div>
                            <div>
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Solution</span>
                                <p className="text-sm text-gray-800">{item.solution}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">Result</span>
                                <p className="text-sm font-medium text-gray-900">{item.result}</p>
                            </div>
                        </div>
                    </div>
                ))}

                {cases?.length === 0 && (
                    <div className="py-12 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed">
                        No case studies found. Add your first success story!
                    </div>
                )}
            </div>
        </div>
    );
}
