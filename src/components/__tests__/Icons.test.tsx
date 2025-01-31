import React from 'react';
import { render, screen } from '@testing-library/react';
import { InfoCircle } from '../Icons';

describe('Icons', () => {
  describe('InfoCircle', () => {
    it('renders SVG with correct attributes', () => {
      render(<InfoCircle />);
      
      const svg = screen.getByRole('img', { hidden: true });
      expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
      expect(svg).toHaveAttribute('width', '24');
      expect(svg).toHaveAttribute('height', '24');
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
      expect(svg).toHaveAttribute('fill', 'none');
      expect(svg).toHaveAttribute('stroke', 'currentColor');
      expect(svg).toHaveAttribute('stroke-width', '2');
      expect(svg).toHaveAttribute('stroke-linecap', 'round');
      expect(svg).toHaveAttribute('stroke-linejoin', 'round');
    });

    it('renders circle and lines with correct attributes', () => {
      render(<InfoCircle />);
      
      // Circle element
      const circle = screen.getByRole('img', { hidden: true }).querySelector('circle');
      expect(circle).toHaveAttribute('cx', '12');
      expect(circle).toHaveAttribute('cy', '12');
      expect(circle).toHaveAttribute('r', '10');
      
      // Line elements
      const lines = screen.getByRole('img', { hidden: true }).querySelectorAll('line');
      expect(lines).toHaveLength(2);
      
      // Vertical line
      expect(lines[0]).toHaveAttribute('x1', '12');
      expect(lines[0]).toHaveAttribute('y1', '16');
      expect(lines[0]).toHaveAttribute('x2', '12');
      expect(lines[0]).toHaveAttribute('y2', '12');
      
      // Dot line
      expect(lines[1]).toHaveAttribute('x1', '12');
      expect(lines[1]).toHaveAttribute('y1', '8');
      expect(lines[1]).toHaveAttribute('x2', '12.01');
      expect(lines[1]).toHaveAttribute('y2', '8');
    });

    it('applies className prop', () => {
      render(<InfoCircle className="test-class" />);
      
      const svg = screen.getByRole('img', { hidden: true });
      expect(svg).toHaveClass('test-class');
    });

    it('uses empty string as default className', () => {
      render(<InfoCircle />);
      
      const svg = screen.getByRole('img', { hidden: true });
      expect(svg.getAttribute('class')).toBe('');
    });

    it('passes through additional props', () => {
      render(<InfoCircle data-testid="custom-icon" aria-label="Info" />);
      
      const svg = screen.getByRole('img', { hidden: true });
      expect(svg).toHaveAttribute('data-testid', 'custom-icon');
      expect(svg).toHaveAttribute('aria-label', 'Info');
    });

    it('maintains consistent dimensions', () => {
      render(<InfoCircle />);
      
      const svg = screen.getByRole('img', { hidden: true });
      const viewBox = svg.getAttribute('viewBox')?.split(' ').map(Number);
      const width = Number(svg.getAttribute('width'));
      const height = Number(svg.getAttribute('height'));
      
      expect(viewBox?.[2]).toBe(width); // viewBox width matches element width
      expect(viewBox?.[3]).toBe(height); // viewBox height matches element height
      expect(width).toBe(height); // Square aspect ratio
    });
  });
});