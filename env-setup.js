const { execSync } = require('child_process');

// Set environment variables without interactive prompts
const url = 'https://psjqjhzxzxezjzuoyysj.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzanFqaHp4enhlemp6dW95eXNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0ODM5NzUsImV4cCI6MjA1MDA1OTk3NX0.bpL2z0UZ5Gsy-1C8RuMwk2T-dGi4pz6XZ8n9Ru8O7AE';

try {
  execSync(`echo "n" | npx vercel env add NEXT_PUBLIC_SUPABASE_URL production`, {
    stdio: 'inherit',
    input: `n\n${url}\n`
  });
  
  execSync(`echo "n" | npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production`, {
    stdio: 'inherit',
    input: `n\n${key}\n`
  });
  
  console.log('Environment variables added successfully');
} catch (error) {
  console.error('Error setting environment variables:', error);
}