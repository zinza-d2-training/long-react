import {
  Box,
  Button,
  colors,
  Container,
  Divider,
  Stack,
  Theme,
  Typography
} from '@mui/material';
import { SxProps } from '@mui/system';
import { SearchTable, StatisticTable } from 'components';
import {
  IInjectedByDay,
  IInjectedByTotalSupplied,
  IOptionsTable,
  IStatisticVaccinationByArea,
  IStatisticVaccinationByLocal
} from 'models';
import { useCallback, useMemo, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { AppLayout } from 'theme/layout';
import {
  fakeInjectedByDay,
  fakeInjectedByTotalSupplied,
  fakeLoadMoreStatisticVaccinationByArea,
  fakeLoadMoreStatisticVaccinationByLocal,
  fakeStatisticVaccinationByArea,
  fakeStatisticVaccinationByLocal,
  getHighestInjectionRate,
  getLowestInjectionRate,
  getProvince
} from 'utils';

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
  fontSize: '25px',
  lineHeight: '15.23px'
};

const boxStyle: SxProps<Theme> = {
  border: '1px solid rgba(38, 56, 150, 0.14)',
  boxSizing: 'border-box',
  boxShadow: '0px 4px 12px rgba(34, 41, 47, 0.12)',
  borderRadius: '10px'
};

export const Home = () => {
  const { t } = useTranslation();

  const [injectedByDay] = useState<IInjectedByDay[]>(fakeInjectedByDay);
  const [injectedByTotalSupplied] = useState<IInjectedByTotalSupplied[]>(
    fakeInjectedByTotalSupplied
  );
  const [statisticVaccinationByArea, setStatisticVaccinationByArea] = useState<
    IStatisticVaccinationByArea[]
  >(fakeStatisticVaccinationByArea);
  const [statisticVaccinationByLocal, setStatisticVaccinationByLocal] =
    useState<IStatisticVaccinationByLocal[]>(fakeStatisticVaccinationByLocal);

  const highestInjectionRate = useMemo(
    () => getHighestInjectionRate(injectedByTotalSupplied, 10),
    [injectedByTotalSupplied]
  );

  const lowestInjectionRate = useMemo(
    () => getLowestInjectionRate(injectedByTotalSupplied, 10),
    [injectedByTotalSupplied]
  );

  const lowestInjectionRateData = useMemo(
    () => ({
      labels: lowestInjectionRate.map((item) => item.province),
      datasets: [
        {
          label: t('T???ng ti??m / t???ng ph??n b??? (%)'),
          data: lowestInjectionRate.map((item) => item.percent),
          backgroundColor: [colors.blue[500]],
          borderWidth: 0,
          maxBarThickness: 20
        }
      ]
    }),
    [lowestInjectionRate, t]
  );

  const highestInjectionRateData = useMemo(
    () => ({
      labels: highestInjectionRate.map((item) => item.province),
      datasets: [
        {
          label: t('T???ng ti??m / t???ng ph??n b??? (%)'),
          data: highestInjectionRate.map((item) => item.percent),
          backgroundColor: [colors.indigo[700]],
          borderWidth: 0,
          maxBarThickness: 20
        }
      ]
    }),
    [highestInjectionRate, t]
  );

  const statisticVaccinationByLocalData = useMemo(
    () => ({
      heading: [
        t('STT'),
        t('T???nh/Th??nh ph???'),
        t('D??? ki???n KH ph??n b???'),
        t('Ph??n b??? th???c t???'),
        t('D??n s??? >= 18 tu???i'),
        t('S??? li???u ???? ti??m'),
        t('T??? l??? d??? ki???n ph??n b??? theo k??? ho???ch/ d??n s??? (>= 18 tu???i)'),
        t('T??? l??? ???? ph??n b???/ d??n s??? (>= 18 tu???i)'),
        t('T??? l??? ???? ti??m ??t nh???t 1 m??i/ d??n s??? (>= 18 tu???i)'),
        t('T??? l??? ti??m ch???ng/ V???c xin ph??n b??? th???c t???'),
        t('T??? l??? ph??n b??? v???c xin/T???ng s??? ph??n b??? c??? n?????c')
      ],
      dataSet: statisticVaccinationByLocal.map((record, index) => {
        const { provinceId, ...otherValues } = record;
        return [
          index + 1,
          getProvince(provinceId)?.label,
          ...Object.values(otherValues)
        ];
      })
    }),
    [statisticVaccinationByLocal, t]
  );

  const statisticTableOptions: IOptionsTable = useMemo(
    () => ({
      maxHeight: '850px',
      percentColumns: [
        {
          number: 6,
          color: '#C65312'
        },
        {
          number: 7,
          color: '#3D94CF'
        },
        {
          number: 8,
          color: '#4E8A4F'
        },
        {
          number: 9,
          color: '#AF8612'
        },
        {
          number: 10,
          color: 'rgb(45, 33, 136)'
        }
      ]
    }),
    []
  );

  const handleLoadMoreVaccinationByLocal = useCallback(() => {
    const newData: IStatisticVaccinationByLocal[] =
      fakeLoadMoreStatisticVaccinationByLocal;
    setStatisticVaccinationByLocal([
      ...statisticVaccinationByLocal,
      ...newData
    ]);
  }, [statisticVaccinationByLocal]);

  const handleLoadMoreVaccinationByArea = useCallback(() => {
    const newData: IStatisticVaccinationByArea[] =
      fakeLoadMoreStatisticVaccinationByArea;
    setStatisticVaccinationByArea([...statisticVaccinationByArea, ...newData]);
  }, [statisticVaccinationByArea]);

  return (
    <AppLayout>
      <Box sx={{ backgroundColor: '#fff', flex: 1 }}>
        <Box my={3} px={3} py={2} sx={{ backgroundColor: '#F7FBFE' }}>
          <Container maxWidth="xl">
            <Box sx={{ display: 'flex' }}>
              <Box sx={boxInfoStyle}>
                <img src="images/ic_register_people.png" alt="" />
                <Box ml={2}>
                  <Typography sx={titleStyle}>
                    {t('?????i t?????ng ????ng k?? ti??m')}
                  </Typography>
                  <Typography sx={amountStyle}>
                    11,203,873{' '}
                    <Box component="i" fontSize="14px">
                      ({t('l?????t')})
                    </Box>
                  </Typography>
                </Box>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box sx={boxInfoStyle}>
                <img src="images/ic_injection.png" alt="" />
                <Box ml={2}>
                  <Typography sx={titleStyle}>
                    {t('S??? m??i ti??m h??m qua')}
                  </Typography>
                  <Typography sx={amountStyle}>
                    11,203,873{' '}
                    <Box component="i" fontSize="14px">
                      ({t('m??i')})
                    </Box>
                  </Typography>
                </Box>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box sx={boxInfoStyle}>
                <img src="images/ic_injected_people.png" alt="" />
                <Box ml={2}>
                  <Typography sx={titleStyle}>
                    {t('S??? m??i ti??m to??n qu???c')}
                  </Typography>
                  <Typography sx={amountStyle}>
                    11,203,873{' '}
                    <Box component="i" fontSize="14px">
                      ({t('m??i')})
                    </Box>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
        <Container maxWidth="xl">
          <Box p={4} sx={boxStyle}>
            <Typography variant="h6">{t('D??? li???u ti??m theo ng??y')}</Typography>
            <Line
              data={{
                labels: injectedByDay.map(
                  ({ day }) => `${day.getDate()}/${day.getMonth() + 1}`
                ),
                datasets: [
                  {
                    label: t('???? ti??m'),
                    data: injectedByDay.map(({ amount }) => amount),
                    fill: false,
                    backgroundColor: colors.indigo[700],
                    borderColor: colors.indigo[700]
                  }
                ]
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: false
                  }
                }
              }}
              height={100}
            />
          </Box>
          <Box sx={{ display: 'flex', mt: 4 }}>
            <Stack
              sx={{
                ...boxStyle,
                flex: 1,
                px: 2,
                py: 3
              }}
              direction="column"
              alignItems="center">
              <Typography variant="h6" width="100%" align="left">
                {t('10 ?????a ph????ng c?? t??? l??? ti??m cao nh???t')}
              </Typography>
              <Typography variant="body2" width="100%" align="left">
                {t(
                  '(T??nh theo s??? m??i ti??m/ s??? v???c xin ph??n b??? theo quy???t ?????nh)'
                )}
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
                  data={highestInjectionRateData}
                  height={310}
                />
              </Box>
              <Typography variant="body2" mt="4px" align="center">
                <Box component="b">{t('Ghi ch??')}</Box>:{' '}
                {t(
                  'S??? m??i ti??m th???c t??? c?? th??? nhi???u h??n s??? li???u v???c xin ph??n b???'
                )}
              </Typography>
            </Stack>
            <Box sx={{ width: '24px' }} />
            <Stack
              sx={{
                ...boxStyle,
                flex: 1,
                px: 2,
                py: 3
              }}
              direction="column"
              alignItems="center">
              <Typography variant="h6" width="100%" align="left">
                {t('10 ?????a ph????ng c?? t??? l??? ti??m th???p nh???t')}
              </Typography>
              <Typography variant="body2" width="100%" align="left">
                {t(
                  '(T??nh theo s??? m??i ti??m/ s??? v???c xin ph??n b??? theo quy???t ?????nh)'
                )}
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
                  data={lowestInjectionRateData}
                  height={310}
                />
              </Box>
              <Typography variant="body2" mt="4px" align="center">
                <Box component="b">{t('Ghi ch??')}</Box>:{' '}
                {t(
                  'T??? l??? ti??m t???i m???t s??? t???nh c?? th??? th???p do ch??a nh???n ????? v???c xin theo quy???t ?????nh ph??n b???'
                )}
              </Typography>
            </Stack>
          </Box>
          <Box sx={boxStyle} mt={4} px={2}>
            <Typography variant="h6" p={2}>
              {t('S??? li???u v???c xin theo ?????a ph????ng')}
            </Typography>
            <Divider />
            <StatisticTable
              data={statisticVaccinationByLocalData}
              options={statisticTableOptions}
            />
            <Stack direction="row" justifyContent="center" py={3}>
              <Box
                component={Button}
                sx={{
                  color: colors.indigo[700],
                  textTransform: 'unset',
                  fontSize: '18px',
                  fontWeight: '400'
                }}
                onClick={handleLoadMoreVaccinationByLocal}>
                {t('Xem th??m')}
              </Box>
            </Stack>
          </Box>
          <Box sx={boxStyle} mt={4}>
            <Typography variant="h6" p={2}>
              {t('Tra c???u ??i???m ti??m theo ?????a b??n')}
            </Typography>
            <SearchTable
              data={statisticVaccinationByArea}
              onLoadMoreData={handleLoadMoreVaccinationByArea}
            />
          </Box>
        </Container>
      </Box>
    </AppLayout>
  );
};
