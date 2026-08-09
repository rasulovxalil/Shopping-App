"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Alert,
  Skeleton,
  Tooltip,
  Avatar,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import type { AdminProduct } from "../types/types";
import { createProduct, deleteProduct, fetchProducts, updateProduct } from "../lib/adminApi";
import ProductFormDialog from "../components/ProductFormDialog";
import ConfirmDialog from "../components/ConfirmDialog";

const priceFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default function ProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [selectedProduct, setSelectedProduct] = useState<AdminProduct | null>(null);
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<AdminProduct | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    const loadInitialProducts = async () => {
      try {
        const data = await fetchProducts(controller.signal);
        setProducts(data);
        setError("");
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }
        setError(err instanceof Error ? err.message : "Failed to fetch products.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadInitialProducts();

    return () => {
      controller.abort();
    };
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setError("");
    loadProducts();
  };

  const openCreate = () => {
    setFormMode("create");
    setSelectedProduct(null);
    setFormKey((k) => k + 1);
    setFormOpen(true);
  };

  const openEdit = (product: AdminProduct) => {
    setFormMode("edit");
    setSelectedProduct(product);
    setFormKey((k) => k + 1);
    setFormOpen(true);
  };

  const handleFormSubmit = async (values: Omit<AdminProduct, "id">) => {
    setSaving(true);
    try {
      if (formMode === "create") {
        await createProduct(values);
      } else if (selectedProduct) {
        await updateProduct(selectedProduct.id, values);
      }
      setFormOpen(false);
      await loadProducts();
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteProduct(deleteTarget.id);
      setDeleteTarget(null);
      await loadProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete product.");
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#431407" }}>
            Products
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Manage the product catalog shown on the storefront.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Refresh">
            <IconButton onClick={handleRefresh} sx={{ border: "1px solid #e5e7eb" }}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openCreate}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              backgroundColor: "#f97316",
              "&:hover": { backgroundColor: "#ea580c" },
            }}
          >
            Add Product
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ borderRadius: 2, overflow: "hidden", border: "1px solid #eef0f2" }} elevation={0}>
        <TableContainer sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#fff7ed" }}>
                <TableCell sx={{ fontWeight: 700 }}>Product</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Brand</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading &&
                Array.from({ length: 4 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={5}>
                      <Skeleton height={32} />
                    </TableCell>
                  </TableRow>
                ))}

              {!loading && products.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4, color: "text.secondary" }}>
                    No products found.
                  </TableCell>
                </TableRow>
              )}

              {!loading &&
                products.map((product) => (
                  <TableRow key={product.id} hover>
                    <TableCell>
                      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                        <Avatar
                          variant="rounded"
                          src={product.images?.[0]}
                          sx={{ width: 40, height: 40, backgroundColor: "#fff7ed", color: "#f97316" }}
                        >
                          <Inventory2OutlinedIcon fontSize="small" />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600, maxWidth: 280 }} noWrap>
                            {product.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "text.secondary" }}>
                            #{product.id} &middot; {product.subCategory}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>
                      <Chip label={product.category} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{priceFormatter.format(product.price)}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit">
                        <IconButton onClick={() => openEdit(product)} sx={{ color: "#f97316" }}>
                          <EditOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => setDeleteTarget(product)} color="error">
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <ProductFormDialog
        key={formKey}
        open={formOpen}
        mode={formMode}
        product={selectedProduct}
        loading={saving}
        onCancel={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete product"
        description={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        loading={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
}
