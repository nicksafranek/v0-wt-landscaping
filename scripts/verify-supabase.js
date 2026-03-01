const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const process = require('process');

// Load environment variables manually
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
    const match = line.match(/^([A-Z_]+)=(.*)$/);
    if (match) {
        envVars[match[1]] = match[2];
    }
});

const url = envVars['NEXT_PUBLIC_SUPABASE_URL'];
const key = envVars['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

if (!url || !key) {
    console.error('Error: configure .env.local with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
    process.exit(1);
}

const supabase = createClient(url, key);

async function check() {
    console.log('Checking connection to Supabase...');
    // Try to select from 'leads' table
    // We select count just to see if table exists and is accessible
    const { count, error } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true });

    if (error) {
        console.error('Error connecting to leads table:', error);
        // Common errors:
        // 42P01: relation "leads" does not exist
        // 42501: new row violates row-level security policy for table "leads" (if trying to insert) or permission denied
    } else {
        console.log('Connection successful. Table "leads" exists and is accessible (read access).');
    }

    // Try an INSERT just to see if RLS blocks it (we won't commit if possible, or just delete immediately, but for now just check error)
    // Actually, let's try to insert a dummy row that would fail validation IF validation was enforced by DB, or succeed.
    // However, if we succeed, we pollute the DB.
    // Let's just rely on the user's error report which was on insert.
    // If table exists, then likely RLS policy is missing for INSERT.
}

check();
