import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://hguvnxdylyibtfychhve.supabase.co"
const supabaseAnonKey = "sb_publishable_XnerrJ3zLJkrDnIKrP_dSA__P9tWOrz"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)