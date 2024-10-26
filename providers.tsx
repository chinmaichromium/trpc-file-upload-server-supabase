'use client';

import { type ReactNode } from 'react';

import { TRPCReactProvider } from '@/app/trpc/client';

export default function Providers({ children }: { children: ReactNode }) {
  return <TRPCReactProvider>{children}</TRPCReactProvider>;
}
