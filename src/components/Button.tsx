import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const baseStyles = 'px-7 py-3 rounded-full font-medium text-sm transition-colors whitespace-nowrap inline-block text-center';

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-[#051A24] text-white hover:bg-[#0D212C]',
  secondary: 'bg-white text-[#051A24]',
  tertiary: 'bg-white text-[#051A24]',
};

const variantShadows: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    boxShadow: '0 1px 2px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.08)',
  },
  secondary: {
    boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06)',
  },
  tertiary: {
    boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
  },
};

export function Button({ variant = 'primary', children, href, onClick, className = '' }: ButtonProps) {
  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;
  const style = variantShadows[variant];

  if (href) {
    return (
      <a href={href} className={classes} style={style}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes} style={style}>
      {children}
    </button>
  );
}
