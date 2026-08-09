"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Box, Typography, Card, CircularProgress } from '@mui/material';
import { useCategoryContext } from '../categoryContext';

export default function CategoryDetailPage() {
  const params = useParams();
  const currentSlug = (params?.slug as string) || "";

  const { categories, loading, hasError } = useCategoryContext();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress sx={{ color: '#ff6b00' }} />
      </Box>
    );
  }

  if (hasError) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4, color: '#64748b' }}>
        <Typography>Couldn&apos;t load categories. Please try again later.</Typography>
      </Box>
    );
  }

  const activeCategory = categories.find(cat => cat.slug === currentSlug);
  const displaySubCategories = activeCategory?.subCategories || [];

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{ fontWeight: 'bold', mb: { xs: 2, md: 3 }, color: '#0f172a', fontSize: { xs: '1.1rem', md: '1.5rem' } }}
      >
        {activeCategory ? activeCategory.name : 'Category Not Found'}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: { xs: 1.25, sm: 2 },
          width: '100%',
        }}
      >
        {displaySubCategories.length > 0 ? (
          displaySubCategories.map((sub) => (
            <Card
              key={sub.id}
              component={Link}
              href={`/categories/${currentSlug}/${sub.slug}`}
              sx={{
                textDecoration: 'none',
                width: {
                  xs: 'calc(50% - 7px)',
                  sm: 'calc(33.33% - 11px)',
                  md: 'calc(25% - 12px)',
                },
                height: { xs: 220, sm: 240, md: 260 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: { xs: 1.5, md: 2 },
                boxShadow: 'none',
                border: '1px solid #f1f5f9',
                backgroundColor: '#f8fafc',
                borderRadius: '16px',
                cursor: 'pointer',
                boxSizing: 'border-box',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0px 8px 24px rgba(255, 107, 0, 0.08)',
                  backgroundColor: '#ffffff',
                  borderColor: '#ff6b00',
                },
              }}
            >
              {/* Title area */}
              <Box sx={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1, width: '100%' }}>
                <Typography
                  sx={{
                    fontSize: { xs: '0.72rem', md: '0.8rem' },
                    fontWeight: 700,
                    color: '#0f172a',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    textAlign: 'center',
                    lineHeight: 1.2,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {sub.name}
                </Typography>
              </Box>

              {/* Image area */}
              <Box
                sx={{
                  flex: 1,
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  overflow: 'hidden',
                  p: 1,
                }}
              >
                {sub.img ? (
                  <Box
                    component="img"
                    src={sub.img}
                    alt={sub.name}
                    sx={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                ) : (
                  <Typography sx={{ color: '#94a3b8', fontSize: { xs: '0.72rem', md: '0.8rem' }, fontStyle: 'italic' }}>
                    📦 No Image
                  </Typography>
                )}
              </Box>
            </Card>
          ))
        ) : (
          <Typography sx={{ color: '#64748b', fontStyle: 'italic', pl: 1 }}>
            No items found.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
