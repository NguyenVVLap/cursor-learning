import { supabase } from "@/lib/supabase";
import { ApiKey } from "@/types/api-key";
import { generateRandomString } from "@/utils/api-key-utils";

export async function fetchApiKeys(): Promise<ApiKey[]> {
  const { data, error } = await supabase
    .from("api_keys")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function createApiKey(
  name: string,
  type: "dev" | "prod",
  usageLimit: number | null
): Promise<ApiKey> {
  const newKey = {
    name,
    type,
    usage: 0,
    key: `${type === "dev" ? "tvly-dev" : "tvly-prod"}-${generateRandomString(
      32
    )}`,
    usage_limit: usageLimit,
  };

  const { data, error } = await supabase
    .from("api_keys")
    .insert([newKey])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateApiKey(
  id: string,
  updates: Partial<ApiKey>
): Promise<ApiKey> {
  const { data, error } = await supabase
    .from("api_keys")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteApiKey(id: string): Promise<void> {
  const { error } = await supabase.from("api_keys").delete().eq("id", id);

  if (error) throw error;
}

// New function to check if a key exists in the api_keys table
export async function checkApiKeyExists(key: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("api_keys")
    .select("id")
    .eq("key", key)
    .single();
  if (error && error.code !== "PGRST116") throw error; // PGRST116: No rows found
  return !!data;
}
