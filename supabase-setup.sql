-- Purpose & Profit Builders - Supabase Table Setup
-- Run this SQL in your Supabase SQL Editor

-- ============================================
-- Sprint Assessment Submissions Table
-- ============================================
CREATE TABLE IF NOT EXISTS ppb_sprint_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  profile TEXT NOT NULL,
  profile_name TEXT NOT NULL,
  monthly_income TEXT,
  has_offer BOOLEAN DEFAULT false,
  offer_type TEXT,
  uses_ai BOOLEAN DEFAULT false,
  has_systems BOOLEAN DEFAULT false,
  faith_alignment TEXT,
  biggest_challenge TEXT,
  answers JSONB NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ppb_sprint_email ON ppb_sprint_submissions(email);
CREATE INDEX IF NOT EXISTS idx_ppb_sprint_created_at ON ppb_sprint_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ppb_sprint_profile ON ppb_sprint_submissions(profile);

ALTER TABLE ppb_sprint_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (assessment-takers submitting results)
CREATE POLICY "Anyone can submit sprint" ON ppb_sprint_submissions
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to read (admin panel uses anon key)
CREATE POLICY "Anyone can read sprint submissions" ON ppb_sprint_submissions
  FOR SELECT
  USING (true);

-- Service role has full access
CREATE POLICY "Service role full access" ON ppb_sprint_submissions
  FOR ALL
  USING (auth.role() = 'service_role');
