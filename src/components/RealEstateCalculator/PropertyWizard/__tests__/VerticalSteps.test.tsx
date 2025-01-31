import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { VerticalSteps } from '../VerticalSteps';

interface MotionDivProps {
  children: React.ReactNode;
  className?: string;
  'data-status'?: string;
  animate?: string;
}

interface MotionPathProps {
  d: string;
}

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, 'data-status': status, animate }: MotionDivProps) => (
      <div className={className} data-status={status} data-animate={animate} data-testid="motion-div">
        {children}
      </div>
    ),
    path: ({ d }: MotionPathProps) => <path d={d} />,
  },
  LazyMotion: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  domAnimation: {},
}));

// Mock @react-stately/utils
jest.mock('@react-stately/utils', () => ({
  useControlledState: (value: number | undefined, defaultValue: number) => {
    // Simplified mock that just returns the value and a noop function
    return [
      value ?? defaultValue,
      () => {} // noop function
    ] as const;
  },
}));

describe('VerticalSteps', () => {
  const mockSteps = [
    {
      title: 'Step 1',
      description: 'First step description',
    },
    {
      title: 'Step 2',
      description: 'Second step description',
    },
    {
      title: 'Step 3',
      description: 'Third step description',
    },
  ];

  it('renders all steps with titles and descriptions', () => {
    render(<VerticalSteps steps={mockSteps} />);
    
    mockSteps.forEach(step => {
      expect(screen.getByText(step.title)).toBeInTheDocument();
      expect(screen.getByText(step.description)).toBeInTheDocument();
    });
  });

  it('shows step numbers and check icons correctly', () => {
    render(<VerticalSteps steps={mockSteps} currentStep={1} />);
    
    // First step should show check icon (complete)
    const firstStep = screen.getAllByRole('button')[0];
    expect(firstStep).toHaveAttribute('data-status', 'complete');
    
    // Second step should show number 2 (active)
    const secondStep = screen.getAllByRole('button')[1];
    expect(secondStep).toHaveAttribute('data-status', 'active');
    expect(screen.getAllByTestId('step-number')[0]).toHaveTextContent('2');
    
    // Third step should show number 3 (inactive)
    const thirdStep = screen.getAllByRole('button')[2];
    expect(thirdStep).toHaveAttribute('data-status', 'inactive');
    expect(screen.getAllByTestId('step-number')[1]).toHaveTextContent('3');
  });

  it('handles step navigation', () => {
    const onStepChange = jest.fn();
    render(<VerticalSteps steps={mockSteps} onStepChange={onStepChange} />);
    
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]); // Click second step
    
    expect(onStepChange).toHaveBeenCalledTimes(1);
  });

  it('applies correct color variants', () => {
    const { rerender } = render(<VerticalSteps steps={mockSteps} color="primary" />);
    expect(screen.getByRole('list')).toHaveClass('[--step-color:hsl(var(--heroui-primary))]');
    
    rerender(<VerticalSteps steps={mockSteps} color="secondary" />);
    expect(screen.getByRole('list')).toHaveClass('[--step-color:hsl(var(--heroui-secondary))]');
    
    rerender(<VerticalSteps steps={mockSteps} color="success" />);
    expect(screen.getByRole('list')).toHaveClass('[--step-color:hsl(var(--heroui-success))]');
    
    rerender(<VerticalSteps steps={mockSteps} color="warning" />);
    expect(screen.getByRole('list')).toHaveClass('[--step-color:hsl(var(--heroui-warning))]');
    
    rerender(<VerticalSteps steps={mockSteps} color="danger" />);
    expect(screen.getByRole('list')).toHaveClass('[--step-color:hsl(var(--heroui-error))]');
  });

  it('uses default step when not controlled', () => {
    render(<VerticalSteps steps={mockSteps} defaultStep={1} />);
    
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveAttribute('data-status', 'complete');
    expect(buttons[1]).toHaveAttribute('data-status', 'active');
    expect(buttons[2]).toHaveAttribute('data-status', 'inactive');
  });

  it('handles controlled state', () => {
    const { rerender } = render(<VerticalSteps steps={mockSteps} currentStep={0} />);
    
    let buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveAttribute('data-status', 'active');
    
    rerender(<VerticalSteps steps={mockSteps} currentStep={1} />);
    
    buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveAttribute('data-status', 'complete');
    expect(buttons[1]).toHaveAttribute('data-status', 'active');
  });

  it('shows/hides progress bars', () => {
    const { rerender } = render(<VerticalSteps steps={mockSteps} />);
    
    // Progress bars should be visible by default
    expect(screen.getAllByTestId('progress-bar')).toHaveLength(2); // 2 bars for 3 steps
    
    rerender(<VerticalSteps steps={mockSteps} hideProgressBars />);
    
    // Progress bars should be hidden
    expect(screen.queryByTestId('progress-bar')).not.toBeInTheDocument();
  });

  it('applies custom class names', () => {
    render(
      <VerticalSteps
        steps={mockSteps}
        className="custom-container"
        stepClassName="custom-step"
      />
    );
    
    expect(screen.getByRole('list')).toHaveClass('custom-container');
    
    const steps = screen.getAllByRole('button');
    steps.forEach(step => {
      expect(step).toHaveClass('custom-step');
    });
  });

  it('handles empty steps array', () => {
    render(<VerticalSteps steps={[]} />);
    
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('applies correct status-based styles', () => {
    render(<VerticalSteps steps={mockSteps} currentStep={1} />);
    
    const steps = screen.getAllByRole('button');
    
    // Complete step
    const completeStep = steps[0].querySelector('[data-status="complete"]');
    expect(completeStep).toHaveClass('shadow-lg');
    
    // Active step
    const activeStep = steps[1];
    expect(activeStep).toHaveAttribute('data-status', 'active');
    expect(activeStep.querySelector('[data-animate="active"]')).toBeInTheDocument();
    
    // Inactive step
    const inactiveStep = steps[2];
    expect(inactiveStep).toHaveAttribute('data-status', 'inactive');
    expect(inactiveStep.querySelector('[data-animate="inactive"]')).toBeInTheDocument();
  });

  it('applies responsive text classes', () => {
    render(<VerticalSteps steps={mockSteps} currentStep={0} />);
    
    const descriptions = screen.getAllByText(/description/);
    descriptions.forEach(description => {
      const parentDiv = description.parentElement;
      expect(parentDiv).toHaveClass('text-tiny');
      expect(parentDiv).toHaveClass('lg:text-small');
    });
  });
});