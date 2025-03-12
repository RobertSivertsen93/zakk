
import React from 'react';
import { cn } from "@/lib/utils";

type AnimatedTransitionProps = {
  children: React.ReactNode;
  show: boolean;
  className?: string;
  animation?: 'fade' | 'scale' | 'blur' | 'slide';
  style?: React.CSSProperties;
};

const AnimatedTransition = ({ 
  children, 
  show, 
  className,
  animation = 'fade',
  style
}: AnimatedTransitionProps) => {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    if (show) {
      setMounted(true);
    } else {
      const timer = setTimeout(() => {
        setMounted(false);
      }, 300); // Match with animation duration
      return () => clearTimeout(timer);
    }
  }, [show]);
  
  if (!mounted && !show) return null;
  
  const getAnimationClasses = () => {
    switch (animation) {
      case 'fade':
        return show ? 'animate-fade-in' : 'animate-fade-out';
      case 'scale':
        return show ? 'animate-scale-in' : 'animate-scale-out';
      case 'blur':
        return show ? 'animate-blur-in' : 'opacity-0';
      case 'slide':
        return show ? 'animate-slide-in-right' : 'animate-slide-out-left';
      default:
        return show ? 'animate-fade-in' : 'animate-fade-out';
    }
  };
  
  return (
    <div className={cn(getAnimationClasses(), className)} style={style}>
      {children}
    </div>
  );
};

export default AnimatedTransition;
