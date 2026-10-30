/*
# Add UPDATE and DELETE policies to staff_login_logs

1. Security Changes
- Add UPDATE policy: users can only update their own login logs
- Add DELETE policy: users can only delete their own login logs
- Completes the 4-policy CRUD coverage required for RLS
*/

DROP POLICY IF EXISTS "update_own_login_logs" ON staff_login_logs;
CREATE POLICY "update_own_login_logs" ON staff_login_logs
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_login_logs" ON staff_login_logs;
CREATE POLICY "delete_own_login_logs" ON staff_login_logs
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);
