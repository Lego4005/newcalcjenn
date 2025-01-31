import React from 'react';
import { render, screen } from '@testing-library/react';
import { SparklineChart } from '@/components/charts/SparklineChart';

// Mock recharts components
jest.mock('recharts', () => {
  const mockComponents = {
    ResponsiveContainer: ({ children, height }: { children: React.ReactNode; height: number }) => (
      <div data-testid="responsive-container" style={{ height: `${height}px` }}>{children}</div>
    ),
    LineChart: ({ children, data, 'aria-label': ariaLabel, 'aria-description': ariaDescription }: { 
      children: React.ReactNode; 
      data: Array<{ value: number }>;
      'aria-label': string;
      'aria-description': string;
    }) => (
      <div 
        data-testid="line-chart"
        aria-label={ariaLabel}
        aria-description={ariaDescription}
      >
        <div data-testid="chart-data" data-values={JSON.stringify(data)}>
          {children}
        </div>
      </div>
    ),
    Line: ({ 
      stroke,
      isAnimationActive,
      animationDuration,
      fill,
      connectNulls,
      activeDot
    }: { 
      stroke: string;
      isAnimationActive: boolean;
      animationDuration: number;
      fill: string;
      connectNulls: boolean;
      activeDot: React.ReactNode;
    }) => (
      <div 
        data-testid="line" 
        style={{ stroke }}
        data-animation-active={isAnimationActive}
        data-animation-duration={animationDuration}
        data-fill={fill}
        data-connect-nulls={connectNulls}
      >
        <div data-testid="active-dot">{activeDot}</div>
      </div>
    ),
    YAxis: ({ hide, domain }: { hide: boolean; domain: string[] }) => (
      <div data-testid="y-axis" data-hidden={hide} data-domain={JSON.stringify(domain)} />
    ),
    Tooltip: ({ contentStyle, formatter }: { 
      contentStyle: Record<string, string>;
      formatter: (value: number) => [string, string];
    }) => {
      const formattedValue = formatter(1000);
      return (
        <div 
          data-testid="tooltip" 
          style={contentStyle}
          data-formatted-value={JSON.stringify(formattedValue)}
        />
      );
    },
    Dot: ({ r, stroke, strokeWidth, fill }: { r: number; stroke: string; strokeWidth: number; fill: string }) => (
      <div 
        data-testid="dot"
        style={{ 
          width: r * 2,
          height: r * 2,
          borderColor: stroke,
          borderWidth: strokeWidth,
          backgroundColor: fill
        }}
      />
    ),
  };
  return mockComponents;
});

const mockData = [
  { value: 100 },
  { value: 200 },
  { value: 150 },
  { value: 300 },
  { value: 250 }
];

describe('SparklineChart', () => {
  it('renders with default props', () => {
    render(<SparklineChart data={mockData} />);
    
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
    expect(screen.getByTestId('line')).toBeInTheDocument();
    expect(screen.getByTestId('y-axis')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip')).toBeInTheDocument();
  });

  it('renders with custom color', () => {
    const customColor = '#ff0000';
    render(<SparklineChart data={mockData} color={customColor} />);
    
    const line = screen.getByTestId('line');
    expect(line).toHaveStyle({ stroke: customColor });
  });

  it('renders without animation when showAnimation is false', () => {
    render(<SparklineChart data={mockData} showAnimation={false} />);
    
    const line = screen.getByTestId('line');
    expect(line).toHaveAttribute('data-animation-active', 'false');
    expect(line).toHaveAttribute('data-animation-duration', '0');
  });

  it('renders with custom height', () => {
    const customHeight = 64;
    render(<SparklineChart data={mockData} height={customHeight} />);
    
    const container = screen.getByTestId('responsive-container');
    expect(container).toHaveStyle({ height: `${customHeight}px` });
  });

  it('renders without tooltip when showTooltip is false', () => {
    render(<SparklineChart data={mockData} showTooltip={false} />);
    
    expect(screen.queryByTestId('tooltip')).not.toBeInTheDocument();
  });

  it('generates unique gradient ID', () => {
    render(<SparklineChart data={mockData} />);
    
    const line = screen.getByTestId('line');
    const fillValue = line.getAttribute('data-fill');
    expect(fillValue).toMatch(/^url\(#sparkline-gradient-[a-z0-9]+\)$/);
  });

  it('renders correct data points', () => {
    render(<SparklineChart data={mockData} />);
    
    const chartData = screen.getByTestId('chart-data');
    const values = JSON.parse(chartData.getAttribute('data-values') || '[]');
    expect(values).toEqual(mockData);
  });

  it('renders with custom className', () => {
    render(<SparklineChart data={mockData} className="custom-height" />);
    expect(screen.getByTestId('responsive-container').parentElement).toHaveClass('custom-height');
  });

  it('handles empty data array', () => {
    render(<SparklineChart data={[]} />);
    
    const chartData = screen.getByTestId('chart-data');
    const values = JSON.parse(chartData.getAttribute('data-values') || '[]');
    expect(values).toEqual([]);
  });

  // New test cases
  it('has correct accessibility attributes', () => {
    render(<SparklineChart data={mockData} />);
    
    const chart = screen.getByTestId('line-chart');
    expect(chart).toHaveAttribute('aria-label', 'Sparkline trend visualization');
    expect(chart).toHaveAttribute('aria-description', 'A line chart showing trend over time');
  });

  it('formats tooltip values correctly', () => {
    render(<SparklineChart data={mockData} />);
    
    const tooltip = screen.getByTestId('tooltip');
    const formattedValue = JSON.parse(tooltip.getAttribute('data-formatted-value') || '[]');
    expect(formattedValue).toEqual(['1,000', 'Value']);
  });

  it('configures YAxis domain correctly', () => {
    render(<SparklineChart data={mockData} />);
    
    const yAxis = screen.getByTestId('y-axis');
    const domain = JSON.parse(yAxis.getAttribute('data-domain') || '[]');
    expect(domain).toEqual(['dataMin - 1', 'dataMax + 1']);
  });

  it('handles gaps in data with connectNulls', () => {
    const dataWithGaps = [
      { value: 100 },
      { value: 200 },
      { value: 300 }
    ].filter((_, index) => index !== 1) as Array<{ value: number }>;
    
    render(<SparklineChart data={dataWithGaps} />);
    
    const line = screen.getByTestId('line');
    expect(line).toHaveAttribute('data-connect-nulls', 'true');
  });

  it('renders active dot with correct styling', () => {
    const customColor = '#ff0000';
    render(<SparklineChart data={mockData} color={customColor} />);
    
    const dot = screen.getByTestId('dot');
    expect(dot).toHaveStyle({
      borderColor: customColor,
      borderWidth: 2,
      backgroundColor: 'hsl(var(--background))'
    });
  });
});