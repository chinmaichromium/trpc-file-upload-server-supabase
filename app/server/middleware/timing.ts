import { t } from '../api/init';

export const timing = t.middleware(async ({ next }) => {
  const _start = Date.now();

  if (t._config.isDev) {
    const waitMs = Math.floor(Math.random() * 400) + 1000;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();

  const _end = Date.now();
  if (process.env.NEXT_PUBLIC_SITE_URL === 'http://localhost:3000') {
    // eslint-disable-next-line no-console
    // console.log(`[TRPC] ${path} took ${end - start}ms to execute`);
  }
  return result;
});
