// Single source of truth for the Go backend base URL.
// Never hardcode API URLs in components — import API_BASE_URL from here instead.
const rawApiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!rawApiUrl) {
  // Logged instead of thrown so a misconfigured .env doesn't crash the whole app;
  // callers still get an empty string and fetches will fail loudly with a clear cause.
  console.error(
    "NEXT_PUBLIC_API_URL is not set. Add it to frontend/.env, e.g. NEXT_PUBLIC_API_URL=http://localhost:5000/api"
  );
}

export const API_BASE_URL = (rawApiUrl ?? "").replace(/\/$/, "");
