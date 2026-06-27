"use client";
import IconButton from "@mui/material/IconButton";
import React, { useState, useEffect, MouseEvent } from 'react';
import { 
  Popper, 
  Paper, 
  Box, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  ListItemIcon, 
  Typography,
  ClickAwayListener
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import ComputerIcon from '@mui/icons-material/Computer';
import TvIcon from '@mui/icons-material/Tv';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import CountertopsIcon from '@mui/icons-material/Countertops';
import ErrorIcon from '@mui/icons-material/Error';

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

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'PhoneAndroidIcon': return <PhoneAndroidIcon />;
    case 'ComputerIcon': return <ComputerIcon />;
    case 'TvIcon': return <TvIcon />;
    case 'SportsEsportsIcon': return <SportsEsportsIcon />;
    case 'CountertopsIcon': return <CountertopsIcon />;
    default: return <ErrorIcon />;
  }
};

export default function HeaderCategoryMobile() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      .then((res) => { 
        if (!res.ok) throw new Error("An Error occured while getting data");
        return res.json();
      })
      .then((data: Category[]) => {
        setCategories(data);
        if (data.length > 0) {
          setActiveCategory(data[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  
  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ display: 'inline-block' }}>
      <IconButton
        onClick={handleButtonClick} 
        sx={{
          backgroundColor: "#f0f0f0",
          color: "#000000",
          width: 38,
          height: 38,
          "&:hover": { backgroundColor: "#f9f9f9" },
        }}
      >
        <MenuIcon sx={{ fontSize: 22 }} />
      </IconButton>

      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        style={{ zIndex: 1300 }}
      >
        
        <ClickAwayListener onClickAway={handleClose}>
          <Paper 
            elevation={3} 
            sx={{ 
              display: 'flex', 
              width: { xs: 'calc(100vw - 32px)', sm: '600px', md: '800px' },
              maxWidth: '800px',
              mt: 1, 
              borderRadius: '8px', 
              overflow: 'hidden' 
            }}
          >
            {loading ? (
              <Box sx={{ p: 3 }}>Loading...</Box>
            ) : (
              <>
            
                <Box sx={{ width: '40%', borderRight: '1px solid #f0f0f0', bgcolor: '#fafafa' }}>
                  <List disablePadding>
                    {categories.map((cat) => (
                      <ListItem key={cat.id} disablePadding>
                        <ListItemButton
                          onClick={() => setActiveCategory(cat)} 
                          sx={{
                            bgcolor: activeCategory?.id === cat.id ? '#ffffff' : 'transparent',
                            '&:hover': { bgcolor: '#ffffff' },
                            py: 1,
                            px: 1
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 30, color: '#F97316' }}>
                            {getIcon(cat.icon)}
                          </ListItemIcon>
                          <ListItemText 
                            primary={
                              <Typography sx={{ fontSize: '13px', fontWeight: activeCategory?.id === cat.id ? 'bold' : 'normal' }}>
                                {cat.name}
                              </Typography>
                            } 
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>

                
                <Box sx={{ width: '60%', p: 2, bgcolor: '#ffffff', maxHeight: '400px', overflowY: 'auto' }}>
                  {activeCategory && (
                    <>
                      <Typography variant="subtitle2" color="#F97316" sx={{ fontWeight: "bold", mb: 1.5 }}>
                        {activeCategory.name}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        {activeCategory.subCategories.map((sub) => (
                          <Typography 
                            key={sub.id} 
                            variant="body2" 
                            onClick={handleClose}
                            sx={{ 
                              color: '#333', 
                              cursor: 'pointer', 
                              fontSize: '13px',
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
        </ClickAwayListener>
      </Popper>
    </Box>
  );
}