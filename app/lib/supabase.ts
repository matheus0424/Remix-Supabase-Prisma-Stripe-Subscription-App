import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_ANON_KEY as string,
  {
    auth: {
      flowType: "pkce",
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: true,
    },
  },
);

export const cookieOptions = {
  path: "/",
  secure: true,
  httpOnly: true,
  sameSite: "lax",
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
} as const;