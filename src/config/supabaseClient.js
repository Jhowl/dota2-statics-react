import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://eyxzlzlhbnxudbyxzgyp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5eHpsemxoYm54dWRieXh6Z3lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUwNzM3NDksImV4cCI6MjAyMDY0OTc0OX0.bZAZbEgntibpwaYWoR0nYi00z0l2FIQ4ZdZ065FjPP4')

export default supabase
