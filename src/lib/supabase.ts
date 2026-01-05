
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Note: We initialize with empty strings to prevent build-time errors.
// Runtime checks in API routes will ensure these function correctly.
export const supabase = createClient(supabaseUrl, supabaseKey);
