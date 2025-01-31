-- Create function to store multiple property metrics in a single transaction
CREATE OR REPLACE FUNCTION batch_store_property_metrics(
  p_metrics jsonb
)
RETURNS uuid[] 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_metric jsonb;
  v_result uuid[];
  v_metric_id uuid;
BEGIN
  -- Start a transaction for the batch operation
  FOR v_metric IN SELECT jsonb_array_elements(p_metrics)
  LOOP
    -- Insert each metric and collect the IDs
    INSERT INTO property_metrics (
      property_id,
      metrics,
      timestamp
    ) VALUES (
      (v_metric->>'property_id')::uuid,
      v_metric->'metrics',
      COALESCE((v_metric->>'timestamp')::timestamptz, NOW())
    )
    RETURNING id INTO v_metric_id;
    
    -- Add the ID to our result array
    v_result := array_append(v_result, v_metric_id);
  END LOOP;

  RETURN v_result;
END;
$$;

-- Create function to batch save calculations
CREATE OR REPLACE FUNCTION batch_save_calculations(
  p_calculations jsonb
)
RETURNS uuid[] 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_calc jsonb;
  v_result uuid[];
  v_calc_id uuid;
BEGIN
  -- Start a transaction for the batch operation
  FOR v_calc IN SELECT jsonb_array_elements(p_calculations)
  LOOP
    -- Insert each calculation and collect the IDs
    INSERT INTO saved_calculations (
      user_id,
      name,
      property_details,
      mortgage_info,
      commission_structure,
      additional_fees,
      created_at,
      updated_at
    ) VALUES (
      auth.uid(),
      v_calc->>'name',
      v_calc->'property_details',
      v_calc->'mortgage_info',
      v_calc->'commission_structure',
      v_calc->'additional_fees',
      NOW(),
      NOW()
    )
    RETURNING id INTO v_calc_id;
    
    -- Add the ID to our result array
    v_result := array_append(v_result, v_calc_id);
  END LOOP;

  RETURN v_result;
END;
$$;

-- Add indexes for batch operations
CREATE INDEX IF NOT EXISTS idx_property_metrics_timestamp 
ON property_metrics (timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_saved_calculations_user_created 
ON saved_calculations (user_id, created_at DESC);