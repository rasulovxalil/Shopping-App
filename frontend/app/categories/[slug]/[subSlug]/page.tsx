"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Breadcrumbs,
  CircularProgress,
  Alert,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { API_BASE_URL } from "@/app/lib/apiConfig";
import { extractArray } from "@/app/lib/extractArray";
import type { Product } from "@/app/Components/Body/Productlist";
import { useCategoryContext } from "../../categoryContext";

const linkStyle = { textDecoration: "none", color: "inherit" };

export default function SubCategoryProductsPage() {
  const params = useParams();
  const categorySlug = (params?.slug as string) || "";
  const subCategorySlug = (params?.subSlug as string) || "";

  const { categories } = useCategoryContext();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      try {
        setHasError(false);
        const res = await fetch(`${API_BASE_URL}/products`, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        const data: unknown = await res.json();
        const allProducts = extractArray<Product>(data, ["products", "data"]);
        const filteredProducts = allProducts.filter(
          (product) => product.subCategory === subCategorySlug
        );

        if (!controller.signal.aborted) {
          setProducts(filteredProducts);
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        console.error("SubCategoryProductsPage fetch error:", err);
        if (!controller.signal.aborted) setHasError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    loadProducts();

    return () => controller.abort();
  }, [subCategorySlug]);

  const category = categories.find((cat) => cat.slug === categorySlug);
  const subCategory = category?.subCategories?.find((sub) => sub.slug === subCategorySlug);
  const categoryLabel = category?.name ?? categorySlug;
  const subCategoryLabel = subCategory?.name ?? subCategorySlug;

  return (
    <Box>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 2 }}>
        <Typography component={Link} href="/" sx={{ ...linkStyle, "&:hover": { color: "#F97316" } }}>
          Home
        </Typography>
        <Typography
          component={Link}
          href={`/categories/${categorySlug}`}
          sx={{ ...linkStyle, "&:hover": { color: "#F97316" } }}
        >
          {categoryLabel}
        </Typography>
        <Typography sx={{ color: "#F97316", fontWeight: 600 }}>{subCategoryLabel}</Typography>
      </Breadcrumbs>

      <Typography variant="h5" sx={{ fontWeight: "bold", color: "#0f172a", mb: 3 }}>
        {subCategoryLabel}
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress sx={{ color: "#F97316" }} />
        </Box>
      ) : hasError ? (
        <Alert severity="error">Couldn&apos;t load products. Please try again later.</Alert>
      ) : products.length === 0 ? (
        <Typography sx={{ color: "#64748b", fontStyle: "italic" }}>
          No products found in this subcategory yet.
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {products.map((product) => {
            const imageUrl = product.images?.[0] || "/placeholder.png";
            const href = `/products/${product.id}`;

            return (
              <Card
                key={product.id}
                component={Link}
                href={href}
                elevation={0}
                sx={{
                  textDecoration: "none",
                  width: {
                    xs: "calc(50% - 8px)",
                    sm: "calc(33.33% - 11px)",
                    md: "calc(25% - 12px)",
                  },
                  border: "1px solid #f1f5f9",
                  borderRadius: "16px",
                  p: 1.5,
                  display: "flex",
                  flexDirection: "column",
                  transition: "0.2s ease",
                  "&:hover": {
                    borderColor: "#F97316",
                    boxShadow: "0px 8px 24px rgba(249, 115, 22, 0.1)",
                  },
                }}
              >
                <Box
                  sx={{
                    height: 160,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 1.5,
                  }}
                >
                  <Box
                    component="img"
                    src={imageUrl}
                    alt={product.name}
                    sx={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                  />
                </Box>
                <CardContent sx={{ p: 0, flexGrow: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: "#1a1a1a",
                      mb: 1,
                      minHeight: "40px",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#000" }}>
                    {product.price} GEL
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
