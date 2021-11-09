import { Box, Container, Tab, Tabs, Theme, Typography } from '@mui/material';
import { SxProps } from '@mui/system';
import { CertificateInfo, InjectionInfoTable } from 'components';
import { IUserInfoForm } from 'models';
import { useState } from 'react';
import { DefaultValues } from 'react-hook-form';
import { Switch, useHistory, useLocation } from 'react-router-dom';
import { RoutePaths } from 'routes';
import { AppLayout, PrivateRoute } from 'theme/layout';
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
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState(() => {
    const pathname = location.pathname;
    if (pathname === `${RoutePaths.user.certificate}`) {
      return 0;
    } else if (pathname === RoutePaths.user.injectionRegistration) {
      return 1;
    } else {
      return 2;
    }
  });

  const history = useHistory();
  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) {
      history.push(RoutePaths.user.root);
    } else if (newValue === 1) {
      history.push(RoutePaths.user.injectionRegistration);
    } else {
      history.push(RoutePaths.user.info);
    }
    setCurrentTab(newValue);
  };

  const handleConfirm = (partialInfo: DefaultValues<IUserInfoForm>) => {
    setUserInfo(partialInfo);
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
        <Box pt={6}>
          <Switch>
            <PrivateRoute path={RoutePaths.user.root} exact>
              <CertificateInfo data={certificateData} />
            </PrivateRoute>
            <PrivateRoute path={RoutePaths.user.injectionRegistration}>
              <InjectionInfoTable data={fakeUserRegistrationData} />
            </PrivateRoute>
            <PrivateRoute path={RoutePaths.user.info}>
              <FormUserInfo userInfo={userInfo} onConfirm={handleConfirm} />
            </PrivateRoute>
          </Switch>
        </Box>
      </Container>
    </AppLayout>
  );
};
