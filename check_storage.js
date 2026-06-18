const fs = require('fs');

const env = fs.readFileSync('.env.local', 'utf8');
const lines = env.split('\n');
const envVars = {};
for (const line of lines) {
    if (line.trim() && !line.startsWith('#')) {
        const [key, ...rest] = line.split('=');
        envVars[key.trim()] = rest.join('=').trim();
    }
}

const SUPABASE_URL = envVars['NEXT_PUBLIC_SUPABASE_URL'];
const SUPABASE_SERVICE_ROLE_KEY = envVars['SUPABASE_SERVICE_ROLE_KEY'];

async function checkStorage() {
    try {
        console.log('Checking Supabase Storage buckets...');
        const res = await fetch(`${SUPABASE_URL}/storage/v1/bucket`, {
            headers: {
                'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
                'apikey': SUPABASE_SERVICE_ROLE_KEY
            }
        });
        const data = await res.json();
        console.log('Buckets:', data);
        
        const imagesBucket = data.find(b => b.id === 'images');
        if (!imagesBucket) {
            console.log('Images bucket NOT found. Trying to create it...');
            const createRes = await fetch(`${SUPABASE_URL}/storage/v1/bucket`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
                    'apikey': SUPABASE_SERVICE_ROLE_KEY,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: 'images',
                    name: 'images',
                    public: true
                })
            });
            const createData = await createRes.json();
            console.log('Create result:', createData);
        } else {
            console.log('Images bucket exists and is public:', imagesBucket.public);
        }

    } catch (e) {
        console.error('Error checking storage:', e);
    }
}

checkStorage();
