import React from 'react';
import { useInView } from '../hooks/useInView';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedSection({ children, className = '' }: AnimatedSectionProps) {
  const { ref, isInView } = useInView();

  return (
    <section
      ref={ref}
      className={`transform transition-all duration-700 ${
        isInView
          ? 'translate-y-0 opacity-100'
          : 'translate-y-10 opacity-0'
      } ${className}`}
    >
      {children}
    </section>
  );
}