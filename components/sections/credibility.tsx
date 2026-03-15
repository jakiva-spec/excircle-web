import { SectionWrapper } from '@/components/layout/section-wrapper';

const credentials = [
    "Peter Drucker Society Researcher",
    "Author of 'The Excellence'",
    "Ex-Strategy Consultant",
    "AI Leadership Specialist"
];

export function Credibility() {
    return (
        <SectionWrapper className="py-12 border-b bg-muted/30">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-80">
                {credentials.map((item, index) => (
                    <span key={index} className="text-sm md:text-base font-semibold text-muted-foreground uppercase tracking-wider">
                        {item}
                    </span>
                ))}
            </div>
        </SectionWrapper>
    );
}
