import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { downloadSchema } from '@/lib/schemas';
import { siteConfig } from '@/content/site';
import { supabase } from '@/lib/supabase';

const resend = new Resend('re_YKYb6y2S_PU2MdCXp997wgVD6BqSG6diY');

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validatedData = downloadSchema.parse(body);

        const { email, name, organization, phone } = validatedData;

        // 1. Save data to Supabase 'downloads' table
        const { error: dbError } = await supabase
            .from('downloads')
            .insert([
                {
                    email,
                    name,
                    source: 'website',
                    asset: 'insight_book',
                    status: 'delivered'
                }
            ]);

        if (dbError) {
            console.error('Failed to insert download data into Supabase:', dbError);
            // Optionally: decide if you want to fail the request or continue sending the email
            // For now, let's continue so the user still gets the book even if DB logging fails temporarily
        }

        // 2. Send the Insight Book to the user
        const data = await resend.emails.send({
            from: 'The Excellence Coach <onboarding@resend.dev>',
            to: [email],
            subject: '[The Excellence Coach] 요청하신 Insight Book입니다.',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                    <h2>안녕하세요, ${name}님.</h2>
                    <p>탁월함을 향한 여정에 오신 것을 환영합니다.</p>
                    <p>요청하신 <strong>&lt;탁월한 리더십&gt; Insight Book</strong> PDF를 보내드립니다.</p>
                    <p>아래 버튼을 클릭하여 다운로드하실 수 있습니다.</p>
                    <br/>
                    <a href="${siteConfig.links.curriculum}" style="background-color: #0F172A; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                        Insight Book 다운로드
                    </a>
                    <br/><br/>
                    <p>이 자료가 <b>${organization}</b>에서의 비즈니스와 리더십에 큰 도움이 되기를 바랍니다.</p>
                    <p>감사합니다.<br/>문정엽 드림</p>
                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eaeaea;" />
                    <p style="font-size: 12px; color: #666; line-height: 1.5;">
                        * 본 메일은 The Excellence Coach 홈페이지에서 자료를 요청하신 분께 발송되었습니다.<br/>
                        * 문의사항이 있으시면 excircle123@gmail.com으로 연락주세요.
                    </p>
                </div>
            `,
        });

        // 3. Notify the admin about the new request
        try {
            await resend.emails.send({
                from: 'Download Alert <onboarding@resend.dev>',
                to: ['excircle123@gmail.com'],
                subject: `[DOWNLOAD] Insight Book 신청 접수: ${name}님`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #0F172A;">새로운 Insight Book 신청이 들어왔습니다.</h2>
                        <ul style="list-style: none; padding: 0; line-height: 1.8;">
                            <li><strong>이름:</strong> ${name}</li>
                            <li><strong>소속:</strong> ${organization}</li>
                            <li><strong>이메일:</strong> ${email}</li>
                            <li><strong>연락처:</strong> ${phone || '미입력'}</li>
                            <li><strong>요청 시간:</strong> ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</li>
                        </ul>
                    </div>
                `,
            });
        } catch (adminError) {
            console.error('Failed to send admin notification:', adminError);
            // Continue even if admin notification fails
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error in download API:', error);
        return NextResponse.json({ error: 'Failed to process download request' }, { status: 500 });
    }
}
