"use client";

import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';

// Komponentləri dinamik yükləyirik ki, server-side render (SSR) zamanı xəta verməsinlər
const DesktopHeader = dynamic(() => import('./DesktopHeader'), { ssr: false });
const MobileHeader = dynamic(() => import('./MobileHeader'), { ssr: false });

export default function Header() {
  const theme = useTheme();
  
  // Ekran ölçüsü 'md' (900px) ölçüsündən kiçikdirsə mobil sayılır
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {isMobile ? <MobileHeader /> : <DesktopHeader />}
    </>
  );
}