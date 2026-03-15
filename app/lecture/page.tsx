import Link from 'next/link';
import { SectionWrapper } from '@/components/layout/section-wrapper';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

import { siteConfig } from '@/content/site';

export default function LecturePage() {
    return (
        <div>
            <SectionWrapper className="bg-primary text-primary-foreground py-20">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Lecture & Workshops</h1>
                    <p className="text-xl text-primary-foreground/80 leading-relaxed">
                        조직의 리더십 DNA를 바꾸는 강연과 워크숍을 제안합니다.
                    </p>
                </div>
            </SectionWrapper>

            <SectionWrapper>
                <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-4 text-primary">Keynote Lecture</h3>
                            <p className="text-muted-foreground mb-4">
                                경영의 본질과 리더십의 핵심을 꿰뚫는 통찰을 전달합니다. (60~90분)
                            </p>
                            <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                                <li>탁월함의 조건: 재능을 넘어 판단으로</li>
                                <li>피터드러커에게 배우는 리더십 </li>
                                <li>불확실성 시대의 의사결정 전략</li>
                                <li>AI시대의 근본역량: 문해력, 사고력, 판단력</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold mb-4 text-primary">Workshop Programs</h3>
                            <p className="text-muted-foreground mb-4">
                                실제 비즈니스 케이스를 기반으로, 리더들이 직접 고민하고 해법을 찾는 참여형 과정입니다. (4~8시간)
                            </p>
                            <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                                <li>SOLAR Leadership Workshop (판단력/실행력 강화)</li>
                                <li>Strategic Thinking Principle & Practice</li>
                                <li>Effective Executive Course</li>
                                <li>CEO 관점 의사결정 Course</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-muted p-8 rounded-2xl h-fit border">
                        <h3 className="text-xl font-bold mb-4">강연/교육 문의 가이드</h3>
                        <p className="text-muted-foreground mb-6 text-sm">
                            강연의 목적과 대상을 명확히 알려주시면, 가장 적합한 주제와 커리큘럼을 제안해 드립니다.
                        </p>
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between border-b pb-2">
                                <span className="font-semibold text-sm">대상</span>
                                <span className="text-sm text-muted-foreground">경영진, 팀장, 전사 임직원</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="font-semibold text-sm">인원</span>
                                <span className="text-sm text-muted-foreground">제한 없음 (워크숍은 최대 20명 권장)</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="font-semibold text-sm">지역</span>
                                <span className="text-sm text-muted-foreground">전국 / 온라인 가능</span>
                            </div>
                        </div>
                        <Button asChild className="w-full h-12 text-base">
                            <Link href="/contact">강연/워크숍 문의하기</Link>
                        </Button>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}
