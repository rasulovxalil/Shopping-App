"use client";

import React, { createContext, useContext } from "react";

export interface SubCategory {
  id: number;
  name: string;
  slug: string;
  img?: string;
}

export interface CategoryItem {
  id: string | number;
  name: string;
  slug: string;
  subCategories?: SubCategory[];
}

interface CategoryContextValue {
  categories: CategoryItem[];
  loading: boolean;
  hasError: boolean;
}

const CategoryContext = createContext<CategoryContextValue | null>(null);

export function CategoryProvider({
  value,
  children,
}: {
  value: CategoryContextValue;
  children: React.ReactNode;
}) {
  return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
}

export function useCategoryContext(): CategoryContextValue {
  const ctx = useContext(CategoryContext);
  if (!ctx) {
    throw new Error("useCategoryContext must be used within a CategoryProvider");
  }
  return ctx;
}
