"use client";

import React, { createContext, useContext, useMemo, useSyncExternalStore } from "react";
import {
  type AuthUser,
  getStoredUser,
  storeUser,
  clearStoredUser,
  subscribeToAuthChanges,
} from "@/app/lib/auth";

interface AuthContextValue {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const getServerSnapshot = () => null;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = useSyncExternalStore(subscribeToAuthChanges, getStoredUser, getServerSnapshot);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login: storeUser,
      logout: clearStoredUser,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
