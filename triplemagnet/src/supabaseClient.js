import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iligotutukithvmbhzyb.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsaWdvdHV0dWtpdGh2bWJoenliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxMTU4NjksImV4cCI6MjA2MDY5MTg2OX0.2wNQB9zVKsb3RujWx3QcTX8YG3gQFwRDWS79PWVu91M';
export const supabase = createClient(supabaseUrl, supabaseKey);