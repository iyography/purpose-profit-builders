-- Focus Founders - Supabase Table Setup
-- All tables prefixed with "focus_founders_" for shared Supabase project
-- Run this SQL in your Supabase SQL Editor: https://cmoojvpizyhuaqrhqbyg.supabase.co

-- ============================================
-- Quiz Submissions Table
-- ============================================
CREATE TABLE IF NOT EXISTS focus_founders_quiz_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  track TEXT NOT NULL,
  archetype TEXT NOT NULL,
  archetype_name TEXT NOT NULL,
  bottleneck TEXT,
  recommended_tier TEXT,
  strike_zone TEXT,
  focus TEXT[],
  ignore_list TEXT,
  sixty_day_path TEXT,
  answers JSONB NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ff_quiz_email ON focus_founders_quiz_submissions(email);
CREATE INDEX IF NOT EXISTS idx_ff_quiz_created_at ON focus_founders_quiz_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ff_quiz_archetype ON focus_founders_quiz_submissions(archetype);
CREATE INDEX IF NOT EXISTS idx_ff_quiz_track ON focus_founders_quiz_submissions(track);

ALTER TABLE focus_founders_quiz_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (quiz-takers submitting results)
CREATE POLICY "Anyone can submit quiz" ON focus_founders_quiz_submissions
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to read (admin panel uses anon key)
CREATE POLICY "Anyone can read quiz submissions" ON focus_founders_quiz_submissions
  FOR SELECT
  USING (true);

-- Service role has full access (for future admin operations like delete)
CREATE POLICY "Service role full access" ON focus_founders_quiz_submissions
  FOR ALL
  USING (auth.role() = 'service_role');
