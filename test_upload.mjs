import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false }
});

async function testUpload() {
    console.log('Testing createBucket...');
    const bucketName = 'images';
    const { data: bucketData, error: bucketError } = await supabaseAdmin.storage.createBucket(bucketName, { public: true });
    
    if (bucketError) {
        console.log('Bucket might already exist or error:', bucketError);
    } else {
        console.log('Bucket created:', bucketData);
    }

    console.log('Testing upload...');
    const buffer = Buffer.from('hello world');
    const fileName = `test-${Date.now()}.txt`;
    const { data, error } = await supabaseAdmin.storage.from(bucketName).upload(fileName, buffer, {
        contentType: 'text/plain',
        upsert: false
    });

    if (error) {
        console.error('Upload error:', error);
    } else {
        console.log('Upload success:', data);
    }
}

testUpload();
