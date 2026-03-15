import Link from 'next/link';
import { SectionWrapper } from '@/components/layout/section-wrapper';
import { supabase } from '@/lib/supabase';

// Export as async function to fetch from DB
export async function CaseStudies() {
    // 1. Fetch case studies from Supabase
    const { data: cases, error } = await supabase
        .from('case_studies')
        .select('*')
        .order('created_at', { ascending: true });

    if (error) {
        console.error("Error fetching case studies:", error);
    }

    // Fallback data if DB is empty or errors
    const displayCases = cases && cases.length > 0 ? cases : [
        {
            title: "A사 (제조업 중견기업)",
            problem: "급격한 성장에 따른 조직 문화 혼란 및 리더십 부재",
            solution: "경영진 대상 'SOLAR 리더십 코칭' 및 핵심가치 내재화 워크숍 진행",
            result: "리더십 다면평가 점수 25% 상승, 이직률 10% 감소"
        },
        {
            title: "B사 (IT 스타트업)",
            problem: "시리즈 B 투자 이후 PM(Product Manager) 그룹의 의사결정 지연",
            solution: "'판단력 계발' 워크숍을 통한 의사결정 원칙 수립, 의사결정 훈련",
            result: "제품 출시 목표 달성, 팀장 의사결정에 대한 구성원 만족도 상승"
        }
    ];

    return (
        <SectionWrapper className="bg-muted/50">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Case Studies</h2>
                    <p className="text-muted-foreground text-lg">탁월함은 결과로 증명됩니다.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {displayCases.map((item, index) => (
                    <div key={index} className="bg-background p-8 rounded-xl shadow-sm border hover:shadow-md transition-all">
                        <h3 className="text-xl font-bold mb-4 text-primary">{item.title}</h3>
                        <div className="space-y-4">
                            <div>
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Problem</span>
                                <p className="mt-1">{item.problem}</p>
                            </div>
                            <div>
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Solution</span>
                                <p className="mt-1">{item.solution}</p>
                            </div>
                            <div className="pt-4 border-t">
                                <span className="text-xs font-semibold text-primary uppercase tracking-wider">Result</span>
                                <p className="mt-1 font-medium">{item.result}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
