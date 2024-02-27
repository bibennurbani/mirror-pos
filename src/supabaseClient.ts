// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_ANON_KEY, SUPABASE_API_URL } from './config/env';

const supabaseUrl = SUPABASE_API_URL;
const supabaseAnonKey = SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;