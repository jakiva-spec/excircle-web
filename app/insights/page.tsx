import Image from 'next/image';
import Link from 'next/link';
import { SectionWrapper } from '@/components/layout/section-wrapper';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const metadata = {
    title: 'Insights | The Excellence Coach',
    description: '경영, 리더십, 의사결정에 관한 문정엽 코치의 통찰을 나눕니다.',
};

export const revalidate = 0; // Ensure dynamic fetch

export default async function InsightsPage() {
    const { data: posts } = await supabase
        .from('insights')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <SectionWrapper>
            <div className="max-w-4xl mx-auto mb-16 text-center">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Insights</h1>
                <p className="text-xl text-muted-foreground">
                    탁월한 리더가 되기 위한 생각의 도구들을 만나보세요.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                {posts?.map((post) => (
                    <Link key={post.id} href={`/insights/${post.slug}`} className="group block">
                        <article className="flex flex-col h-full bg-background border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                            <div className="aspect-[16/9] bg-muted relative overflow-hidden">
                                <Image
                                    src={post.cover_image_url?.trim() ? (post.cover_image_url.trim().startsWith('/') || post.cover_image_url.trim().startsWith('http') ? post.cover_image_url.trim() : `/${post.cover_image_url.trim()}`) : "/images/insight-cover-custom.jpg"}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="flex gap-2 mb-4">
                                    {post.tags?.map((tag: string) => (
                                        <span key={tag} className="text-xs font-semibold px-2 py-1 bg-primary/5 text-primary rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-muted-foreground mb-6 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <div className="mt-auto flex items-center justify-between text-sm text-muted-foreground">
                                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                    <span className="flex items-center gap-1 font-medium text-primary">Read Article <ArrowRight size={14} /></span>
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}

                {(!posts || posts.length === 0) && (
                    <div className="col-span-full py-20 text-center text-gray-500">
                        <p className="text-lg">등록된 인사이트가 없습니다.</p>
                    </div>
                )}
            </div>
        </SectionWrapper>
    );
}
