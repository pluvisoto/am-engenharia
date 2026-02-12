
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function fixRole() {
    const email = 'paulo@recupera.ia';
    console.log(`Checking role for ${email}...`);

    const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('email', email)
        .single();

    if (error) {
        console.error('Error fetching profile:', error);
        return;
    }

    console.log('Current profile:', profile);

    if (profile.role !== 'admin') {
        console.log('Updating role to admin...');
        const { error: updateError } = await supabase
            .from('user_profiles')
            .update({ role: 'admin' })
            .eq('email', email);

        if (updateError) {
            console.error('Error updating role:', updateError);
        } else {
            console.log('Role updated successfully to admin!');
        }
    } else {
        console.log('User is already an admin.');
    }
}

fixRole();
