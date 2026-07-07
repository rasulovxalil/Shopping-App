"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box, Typography, List, ListItemButton, ListItemText, Collapse, Card, CircularProgress } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface SubCategory {
  id: number;
  name: string;
  slug: string;
  img?: string;
}

interface CategoryItem {
  id: string | number;
  name: string;
  slug: string;
  subCategories?: SubCategory[];
}

interface RawResponseData {
  categories?: unknown;
}

export default function CategoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  
  const currentSlug = (params?.slug as string) || "";

  const [allCategories, setAllCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const [openMainSlug, setOpenMainSlug] = useState<string | null>(null);
  const [selectedSubSlug, setSelectedSubSlug] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, { cache: 'no-store' })
      .then((res) => res.json())
      .then((data: unknown) => {
        let extracted: CategoryItem[] = [];
        
        if (Array.isArray(data)) {
          extracted = data as CategoryItem[];
        } else if (data && typeof data === 'object' && 'categories' in data) {
          const innerData = (data as RawResponseData).categories;
          if (Array.isArray(innerData)) {
            extracted = innerData as CategoryItem[];
          }
        }
        
        setAllCategories(extracted);
        setOpenMainSlug(currentSlug);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Network Error:", err);
        setLoading(false);
      });
  }, [currentSlug]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress sx={{ color: '#ff6b00' }} />
      </Box>
    );
  }

  const activeCategory = allCategories.find(cat => cat.slug === currentSlug);
  const displaySubCategories = activeCategory?.subCategories || [];

  const filteredSubs = selectedSubSlug 
    ? displaySubCategories.filter(sub => sub.slug === selectedSubSlug)
    : displaySubCategories;

  return (
    <Box 
      sx={{ 
        position: 'absolute',
        top: { xs: '60px', md: '90px' }, 
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        gap: { xs: 2, md: 4 }, 
        maxWidth: 1166, 
        width: '100%',
        px: { xs: 2, md: 0 },
        pb: 12,
        alignItems: 'flex-start',
      }}
    >
      {/* Menu */}
      <Box 
        sx={{ 
          width: { xs: '100%', md: '280px' }, 
          border: '1px solid #e2e8f0', 
          borderRadius: '12px', 
          p: 1,
          backgroundColor: '#ffffff',
          position: { xs: 'relative', md: 'sticky' }, 
          top: { xs: 'auto', md: '20px' },
          boxSizing: 'border-box',
          flexShrink: 0
        }}
      >
        <Typography sx={{ fontWeight: 'bold', p: 2, color: '#0f172a' }}>
          Categories
        </Typography>
        <List component="nav" disablePadding>
          {allCategories.map((cat) => {
            const isCurrentUrl = cat.slug === currentSlug;
            const isMenuOpen = openMainSlug === cat.slug;
            
            return (
              <Box key={cat.id} sx={{ mb: 0.5 }}>
                <ListItemButton 
                  selected={isCurrentUrl}
                  onClick={() => {
                    setSelectedSubSlug(null); 
                    if (isMenuOpen) {
                      setOpenMainSlug(null);
                    } else {
                      setOpenMainSlug(cat.slug);
                    }
                    router.push(`/categories/${cat.slug}`);
                  }}
                  sx={{
                    borderRadius: '8px',
                    '&.Mui-selected': {
                      backgroundColor: '#fff3e0',
                      color: '#ff6b00',
                      '&:hover': { backgroundColor: '#ffe0b2' }
                    }
                  }}
                >
                  <ListItemText 
                    primary={cat.name} 
                    slotProps={{
                      primary: {
                        sx: {
                          fontSize: '0.9rem',
                          fontWeight: isCurrentUrl ? 700 : 500
                        }
                      }
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
                      const isSubActive = selectedSubSlug === sub.slug;
                      return (
                        <ListItemButton
                          key={sub.id}
                          onClick={() => setSelectedSubSlug(sub.slug)}
                          sx={{
                            borderRadius: '6px',
                            mb: 0.2,
                            py: 0.5,
                            backgroundColor: isSubActive ? '#f1f5f9' : 'transparent',
                            '&:hover': { backgroundColor: '#f8fafc' }
                          }}
                        >
                          <ListItemText 
                            primary={sub.name} 
                            slotProps={{
                              primary: {
                                sx: {
                                  fontSize: '0.825rem',
                                  color: isSubActive ? '#ff6b00' : '#475569',
                                  fontWeight: isSubActive ? 600 : 400
                                }
                              }
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
      </Box>

      {/* Subcategories */}
      <Box sx={{ flex: 1, width: '100%' }}>
        <Typography 
          variant="h5" 
          sx={{ fontWeight: 'bold', mb: 3, color: '#0f172a', fontSize: { xs: '1.25rem', md: '1.5rem' } }}
        >
          {activeCategory ? activeCategory.name : 'Category Not Found'}
        </Typography>

        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 2,
            width: '100%'
          }}
        >
          {filteredSubs.length > 0 ? (
            filteredSubs.map((sub) => (
              <Card
                key={sub.id}
                sx={{
                  width: { 
                    xs: 'calc(50% - 8px)', 
                    sm: 'calc(33.33% - 11px)', 
                    md: 'calc(25% - 12px)' 
                  },
                  height: 190, 
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start', 
                  p: 2,
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
                    borderColor: '#ff6b00'
                  }
                }}
              >
                <Typography 
                  sx={{ 
                    fontSize: '0.8rem', 
                    fontWeight: 700, 
                    color: '#0f172a',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    textAlign: 'center',
                    width: '100%',
                    mb: 1.5,
                    whiteSpace: 'normal',
                    wordBreak: 'break-word'
                  }}
                >
                  {sub.name}
                </Typography>

                <Box 
                  sx={{ 
                    flex: 1,
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    width: '100%',
                    height: '110px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  {sub.img ? (
                    <Box
                      component="img"
                      src={sub.img}
                      alt={sub.name}
                      sx={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  ) : (
                    <Typography sx={{ color: '#94a3b8', fontSize: '0.8rem', fontStyle: 'italic' }}>
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
    </Box>
  );
}