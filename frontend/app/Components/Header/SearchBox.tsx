"use client";

import React, { useEffect, useState, FocusEvent } from "react";
import Link from "next/link";
import { alpha } from "@mui/material/styles";
import {
  Box,
  InputBase,
  Popper,
  Paper,
  Typography,
  ClickAwayListener,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { API_BASE_URL } from "@/app/lib/apiConfig";
import { extractArray } from "@/app/lib/extractArray";

interface SearchProduct {
  id: number;
  name: string;
  brand?: string;
  price: number;
  images: string[];
}

const MAX_RESULTS = 8;

interface SearchBoxProps {
  variant?: "desktop" | "mobile";
  onFocusChange?: (focused: boolean) => void;
}

export default function SearchBox({ variant = "desktop", onFocusChange }: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<SearchProduct[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [focused, setFocused] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Catalog is fetched once, lazily, the first time the box is actually used.
  useEffect(() => {
    if (!focused || loaded) return;

    const controller = new AbortController();

    const loadProducts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/products`, {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to load products");
        const data: unknown = await res.json();
        setProducts(extractArray<SearchProduct>(data, ["products", "data"]));
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        console.error("Search fetch error:", err);
      } finally {
        if (!controller.signal.aborted) setLoaded(true);
      }
    };

    loadProducts();

    return () => controller.abort();
  }, [focused, loaded]);

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setAnchorEl(e.currentTarget);
    setFocused(true);
    onFocusChange?.(true);
  };

  const handleClose = () => {
    setFocused(false);
    onFocusChange?.(false);
  };

  const trimmedQuery = query.trim().toLowerCase();
  const results = trimmedQuery
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(trimmedQuery) ||
            p.brand?.toLowerCase().includes(trimmedQuery)
        )
        .slice(0, MAX_RESULTS)
    : [];

  const showLoading = focused && trimmedQuery.length > 0 && !loaded;
  const open = focused && trimmedQuery.length > 0;
  const isMobile = variant === "mobile";

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box sx={{ position: "relative", width: isMobile ? "auto" : { xs: "100%", sm: "auto" } }}>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            borderRadius: "50px",
            backgroundColor: alpha("#ffffff", focused ? 0.28 : 0.15),
            transition: "background-color 0.2s ease, width 0.2s ease",
            width: isMobile ? (focused ? { xs: "160px", sm: "240px" } : "38px") : "auto",
            height: isMobile ? 38 : "auto",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              height: "100%",
              px: isMobile ? 1.2 : 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              flexShrink: 0,
            }}
          >
            <SearchIcon sx={{ fontSize: isMobile ? 20 : 22, color: "#ffffff" }} />
          </Box>
          <InputBase
            placeholder={isMobile ? "Search..." : "What are you looking for?..."}
            inputProps={{ "aria-label": "search" }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            sx={{
              color: "#ffffff",
              flex: 1,
              minWidth: 0,
              "& .MuiInputBase-input": {
                padding: isMobile ? "0 8px 0 0" : "8px 8px 8px 0",
                fontSize: isMobile ? 14 : "inherit",
                width: isMobile ? "100%" : { sm: "30ch" },
                transition: "width 0.2s ease",
                "&::placeholder": { color: "rgba(255,255,255,0.85)", opacity: 1 },
              },
            }}
          />
        </Box>

        <Popper
          open={open}
          anchorEl={anchorEl}
          placement="bottom-start"
          style={{ zIndex: 1300 }}
        >
          <Paper
            elevation={4}
            sx={{
              mt: 1,
              borderRadius: 2,
              width: { xs: "88vw", sm: 360 },
              maxWidth: 400,
              overflow: "hidden",
            }}
          >
            {showLoading ? (
              <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
                <CircularProgress size={22} sx={{ color: "#F97316" }} />
              </Box>
            ) : results.length > 0 ? (
              <Box sx={{ maxHeight: 360, overflowY: "auto" }}>
                {results.map((product) => (
                  <Box
                    key={product.id}
                    component={Link}
                    href={`/products/${product.id}`}
                    onClick={handleClose}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      p: 1.25,
                      textDecoration: "none",
                      color: "inherit",
                      borderBottom: "1px solid #f1f5f9",
                      transition: "background-color 0.15s ease",
                      "&:hover": { backgroundColor: "#fff7ed" },
                      "&:last-of-type": { borderBottom: "none" },
                    }}
                  >
                    <Box
                      component="img"
                      src={product.images?.[0] || "/placeholder.png"}
                      alt={product.name}
                      sx={{
                        width: 40,
                        height: 40,
                        objectFit: "contain",
                        borderRadius: 1,
                        border: "1px solid #f1f5f9",
                        flexShrink: 0,
                      }}
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography noWrap sx={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>
                        {product.name}
                      </Typography>
                      {product.brand && (
                        <Typography sx={{ fontSize: 11.5, color: "#94a3b8" }}>{product.brand}</Typography>
                      )}
                    </Box>
                    <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#0f172a", flexShrink: 0 }}>
                      {product.price} GEL
                    </Typography>
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography sx={{ p: 2.5, fontSize: 13.5, color: "#94a3b8", textAlign: "center" }}>
                No results found for &quot;{query}&quot;.
              </Typography>
            )}
          </Paper>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
}
