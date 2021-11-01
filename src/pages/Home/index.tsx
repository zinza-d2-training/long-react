import {
  Box,
  colors,
  Container,
  Divider,
  Theme,
  Typography
} from '@mui/material';
import { SxProps } from '@mui/system';
import { HeaderLayout } from 'theme/layout';
import { Line } from 'react-chartjs-2';
import { injectedByDay } from 'utils/fakeDataDashboard';

const boxInfoStyle: SxProps<Theme> = {
  flex: 1,
  height: '100px',
  px: 2,
  py: 3,
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#fff'
};

const titleStyle: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '18.75px'
};

const amountStyle: SxProps<Theme> = {
  mt: 1,
  fontWeight: 500,
  fontSize: '13px',
  lineHeight: '15.23px'
};

const boxStyle: SxProps<Theme> = {
  border: '1px solid rgba(38, 56, 150, 0.14)',
  boxSizing: 'border-box',
  boxShadow: '0px 4px 12px rgba(34, 41, 47, 0.12)',
  borderRadius: '10px'
};

const Home = () => {
  const dataInjectedByDay = {
    labels: injectedByDay.map(
      ({ day }) => `${day.getDate()}/${day.getMonth() + 1}`
    ),
    datasets: [
      {
        label: 'Đã tiêm',
        data: injectedByDay.map(({ amount }) => amount),
        fill: false,
        backgroundColor: colors.indigo[700],
        borderColor: colors.indigo[700]
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <HeaderLayout>
      <Box sx={{ backgroundColor: '#fff', flex: 1 }}>
        <Container maxWidth="lg">
          <Box
            my={3}
            px={3}
            py={2}
            sx={{ backgroundColor: '#F7FBFE', display: 'flex' }}>
            <Box sx={boxInfoStyle}>
              <img src="images/ic_register_people.png" alt="" />
              <Box ml={2}>
                <Typography sx={titleStyle}>Đối tượng đăng ký tiêm</Typography>
                <Typography sx={amountStyle}>
                  11,203,873 <Box component="i">(lượt)</Box>
                </Typography>
              </Box>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={boxInfoStyle}>
              <img src="images/ic_injection.png" alt="" />
              <Box ml={2}>
                <Typography sx={titleStyle}>Số mũi tiêm hôm qua</Typography>
                <Typography sx={amountStyle}>
                  11,203,873 <Box component="i">(mũi)</Box>
                </Typography>
              </Box>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={boxInfoStyle}>
              <img src="images/ic_injected_people.png" alt="" />
              <Box ml={2}>
                <Typography sx={titleStyle}>Số mũi tiêm toàn quốc</Typography>
                <Typography sx={amountStyle}>
                  11,203,873 <Box component="i">(mũi)</Box>
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box p={4} sx={boxStyle}>
            <Box>
              <Typography variant="h6">Dữ liệu tiêm theo ngày</Typography>
              <Line data={dataInjectedByDay} options={options} />
            </Box>
          </Box>
        </Container>
      </Box>
    </HeaderLayout>
  );
};

export default Home;
