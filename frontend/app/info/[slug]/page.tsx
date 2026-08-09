import { Typography, Container, Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper, TableHead } from '@mui/material';
import { API_BASE_URL } from '@/app/lib/apiConfig';

interface InfoData {
  id: string;
  title: string;
  slug: string;
  body: string;
}

interface StoreData {
  name: string;
  address: string;
  hours: string;
}



export default async function InfoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cleanSlug = slug.trim();

  const isStores = cleanSlug === 'our-stores';

  let pageData: (InfoData & { stores?: unknown }) | null = null;

  try {
    const url = `${API_BASE_URL}/aboutus?slug=${encodeURIComponent(cleanSlug)}`;
    const res = await fetch(url, { cache: 'no-store' });

    if (res.ok) {
      const data: unknown = await res.json();
      type Item = InfoData & { stores?: unknown };

      if (Array.isArray(data)) {
        // Some backend responses return the full, unfiltered list even when a
        // slug query param was sent — filter client-side to be safe. Fall back
        // to the single item only when the backend genuinely returned just one.
        const items = data as Item[];
        pageData = items.find((item) => item?.slug === cleanSlug) ?? (items.length === 1 ? items[0] : null);
      } else if (data && typeof data === 'object' && 'title' in data) {
        pageData = data as Item;
      }
    } else {
      console.error(`InfoPage fetch error: HTTP ${res.status} for slug "${cleanSlug}"`);
    }
  } catch (error) {
    console.error('InfoPage fetch failed:', error);
  }

  const rawStores = pageData?.stores;
  const storesArray: StoreData[] = Array.isArray(rawStores) 
    ? (Array.isArray(rawStores[0]) ? rawStores.flat() : rawStores)
    : [];

  return (
    <Container maxWidth={isStores ? "lg" : "md"} sx={{ pt: 4, pb: 4, minHeight: '80vh' }}>
      {isStores && pageData ? (
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#d35400', mb: 3 }}>
            {pageData.title}
          </Typography>

          <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #ffe0cc', borderRadius: 2 }}>
            <Table>
              <TableHead sx={{ backgroundColor: '#fff5eb' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, color: '#C2410C' }}>Store</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#C2410C' }}>Address</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#C2410C' }}>Working hours</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {storesArray.length > 0 ? (
                  storesArray.map((store: StoreData, index: number) => (
                    <TableRow 
                      key={index} 
                      sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9ff' }, '&:hover': { backgroundColor: '#fff5eb' } }}
                    >
                      <TableCell sx={{ fontWeight: 600, color: '#424242' }}>{store.name}</TableCell>
                      <TableCell sx={{ color: '#555' }}>{store.address}</TableCell>
                      <TableCell sx={{ color: '#555' }}>{store.hours}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center" sx={{ py: 3, color: '#999' }}>
                      No data found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box>
          {pageData ? (
            <>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#d35400', mb: 3 }}>
                {(pageData as InfoData).title}
              </Typography>
              <Typography sx={{ whiteSpace: 'pre-line', lineHeight: 1.6, color: '#424242' }}>
                {(pageData as InfoData).body}
              </Typography>
            </>
          ) : (
            <Typography sx={{ color: '#999', textAlign: 'center', py: 6 }}>
              No data found
            </Typography>
          )}
        </Box>
      )}
    </Container>
  );
}