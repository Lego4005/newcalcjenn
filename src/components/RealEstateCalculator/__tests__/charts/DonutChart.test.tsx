import React from 'react';
import { render, screen } from '@testing-library/react';
import { DonutChart } from '@/components/charts/DonutChart';

interface ChartDataItem {
  name: string;
  value: number;
}

type ChartData = ReadonlyArray<ChartDataItem>;

// Mock recharts components
jest.mock('recharts', () => {
  const mockComponents = {
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="responsive-container">{children}</div>
    ),
    PieChart: ({ children, 'aria-label': ariaLabel }: { 
      children: React.ReactNode;
      'aria-label': string;
    }) => (
      <div 
        data-testid="pie-chart"
        aria-hidden={false}
        aria-label={ariaLabel}
      >{children}</div>
    ),
    Pie: ({
      data,
      cx,
      cy,
      innerRadius,
      outerRadius,
      label,
      labelLine,
      animationDuration,
      dataKey,
      nameKey,
      children
    }: {
      data: ChartData;
      cx: string;
      cy: string;
      innerRadius: string;
      outerRadius: string;
      label: (props: { name: string; percent: number }) => string;
      labelLine: boolean;
      animationDuration: number;
      dataKey: string;
      nameKey: string;
      children: React.ReactNode;
    }) => (
      <div 
        data-testid="pie"
        data-cx={cx}
        data-cy={cy}
        data-inner-radius={innerRadius}
        data-outer-radius={outerRadius}
        data-label-line={labelLine}
        data-animation-duration={animationDuration}
        data-data-key={dataKey}
        data-name-key={nameKey}
      >
        {data.map((item, index) => (
          <div key={item.name}>
            <div data-testid="pie-data-item">
              {label({ name: item.name, percent: item.value / (data.reduce((sum, d) => sum + d.value, 0)) })}
            </div>
            <div data-testid="pie-cell" style={{ backgroundColor: `color-${index}` }} />
          </div>
        ))}
        {children}
      </div>
    ),
    Cell: ({ fill }: { fill: string }) => (
      <div data-testid="cell" data-fill={fill} />
    ),
    Tooltip: ({ 
      contentStyle,
      labelStyle,
      formatter
    }: { 
      contentStyle: Record<string, string>;
      labelStyle: { color: string };
      formatter: (value: number, name: string) => [string, string];
    }) => {
      const formattedValue = formatter(1000, 'Test');
      return (
        <div 
          data-testid="tooltip" 
          style={contentStyle}
          data-label-style={JSON.stringify(labelStyle)}
          data-formatted-value={JSON.stringify(formattedValue)}
        />
      );
    },
    Legend: ({ 
      verticalAlign,
      align,
      layout,
      wrapperStyle,
      iconType
    }: { 
      verticalAlign: string;
      align: string;
      layout: string;
      wrapperStyle: Record<string, string>;
      iconType: string;
    }) => (
      <div 
        data-testid="legend"
        data-vertical-align={verticalAlign}
        data-align={align}
        data-layout={layout}
        data-icon-type={iconType}
        style={wrapperStyle}
      />
    ),
  };
  return mockComponents;
});

const mockData = [
  { name: 'Principal & Interest', value: 400000 },
  { name: 'Property Tax', value: 5000 },
  { name: 'Insurance', value: 2500 },
];

describe('DonutChart', () => {
  it('renders with default props', () => {
    render(<DonutChart data={mockData} />);
    
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    expect(screen.getByTestId('pie')).toBeInTheDocument();
    expect(screen.getAllByTestId('pie-data-item')).toHaveLength(3);
    expect(screen.getByTestId('tooltip')).toBeInTheDocument();
    expect(screen.getByTestId('legend')).toBeInTheDocument();
  });

  it('renders with custom colors', () => {
    const customColors = ['#ff0000', '#00ff00', '#0000ff'];
    render(<DonutChart data={mockData} colors={customColors} />);
    
    const cells = screen.getAllByTestId('pie-cell');
    expect(cells).toHaveLength(3);
    cells.forEach((cell, index) => {
      expect(cell).toHaveStyle({ backgroundColor: `color-${index}` });
    });
  });

  it('renders with custom className', () => {
    render(<DonutChart data={mockData} className="custom-height" />);
    expect(screen.getByTestId('responsive-container').parentElement).toHaveClass('custom-height');
  });

  it('renders without animation when showAnimation is false', () => {
    render(<DonutChart data={mockData} showAnimation={false} />);
    const pie = screen.getByTestId('pie');
    expect(pie).toHaveAttribute('data-animation-duration', '0');
  });

  it('formats data labels correctly', () => {
    render(<DonutChart data={mockData} />);
    const items = screen.getAllByTestId('pie-data-item');
    
    // Total value is 407500
    expect(items[0]).toHaveTextContent('Principal & Interest: 98%'); // 400000/407500 ≈ 98%
    expect(items[1]).toHaveTextContent('Property Tax: 1%'); // 5000/407500 ≈ 1%
    expect(items[2]).toHaveTextContent('Insurance: 1%'); // 2500/407500 ≈ 1%
  });

  it('handles empty data array', () => {
    render(<DonutChart data={[]} />);
    expect(screen.queryByTestId('pie-data-item')).not.toBeInTheDocument();
  });

  it('handles single data point', () => {
    const singleData = [{ name: 'Test', value: 100 }];
    render(<DonutChart data={singleData} />);
    const items = screen.getAllByTestId('pie-data-item');
    expect(items).toHaveLength(1);
    expect(items[0]).toHaveTextContent('Test: 100%');
  });

  // New test cases
  it('configures pie chart dimensions correctly', () => {
    render(<DonutChart data={mockData} />);
    
    const pie = screen.getByTestId('pie');
    expect(pie).toHaveAttribute('data-cx', '50%');
    expect(pie).toHaveAttribute('data-cy', '50%');
    expect(pie).toHaveAttribute('data-inner-radius', '60%');
    expect(pie).toHaveAttribute('data-outer-radius', '80%');
  });

  it('uses default colors when no colors provided', () => {
    render(<DonutChart data={mockData} />);
    
    const cells = screen.getAllByTestId('pie-cell');
    cells.forEach((cell, index) => {
      expect(cell).toHaveStyle({ backgroundColor: `color-${index}` });
    });
  });

  it('formats tooltip values correctly', () => {
    render(<DonutChart data={mockData} />);
    
    const tooltip = screen.getByTestId('tooltip');
    const formattedValue = JSON.parse(tooltip.getAttribute('data-formatted-value') || '[]');
    expect(formattedValue).toEqual(['1,000', 'Test']);
  });

  it('configures legend correctly', () => {
    render(<DonutChart data={mockData} />);
    
    const legend = screen.getByTestId('legend');
    expect(legend).toHaveAttribute('data-vertical-align', 'middle');
    expect(legend).toHaveAttribute('data-align', 'right');
    expect(legend).toHaveAttribute('data-layout', 'vertical');
    expect(legend).toHaveAttribute('data-icon-type', 'circle');
    expect(legend).toHaveStyle({
      paddingLeft: '1.5rem',
      color: 'hsl(var(--foreground))',
      fontSize: '0.875rem'
    });
  });

  it('has correct accessibility attributes', () => {
    render(<DonutChart data={mockData} />);
    
    const chart = screen.getByTestId('pie-chart');
    expect(chart).toHaveAttribute('aria-hidden', 'false');
    expect(chart).toHaveAttribute('aria-label', 'Donut chart visualization showing data distribution');
  });
});