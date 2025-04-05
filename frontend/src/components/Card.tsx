
import { FC, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'glass' | 'outline';
  animate?: boolean;
}

const Card: FC<CardProps> = ({ 
  children, 
  className, 
  onClick, 
  variant = 'default',
  animate = false
}) => {
  const baseClasses = "rounded-lg p-6";
  
  const variantClasses = {
    default: "bg-card text-card-foreground shadow",
    glass: "glass",
    outline: "border border-border bg-transparent",
  };
  
  const animationClasses = animate ? "hover-card card-highlight" : "";
  
  return (
    <div 
      className={cn(
        baseClasses,
        variantClasses[variant],
        animationClasses,
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
