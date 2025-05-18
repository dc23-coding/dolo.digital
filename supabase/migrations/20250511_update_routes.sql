ALTER TABLE routes
  ADD COLUMN IF NOT EXISTS pickup_time TEXT,
  ADD COLUMN IF NOT EXISTS dropoff_time TEXT;

DROP POLICY IF EXISTS "Allow public read" ON routes;
DROP POLICY IF EXISTS "Allow authenticated insert" ON routes;

CREATE POLICY "Allow public read" ON routes FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON routes FOR INSERT WITH CHECK (auth.uid() = user_id);