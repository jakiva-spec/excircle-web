import { SectionWrapper } from '@/components/layout/section-wrapper';

const services = [
    {
        title: "판단력 계발 (Judgement)",
        desc: "리더의 가장 중요한 자질인 ‘올바른 의사결정’을 위한 사고 체계를 훈련합니다.",
    },
    {
        title: "실행 설계 (Execution)",
        desc: "전략이 공허한 구호로 끝나지 않고, 현장에 적용되어 성과를 내도록 프로세스를 설계합니다.",
    },
    {
        title: "관점 확장 (Perspective)",
        desc: "피터 드러커의 경영 철학을 바탕으로, 사업과 경영을 바라보는 새로운 관점을 제시합니다.",
    }
];

export function WhatIDo() {
    return (
        <SectionWrapper>
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">What I Do</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        리더십은 지식이 아니라 실천입니다. 강의와 코칭을 통해 리더가 스스로 올바른 질문을 하고 답을 찾아 행동하도록 돕습니다.
                    </p>
                </div>
                <div className="space-y-8">
                    {services.map((service, index) => (
                        <div key={index} className="flex gap-4">
                            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shrink-0">
                                {index + 1}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                                <p className="text-muted-foreground">{service.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}
