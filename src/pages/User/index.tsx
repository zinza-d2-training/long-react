import { Box, Container, Tab, Tabs, Theme, Typography } from '@mui/material';
import { SxProps } from '@mui/system';
import { CertificateInfo, InjectionInfoTable } from 'components';
import { IUserInfoForm } from 'models';
import { useState } from 'react';
import { DefaultValues } from 'react-hook-form';
import { AppLayout } from 'theme/layout';
import { certificateData, fakeUserRegistrationData } from 'utils';
import { FormUserInfo } from './FormUserInfo';

const styleTab: SxProps<Theme> = {
  textTransform: 'unset',
  color: '#000 !important',
  px: 1
};

export const User = () => {
  const [userInfo, setUserInfo] = useState<DefaultValues<IUserInfoForm>>({
    citizenId: '123456789',
    citizenImages: [],
    imageName: '',
    dob: '2000-11-05',
    fullName: 'Bùi Đức Long',
    gender: 1,
    phoneNumber: '0911448457',
    provinceId: 2,
    districtId: 1,
    wardId: 1,
    newPassword: '',
    confirmPassword: ''
  });

  const [currentTab, setCurrentTab] = useState(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleConfirm = (partialInfo: DefaultValues<IUserInfoForm>) => {
    setUserInfo(partialInfo);
  };

  const renderTab = (currentTab: number) => {
    switch (currentTab) {
      case 0:
        return <CertificateInfo data={certificateData} />;
      case 1:
        return <InjectionInfoTable data={fakeUserRegistrationData} />;
      case 2:
        return <FormUserInfo userInfo={userInfo} onConfirm={handleConfirm} />;
    }
  };
  return (
    <AppLayout>
      <Box sx={{ borderBottom: '1px solid #eee' }}>
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
        </Container>
      </Box>
      <Container maxWidth="xl">
        <Box pt={6}>{renderTab(currentTab)}</Box>
      </Container>
    </AppLayout>
  );
};
