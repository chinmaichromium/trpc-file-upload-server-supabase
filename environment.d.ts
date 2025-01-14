/* eslint-disable no-unused-vars */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      SUPABASE_JWT_SECRET: string;
      SUPABASE_SERVICE_ROLE_KEY: string;
    }
  }
}
export {};
