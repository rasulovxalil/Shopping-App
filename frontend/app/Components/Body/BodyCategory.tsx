"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import Link from "next/link";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import TvIcon from "@mui/icons-material/Tv";
import ComputerIcon from "@mui/icons-material/Computer";
import CountertopsIcon from "@mui/icons-material/Countertops";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ErrorIcon from "@mui/icons-material/Error";
import { API_BASE_URL } from "@/app/lib/apiConfig";
import { extractArray } from "@/app/lib/extractArray";

interface SubCategory {
  id: number;
  name: string;
  slug: string;
}

interface CategoryItem {
  id: string | number;
  name: string;
  slug: string;
  icon: string;
  subCategories?: SubCategory[];
}

interface RawCategoryItem {
  id?: string | number;
  name: string;
  slug: string;
  icon?: string;
  subCategories?: unknown;
}

const getIcon = (iconName: string | undefined): React.JSX.Element => {
  const iconStyle = {
    fontSize: { xs: 40, md: 48 }, 
    color: "#ff6b00",
    opacity: 0.9,
  };

  switch (iconName) {
    case "PhoneAndroidIcon":
      return <PhoneAndroidIcon sx={iconStyle} />;
    case "TvIcon":
      return <TvIcon sx={iconStyle} />;
    case "ComputerIcon":
      return <ComputerIcon sx={iconStyle} />;
    case "CountertopsIcon":
      return <CountertopsIcon sx={iconStyle} />;
    case "SportsEsportsIcon":
      return <SportsEsportsIcon sx={iconStyle} />;
    default:
      return <ErrorIcon sx={iconStyle} />;
  }
};

export default function Categories(): React.JSX.Element {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

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
        const extractedCategories = extractArray<unknown>(data, ["categories"]);

        const validCategories: CategoryItem[] = extractedCategories
          .filter(
            (item): item is RawCategoryItem =>
              typeof item === "object" &&
              item !== null &&
              "name" in item &&
              typeof (item as { name: unknown }).name === "string" &&
              "slug" in item &&
              typeof (item as { slug: unknown }).slug === "string"
          )
          .map((item, index) => {
            const nameStr = String(item.name);
            const slugStr = String(item.slug);
            const iconStr = item.icon ? String(item.icon) : "PhoneAndroidIcon";

            return {
              id: item.id !== undefined && item.id !== null ? item.id : `cat-${index}`,
              name: nameStr,
              slug: slugStr,
              icon: iconStr,
            };
          });

        if (!controller.signal.aborted) {
          setCategories(validCategories);
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
        console.error("Categories fetch error:", error);
        if (!controller.signal.aborted) {
          setHasError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchCategories();

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <CircularProgress sx={{ color: "#ff6b00" }} />
      </Box>
    );
  }

  if (hasError || categories.length === 0) return <></>;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1166,
        mx: "auto",
        mt: 4,
        mb: 6,
        px: { xs: 2, md: 0 },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          color: "#0f172a",
          mb: 3,
          fontSize: { xs: "1.25rem", md: "1.5rem" },
        }}
      >
        Categories
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {categories.map((category) => (
          <Box
            key={category.id}
            component={Link}
            href={`/categories/${category.slug}`}
            sx={{
              width: {
                xs: "calc(50% - 8px)",
                sm: "calc(33.33% - 11px)",
                md: "calc(20% - 13px)",
              },
              backgroundColor: "#fff3e0",
              borderRadius: "16px",
              p: 2,
              height: 120,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "stretch",
              cursor: "pointer",
              textDecoration: "none",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0px 4px 20px rgba(255, 107, 0, 0.18)",
              },
            }}
          >
            {/* Category name */}
            <Box
              sx={{ width: "55%", display: "flex", alignItems: "flex-start" }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "0.85rem", md: "0.95rem" },
                  color: "#2e1f15",
                  lineHeight: 1.3,
                  wordBreak: "break-word",
                }}
              >
                {category.name}
              </Typography>
            </Box>

            {/* Icons */}
            <Box
              sx={{
                width: "45%",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                pr: 0.5,
                pb: 0.5,
              }}
            >
              {getIcon(category.icon)}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}