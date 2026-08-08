'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import NextLink from 'next/link';
import {
  Box, Container, Typography, Card, IconButton, Stack, Button,
  Breadcrumbs, Link as MuiLink, Table, TableBody, TableCell,
  TableContainer, TableRow, Paper, CircularProgress, Alert,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ShareIcon from '@mui/icons-material/Share';
import { API_BASE_URL } from '@/app/lib/apiConfig';

interface Product {
  id: number;
  name: string;
  brand?: string;
  category?: string;
  subCategory?: string;
  price: number;
  description?: string;
  images: string[];
}

const TABS = ['MAIN', 'SPECIFICATIONS', 'SIMILAR'] as const;
type Tab = (typeof TABS)[number];

const PURPLE = '#6c5ce7';
const PURPLE_DARK = '#5a4bcf';
const rowSx = { display: 'flex', justifyContent: 'space-between' };
const labelSx = { color: '#777', fontSize: '14px' };
const valueSx = { fontWeight: 600, color: '#000', fontSize: '14px' };

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('MAIN');
  const [activeImg, setActiveImg] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_BASE_URL}/products/${id}`, { signal: controller.signal });
        if (!res.ok) throw new Error(res.status === 404 ? 'No data found' : "Couldn't load data");
        const data: Product = await res.json();
        setProduct(data);
        setActiveImg(null);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Unexpected error occured');
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [id]);

  const onImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://via.placeholder.com/400x400?text=No+Image';
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress sx={{ color: PURPLE }} />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Alert severity="error" sx={{ mb: 3 }}>{error || 'Couldnt find product.'}</Alert>
        <Button
          component={NextLink}
          href="/"
          variant="contained"
          sx={{ backgroundColor: PURPLE, borderRadius: '20px', textTransform: 'none', fontWeight: 'bold', '&:hover': { backgroundColor: PURPLE_DARK } }}
        >
          Return HomePage
        </Button>
      </Container>
    );
  }

  const images = product.images?.length ? product.images : ['https://via.placeholder.com/400x400?text=No+Image'];
  const activeImage = activeImg || images[0];

  const details = [
    { label: 'Brand :', value: product.brand },
    { label: 'Model/PN :', value: product.name },
    { label: 'Type :', value: product.subCategory },
  ].filter((d) => d.value);

  return (
    <Box sx={{ backgroundColor: '#fff', pb: 4 }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 }, pt: { xs: 2, md: 3 } }}>

        {/* Breadcrumbs & Code */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Breadcrumbs separator=">" sx={{ fontSize: '13px' }}>
            <MuiLink component={NextLink} underline="hover" color="inherit" href="/">Home Page</MuiLink>
            {product.category && <MuiLink component={NextLink} underline="hover" color="inherit" href="#">{product.category}</MuiLink>}
            {product.subCategory && <Typography color="text.primary" sx={{ fontSize: '13px' }}>{product.subCategory}</Typography>}
          </Breadcrumbs>
          <Typography variant="body2" sx={{ color: '#666', fontSize: '13px', fontWeight: 500 }}>Code: {product.id}</Typography>
        </Box>

        {/* Tabs */}
        <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #eaeaea', mb: 3, gap: 3 }}>
          {TABS.map((tab) => (
            <Typography
              key={tab}
              onClick={() => setActiveTab(tab)}
              variant="subtitle2"
              sx={{
                fontWeight: 'bold',
                color: activeTab === tab ? PURPLE : '#555',
                borderBottom: activeTab === tab ? `2px solid ${PURPLE}` : '2px solid transparent',
                pb: 1, cursor: 'pointer', fontSize: '14px', transition: '0.2s',
                '&:hover': { color: PURPLE },
              }}
            >
              {tab}
            </Typography>
          ))}
          <IconButton size="small" sx={{ mb: 1, ml: 'auto' }}>
            <ShareIcon fontSize="small" sx={{ color: '#666' }} />
          </IconButton>
        </Box>

        {/* MAIN */}
        {activeTab === 'MAIN' && (
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 3, md: 6 }, alignItems: 'flex-start' }}>

            {/* Galeria */}
            <Box sx={{ display: 'flex', gap: 2, width: { xs: '100%', md: 'auto' } }}>
              <Stack spacing={1.5} sx={{ alignItems: 'center' }}>
                <IconButton size="small" sx={{ border: '1px solid #eee', borderRadius: '50%', width: 40, height: 40, mb: 1, bgcolor: '#fff', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                  <FavoriteBorderIcon fontSize="small" sx={{ color: '#666' }} />
                </IconButton>

                {images.map((img, idx) => (
                  <Box
                    key={idx}
                    onClick={() => setActiveImg(img)}
                    sx={{
                      width: 60, height: 60, borderRadius: '12px', cursor: 'pointer', p: 0.5,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#fff',
                      border: activeImage === img ? `2px solid ${PURPLE}` : '1px solid #e0e0e0',
                      transition: '0.2s', '&:hover': { borderColor: PURPLE },
                    }}
                  >
                    <Box component="img" src={img} alt={`thumb-${idx}`} onError={onImgError} sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  </Box>
                ))}
              </Stack>

              <Box sx={{ position: 'relative', width: { xs: '100%', sm: 380, md: 420 }, height: 380, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box component="img" src={activeImage} alt={product.name} onError={onImgError} sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                {images.length > 1 && (
                  <IconButton
                    onClick={() => setActiveImg(images[(images.indexOf(activeImage) + 1) % images.length])}
                    sx={{ position: 'absolute', right: -10, bgcolor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.12)', border: '1px solid #eee', '&:hover': { bgcolor: '#f9f9f9' } }}
                  >
                    <ChevronRightIcon />
                  </IconButton>
                )}
              </Box>
            </Box>

            {/* Detallar */}
            <Box sx={{ flex: 1, width: '100%' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, fontSize: { xs: '20px', md: '24px' }, mb: 3 }}>{product.name}</Typography>

              <Card elevation={0} sx={{ p: 3, borderRadius: '20px', border: '1px solid #f0f0f0', bgcolor: '#fafafa', maxWidth: 520 }}>
                <Stack spacing={2} sx={{ mb: 4 }}>
                  {details.map((d) => (
                    <Box key={d.label} sx={rowSx}>
                      <Typography variant="body2" sx={labelSx}>{d.label}</Typography>
                      <Typography variant="body2" sx={valueSx}>{d.value}</Typography>
                    </Box>
                  ))}
                </Stack>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eaeaea', pb: 2.5, mb: 2.5 }}>
                  <Typography variant="h4" sx={{ fontWeight: 800 }}>{product.price} GEL</Typography>
                  <Button variant="contained" sx={{ bgcolor: PURPLE, borderRadius: '20px', px: 4, py: 1, textTransform: 'none', fontWeight: 'bold', boxShadow: 'none', '&:hover': { bgcolor: PURPLE_DARK } }}>
                    Buy
                  </Button>
                </Box>

                <Button fullWidth variant="outlined" startIcon={<ShoppingCartOutlinedIcon />} sx={{ borderRadius: '25px', py: 1.2, color: '#333', borderColor: '#e0e0e0', textTransform: 'none', fontWeight: 'bold', '&:hover': { borderColor: '#ccc', bgcolor: '#f9f9f9' } }}>
                  Add
                </Button>
              </Card>
            </Box>
          </Box>
        )}

        {/* SPECIFICATIONS */}
        {activeTab === 'SPECIFICATIONS' && (
          <Box sx={{ py: 2, maxWidth: 700 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Product Specifications</Typography>
            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #eee' }}>
              <Table>
                <TableBody>
                  {[
                    ['Brand', product.brand],
                    ['Category', product.category],
                    ['Sub Category', product.subCategory],
                    ['Description', product.description],
                  ].map(([label, value]) => (
                    <TableRow key={label}>
                      <TableCell sx={{ fontWeight: 'bold', color: '#666', width: '30%' }}>{label}</TableCell>
                      <TableCell>{value || 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* SIMILAR */}
        {activeTab === 'SIMILAR' && (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">No similar products available right now.</Typography>
          </Box>
        )}

        <Box sx={{ borderTop: '1px solid #eaeaea', mt: 5 }} />
      </Container>
    </Box>
  );
}