import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'text';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', href, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-body font-bold rounded-[24px] transition-all duration-180 ease-out active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2";
    
    const variants = {
      primary: "bg-brand-red text-text-on-red hover:bg-[#B71818] hover:shadow-sm",
      secondary: "bg-transparent border border-text-primary/10 text-text-primary hover:border-text-primary/30 hover:bg-black/5",
      ghost: "bg-transparent text-text-primary hover:bg-black/5",
      text: "bg-transparent text-text-primary hover:text-brand-red p-0 rounded-none h-auto"
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-7 py-3 text-base",
      lg: "px-8 py-4 text-lg"
    };

    // Text variant ignores standard padding
    const activeSize = variant === 'text' ? "" : sizes[size];
    const classes = cn(baseStyles, variants[variant], activeSize, className);

    if (href) {
      if (href.startsWith('http')) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
            {props.children}
          </a>
        );
      }
      return (
        <Link to={href} className={classes}>
          {props.children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {props.children}
      </button>
    );
  }
);

Button.displayName = "Button";
