import React from 'react';
import { Box, Typography } from '@mui/material';

const HeroSection = () => (
  <Box sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: { xs: 'column', md: 'row' },
    py: 6,
    px: 2,
    background: 'linear-gradient(90deg, #e3ffe6 0%, #f7faff 100%)',
    borderRadius: 4,
    boxShadow: 3,
    mb: 4
  }}>
    <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
      <Typography variant="h2" fontWeight={700} gutterBottom>
        Data Visualization Dashboard
      </Typography>
      <Typography variant="h5" color="text.secondary">
        Explore insights interactively with beautiful charts and smart filters.
      </Typography>
    </Box>
    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', mt: { xs: 4, md: 0 } }}>
      {/* SVG Illustration */}
      <svg width="220" height="160" viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="40" width="40" height="100" rx="8" fill="#4fd1c5"/>
        <rect x="60" y="80" width="40" height="60" rx="8" fill="#81e6d9"/>
        <rect x="110" y="20" width="40" height="120" rx="8" fill="#38b2ac"/>
        <rect x="160" y="60" width="40" height="80" rx="8" fill="#285e61"/>
        <circle cx="190" cy="30" r="18" fill="#f6ad55"/>
      </svg>
    </Box>
  </Box>
);

export default HeroSection; 