import Link from 'next/link';
import { SectionWrapper } from '@/components/layout/section-wrapper';
import { Button } from '@/components/ui/button';

export function ContactCTA() {
    return (
        <SectionWrapper className="bg-primary text-primary-foreground text-center">
            <div className="max-w-2xl mx-auto space-y-8 animate-slide-up">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">
                    변화를 시작할 준비가 되셨습니까?
                </h2>
                <p className="text-primary-foreground/80 text-xl leading-relaxed">
                    결정의 차이가 성취의 차이를 만듭니다. 지금 바로 문의하고<br />탁월함을 향한 여정을 시작하세요.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                    <Button asChild size="lg" variant="secondary" className="text-primary font-bold px-8 h-12">
                        <Link href="/contact">문의하기 / 강연 의뢰</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white h-12 px-8">
                        <Link href="/lecture">프로그램 안내 보기</Link>
                    </Button>
                </div>
            </div>
        </SectionWrapper>
    );
}
