import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { Input, type InputProps } from './Input';

const formFieldVariants = cva('space-y-2', {
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

export interface FormFieldProps extends InputProps, VariantProps<typeof formFieldVariants> {
  label?: string;
  description?: string;
  required?: boolean;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      className,
      size,
      label,
      description,
      error,
      required,
      id,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn(formFieldVariants({ size }), className)}>
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
        <Input
          ref={ref}
          id={id}
          size={size}
          error={error}
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

FormField.displayName = 'FormField';

export { FormField };