import { Loader as LoaderIcon, Loader2 } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';

interface LoaderProps {
  variant?: 'inline' | 'full';
  size?: number;
  className?: string;
}

export function Loader({ variant = 'inline', size, className }: LoaderProps) {
  if (variant === 'inline') {
    return (
      <div
        className={cn(
          'flex h-full w-full items-center justify-center',
          className,
        )}
      >
        <LoaderIcon className='animate-spin' size={size ?? 16} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center',
        className,
      )}
    >
      <Loader2 className='animate-spin' size={size ?? 24} />
    </div>
  );
}

// Simple loader
{
  /* <LoaderComponent /> */
}

// Full loader with custom size
{
  /* <LoaderComponent variant="full" size={32} /> */
}

// Loader with additional classes
{
  /* <LoaderComponent className="text-blue-500" /> */
}
