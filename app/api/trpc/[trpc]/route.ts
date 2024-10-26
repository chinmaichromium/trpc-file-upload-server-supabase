import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { headers } from 'next/headers';

import { appRouter } from '@/app/server/api/root';
import { createTRPCContext } from '@/app/server/api/trpc';

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async () => {
  const heads = await headers();
  return createTRPCContext({
    headers: heads,
  });
};

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    allowMethodOverride: true,
    createContext: () => createContext(),
    onError:
      process.env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`,
            );
          }
        : undefined,
  });

export { handler as GET, handler as POST };
