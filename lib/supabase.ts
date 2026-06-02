import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kesuyxfvfkcpyrgfoofm.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtlc3V5eGZ2ZmtjcHlyZ2Zvb2ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzOTU3MDIsImV4cCI6MjA5NTk3MTcwMn0.rnxdi_MIc1eHhDTo0Vn2coryIKd9Ui9hf8xDH6W_nq0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Moment = {
  id: number
  content: string
  image_url?: string
  created_at: string
}
