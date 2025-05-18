CREATE TABLE routes (
  id UUID PRIMARY KEY,
  user_id TEXT NOT NULL,
  pickup TEXT NOT NULL,
  destination TEXT NOT NULL,
  distance NUMERIC NOT NULL,
  eta TEXT NOT NULL,
  fuel_cost NUMERIC NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE POLICY "Allow public read" ON routes FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON routes FOR INSERT WITH CHECK (auth.uid() = user_id);