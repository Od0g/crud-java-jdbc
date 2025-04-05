
import { FC } from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`font-bold ${sizes[size]} ${className}`}>
      <span className="text-primary">GOS</span>
      <span className="text-muted-foreground">Manager</span>
    </div>
  );
};

export default Logo;
