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
          label: t('Tổng tiêm / tổng phân bố (%)'),
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
          label: t('Tổng tiêm / tổng phân bố (%)'),
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
        t('Tỉnh/Thành phố'),
        t('Dự kiến KH phân bổ'),
        t('Phân bổ thực tế'),
        t('Dân số >= 18 tuổi'),
        t('Số liều đã tiêm'),
        t('Tỷ lệ dự kiến phân bổ theo kế hoạch/ dân số (>= 18 tuổi)'),
        t('Tỷ lệ đã phân bổ/ dân số (>= 18 tuổi)'),
        t('Tỷ lệ đã tiêm ít nhất 1 mũi/ dân số (>= 18 tuổi)'),
        t('Tỷ lệ tiêm chủng/ Vắc xin phân bổ thực tế'),
        t('Tỷ lệ phân bổ vắc xin/Tổng số phân bổ cả nước')
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
                    {t('Đối tượng đăng ký tiêm')}
                  </Typography>
                  <Typography sx={amountStyle}>
                    11,203,873{' '}
                    <Box component="i" fontSize="14px">
                      ({t('lượt')})
                    </Box>
                  </Typography>
                </Box>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box sx={boxInfoStyle}>
                <img src="images/ic_injection.png" alt="" />
                <Box ml={2}>
                  <Typography sx={titleStyle}>
                    {t('Số mũi tiêm hôm qua')}
                  </Typography>
                  <Typography sx={amountStyle}>
                    11,203,873{' '}
                    <Box component="i" fontSize="14px">
                      ({t('mũi')})
                    </Box>
                  </Typography>
                </Box>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box sx={boxInfoStyle}>
                <img src="images/ic_injected_people.png" alt="" />
                <Box ml={2}>
                  <Typography sx={titleStyle}>
                    {t('Số mũi tiêm toàn quốc')}
                  </Typography>
                  <Typography sx={amountStyle}>
                    11,203,873{' '}
                    <Box component="i" fontSize="14px">
                      ({t('mũi')})
                    </Box>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </AppLayout>
  );
};
