import { SectionWrapper } from '@/components/layout/section-wrapper';

const solarElements = [
    { char: 'S', title: 'Sense', desc: '상황 인식' },
    { char: 'O', title: 'Option', desc: '대안 탐색' },
    { char: 'L', title: 'Logic', desc: '논리적 판단' },
    { char: 'A', title: 'Action', desc: '실행 설계' },
    { char: 'R', title: 'Review', desc: '결과 피드백' },
];

export function Framework() {
    return (
        <SectionWrapper className="bg-primary text-primary-foreground text-center">
            <div className="mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4 text-white">Signature Framework</h2>
                <p className="text-primary-foreground/80 text-lg">SOLAR Leadership Model</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                {solarElements.map((el, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white/30 flex items-center justify-center text-3xl font-bold mb-4 bg-white/10 backdrop-blur-sm">
                            {el.char}
                        </div>
                        <h3 className="text-lg font-bold mb-1">{el.title}</h3>
                        <p className="text-sm text-primary-foreground/70">{el.desc}</p>
                    </div>
                ))}
            </div>

            <p className="mt-12 max-w-2xl mx-auto text-primary-foreground/80 leading-relaxed">
                SOLAR 모델은 리더가 복잡한 문제 상황에서 빠르고 정확하게 의사결정을 내리고 실행할 수 있도록 돕는 실천적 프레임워크입니다.
            </p>
        </SectionWrapper>
    );
}
