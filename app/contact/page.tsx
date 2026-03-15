import { ContactForm } from '@/components/forms/contact-form';
import { SectionWrapper } from '@/components/layout/section-wrapper';
import { siteConfig } from '@/content/site';
import { Mail, MapPin } from 'lucide-react';

export const metadata = {
    title: 'Contact | The Excellence Coach',
    description: '강연, 교육, 코칭 문의 및 제안을 환영합니다.',
};

export default function ContactPage() {
    return (
        <div className="min-h-screen">
            <SectionWrapper className="bg-muted/30 py-16">
                <div className="max-w-3xl mx-auto text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Contact</h1>
                    <p className="text-xl text-muted-foreground">
                        탁월함으로 나아가는 여정, 함께 고민하겠습니다.
                    </p>
                </div>
            </SectionWrapper>

            <SectionWrapper>
                <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Inquiry Info</h2>
                        <div className="space-y-6 text-muted-foreground">
                            <p>
                                강연, 워크숍, 코칭 등 협업 제안은 아래 폼을 통해 보내주세요.<br />
                                내용을 검토한 후, 담당자가 24시간 이내에(영업일 기준) 연락드리겠습니다.
                            </p>

                            <div className="flex items-center gap-4 pt-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-foreground">Email</p>
                                    <p>{siteConfig.links.email}</p>
                                </div>
                            </div>

                            {/* <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <MapPin size={20} />
                   </div>
                   <div>
                      <p className="text-sm font-semibold text-foreground">Office</p>
                      <p>Seoul, Korea</p>
                   </div>
                </div> */}
                        </div>
                    </div>

                    <div>
                        <div className="bg-background p-8 rounded-2xl shadow-sm border">
                            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}
