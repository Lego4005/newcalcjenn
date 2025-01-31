import {
  LineChart,
  Line,
  ResponsiveContainer,
  YAxis,
  Tooltip,
  Dot
} from 'recharts'

interface SparklineChartProps {
  readonly data: Array<{ readonly value: number }>
  readonly color?: string
  readonly showAnimation?: boolean
  readonly className?: string
  readonly height?: number
  readonly showTooltip?: boolean
}

export function SparklineChart({
  data,
  color = 'hsl(var(--primary))',
  showAnimation = true,
  className = "h-8",
  height = 32,
  showTooltip = true
}: SparklineChartProps) {
  const gradientId = `sparkline-gradient-${Math.random().toString(36).substring(7)}`;

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart 
          data={data}
          aria-label="Sparkline trend visualization"
          aria-description="A line chart showing trend over time"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.2}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          {showTooltip && (
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow-md)',
                padding: '0.5rem',
                fontSize: '0.75rem'
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              formatter={(value) => [value.toLocaleString(), 'Value']}
            />
          )}
          <YAxis 
            hide 
            domain={['dataMin - 1', 'dataMax + 1']} 
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={
              <Dot 
                r={4} 
                stroke={color} 
                strokeWidth={2} 
                fill="hsl(var(--background))" 
              />
            }
            fill={`url(#${gradientId})`}
            fillOpacity={1}
            isAnimationActive={showAnimation}
            connectNulls
            animationDuration={showAnimation ? 750 : 0}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}