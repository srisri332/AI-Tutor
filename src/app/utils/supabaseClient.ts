import { createClient } from "@supabase/supabase-js";

const supabaseUrl: any = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey: any = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// console.log(supabaseUrl);
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
