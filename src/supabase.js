import { createClient } from '@supabase/supabase-js';



const supabaseUrl = "https://rjtdkcpxkyozueikkzfr.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqdGRrY3B4a3lvenVlaWtremZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2NjEzMzksImV4cCI6MjA2NDIzNzMzOX0.Q9A4RIhPsyw0VnSm2Xsa5BxTiNwA61Q-IlUbD9wsais";



export const supabase = createClient(supabaseUrl, supabaseKey);
