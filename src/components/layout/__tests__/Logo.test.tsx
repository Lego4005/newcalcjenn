import React from 'react';
import { render, screen } from '@testing-library/react';
import Logo from '../Logo';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ 
    src,
    alt,
    width,
    height,
    className,
    style,
    priority 
  }: { 
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
    style?: React.CSSProperties;
    priority?: boolean;
  }) => (
    <img
      data-testid="next-image"
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      data-priority={priority}
    />
  ),
}));

describe('Logo', () => {
  const logoUrl = 'https://rocatitle.com/wp-content/uploads/2022/03/PNG-01_main_600px_wide_2.png';

  it('renders logo image with correct attributes', () => {
    render(<Logo />);
    
    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('src', logoUrl);
    expect(image).toHaveAttribute('alt', 'Roca Title Logo');
    expect(image).toHaveAttribute('data-priority', 'true');
  });

  it('applies correct dimensions when expanded', () => {
    render(<Logo isCollapsed={false} />);
    
    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('width', '160');
    expect(image).toHaveAttribute('height', '64');
  });

  it('applies correct dimensions when collapsed', () => {
    render(<Logo isCollapsed={true} />);
    
    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('width', '48');
    expect(image).toHaveAttribute('height', '48');
  });

  it('uses expanded dimensions by default', () => {
    render(<Logo />);
    
    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('width', '160');
    expect(image).toHaveAttribute('height', '64');
  });

  it('applies correct styling classes', () => {
    render(<Logo />);
    
    const container = screen.getByTestId('next-image').parentElement;
    expect(container).toHaveClass('flex items-center p-4');
    
    const image = screen.getByTestId('next-image');
    expect(image).toHaveClass('object-contain');
  });

  it('applies auto height style', () => {
    render(<Logo />);
    
    const image = screen.getByTestId('next-image');
    expect(image).toHaveStyle({ height: 'auto' });
  });

  it('maintains aspect ratio when dimensions change', () => {
    const { rerender } = render(<Logo isCollapsed={false} />);
    
    let image = screen.getByTestId('next-image');
    const expandedWidth = Number(image.getAttribute('width'));
    const expandedHeight = Number(image.getAttribute('height'));
    const expandedRatio = expandedWidth / expandedHeight;
    
    rerender(<Logo isCollapsed={true} />);
    
    image = screen.getByTestId('next-image');
    const collapsedWidth = Number(image.getAttribute('width'));
    const collapsedHeight = Number(image.getAttribute('height'));
    const collapsedRatio = collapsedWidth / collapsedHeight;
    
    // Square ratio when collapsed
    expect(collapsedRatio).toBe(1);
    // Wider ratio when expanded
    expect(expandedRatio).toBeGreaterThan(2);
  });

  it('wraps image in a flex container', () => {
    render(<Logo />);
    
    const container = screen.getByTestId('next-image').parentElement;
    const containerStyles = window.getComputedStyle(container as Element);
    
    expect(containerStyles.display).toBe('flex');
    expect(containerStyles.alignItems).toBe('center');
    expect(containerStyles.padding).toBe('1rem');
  });

  it('prioritizes image loading', () => {
    render(<Logo />);
    
    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('data-priority', 'true');
  });
});