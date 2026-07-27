"use client";
import { useMediaQuery, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';

const DesktopHeader = dynamic(() => import('./DesktopHeader'));
const MobileHeader = dynamic(() => import('./MobileHeader'));

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {isMobile ? <MobileHeader /> : <DesktopHeader />}
    </>
  );
}