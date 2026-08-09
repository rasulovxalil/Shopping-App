// Single source of truth for "who is currently logged in", persisted in
// localStorage so it survives reloads and is scoped per-browser-profile.
export interface AuthUser {
  id: string;
  email: string;
}

const STORAGE_KEY = "shopping_app_user";
const AUTH_CHANGED_EVENT = "shopping-app-auth-changed";

// Caches the parsed value against the raw string it came from, so repeated
// calls with an unchanged localStorage value return the SAME object
// reference. useSyncExternalStore requires this — returning a freshly
// parsed object every call makes React think the store changes on every
// render, which causes an infinite re-render loop.
let cachedRaw: string | null = null;
let cachedUser: AuthUser | null = null;

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) {
    return cachedUser;
  }

  cachedRaw = raw;
  if (!raw) {
    cachedUser = null;
    return cachedUser;
  }

  try {
    cachedUser = JSON.parse(raw) as AuthUser;
  } catch {
    cachedUser = null;
  }
  return cachedUser;
}

export function storeUser(user: AuthUser): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

export function clearStoredUser(): void {
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

export function subscribeToAuthChanges(callback: () => void): () => void {
  window.addEventListener(AUTH_CHANGED_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(AUTH_CHANGED_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
