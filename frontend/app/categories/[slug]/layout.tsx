"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  CircularProgress,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { API_BASE_URL } from "@/app/lib/apiConfig";
import { extractArray } from "@/app/lib/extractArray";
import { CategoryProvider, type CategoryItem } from "../categoryContext";

export default function CategoriesLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const currentSlug = (params?.slug as string) || "";
  const currentSubSlug = (params?.subSlug as string) || "";

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [openMainSlug, setOpenMainSlug] = useState<string | null>(currentSlug);

  // Re-sync the expanded sidebar category whenever the URL's slug changes,
  // while still letting the user manually collapse/expand within that slug.
  // Derived during render (React's documented pattern for this) instead of
  // an effect, so navigating never causes an extra render/flash.
  const [syncedSlug, setSyncedSlug] = useState(currentSlug);
  if (currentSlug !== syncedSlug) {
    setSyncedSlug(currentSlug);
    setOpenMainSlug(currentSlug);
  }

  // Fetched once for the whole /categories section — navigating between
  // categories/subcategories re-renders this layout with new params instead
  // of remounting it, so the sidebar never flashes back to a loading state.
  useEffect(() => {
    const controller = new AbortController();

    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/categories`, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        const data: unknown = await res.json();
        const extracted = extractArray<CategoryItem>(data, ["categories"]);

        if (!controller.signal.aborted) {
          setCategories(extracted);
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        console.error("Network Error:", err);
        if (!controller.signal.aborted) setHasError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchCategories();

    return () => controller.abort();
  }, []);

  return (
    <Box
      sx={{
        maxWidth: 1166,
        width: "100%",
        mx: "auto",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: 2, md: 4 },
        px: { xs: 2, md: 0 },
        pt: { xs: 2, md: 3 },
        pb: { xs: 6, md: 12 },
        alignItems: "flex-start",
      }}
    >
      {/* Sidebar Menu — persists across category/subcategory navigation */}
      <Box
        sx={{
          width: { xs: "100%", md: "280px" },
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          p: 1,
          backgroundColor: "#ffffff",
          position: { xs: "relative", md: "sticky" },
          top: { xs: "auto", md: "20px" },
          boxSizing: "border-box",
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            p: { xs: 1.5, md: 2 },
            fontSize: { xs: "0.9rem", md: "1rem" },
            color: "#0f172a",
          }}
        >
          Categories
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
            <CircularProgress size={24} sx={{ color: "#ff6b00" }} />
          </Box>
        ) : hasError ? (
          <Typography sx={{ px: 2, pb: 2, fontSize: "0.8rem", color: "#64748b" }}>
            Couldn&apos;t load categories.
          </Typography>
        ) : (
          <List component="nav" disablePadding>
            {categories.map((cat) => {
              const isCurrentUrl = cat.slug === currentSlug;
              const isMenuOpen = openMainSlug === cat.slug;

              return (
                <Box key={cat.id} sx={{ mb: 0.5 }}>
                  <ListItemButton
                    component={Link}
                    href={`/categories/${cat.slug}`}
                    selected={isCurrentUrl}
                    onClick={() => setOpenMainSlug(isMenuOpen ? null : cat.slug)}
                    sx={{
                      borderRadius: "8px",
                      py: { xs: 1, md: 1.25 },
                      "&.Mui-selected": {
                        backgroundColor: "#fff3e0",
                        color: "#ff6b00",
                        "&:hover": { backgroundColor: "#ffe0b2" },
                      },
                    }}
                  >
                    <ListItemText
                      primary={cat.name}
                      slotProps={{
                        primary: {
                          sx: {
                            fontSize: { xs: "0.85rem", md: "0.9rem" },
                            fontWeight: isCurrentUrl ? 700 : 500,
                          },
                        },
                      }}
                    />
                    {isMenuOpen ? (
                      <KeyboardArrowDownIcon fontSize="small" sx={{ opacity: 0.7 }} />
                    ) : (
                      <KeyboardArrowRightIcon fontSize="small" sx={{ opacity: 0.5 }} />
                    )}
                  </ListItemButton>

                  <Collapse in={isMenuOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding sx={{ pl: 2, mt: 0.5 }}>
                      {cat.subCategories?.map((sub) => {
                        const isSubActive = cat.slug === currentSlug && sub.slug === currentSubSlug;
                        return (
                          <ListItemButton
                            key={sub.id}
                            component={Link}
                            href={`/categories/${cat.slug}/${sub.slug}`}
                            selected={isSubActive}
                            sx={{
                              borderRadius: "6px",
                              mb: 0.2,
                              py: { xs: 0.4, md: 0.5 },
                              "&:hover": { backgroundColor: "#f8fafc" },
                              "&.Mui-selected": {
                                backgroundColor: "#fff3e0",
                                "&:hover": { backgroundColor: "#ffe0b2" },
                              },
                            }}
                          >
                            <ListItemText
                              primary={sub.name}
                              slotProps={{
                                primary: {
                                  sx: {
                                    fontSize: { xs: "0.8rem", md: "0.825rem" },
                                    color: isSubActive ? "#ff6b00" : "#475569",
                                    fontWeight: isSubActive ? 600 : 400,
                                  },
                                },
                              }}
                            />
                          </ListItemButton>
                        );
                      })}
                    </List>
                  </Collapse>
                </Box>
              );
            })}
          </List>
        )}
      </Box>

      {/* Main Content Area — swaps between category tiles and product grid without remounting the sidebar */}
      <Box sx={{ flex: 1, width: "100%", minWidth: 0 }}>
        <CategoryProvider value={{ categories, loading, hasError }}>{children}</CategoryProvider>
      </Box>
    </Box>
  );
}
