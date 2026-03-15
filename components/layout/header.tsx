'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight" onClick={closeMenu}>
                    <span>ExcellenceCircle</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {siteConfig.nav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === item.href ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-4">
                    <Button asChild size="sm">
                        <Link href="/contact">문의하기</Link>
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-muted-foreground hover:text-primary"
                    onClick={toggleMenu}
                    aria-label="Menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden border-b bg-background">
                    <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                        {siteConfig.nav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-base font-medium transition-colors hover:text-primary py-2 block",
                                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                                )}
                                onClick={closeMenu}
                            >
                                {item.title}
                            </Link>
                        ))}
                        <div className="pt-4 border-t">
                            <Button asChild className="w-full">
                                <Link href="/contact" onClick={closeMenu}>문의하기</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
