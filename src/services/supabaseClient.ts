
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lprkyayweqhhrefjxkpj.supabase.co';
const supabaseKey = 'sb_publishable_BMAprXpvA68OCVJBjjUaPQ_K_7tB-5p';

export const supabase = createClient(supabaseUrl, supabaseKey);
