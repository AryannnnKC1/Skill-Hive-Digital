import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from './Card';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-teal-600 text-white shadow hover:bg-teal-700': variant === 'default',
            'border border-gray-200 bg-transparent hover:bg-gray-100 text-gray-900': variant === 'outline',
            'hover:bg-gray-100 hover:text-gray-900': variant === 'ghost',
            'bg-red-500 text-white shadow hover:bg-red-600': variant === 'danger',
            'h-8 px-3 text-xs': size === 'sm',
            'h-9 px-4 py-2': size === 'md',
            'h-10 px-8': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
