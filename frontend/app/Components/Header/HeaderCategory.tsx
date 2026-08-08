"use client";

import React, { useState, useEffect, MouseEvent } from 'react';
import {
  Button,
  Popper,
  Paper,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import ComputerIcon from '@mui/icons-material/Computer';
import TvIcon from '@mui/icons-material/Tv';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import CountertopsIcon from '@mui/icons-material/Countertops';
import ErrorIcon from '@mui/icons-material/Error';
import { API_BASE_URL } from '@/app/lib/apiConfig';
import { extractArray } from '@/app/lib/extractArray';

interface SubCategory {
  id: number;
  name: string;
  slug: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  subCategories: SubCategory[];
}

// We switch de icons regarding the given data from the API
const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'PhoneAndroidIcon':
      return <PhoneAndroidIcon />;
    case 'ComputerIcon':
      return <ComputerIcon />;
    case 'TvIcon':
      return <TvIcon />;
    case 'SportsEsportsIcon':
      return <SportsEsportsIcon />;
    case 'CountertopsIcon':
      return <CountertopsIcon />;
    default:
      return <ErrorIcon />; // If there will be error while showing the icons we use Error icon as a default
  }
};

export default function CategoryPopper() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // States for API
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetching data with use effect and getting URL from env for security
  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then((res) => {
        if (!res.ok) throw new Error("An Error occured while getting data");
        return res.json();
      })
      .then((data: unknown) => {
        const list = extractArray<Category>(data, ["categories"]);
        setCategories(list);
        if (list.length > 0) {
          setActiveCategory(list[0]); // If we will get data automaticly will set data
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  const handleMouseEnter = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const handleItemClick = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box onMouseLeave={handleMouseLeave} sx={{ display: 'inline-block' }}>

      <Button
        variant="contained"
        startIcon={<MenuIcon />}
        onMouseEnter={handleMouseEnter}
        sx={{
          backgroundColor: '#C2410C',
          '&:hover': { backgroundColor: '#9A3412' },
          textTransform: 'none',
          borderRadius: '30px',
          padding: "5px 15px",
          fontSize: '16px',
        }}
      >
        Categories
      </Button>

      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        style={{ zIndex: 1300 }}
      >
        <Paper elevation={3} sx={{ display: 'flex', width: '800px', mt: 1, borderRadius: '8px', overflow: 'hidden' }}>

          {loading ? (
            <Box sx={{ p: 3 }}>Loading...</Box>
          ) : (
            <>
              {/* Categories left side */}
              <Box sx={{ width: '35%', borderRight: '1px solid #f0f0f0', bgcolor: '#fafafa' }}>
                <List disablePadding>
                  {categories.map((cat) => (
                    <ListItem key={cat.id} disablePadding>
                      <ListItemButton
                        component={Link}
                        href={`/categories/${cat.slug}`}
                        onMouseEnter={() => setActiveCategory(cat)}
                        onClick={handleItemClick}
                        sx={{
                          bgcolor: activeCategory?.id === cat.id ? '#ffffff' : 'transparent',
                          '&:hover': { bgcolor: '#ffffff' },
                          py: 1.5
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 35, color: '#F97316' }}>
                          {getIcon(cat.icon)}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography sx={{ fontSize: '14px' }}>
                              {cat.name}
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>

              {/* Categories right side */}
              <Box sx={{ width: '65%', p: 3, bgcolor: '#ffffff' }}>
                {activeCategory && (
                  <>
                    <Typography
                      component={Link}
                      href={`/categories/${activeCategory.slug}`}
                      onClick={handleItemClick}
                      variant="subtitle1"
                      color="#F97316"
                      sx={{
                        fontWeight: "bold",
                        mb: 2,
                        display: 'inline-block',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      {activeCategory.name}
                    </Typography>

                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1.5 }}>
                      {(activeCategory.subCategories || []).map((sub) => (
                        <Typography
                          key={sub.id}
                          component={Link}
                          href={`/categories/${activeCategory.slug}/${sub.slug}`}
                          onClick={handleItemClick}
                          variant="body2"
                          sx={{
                            color: '#333',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            '&:hover': { color: '#F97316' }
                          }}
                        >
                          {sub.name}
                        </Typography>
                      ))}
                    </Box>
                  </>
                )}
              </Box>
            </>
          )}

        </Paper>
      </Popper>
    </Box>
  );
}