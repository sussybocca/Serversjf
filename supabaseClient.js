import { createClient } from "@supabase/supabase-js";
import { getSecrets } from "./secrets/getSecrets.js";

const { SUPABASE_URL, SUPABASE_KEY } = getSecrets();
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

