import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AdBanner from './AdBanner';
export default function HomePage() {
  return (
        <Container maxWidth="lg">

    <Box 
      component="main" 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '80vh',
        justifyContent: 'flex-start'
      }}
    >
      <AdBanner />
      
    </Box>
    </Container>
  );
}