"use client";

import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, IconButton, CircularProgress } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { API_BASE_URL } from "@/app/lib/apiConfig";
import { extractArray } from "@/app/lib/extractArray";

interface BrandItem {
  id: number;
  image: string;
}

export default function Brands() {
  const [brands, setBrands] = useState<BrandItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchBrands = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/brands`, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        const data: unknown = await res.json();
        const extractedBrands = extractArray<unknown>(data, ["brands", "data"]);

        const validBrands: BrandItem[] = extractedBrands
          .filter(
            (item): item is { id?: number; image: string } =>
              typeof item === "object" &&
              item !== null &&
              "image" in item &&
              typeof (item as { image: unknown }).image === "string"
          )
          .map((item, index) => ({
            id: item.id !== undefined && item.id !== null ? item.id : index,
            image: item.image,
          }));

        if (!controller.signal.aborted) {
          setBrands(validBrands);
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }
        console.error("Brands fetch error:", err);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchBrands();

    return () => {
      controller.abort();
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth / 2;

      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress sx={{ color: "#ff6b00" }} />
      </Box>
    );
  }

  if (brands.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        maxWidth: 1166,
        width: "100%",
        minWidth: 0,
        mx: "auto",
        px: { xs: 2, sm: 3, md: 0 },
        mt: { xs: 4, md: 6 },
        mb: { xs: 4, md: 6 },
        position: "relative",
      }}
    >
      {/* Header */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          mb: { xs: 2, md: 3 },
          color: "#0f172a",
          fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
        }}
      >
        Brands
      </Typography>

      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          width: "100%",
          maxWidth: "100%",
          minWidth: 0,
          mx: { xs: -2, sm: -3, md: 0 },
          px: { xs: 2, sm: 3, md: 0 },
        }}
      >
        {/* Handle scroll left */}
        <IconButton
          onClick={() => handleScroll("left")}
          sx={{
            position: "absolute",
            left: { xs: 0, sm: -8, md: -20 },
            zIndex: 10,
            backgroundColor: "rgba(255,255,255,0.9)",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
            border: "1px solid #f1f5f9",
            display: "flex",
            "&:hover": { backgroundColor: "#f8fafc" },
            width: { xs: 30, sm: 36, md: 40 },
            height: { xs: 30, sm: 36, md: 40 },
          }}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: { xs: "0.8rem", md: "1rem" }, color: "#0f172a" }} />
        </IconButton>

        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            gap: { xs: 1.5, sm: 2 },
            overflowX: "auto",
            width: "100%",
            minWidth: 0,
            py: 1,
            px: { xs: 4.5, sm: 0 },
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            scrollBehavior: "smooth",
            scrollSnapType: { xs: "x mandatory", md: "none" },
            WebkitOverflowScrolling: "touch",
          }}
        >
          {brands.map((brand) => (
            <Box
              key={brand.id}
              sx={{
                flex: "0 0 auto",
                scrollSnapAlign: { xs: "start", md: "none" },
                width: { xs: 90, sm: 100, md: 90, lg: 100 },
                minWidth: { xs: 90, sm: 100, md: 90, lg: 100 },
                height: { xs: 56, sm: 64, md: 70 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ffffff",
                border: "1px solid #f1f5f9",
                borderRadius: "12px 4px 12px 4px",
                p: { xs: 0.75, sm: 1 },
                boxSizing: "border-box",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  borderColor: "#e2e8f0",
                  boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.04)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <Box
                component="img"
                src={brand.image}
                alt={`Brand ${brand.id}`}
                loading="lazy"
                sx={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>
          ))}
        </Box>

        {/* Handle scroll right */}
        <IconButton
          onClick={() => handleScroll("right")}
          sx={{
            position: "absolute",
            right: { xs: 0, sm: -8, md: -20 },
            zIndex: 10,
            backgroundColor: "rgba(255,255,255,0.9)",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
            border: "1px solid #f1f5f9",
            display: "flex",
            "&:hover": { backgroundColor: "#f8fafc" },
            width: { xs: 30, sm: 40, md: 44 },
            height: { xs: 30, sm: 40, md: 44 },
          }}
        >
          <ArrowForwardIosIcon
            sx={{ fontSize: { xs: "0.8rem", md: "1rem" }, color: "#0f172a", pl: "4px" }}
          />
        </IconButton>
      </Box>
    </Box>
  );
}