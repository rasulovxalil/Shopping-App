import { API_BASE_URL } from "@/app/lib/apiConfig";
import type { AdminProduct, AdminUser } from "../types/types";

async function parseErrorMessage(res: Response, fallback: string): Promise<string> {
  const data = await res.json().catch(() => null);
  return data?.error || data?.message || fallback;
}

// ---------- Users ----------

export async function fetchUsers(signal?: AbortSignal): Promise<AdminUser[]> {
  const res = await fetch(`${API_BASE_URL}/users`, { cache: "no-store", signal });
  if (!res.ok) {
    throw new Error(await parseErrorMessage(res, "Failed to fetch users"));
  }
  return res.json();
}

export async function createUser(email: string, password: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    throw new Error(await parseErrorMessage(res, "Failed to create user"));
  }
}

export async function updateUser(id: string, email: string, password: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    throw new Error(await parseErrorMessage(res, "Failed to update user"));
  }
}

export async function deleteUser(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/users/${id}`, { method: "DELETE" });
  if (!res.ok) {
    throw new Error(await parseErrorMessage(res, "Failed to delete user"));
  }
}

// ---------- Products ----------

export async function fetchProducts(signal?: AbortSignal): Promise<AdminProduct[]> {
  const res = await fetch(`${API_BASE_URL}/products`, { cache: "no-store", signal });
  if (!res.ok) {
    throw new Error(await parseErrorMessage(res, "Failed to fetch products"));
  }
  return res.json();
}

export async function createProduct(product: Omit<AdminProduct, "id">): Promise<AdminProduct> {
  const res = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) {
    throw new Error(await parseErrorMessage(res, "Failed to create product"));
  }
  return res.json();
}

export async function updateProduct(id: number, product: Omit<AdminProduct, "id">): Promise<AdminProduct> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) {
    throw new Error(await parseErrorMessage(res, "Failed to update product"));
  }
  return res.json();
}

export async function deleteProduct(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, { method: "DELETE" });
  if (!res.ok) {
    throw new Error(await parseErrorMessage(res, "Failed to delete product"));
  }
}
