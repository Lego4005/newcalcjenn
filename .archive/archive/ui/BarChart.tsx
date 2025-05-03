import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

interface BarChartProps {
  data: Array<{ name: string; value: number }>
  categories: string[]
  index: string
  showAnimation?: boolean
  className?: string
}

export function BarChart({
  data,
  categories,
  index,
  showAnimation = true,
  className = "h-64",
}: BarChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-default-200" />
          <XAxis 
            dataKey="name" 
            className="text-default-500"
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            className="text-default-500"
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--background)', 
              borderColor: 'var(--default-200)',
              borderRadius: '8px',
            }}
            labelStyle={{ color: 'var(--foreground)' }}
          />
          <Bar 
            dataKey="value" 
            fill="var(--primary)" 
            radius={[4, 4, 0, 0]}
            animationDuration={showAnimation ? 750 : 0}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
} 