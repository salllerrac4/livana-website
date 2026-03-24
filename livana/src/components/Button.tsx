import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {
  variant?: 'primary' | 'secondary' | 'ghost';
  to?: string;
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-primary text-white shadow-soft hover:bg-primary/90',
  secondary: 'bg-white text-primary border border-primary hover:border-primaryLight hover:text-primaryLight',
  ghost: 'bg-transparent text-primary hover:text-primaryLight',
};

const Button = ({ children, variant = 'primary', className = '', to, ...rest }: ButtonProps) => {
  const baseClasses = `inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={baseClasses} {...rest}>
      {children}
    </button>
  );
};

export default Button;
