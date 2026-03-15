import Link from 'next/link';
import { siteConfig } from '@/content/site';

export function Footer() {
    return (
        <footer className="w-full border-t bg-background py-10">
            <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <div className="text-lg font-bold text-primary">Helping Leaders Achieve Excellence</div>
                </div>

                <div className="flex flex-col items-center md:items-end gap-2 text-sm text-muted-foreground">
                    <div className="flex gap-4">
                        {/* Links removed as requested */}
                    </div>
                    <p>{siteConfig.footer.copyright}</p>
                </div>
            </div>
        </footer>
    );
}
