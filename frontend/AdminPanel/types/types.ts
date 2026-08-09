export interface AdminUser {
  id: string;
  email: string;
}

export interface AdminUserFormValues {
  email: string;
  password: string;
}

export interface AdminProduct {
  id: number;
  name: string;
  brand: string;
  category: string;
  subCategory: string;
  price: number;
  description: string;
  images: string[];
}

export type AdminProductFormValues = Omit<AdminProduct, "id" | "images"> & {
  images: string;
};
