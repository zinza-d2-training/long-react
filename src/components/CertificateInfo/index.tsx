import DateRangeIcon from '@mui/icons-material/DateRange';
import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo';
import PersonIcon from '@mui/icons-material/Person';
import {
  Box,
  colors,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { StyledButton } from 'components';
import { ICertificate } from 'models';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import QRCode from 'react-qr-code';
import { getDistrict, getProvince, getWard } from 'utils';

interface IProps {
  data: ICertificate;
}

export const CertificateInfo = (props: IProps) => {
  const { t } = useTranslation();

  const { data } = props;
  const dob = useMemo(() => data.dob.toLocaleDateString(), [data.dob]);
  const wardName = useMemo(
    () => getWard(data.provinceId, data.districtId, data.wardId)?.label,
    [data.districtId, data.provinceId, data.wardId]
  );
  const districtName = useMemo(
    () => getDistrict(data.provinceId, data.districtId)?.label,
    [data.districtId, data.provinceId]
  );
  const provinceName = useMemo(
    () => getProvince(data.provinceId)?.label,
    [data.provinceId]
  );

  const vaccineDateTimes = useMemo(
    () =>
      data.vaccinate.map(
        (item) =>
          `${item.time.toLocaleDateString()} - ${item.time.toLocaleTimeString()}`
      ),
    [data.vaccinate]
  );
  return (
    <Stack direction="row" spacing={2} justifyContent="space-between">
      <Box sx={{ flex: 1 }}>
        <Typography
          align="center"
          variant="body1"
          sx={{ textTransform: 'uppercase' }}>
          {t('Cộng hòa xã hội chủ nghĩa Việt Nam')}
        </Typography>
        <Typography align="center" variant="body1" fontWeight="500">
          {t('Độc lập - Tự do - Hạnh phúc')}
        </Typography>
        <Typography
          align="center"
          sx={{ textTransform: 'uppercase' }}
          variant="h5"
          py={3}
          fontWeight="500">
          {t('Chứng nhận tiêm chủng covid-19')}
        </Typography>
        <Grid container rowSpacing={2}>
          <Grid item xs={4}>
            <Typography variant="body1">{t('Họ và tên')}</Typography>
            <Typography variant="body1" fontWeight="500">
              {data.fullName}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">{t('Ngày sinh')}</Typography>
            <Typography variant="body1" fontWeight="500">
              {dob}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">{t('Số CMND/CCCD')}</Typography>
            <Typography variant="body1" fontWeight="500">
              {data.citizenId}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">{t('Số thẻ BHYT')}</Typography>
            <Typography variant="body1" fontWeight="500">
              {data.healthInsuranceCardNumber}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">{t('Số điện thoại')}</Typography>
            <Typography variant="body1" fontWeight="500">
              {data.phone}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">{t('Địa chỉ')}</Typography>
            <Typography variant="body1" fontWeight="500">
              {`${wardName} - ${districtName} - ${provinceName}`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">{t('Kết luận')}</Typography>
            <Typography variant="body1" fontWeight="500">
              {t(
                data.vaccinate.length
                  ? 'Đã được tiêm phòng bệnh Covid-19'
                  : 'Chưa được tiêm phòng bệnh Covid-19'
              )}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: 'rgba(238, 238, 238, 0.4)' }}>
                  <TableRow>
                    <TableCell align="center">
                      <Typography fontWeight="500" variant="body1">
                        {t('Mũi số')}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontWeight="500" variant="body1">
                        {t('Thời gian tiêm')}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontWeight="500" variant="body1">
                        {t('Tên vaccine')}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontWeight="500" variant="body1">
                        {t('Số lô')}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontWeight="500" variant="body1">
                        {t('Nơi tiêm')}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.vaccinate.map((item, index) => (
                    <TableRow
                      key={item.id}
                      sx={
                        index % 2 !== 0
                          ? { backgroundColor: colors.grey[100] }
                          : {}
                      }>
                      <TableCell align="center">{item.number}</TableCell>
                      <TableCell align="center">{`${vaccineDateTimes[index]}`}</TableCell>
                      <TableCell align="center">
                        {item.vaccinationName}
                      </TableCell>
                      <TableCell align="center">
                        {item.shipmentNumber}
                      </TableCell>
                      <TableCell align="center">
                        {item.vaccinationSite}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        {data.vaccinate.length === 1 && (
          <Stack direction="row" justifyContent="center" pt={2}>
            <StyledButton variant="contained">
              {t('Đăng ký tiêm mũi tiếp theo')}
            </StyledButton>
          </Stack>
        )}
      </Box>
      {data.vaccinate.length && (
        <Stack
          width="340px"
          sx={{
            backgroundColor:
              data.vaccinate.length === 1
                ? colors.amber[200]
                : colors.green[600],
            boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.175)',
            borderRadius: '8px',
            p: 3
          }}
          direction="column"
          alignItems="center">
          <Box>
            <img src="images/certificate_logo.png" alt="" />
          </Box>
          <Typography
            variant="h5"
            sx={{
              textTransform: 'uppercase',
              color: '#fff',
              fontWeight: '500'
            }}
            my={3}>
            {t(`Đã tiêm ${data.vaccinate.length} mũi Vaccine`)}
          </Typography>
          <Box p={3} mb={3} sx={{ backgroundColor: '#fff' }}>
            <QRCode value={data.citizenId} size={160} />
          </Box>
          <Box
            component={Stack}
            width="100%"
            p={2}
            sx={{ backgroundColor: '#fff', borderRadius: '8px' }}
            direction="column"
            spacing={2}>
            <Stack direction="row" spacing={1}>
              <PersonIcon />
              <Stack direction="column">
                <Typography variant="body1">{t('Họ và tên')}</Typography>
                <Typography variant="body1" fontWeight="500">
                  {data.fullName}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={1}>
              <DateRangeIcon />
              <Stack direction="column">
                <Typography variant="body1">{t('Ngày sinh')}</Typography>
                <Typography variant="body1" fontWeight="500">
                  {dob}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={1}>
              <FeaturedVideoIcon />
              <Stack direction="column">
                <Typography variant="body1">{t('Số CMND/CCCD')}</Typography>
                <Typography variant="body1" fontWeight="500">
                  {data.citizenId}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      )}
    </Stack>
  );
};
