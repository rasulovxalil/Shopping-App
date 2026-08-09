"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Alert,
  Grid,
} from "@mui/material";
import type { AdminProduct } from "../types/types";

interface ProductFormDialogProps {
  open: boolean;
  mode: "create" | "edit";
  product: AdminProduct | null;
  loading?: boolean;
  onCancel: () => void;
  onSubmit: (values: Omit<AdminProduct, "id">) => Promise<void> | void;
}

interface FormState {
  name: string;
  brand: string;
  category: string;
  subCategory: string;
  price: string;
  description: string;
  images: string;
}

const emptyForm: FormState = {
  name: "",
  brand: "",
  category: "",
  subCategory: "",
  price: "",
  description: "",
  images: "",
};

export default function ProductFormDialog({
  open,
  mode,
  product,
  loading,
  onCancel,
  onSubmit,
}: ProductFormDialogProps) {
  const [form, setForm] = useState<FormState>(() =>
    product
      ? {
          name: product.name,
          brand: product.brand,
          category: product.category,
          subCategory: product.subCategory,
          price: String(product.price),
          description: product.description,
          images: product.images.join("\n"),
        }
      : emptyForm
  );
  const [error, setError] = useState("");

  const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async () => {
    const priceValue = Number(form.price);
    if (!form.name.trim() || !form.brand.trim() || !form.category.trim() || !form.subCategory.trim()) {
      setError("Name, brand, category and sub-category are required.");
      return;
    }
    if (!Number.isFinite(priceValue) || priceValue <= 0) {
      setError("Price must be a positive number.");
      return;
    }
    setError("");
    try {
      await onSubmit({
        name: form.name.trim(),
        brand: form.brand.trim(),
        category: form.category.trim(),
        subCategory: form.subCategory.trim(),
        price: priceValue,
        description: form.description.trim(),
        images: form.images
          .split("\n")
          .map((url) => url.trim())
          .filter(Boolean),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const focusStyles = {
    "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: "#f97316" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#f97316" },
  };

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold" }}>
        {mode === "create" ? "Add Product" : "Edit Product"}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField label="Name" fullWidth autoFocus value={form.name} onChange={handleChange("name")} sx={focusStyles} />
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Brand" fullWidth value={form.brand} onChange={handleChange("brand")} sx={focusStyles} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Price" type="number" fullWidth value={form.price} onChange={handleChange("price")} sx={focusStyles} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Category" fullWidth value={form.category} onChange={handleChange("category")} sx={focusStyles} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Sub-category" fullWidth value={form.subCategory} onChange={handleChange("subCategory")} sx={focusStyles} />
            </Grid>
          </Grid>
          <TextField
            label="Description"
            fullWidth
            multiline
            minRows={2}
            value={form.description}
            onChange={handleChange("description")}
            sx={focusStyles}
          />
          <TextField
            label="Image URLs (one per line)"
            fullWidth
            multiline
            minRows={2}
            value={form.images}
            onChange={handleChange("images")}
            sx={focusStyles}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onCancel} disabled={loading} sx={{ textTransform: "none" }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={loading}
          variant="contained"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            backgroundColor: "#f97316",
            "&:hover": { backgroundColor: "#ea580c" },
          }}
        >
          {loading ? "Saving..." : mode === "create" ? "Create" : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
