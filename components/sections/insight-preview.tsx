import Image from 'next/image';
import Link from 'next/link';
import { SectionWrapper } from '@/components/layout/section-wrapper';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download } from 'lucide-react';
import { DownloadForm } from '@/components/forms/download-form';
import { supabase } from '@/lib/supabase';

export async function InsightPreview() {
    const { data: posts } = await supabase
        .from('insights')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

    const displayPosts = posts && posts.length > 0 ? posts : [];

    return (
        <SectionWrapper id="insight-preview">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Insights</h2>
                    <p className="text-muted-foreground text-lg">경영의 본질을 꿰뚫는 통찰을 나눕니다.</p>
                </div>
                <Button variant="ghost" asChild>
                    <Link href="/insights" className="gap-2">전체 보기 <ArrowRight size={16} /></Link>
                </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
                {displayPosts.map((post) => (
                    <Link key={post.slug} href={`/insights/${post.slug}`} className="group block h-full">
                        <div className="bg-background rounded-xl border overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                            <div className="aspect-video bg-muted relative">
                                <Image
                                    src={post.cover_image_url?.trim() ? (post.cover_image_url.trim().startsWith('/') || post.cover_image_url.trim().startsWith('http') ? post.cover_image_url.trim() : `/${post.cover_image_url.trim()}`) : "/images/insight-cover-custom.jpg"}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="text-xs text-muted-foreground mb-2">
                                    {new Date(post.created_at).toLocaleDateString()}
                                </div>
                                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                                    {post.excerpt}
                                </p>
                                <div className="text-sm font-medium text-primary flex items-center gap-1 mt-auto">
                                    Read more <ArrowRight size={14} />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
                {displayPosts.length === 0 && (
                    <div className="col-span-full py-12 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed">
                        아직 발행된 인사이트가 없습니다.
                    </div>
                )}
            </div>

            <div id="download-form" className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 border border-primary/10">
                <div>
                    <h3 className="text-2xl font-bold mb-2">Insight Book 무료 받기</h3>
                    <p className="text-muted-foreground text-lg">
                        리더를 위한 필독서 &lt;탁월한 리더십&gt; PDF를 이메일로 보내드립니다.
                    </p>
                </div>
                <div className="shrink-0 w-full md:w-auto">
                    <DownloadForm />
                </div>
            </div>
        </SectionWrapper>
    );
}
