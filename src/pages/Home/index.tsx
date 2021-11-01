import {
  Box,
  colors,
  Container,
  Divider,
  Theme,
  Typography
} from '@mui/material';
import { SxProps } from '@mui/system';
import { Bar, Line } from 'react-chartjs-2';
import { AppLayout } from 'theme/layout';
import {
  injectedByDay,
  injectedByTotalSupplied
} from 'utils/fakeDataDashboard';
import {
  getHighestInjectionRate,
  getLowestInjectionRate
} from 'utils/filterData';

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

  const highestInjectionRate = getHighestInjectionRate(
    injectedByTotalSupplied,
    10
  );

  const dataHighestInjectionRate = {
    labels: highestInjectionRate.map((item) => item.province),
    datasets: [
      {
        label: 'Tổng tiêm / tổng phân bố (%)',
        data: highestInjectionRate.map((item) => item.percent),
        backgroundColor: [colors.indigo[700]],
        borderWidth: 0,
        maxBarThickness: 20
      }
    ]
  };

  const lowestInjectionRate = getLowestInjectionRate(
    injectedByTotalSupplied,
    10
  );

  const dataLowestInjectionRate = {
    labels: lowestInjectionRate.map((item) => item.province),
    datasets: [
      {
        label: 'Tổng tiêm / tổng phân bố (%)',
        data: lowestInjectionRate.map((item) => item.percent),
        backgroundColor: [colors.blue[500]],
        borderWidth: 0,
        maxBarThickness: 20
      }
    ]
  };

  return (
    <AppLayout>
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
              <Line
                data={dataInjectedByDay}
                options={{
                  scales: {
                    y: {
                      beginAtZero: false
                    }
                  }
                }}
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', mt: 5 }}>
            <Box
              sx={{
                ...boxStyle,
                flex: 1,
                px: 2,
                py: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
              <Typography variant="h6" width="100%" align="left">
                10 Địa phương có tỷ lệ tiêm cao nhất
              </Typography>
              <Typography variant="body2" width="100%" align="left">
                (Tính theo số mũi tiêm/ số vắc xin phân bổ theo quyết định)
              </Typography>
              <Box sx={{ px: 3, width: '100%' }}>
                <Bar
                  options={{
                    indexAxis: 'y',
                    elements: {
                      bar: {
                        borderWidth: 0
                      }
                    },
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false
                      },
                      title: {
                        display: false
                      }
                    }
                  }}
                  data={dataHighestInjectionRate}
                  height={410}
                />
              </Box>
            </Box>
            <Box sx={{ width: '24px' }} />
            <Box
              sx={{
                ...boxStyle,
                flex: 1,
                px: 2,
                py: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
              <Typography variant="h6" width="100%" align="left">
                10 Địa phương có tỷ lệ tiêm thấp nhất
              </Typography>
              <Typography variant="body2" width="100%" align="left">
                (Tính theo số mũi tiêm/ số vắc xin phân bổ theo quyết định)
              </Typography>
              <Box sx={{ px: 3, width: '100%' }}>
                <Bar
                  options={{
                    indexAxis: 'y',
                    // Elements options apply to all of the options unless overridden in a dataset
                    // In this case, we are setting the border of each horizontal bar to be 2px wide
                    elements: {
                      bar: {
                        borderWidth: 0
                      }
                    },
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false
                      },
                      title: {
                        display: false
                      }
                    }
                  }}
                  data={dataLowestInjectionRate}
                  height={410}
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </AppLayout>
  );
};

export default Home;
