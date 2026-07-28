'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Stack,
  CircularProgress,
  Alert,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PercentIcon from '@mui/icons-material/Percent';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export interface Product {
  id: number;
  name: string;
  brand?: string;
  category?: string;
  subCategory?: string;
  price: number;
  monthlyPayment?: number;
  description?: string;
  images: string[];
  inStock?: boolean;
}

const PURPLE = '#6c5ce7';
const PURPLE_DARK = '#5a4bcf';
const CARD_WIDTH = { xs: '260px', sm: '270px', md: '280px' };

const navButtonSx = {
  position: 'absolute',
  top: '45%',
  transform: 'translateY(-50%)',
  zIndex: 10,
  backgroundColor: '#fff',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  border: '1px solid #eee',
  width: 44,
  height: 44,
  transition: '0.2s ease-in-out',
  '&:hover': { backgroundColor: '#f5f5f5', transform: 'translateY(-50%) scale(1.05)' },
} as const;

const iconBtnSx = { backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' };
const linkStyle = { textDecoration: 'none', color: 'inherit' };

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        if (!res.ok) throw new Error('Failed to load data.');
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const cardWidth = 296;
    scrollRef.current?.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
        <CircularProgress sx={{ color: PURPLE }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="body1">No products found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, backgroundColor: '#f9f9fb', position: 'relative' }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
        Deals & Discounts
      </Typography>

      <Box sx={{ position: 'relative' }}>
        {/* Scroll navigation buttons */}
        <IconButton onClick={() => scroll('right')} sx={{ ...navButtonSx, right: -18 }}>
          <ChevronRightIcon sx={{ color: '#333', fontSize: 28 }} />
        </IconButton>
        <IconButton onClick={() => scroll('left')} sx={{ ...navButtonSx, left: -18 }}>
          <ChevronLeftIcon sx={{ color: '#333', fontSize: 28 }} />
        </IconButton>

        {/* Horizontal scrollable product row */}
        <Box
          ref={scrollRef}
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            scrollSnapType: 'x mandatory',
            py: 1,
            px: 0.5,
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {products.map((product) => {
            const imageUrl = product.images?.[0] || '/placeholder.png';
            const href = `/products/${product.id}`;
            const inStock = product.inStock !== false;

            return (
              <Card
                key={product.id}
                elevation={0}
                sx={{
                  minWidth: CARD_WIDTH,
                  maxWidth: CARD_WIDTH,
                  flexShrink: 0,
                  borderRadius: '16px',
                  border: '1px solid #e0e0e0',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  p: 1.5,
                  scrollSnapAlign: 'start',
                  transition: '0.3s',
                  '&:hover': { boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
                }}
              >
                {/* Discount badge */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    backgroundColor: '#ff002b',
                    color: '#fff',
                    borderRadius: '8px',
                    p: 0.8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                  }}
                >
                  <PercentIcon sx={{ fontSize: 18 }} />
                </Box>

                {/* Top-right action buttons */}
                <Stack spacing={1} sx={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}>
                  <IconButton size="small" sx={iconBtnSx}>
                    <CompareArrowsIcon fontSize="small" sx={{ color: '#666' }} />
                  </IconButton>
                  <IconButton size="small" sx={iconBtnSx}>
                    <FavoriteBorderIcon fontSize="small" sx={{ color: '#666' }} />
                  </IconButton>
                </Stack>

                {/* Image - links to product detail page */}
                <Link href={href} style={linkStyle}>
                  <Box
                    sx={{
                      height: 180,
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      mt: 2,
                      cursor: 'pointer',
                    }}
                  >
                    <Box component="img" src={imageUrl} alt={product.name} sx={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                  </Box>
                </Link>

                {/* Product info */}
                <CardContent sx={{ p: 1, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Link href={href} style={linkStyle}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: '#1a1a1a',
                        mb: 2,
                        minHeight: '40px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        '&:hover': { color: PURPLE },
                      }}
                    >
                      {product.name}
                    </Typography>
                  </Link>

                  <Box sx={{ mt: 'auto' }}>
                    {/* Price */}
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000', mb: 0.5 }}>
                      {product.price} GEL
                    </Typography>

                    {/* Monthly installment */}
                    {product.monthlyPayment ? (
                      <Typography variant="caption" sx={{ color: '#6b7280', display: 'block', mb: 2 }}>
                        From <b style={{ color: PURPLE }}>{product.monthlyPayment} GEL</b>/month
                      </Typography>
                    ) : (
                      <Box sx={{ height: '20px', mb: 2 }} />
                    )}

                    {/* Bottom actions */}
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <IconButton sx={{ border: '1px solid #e0e0e0', borderRadius: '50%', p: 1 }}>
                        <ShoppingCartOutlinedIcon sx={{ fontSize: 20, color: '#333' }} />
                      </IconButton>

                      <Button
                        component={Link}
                        href={href}
                        fullWidth
                        variant="contained"
                        disabled={!inStock}
                        sx={{
                          borderRadius: '20px',
                          textTransform: 'none',
                          fontWeight: 'bold',
                          backgroundColor: inStock ? PURPLE : '#8c7ae6',
                          '&:hover': { backgroundColor: PURPLE_DARK },
                        }}
                      >
                        {inStock ? 'Buy' : 'In-store only'}
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}