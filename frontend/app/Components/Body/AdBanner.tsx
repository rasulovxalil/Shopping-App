"use client";

import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';

interface BannerItem {
  id: number;
  image: string;
}

export default function AdBanner(): React.JSX.Element {
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/bannerdata`, { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error('Network Error');
        return res.json();
      })
      .then((data: unknown) => {
        let extractedBanners: unknown[] = [];
        
        if (Array.isArray(data)) {
          extractedBanners = data;
        } else if (data && typeof data === 'object' && 'bannerData' in data) {
          const innerData = (data as { bannerData: unknown }).bannerData;
          if (Array.isArray(innerData)) {
            extractedBanners = innerData;
          }
        }

        const validBanners: BannerItem[] = extractedBanners
          .filter((item): item is { id?: number; image: string } => 
            typeof item === 'object' && 
            item !== null && 
            'image' in item && 
            typeof (item as { image: unknown }).image === 'string'
          )
          .map((item, index) => ({
            id: item.id !== undefined ? item.id : index,
            image: item.image,
          }));

        setBanners(validBanners);
        setLoading(false);
      })
      .catch((error) => {
        console.error("An Error occured:", error);
        setHasError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress sx={{ color: '#d86e0b' }} />
      </Box>
    );
  }

  if (hasError || banners.length === 0) return <></>;

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