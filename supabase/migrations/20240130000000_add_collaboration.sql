-- Create property_presence table for real-time collaboration
CREATE TABLE property_presence (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  property_id UUID REFERENCES saved_calculations NOT NULL,
  last_active TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  current_field TEXT,
  user_details JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, property_id)
);

-- Create property_edit_history table for tracking changes
CREATE TABLE property_edit_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES saved_calculations NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  field TEXT NOT NULL,
  old_value JSONB,
  new_value JSONB,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_details JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX idx_property_presence_property ON property_presence(property_id);
CREATE INDEX idx_property_presence_user ON property_presence(user_id);
CREATE INDEX idx_property_edit_history_property ON property_edit_history(property_id);
CREATE INDEX idx_property_edit_history_user ON property_edit_history(user_id);
CREATE INDEX idx_property_edit_history_timestamp ON property_edit_history(timestamp);

-- Add RLS policies
ALTER TABLE property_presence ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_edit_history ENABLE ROW LEVEL SECURITY;

-- Presence policies
CREATE POLICY "Users can see presence for properties they have access to"
  ON property_presence
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM saved_calculations sc
      WHERE sc.id = property_presence.property_id
      AND (
        sc.user_id = auth.uid() OR
        sc.is_public = true OR
        EXISTS (
          SELECT 1 FROM property_shares ps
          WHERE ps.property_id = sc.id
          AND ps.shared_with = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Users can update their own presence"
  ON property_presence
  FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Edit history policies
CREATE POLICY "Users can see edit history for properties they have access to"
  ON property_edit_history
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM saved_calculations sc
      WHERE sc.id = property_edit_history.property_id
      AND (
        sc.user_id = auth.uid() OR
        sc.is_public = true OR
        EXISTS (
          SELECT 1 FROM property_shares ps
          WHERE ps.property_id = sc.id
          AND ps.shared_with = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Users can insert their own edit history"
  ON property_edit_history
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Function to clean up old presence records
CREATE OR REPLACE FUNCTION cleanup_old_presence()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  DELETE FROM property_presence
  WHERE last_active < NOW() - INTERVAL '15 minutes';
END;
$$;

-- Create a scheduled job to clean up old presence records
SELECT cron.schedule(
  'cleanup-old-presence',
  '*/15 * * * *', -- Every 15 minutes
  'SELECT cleanup_old_presence();'
);