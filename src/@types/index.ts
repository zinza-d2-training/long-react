import React from 'react';
declare module '@mui/material/styles' {
  interface TypographyVariants {
    bodySmall: React.CSSProperties;
    label: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    bodySmall?: React.CSSProperties;
    label?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    bodySmall: true;
    label: true;
  }
}
