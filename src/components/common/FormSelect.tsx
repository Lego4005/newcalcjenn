import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { Select, type SelectProps } from './Select';

const formSelectVariants = cva('space-y-2', {
  variants: {
    size: {
      default: '',
      sm: 'space-y-1.5',
      lg: 'space-y-3',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      size: {
        default: 'text-sm',
        sm: 'text-xs',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface FormSelectProps extends SelectProps, VariantProps<typeof formSelectVariants> {
  label?: string;
  description?: string;
  required?: boolean;
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      className,
      size,
      label,
      description,
      error,
      required,
      id,
      options,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn(formSelectVariants({ size }), className)}>
        {label && (
          <div className="flex items-center justify-between">
            <label
              htmlFor={id}
              className={cn(
                labelVariants({ size }),
                'flex items-center gap-1'
              )}
            >
              {label}
              {required && (
                <span className="text-danger text-xs">*</span>
              )}
            </label>
            {description && (
              <span className="text-xs text-muted-foreground">
                {description}
              </span>
            )}
          </div>
        )}
        <Select
          ref={ref}
          id={id}
          size={size}
          error={error}
          options={options}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        {error && (
          <p
            id={`${id}-error`}
            className="text-xs text-danger"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';

export { FormSelect };