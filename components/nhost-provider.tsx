'use client';

import { NhostProvider } from '@nhost/nextjs';
import { nhost } from '../utils/nhost';

export function NhostClientProvider({ children }: { children: React.ReactNode }) {
  return <NhostProvider nhost={nhost}>{children}</NhostProvider>;
}
