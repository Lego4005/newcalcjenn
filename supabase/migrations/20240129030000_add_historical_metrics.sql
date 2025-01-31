-- Add historical metrics tracking
CREATE TABLE property_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES saved_calculations(id) ON DELETE CASCADE,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    metrics JSONB NOT NULL,
    CONSTRAINT valid_metrics CHECK (
        metrics ? 'propertyValue' AND
        metrics ? 'monthlyIncome' AND
        metrics ? 'roi' AND
        metrics ? 'capRate' AND
        metrics ? 'cashOnCash' AND
        metrics ? 'debtServiceCoverage' AND
        metrics ? 'grossRentMultiplier' AND
        metrics ? 'netOperatingIncome'
    )
);

-- Create index for efficient time-series queries
CREATE INDEX idx_property_metrics_timestamp 
ON property_metrics (property_id, timestamp DESC);

-- Function to calculate advanced metrics
CREATE OR REPLACE FUNCTION calculate_property_metrics(
    property_value NUMERIC,
    monthly_income NUMERIC,
    purchase_price NUMERIC,
    down_payment NUMERIC,
    monthly_expenses NUMERIC,
    annual_debt_service NUMERIC
) RETURNS JSONB 
LANGUAGE plpgsql
AS $$
DECLARE
    annual_income NUMERIC;
    net_operating_income NUMERIC;
    metrics JSONB;
BEGIN
    annual_income := monthly_income * 12;
    net_operating_income := annual_income - (monthly_expenses * 12);
    
    metrics := jsonb_build_object(
        'propertyValue', property_value,
        'monthlyIncome', monthly_income,
        'roi', (net_operating_income / purchase_price * 100)::NUMERIC(10,2),
        'capRate', (net_operating_income / property_value * 100)::NUMERIC(10,2),
        'cashOnCash', (net_operating_income / down_payment * 100)::NUMERIC(10,2),
        'debtServiceCoverage', (net_operating_income / NULLIF(annual_debt_service, 0))::NUMERIC(10,2),
        'grossRentMultiplier', (property_value / annual_income)::NUMERIC(10,2),
        'netOperatingIncome', net_operating_income
    );
    
    RETURN metrics;
END;
$$;

-- Function to store metrics history
CREATE OR REPLACE FUNCTION store_property_metrics(
    p_property_id UUID,
    p_property_value NUMERIC,
    p_monthly_income NUMERIC,
    p_purchase_price NUMERIC,
    p_down_payment NUMERIC,
    p_monthly_expenses NUMERIC,
    p_annual_debt_service NUMERIC
) RETURNS UUID 
LANGUAGE plpgsql
AS $$
DECLARE
    new_metrics_id UUID;
BEGIN
    INSERT INTO property_metrics (
        property_id,
        metrics
    ) VALUES (
        p_property_id,
        calculate_property_metrics(
            p_property_value,
            p_monthly_income,
            p_purchase_price,
            p_down_payment,
            p_monthly_expenses,
            p_annual_debt_service
        )
    )
    RETURNING id INTO new_metrics_id;
    
    RETURN new_metrics_id;
END;
$$;

-- Function to get property metrics history
CREATE OR REPLACE FUNCTION get_property_metrics_history(
    p_property_id UUID,
    p_start_date TIMESTAMPTZ DEFAULT NOW() - INTERVAL '1 year',
    p_end_date TIMESTAMPTZ DEFAULT NOW()
) RETURNS TABLE (
    metric_timestamp TIMESTAMPTZ,
    metric_data JSONB
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT pm.timestamp AS metric_timestamp, pm.metrics AS metric_data
    FROM property_metrics pm
    WHERE pm.property_id = p_property_id
    AND pm.timestamp BETWEEN p_start_date AND p_end_date
    ORDER BY pm.timestamp ASC;
END;
$$;