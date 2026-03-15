import { MDXRemote } from 'next-mdx-remote/rsc';
import { SectionWrapper } from '@/components/layout/section-wrapper';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { DownloadForm } from '@/components/forms/download-form';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    // Optional: Fetch all slugs for static generation
    const { data: posts } = await supabase.from('insights').select('slug');
    return posts?.map((post) => ({
        slug: post.slug,
    })) || [];
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const { data: post } = await supabase
        .from('insights')
        .select('title, excerpt')
        .eq('slug', params.slug)
        .single();

    if (!post) {
        return {
            title: 'Not Found',
        }
    }

    return {
        title: `${post.title} | Insights`,
        description: post.excerpt,
    };
}

export default async function InsightPost(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const { data: post } = await supabase
        .from('insights')
        .select('*')
        .eq('slug', params.slug)
        .single();

    if (!post) {
        notFound();
    }

    return (
        <SectionWrapper className="pt-12 pb-24">
            <div className="max-w-3xl mx-auto">
                <Button variant="ghost" asChild className="mb-8 pl-0 hover:bg-transparent hover:text-primary">
                    <Link href="/insights" className="flex items-center gap-2">
                        <ArrowLeft size={16} /> Back to Insights
                    </Link>
                </Button>

                <header className="mb-12">
                    <div className="flex gap-2 mb-6">
                        {post.tags?.map((tag: string) => (
                            <span key={tag} className="text-sm font-semibold px-3 py-1 bg-secondary text-secondary-foreground rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                        {post.title}
                    </h1>
                    <time className="text-muted-foreground">{new Date(post.created_at).toLocaleDateString()}</time>
                </header>

                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <MDXRemote source={post.content} />
                </div>

                <hr className="my-12 border-muted" />

                <div className="bg-muted/30 p-8 rounded-2xl border">
                    <h3 className="text-xl font-bold mb-4">Insight Book 무료 받기</h3>
                    <p className="text-muted-foreground mb-6">
                        이 글이 도움이 되셨나요? 리더십에 대한 더 깊은 통찰을 담은 &lt;탁월한 리더십&gt; PDF를 무료로 받아보세요.
                    </p>
                    <div className="max-w-md">
                        <DownloadForm />
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
