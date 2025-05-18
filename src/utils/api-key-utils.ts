export function generateRandomString(length: number): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function maskKey(key: string): string {
  if (!key) return "";
  const prefix = key.slice(0, key.indexOf("-") + 1); // e.g., tvly-dev-
  const last4 = key.slice(-4);
  return prefix + "*".repeat(key.length - prefix.length - 4) + last4;
}
