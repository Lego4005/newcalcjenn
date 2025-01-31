import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'

interface DonutChartProps {
  readonly data: ReadonlyArray<{ readonly name: string; readonly value: number }>;
  readonly showAnimation?: boolean;
  readonly className?: string;
  readonly colors?: ReadonlyArray<string>;
}

const DEFAULT_COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--success))',
  'hsl(var(--warning))',
  'hsl(var(--destructive))',
  'hsl(var(--secondary))'
] as const;

export function DonutChart({
  data,
  showAnimation = true,
  className = "h-64",
  colors = DEFAULT_COLORS
}: DonutChartProps) {
  // Create a mutable copy of the readonly data for recharts
  const mutableData = data.map(item => ({ ...item }));

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart 
          aria-hidden="false"
          aria-label="Donut chart visualization showing data distribution"
        >
          <Pie
            data={mutableData}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
            animationDuration={showAnimation ? 750 : 0}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${entry.name}`} 
                fill={colors[index % colors.length]} 
              />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--background))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-md)',
              padding: '0.75rem',
              fontSize: '0.875rem'
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
            formatter={(value, name) => [`${value.toLocaleString()}`, name]}
          />
          <Legend 
            verticalAlign="middle" 
            align="right"
            layout="vertical"
            wrapperStyle={{
              paddingLeft: '1.5rem',
              color: 'hsl(var(--foreground))',
              fontSize: '0.875rem'
            }}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}