import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from '@/lib/schemas';
import { supabase } from '@/lib/supabase';

const resend = new Resend('re_YKYb6y2S_PU2MdCXp997wgVD6BqSG6diY');

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validatedData = contactSchema.parse(body);

        const { name, email, org, type, message } = validatedData;

        // 1. Save data to Supabase 'leads' table (based on provided schema)
        const { error: dbError } = await supabase
            .from('leads')
            .insert([
                {
                    name,
                    email,
                    org: org || null,
                    type,
                    message,
                    source: 'website_contact',
                    consent: true // assuming user gave consent by submitting the form
                }
            ]);

        if (dbError) {
            console.error('Failed to insert contact data into Supabase:', dbError);
            // Optionally continue to send the email so the inquiry isn't completely lost
        }

        // 2. Send the notification email to the admin
        const data = await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>',
            to: ['excircle123@gmail.com'], // Replace with actual recipient
            replyTo: email,
            subject: `[${type.toUpperCase()}] New inquiry from ${name}`,
            text: `
Name: ${name}
Email: ${email}
Organization: ${org || 'N/A'}
Type: ${type}
Message:
${message}
            `,
        });

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error in contact API:', error);
        return NextResponse.json({ error: 'Failed to process contact request' }, { status: 500 });
    }
}
