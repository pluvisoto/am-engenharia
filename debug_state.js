const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://cbjtbqlmlnynzpwmqloi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNianRicWxtbG55bnpwd21xbG9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3NDc3MzMsImV4cCI6MjA4NjMyMzczM30.8e7eQPmxnUv3UazDmHCr3by-ABi4x9PN5eWweDIxPbY'; // Anon key from .env

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    console.log('--- Debugging DB State ---');

    // 1. Check for Paulo's company (Santa Izabel: 49416407000193)
    const targetCNPJ = '49416407000193';
    const { data: company, error } = await supabase
        .from('companies')
        .select('*')
        .eq('cnpj', targetCNPJ)
        .single();

    if (error) {
        console.error('Error fetching company:', error);
    } else {
        console.log('Company Found:', company.name);
        console.log('CNPJ:', company.cnpj);
        console.log('Workflow Status:', company.workflow_status);
        console.log('Linked User ID:', company.user_id);
        console.log('Linked Email:', company.email);
    }
}

check();
