// Normalizes API responses that may arrive as a raw array or wrapped in an
// envelope object (e.g. { data: [...] }, { categories: [...] }) under an
// unpredictable key. Checks preferredKeys first, then falls back to the
// first array value found on the object, so it survives backend wrapper
// key changes without the frontend needing to know the exact key in use.
export function extractArray<T = unknown>(payload: unknown, preferredKeys: string[] = []): T[] {
  if (Array.isArray(payload)) return payload as T[];

  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;

    for (const key of preferredKeys) {
      if (Array.isArray(obj[key])) return obj[key] as T[];
    }

    for (const value of Object.values(obj)) {
      if (Array.isArray(value)) return value as T[];
    }
  }

  return [];
}
