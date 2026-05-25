'use client';

import { ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  as?: React.ElementType;
}

export function Button({
  variant = 'default',
  size = 'md',
  className = '',
  children,
  as: Component = 'button',
  ...props
}: ButtonProps) {
  const variantClass = {
    default: 'btn-primary',
    outline: 'btn-secondary border',
    secondary: 'btn-secondary',
  }[variant];

  const sizeClass = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }[size];

  return (
    <Component
      className={`${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
