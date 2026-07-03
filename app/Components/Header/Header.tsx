"use client";

import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';

const DesktopHeader = dynamic(() => import('./DesktopHeader'), { ssr: false });
const MobileHeader = dynamic(() => import('./MobileHeader'), { ssr: false });

export default function Header() {
  const theme = useTheme();
  
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {isMobile ? <MobileHeader /> : <DesktopHeader />}
    </>
  );
}