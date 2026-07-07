"use client";

import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, IconButton, CircularProgress } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

interface BrandItem {
  id: number;
  image: string;
}

export default function Brands() {
  const [brands, setBrands] = useState<BrandItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // JSON-server və ya backend-dən datanın fetch olunması
  useEffect(() => {
    fetch("http://localhost:5000/brands", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: BrandItem[]) => {
        setBrands(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Brend məlumatı yüklənərkən xəttə:", err);
        setLoading(false);
      });
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

  return (
    <Box
      sx={{
        maxWidth: 1166,
        mx: "auto",
        px: { xs: 2, md: 0 },
        mt: 6,
        mb: 6,
        position: "relative", 
      }}
    >
      {/* Başlıq */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          mb: 3,
          color: "#0f172a",
          fontSize: { xs: "1.25rem", md: "1.5rem" },
        }}
      >
        Brands
      </Typography>
      <Box sx={{ position: "relative", display: "flex", alignItems: "center" }}>
        <IconButton
          onClick={() => handleScroll("left")}
          sx={{
            position: "absolute",
            left: -20,
            zIndex: 10,
            backgroundColor: "#ffffff",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
            border: "1px solid #f1f5f9",
            display: { xs: "none", sm: "flex" }, // Mobildə barmaqla sürüşdürmə bəs edir
            "&:hover": { backgroundColor: "#f8fafc" },
            width: 40,
            height: 40,
          }}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: "1rem", color: "#0f172a" }} />
        </IconButton>

        {/* Brands where we scroll */}
        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            width: "100%",
            py: 1,
        
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            scrollBehavior: "smooth",
          }}
        >
          {brands.map((brand) => (
            <Box
              key={brand.id}
              sx={{
              
                minWidth: {
                  xs: "calc(25% - 12px)",
                  sm: "calc(16.66% - 14px)",
                  md: "80px",
                },

             
                height: 70,

                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ffffff",
                border: "1px solid #f1f5f9",
                borderRadius: "12px 4px 12px 4px",
                p: 1, 
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
                sx={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>
          ))}
        </Box>

        {/* SAĞ OX DUYMƏSİ */}
        <IconButton
          onClick={() => handleScroll("right")}
          sx={{
            position: "absolute",
            right: -20,
            zIndex: 10,
            backgroundColor: "#ffffff",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
            border: "1px solid #f1f5f9",
            display: { xs: "none", sm: "flex" },
            "&:hover": { backgroundColor: "#f8fafc" },
            width: 44,
            height: 44,
          }}
        >
          <ArrowForwardIosIcon
            sx={{ fontSize: "1rem", color: "#0f172a", pl: "4px" }}
          />
        </IconButton>
      </Box>
    </Box>
  );
}
