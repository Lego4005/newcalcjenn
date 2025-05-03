import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'

interface DonutChartProps {
  data: Array<{ name: string; value: number }>
  category: string
  index: string
  showAnimation?: boolean
  className?: string
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export function DonutChart({
  data,
  category,
  index,
  showAnimation = true,
  className = "h-64",
}: DonutChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
            animationDuration={showAnimation ? 750 : 0}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
              />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--background)', 
              borderColor: 'var(--default-200)',
              borderRadius: '8px',
            }}
            labelStyle={{ color: 'var(--foreground)' }}
          />
          <Legend 
            verticalAlign="middle" 
            align="right"
            layout="vertical"
            wrapperStyle={{
              paddingLeft: '20px',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
} 