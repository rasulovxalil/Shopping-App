"use client";

import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';
import { API_BASE_URL } from '@/app/lib/apiConfig';
import { extractArray } from '@/app/lib/extractArray';

interface BannerItem {
  id: number;
  image: string;
}

export default function AdBanner(): React.JSX.Element | null {
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchBanners = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/banners`, {
          cache: 'no-store',
          signal: controller.signal 
        });

        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        const data: unknown = await res.json();
        const extractedBanners = extractArray<unknown>(data, ['banners', 'bannerData', 'data']);

        const validBanners: BannerItem[] = extractedBanners
          .filter((item): item is { id?: number; image: string } =>
            typeof item === 'object' &&
            item !== null &&
            'image' in item &&
            typeof (item as { image: unknown }).image === 'string' &&
            (item as { image: string }).image.trim() !== '' // must not be an empty string
          )
          .map((item, index) => ({
            id: item.id !== undefined ? item.id : index,
            image: item.image,
          }));

        if (!controller.signal.aborted) {
          setBanners(validBanners);
        }
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return; // request was cancelled, don't touch state
        }
        console.error("AdBanner fetch error:", error);
        if (!controller.signal.aborted) {
          setHasError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchBanners();

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress sx={{ color: '#d86e0b' }} />
      </Box>
    );
  }

  if (hasError || banners.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 1166,
        mx: 'auto',
        mt: 2,
        mb: 4,
        px: { xs: 2, md: 0 },
      }}
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        style={{
          borderRadius: '16px',
          overflow: 'hidden',
          '--swiper-pagination-color': '#9c27b0',
          '--swiper-pagination-bullet-inactive-color': '#ffffff',
          '--swiper-pagination-bullet-inactive-opacity': '0.5',
          '--swiper-pagination-bullet-size': '8px',
        } as React.CSSProperties}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <Box
              sx={{
                width: '100%',
                height: { xs: 'auto', md: 362 },
                aspectRatio: { xs: '1166 / 362', md: 'auto' },
                position: 'relative',
                userSelect: 'none',
              }}
            >
              <Image
                src={banner.image}
                alt="Campaign Banner"
                fill
                style={{ objectFit: 'cover' }}
                priority
                unoptimized
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}