import Link from 'next/link';
import { siteConfig } from '@/content/site';
import { Button } from '@/components/ui/button';
import { SectionWrapper } from '@/components/layout/section-wrapper';

export function Hero() {
    const { headline, subheadline, ctaPrimary, ctaSecondary } = siteConfig.hero;

    return (
        <section className="relative w-full py-12 md:py-20 lg:py-28 bg-background flex items-center justify-center overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/20 -z-10" />

            <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8 animate-fade-in">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight whitespace-pre-line text-primary">
                    {headline}
                </h1>
                <p className="max-w-[700px] text-lg md:text-xl text-gray-700 whitespace-pre-line leading-relaxed">
                    {subheadline}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <Button asChild size="lg" className="text-base px-8 h-12 shadow-lg">
                        <Link href="/contact">{ctaPrimary}</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="text-base px-8 h-12 cursor-pointer">
                        <Link href="#download-form">
                            {ctaSecondary}
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
