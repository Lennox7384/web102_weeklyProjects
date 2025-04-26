import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bkkxqdawuucoxxgmligz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJra3hxZGF3dXVjb3h4Z21saWd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NDM4ODgsImV4cCI6MjA2MTIxOTg4OH0.MhKNj2kzp__A7F7n9NbjQm3G94kxRWaAbQdXfzRLzys';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);