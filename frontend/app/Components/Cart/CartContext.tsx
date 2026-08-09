"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/app/lib/apiConfig";
import { useAuth } from "@/app/Components/Auth/AuthContext";

export interface CartItem {
  productId: number;
  name: string;
  brand: string;
  price: number;
  images: string[];
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  loading: boolean;
  totalCount: number;
  totalPrice: number;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Refetch whenever the logged-in user changes, so switching accounts on the
  // same browser never shows a stale cart from the previous user.
  useEffect(() => {
    if (!user) return;

    const controller = new AbortController();

    const loadCart = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/cart/${user.id}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to load cart");
        const data: CartItem[] = await res.json();
        setItems(data);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        console.error("Cart fetch error:", err);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    loadCart();

    return () => controller.abort();
  }, [user]);

  const addToCart = async (productId: number, quantity = 1) => {
    if (!user) {
      router.push("/login");
      return;
    }
    const res = await fetch(`${API_BASE_URL}/cart/${user.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });
    if (!res.ok) throw new Error("Failed to add item to cart");
    const data: CartItem[] = await res.json();
    setItems(data);
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (!user) return;
    const res = await fetch(`${API_BASE_URL}/cart/${user.id}/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });
    if (!res.ok) throw new Error("Failed to update cart item");
    const data: CartItem[] = await res.json();
    setItems(data);
  };

  const removeFromCart = async (productId: number) => {
    if (!user) return;
    const res = await fetch(`${API_BASE_URL}/cart/${user.id}/${productId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to remove cart item");
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const clearCart = async () => {
    if (!user) return;
    const res = await fetch(`${API_BASE_URL}/cart/${user.id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to clear cart");
    setItems([]);
  };

  // Gate on `user` at the point of exposure (rather than clearing `items` on
  // logout) so a logged-out visitor can never see a previous session's cart,
  // even for an instant, regardless of internal state timing.
  const visibleItems = user ? items : [];

  const totalCount = visibleItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = visibleItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value: CartContextValue = {
    items: visibleItems,
    loading,
    totalCount,
    totalPrice,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
