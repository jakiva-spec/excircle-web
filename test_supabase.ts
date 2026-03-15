import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testInsert() {
    console.log('Testing downloads table insert...');
    const payload = {
        email: 'test@example.com',
        name: 'Test Name',
        source: 'website',
        asset: 'insight_book',
        status: 'delivered'
    };
    const { data, error } = await supabase.from('downloads').insert([payload]).select();

    if (error) {
        console.error('Error inserting into downloads:', error);
    } else {
        console.log('Successfully inserted into downloads:', data);
    }

    console.log('\\nTesting leads table insert...');
    const leadPayload = {
        name: 'Test Name',
        email: 'test@example.com',
        org: 'Test Org',
        type: 'test type',
        message: 'test message',
        source: 'website_contact',
        consent: true
    };
    const { data: leadData, error: leadError } = await supabase.from('leads').insert([leadPayload]).select();

    if (leadError) {
        console.error('Error inserting into leads:', leadError);
    } else {
        console.log('Successfully inserted into leads:', leadData);
    }
}

testInsert();
