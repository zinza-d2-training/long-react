import { Box, Theme } from '@mui/material';
import { SxProps } from '@mui/system';
import Footer from 'components/Footer';
import Header from 'components/Header';
import { FC } from 'react';

const appStyle: SxProps<Theme> = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column'
};

const Layout: FC = (props) => {
  return (
    <Box sx={appStyle} className="App">
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {props.children}
      </Box>
    </Box>
  );
};

export const AppLayout: FC = (props) => {
  return (
    <Box sx={appStyle}>
      <Header />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          pt: '80px',
          pb: 3
        }}>
        {props.children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
