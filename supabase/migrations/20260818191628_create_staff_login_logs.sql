/*
# Create staff_login_logs table

1. New Tables
- `staff_login_logs`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users, the staff member who logged in)
  - `email` (text, the email used to log in)
  - `login_time` (timestamptz, when the login occurred, defaults to now)
  - `ip_address` (text, nullable, the IP address if available)
  - `user_agent` (text, nullable, the browser user agent)
2. Security
- Enable RLS on `staff_login_logs`.
- Only authenticated users can insert their own login logs (user_id must match auth.uid()).
- Only authenticated users can read their own login logs.
- This is a multi-user app with sign-in, so policies are scoped to authenticated with ownership checks.
*/

CREATE TABLE IF NOT EXISTS staff_login_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  login_time timestamptz NOT NULL DEFAULT now(),
  ip_address text,
  user_agent text
);

ALTER TABLE staff_login_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "insert_own_login_log" ON staff_login_logs;
CREATE POLICY "insert_own_login_log" ON staff_login_logs
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "select_own_login_logs" ON staff_login_logs;
CREATE POLICY "select_own_login_logs" ON staff_login_logs
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_staff_login_logs_user_id ON staff_login_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_staff_login_logs_login_time ON staff_login_logs(login_time DESC);
