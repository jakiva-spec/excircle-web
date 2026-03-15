import Image from 'next/image';
import Link from 'next/link';
import { SectionWrapper } from '@/components/layout/section-wrapper';
import { Mail, Linkedin, BookOpen, Link as LinkIcon, Youtube } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export async function About() {
    const { data: books } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: true });

    const displayBooks = books && books.length > 0 ? books : [
        {
            title: "피터 드러커 경영수업",
            publisher: "북이십일",
            year: "2016",
            description: "드러커처럼 보고, 생각하는 경영마인드로 리셋하라! 경영자에게 가장 중요한 올바른 경영의 길을 찾는다.",
            image_url: "/images/book-management-class.jpg"
        },
        {
            title: "스타트업, 드러커를 만나다",
            publisher: "한울",
            year: "2021",
            description: "기업가가 묻고 드러커가 답하다. 스타트업과 작은 기업의 시작과 성장을 돕는 피터 드러커 가상 멘토링.",
            image_url: "/images/book-startup.jpg"
        },
        {
            title: "탁월함에 이르는 피터 드러커의 습관",
            publisher: "습관연구소",
            year: "2023",
            description: "드러커의 인생 전체를 통해 그의 결정과 행동의 밑바탕이 된 습관을 조명한다. 탁월한 성취를 위한 자기경영.",
            image_url: "/images/book-habits.jpg"
        },
        {
            title: "나를 찾는 30가지 질문",
            publisher: "아르테",
            year: "2024",
            description: "행복한 삶은 결국 자기를 실현하는 삶이다. 삶의 여정 속에서 마주하고 반드시 찾아야 하는 30가지 질문.",
            image_url: "/images/book-30-questions.jpg"
        }
    ];

    return (
        <SectionWrapper id="about" className="py-20">
            <div className="flex flex-col gap-16">
                {/* Profile Section */}
                <div className="grid md:grid-cols-12 gap-12 items-start">
                    {/* Image Column */}
                    <div className="md:col-span-5 lg:col-span-4">
                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src="/images/profile-moon.jpg"
                                alt="Moon Jeong-yeop"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Social Links (Mobile/Desktop) */}
                        <div className="flex justify-center gap-4 mt-6">
                            <Link href="/contact" className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-white transition-colors">
                                <Mail size={20} />
                                <span className="sr-only">Contact</span>
                            </Link>
                            <a href="https://jakiva.tistory.com/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-white transition-colors">
                                <LinkIcon size={20} />
                                <span className="sr-only">Blog</span>
                            </a>
                            <a href="https://www.linkedin.com/in/jaymoon65" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-white transition-colors">
                                <Linkedin size={20} />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                            <a href="https://brunch.co.kr/@jakiva" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-white transition-colors">
                                <BookOpen size={20} />
                                <span className="sr-only">Brunch</span>
                            </a>
                            <a href="https://www.youtube.com/@ManagementOne1" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-white transition-colors">
                                <Youtube size={20} />
                                <span className="sr-only">YouTube</span>
                            </a>
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="md:col-span-7 lg:col-span-8 space-y-8">
                        <div>
                            <div className="inline-block rounded-lg bg-primary px-4 py-2 text-base text-primary-foreground font-semibold mb-4">About Me</div>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary mb-2">
                                문정엽 <span className="text-xl md:text-2xl font-medium text-gray-600">Excellence Coach</span>
                            </h2>
                            <p className="text-gray-600 font-medium">
                                Founder and Chief Consultant @ ExcellenceCircle<br />
                                피터 드러커 연구자 / 작가
                            </p>
                        </div>

                        <div className="space-y-4 border-l-4 border-primary/20 pl-6 py-2">
                            <h3 className="text-2xl font-bold text-gray-900">
                                탁월함은 재능이 아니라<br />
                                <span className="text-primary">책임 있는 판단과 반복되는 실천</span>의 결과입니다.
                            </h3>
                            <p className="text-lg text-gray-700 font-medium">
                                이를 돕는 것이 Excellence Coach의 일입니다.
                            </p>
                        </div>

                        <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                            <p>
                                조직의 존재 이유인 '인간 삶의 향상'을 위해 지난 30여 년간 책임지는 경영의 길을 걸어왔습니다.
                                피터 드러커의 철학을 바탕으로 조직과 개인의 성장을 연구하며, 탁월함의 실체를 탐구해 왔습니다.
                            </p>
                            <p>
                                지금 리더에게 필요한 것은 정보의 홍수가 아니라, 본질을 꿰뚫고 실행하는 '사고의 근육'입니다.
                                리더들이 고유한 철학을 바탕으로 탁월한 성취를 이룰 수 있도록, 경영의 실천적 지혜를 전달합니다.
                            </p>
                        </div>

                        <ul className="space-y-2 text-gray-700">
                            {[
                                "글로벌 기업, 한국 대기업, 비영리단체에서 30년 간 경영자로 일함",
                                "피터 드러커 경영사상 연구 및 저술",
                                "리더십 · 탁월함 · 판단력 · 의사결정, 전환과 혁신",
                                "AI 기반 개인 역량 및 조직 혁신 전략 연구"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Books Section */}
                <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-primary border-b pb-4">저서 (Books)</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {displayBooks.map((book, index) => (
                            <div key={index} className="group space-y-4">
                                <div className="relative aspect-[1/1.4] rounded-lg overflow-hidden border shadow-sm group-hover:shadow-md transition-shadow bg-gray-50">
                                    {book.image_url?.trim() ? (
                                        <Image src={book.image_url.trim().startsWith('/') || book.image_url.trim().startsWith('http') ? book.image_url.trim() : `/${book.image_url.trim()}`} alt={book.title} fill className="object-cover" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400 text-sm">No Image</div>
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg leading-tight mb-1">{book.title}</h4>
                                    <p className="text-sm text-gray-500 mb-2">{book.publisher}, {book.year}</p>
                                    <p className="text-sm text-gray-600 mb-3 whitespace-pre-wrap">{book.description}</p>
                                    {book.link && (
                                        <a
                                            href={book.link.trim().startsWith('http') ? book.link.trim() : `https://${book.link.trim()}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 hover:underline transition-colors"
                                        >
                                            자세히 보기 &rarr;
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
