import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://tbxcktidhqnjyhojhezr.supabase.co";
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRieGNrdGlkaHFuanlob2poZXpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxMDY5MTQsImV4cCI6MjA1NzY4MjkxNH0.lJChf_Y9A3DcFXtVGISfSRKt09HsmOiW0iPuTNTERjs';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
