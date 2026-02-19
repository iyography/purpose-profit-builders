-- The Credit Hub - Supabase Table Setup
-- Run this SQL in your Supabase SQL Editor

-- ============================================
-- Credit GPS Quiz Submissions Table
-- ============================================
CREATE TABLE IF NOT EXISTS credit_hub_quiz_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  profile TEXT NOT NULL,
  profile_name TEXT NOT NULL,
  fico_range TEXT,
  has_negatives BOOLEAN DEFAULT false,
  negative_items TEXT[],
  utilization TEXT,
  has_two_cards BOOLEAN DEFAULT false,
  in_business BOOLEAN DEFAULT false,
  monthly_revenue TEXT,
  occupation TEXT,
  biggest_challenge TEXT,
  answers JSONB NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ch_quiz_email ON credit_hub_quiz_submissions(email);
CREATE INDEX IF NOT EXISTS idx_ch_quiz_created_at ON credit_hub_quiz_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ch_quiz_profile ON credit_hub_quiz_submissions(profile);

ALTER TABLE credit_hub_quiz_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (quiz-takers submitting results)
CREATE POLICY "Anyone can submit quiz" ON credit_hub_quiz_submissions
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to read (admin panel uses anon key)
CREATE POLICY "Anyone can read quiz submissions" ON credit_hub_quiz_submissions
  FOR SELECT
  USING (true);

-- Service role has full access
CREATE POLICY "Service role full access" ON credit_hub_quiz_submissions
  FOR ALL
  USING (auth.role() = 'service_role');
