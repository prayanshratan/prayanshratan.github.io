-- Allow authenticated users to insert, update, and delete in all tables

BEGIN;
  -- Profile table
  DROP POLICY IF EXISTS "Auth Manage Profile" ON profile;
  CREATE POLICY "Auth Manage Profile" ON profile FOR ALL TO authenticated USING (true) WITH CHECK (true);

  -- Experience table
  DROP POLICY IF EXISTS "Auth Manage Experience" ON experience;
  CREATE POLICY "Auth Manage Experience" ON experience FOR ALL TO authenticated USING (true) WITH CHECK (true);

  -- Projects table
  DROP POLICY IF EXISTS "Auth Manage Projects" ON projects;
  CREATE POLICY "Auth Manage Projects" ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

  -- Skills table
  DROP POLICY IF EXISTS "Auth Manage Skills" ON skills;
  CREATE POLICY "Auth Manage Skills" ON skills FOR ALL TO authenticated USING (true) WITH CHECK (true);
COMMIT;
