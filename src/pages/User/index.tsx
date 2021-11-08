import { Box, Container, Tab, Tabs, Theme, Typography } from '@mui/material';
import { SxProps } from '@mui/system';
import { CertificateInfo, InjectionInfoTable } from 'components';
import { useState } from 'react';
import { AppLayout } from 'theme/layout';
import { certificateData, fakeUserRegistrationData } from 'utils';
import { FormUserInfo } from './FormUserInfo';

const styleTab: SxProps<Theme> = {
  textTransform: 'unset',
  color: '#000 !important',
  px: 1
};

export const User = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const renderTab = (currentTab: number) => {
    switch (currentTab) {
      case 0:
        return <CertificateInfo data={certificateData} />;
      case 1:
        return <InjectionInfoTable data={fakeUserRegistrationData} />;
      case 2:
        return <FormUserInfo />;
    }
  };
  return (
    <AppLayout>
      <Box>
        <Container maxWidth="xl">
          <Tabs
            value={currentTab}
            onChange={handleChangeTab}
            aria-label="basic tabs example"
            sx={{
              '.css-1aquho2-MuiTabs-indicator': {
                backgroundColor: '#000 !important'
              }
            }}>
            <Tab
              label={
                <Typography variant="body1" fontWeight="500">
                  Chứng nhận tiêm chủng
                </Typography>
              }
              value={0}
              sx={styleTab}
            />
            <Tab
              label={
                <Typography variant="body1" fontWeight="500">
                  Kết quả đăng ký
                </Typography>
              }
              value={1}
              sx={styleTab}
            />
            <Tab
              label={
                <Typography variant="body1" fontWeight="500">
                  Tài khoản
                </Typography>
              }
              value={2}
              sx={styleTab}
            />
          </Tabs>
          <Box pt={6}>{renderTab(currentTab)}</Box>
        </Container>
      </Box>
    </AppLayout>
  );
};
