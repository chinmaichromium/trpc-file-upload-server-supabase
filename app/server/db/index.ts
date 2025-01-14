import 'server-only';

import { createClient } from '@supabase/supabase-js';

import { type Database } from '@/app/supabase-types/database.types';

export function createPublicClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}
