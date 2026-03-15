import { SectionWrapper } from '@/components/layout/section-wrapper';
import { Card } from '@/components/ui/card'; // Need to create Card or just use div
import { CheckCircle2 } from 'lucide-react';

const targets = [
    {
        role: "CEO / 임원",
        pain: "조직의 방향성을 결정하고, 불확실성 속에서 성과를 만들어야 하는 리더",
    },
    {
        role: "팀장 / 중간관리자",
        pain: "조직 전략을 실행하고, 팀원의 성장을 이끌어야 하는 실무 리더",
    },
    {
        role: "교육 / 커뮤니티 운영자",
        pain: "조직 내 리더십 역량을 강화하고, 학습 문화를 만들어야 하는 담당자",
    }
];

export function WhoIHelp() {
    return (
        <SectionWrapper className="bg-muted/50">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary mb-4">Who I Serve</h2>
                <p className="text-muted-foreground text-lg">이런 분들과 함께합니다.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {targets.map((target, index) => (
                    <div key={index} className="bg-background p-8 rounded-xl shadow-sm border flex flex-col items-center text-center hover:shadow-md transition-shadow">
                        <div className="p-3 bg-primary/10 rounded-full mb-4">
                            <CheckCircle2 className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{target.role}</h3>
                        <p className="text-muted-foreground leading-relaxed">{target.pain}</p>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
