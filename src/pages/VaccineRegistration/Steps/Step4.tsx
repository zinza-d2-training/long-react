import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Box, colors, Link, Stack, Typography } from '@mui/material';
import { StyledButton } from 'components';
import { jsPDF } from 'jspdf';
import { IMedicalHistory, IVaccineRegistration } from 'models';
import { useCallback, useMemo } from 'react';
import { getDistrict, getProvince, getWard } from 'utils';
const html2canvas = require('html2canvas');

interface IProps {
  personalInfo: IVaccineRegistration | null;
  medicalHistoryReport: IMedicalHistory[];
  onBackStep: () => void;
}

export const Step4 = (props: IProps) => {
  const { personalInfo, onBackStep } = props;

  const dob = useMemo(
    () => personalInfo?.registrantInfo.dob?.toLocaleDateString(),
    [personalInfo?.registrantInfo.dob]
  );

  const gender = useMemo(
    () => (personalInfo?.registrantInfo.gender === 1 ? 'Nam' : 'Nữ'),
    [personalInfo?.registrantInfo.gender]
  );

  const province = useMemo(
    () => getProvince(personalInfo?.registrantInfo.provinceId || -1),
    [personalInfo?.registrantInfo.provinceId]
  );

  const district = useMemo(
    () =>
      getDistrict(
        personalInfo?.registrantInfo.provinceId || -1,
        personalInfo?.registrantInfo.districtId || -1
      ),
    [
      personalInfo?.registrantInfo.districtId,
      personalInfo?.registrantInfo.provinceId
    ]
  );

  const ward = useMemo(
    () =>
      getWard(
        personalInfo?.registrantInfo.provinceId || -1,
        personalInfo?.registrantInfo.districtId || -1,
        personalInfo?.registrantInfo.wardId || -1
      ),
    [
      personalInfo?.registrantInfo.districtId,
      personalInfo?.registrantInfo.provinceId,
      personalInfo?.registrantInfo.wardId
    ]
  );

  const handleClick = useCallback(() => {
    html2canvas(document.getElementById('export')).then(
      (canvas: HTMLCanvasElement) => {
        const doc = new jsPDF();
        doc.addImage(canvas, 'JPEG', 5, 20, 200, 52);
        doc.save('download.pdf');
      }
    );
  }, []);

  return (
    <Stack direction="column" alignItems="center" id="export-to-pdf">
      <Box id="export" width="100%">
        <Typography variant="h6" mb={2} align="center">
          Đăng ký tiêm chủng COVID-19 thành công. Mã đặt tiêm của bạn là{' '}
          <Box component="span" sx={{ color: colors.red[700] }}>
            0120211103501237
          </Box>
          .
        </Typography>
        <Typography align="center" variant="body1" mb={2}>
          Cảm ơn quý khách đã đăng ký tiêm chủng vắc xin COVID-19. Hiện tại Bộ y
          tế đang tiến hành thu thập nhu cầu và thông tin để lập danh sách đối
          tượng đăng ký tiêm vắc xin COVID-19 theo từng địa bàn. Chúng tôi sẽ
          liên hệ với quý khách theo số điện thoại{' '}
          <Box
            component="span"
            sx={{ color: (theme) => theme.palette.info.light }}>
            {personalInfo?.registrantInfo.phone}
          </Box>{' '}
          khi có kế hoạch tiêm trong thời gian sớm nhất.
        </Typography>
        <Typography variant="body1" mb={2} align="center">
          Mời bạn tải ứng dụng "SỔ SỨC KHỎE ĐIỆN TỬ" tại{' '}
          <Link href="https://hssk.kcb.vn/#/sskdt" target="_blank">
            https://hssk.kcb.vn/#/sskdt
          </Link>{' '}
          để theo dõi kết quả đăng ký tiêm và nhận chứng nhận tiêm chủng
          COVID-19
        </Typography>
        <Stack direction="row" sx={{ width: '100%' }} mb={2} mt={3}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1">Họ tên</Typography>
            <Typography variant="body1" fontWeight="500">
              {personalInfo?.registrantInfo.fullName}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1">Ngày sinh</Typography>
            <Typography variant="body1" fontWeight="500">
              {dob}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1">Giới tính</Typography>
            <Typography variant="body1" fontWeight="500">
              {gender}
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" sx={{ width: '100%' }} mb={2}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1">Số điện thoai</Typography>
            <Typography variant="body1" fontWeight="500">
              {personalInfo?.registrantInfo.phone}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1">
              Số CMND/CCCD/Mã định danh công dân
            </Typography>
            <Typography variant="body1" fontWeight="500">
              {personalInfo?.registrantInfo.citizenId}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1">Số thẻ BHYT</Typography>
            <Typography variant="body1" fontWeight="500">
              {personalInfo?.registrantInfo.healthInsuranceCardNumber}
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" sx={{ width: '100%' }} mb={2}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1">Tỉnh/Thành phố</Typography>
            <Typography variant="body1" fontWeight="500">
              {province?.label}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1">Quận/Huyện</Typography>
            <Typography variant="body1" fontWeight="500">
              {district?.label}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1">Xã/Phường</Typography>
            <Typography variant="body1" fontWeight="500">
              {ward?.label}
            </Typography>
          </Box>
        </Stack>
      </Box>
      <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
        <StyledButton
          variant="outlined"
          onClick={onBackStep}
          startIcon={<ArrowBackIcon />}>
          Quay lại
        </StyledButton>
        <StyledButton
          variant="contained"
          endIcon={<FileDownloadOutlinedIcon />}
          onClick={handleClick}>
          Xuất thông tin
        </StyledButton>
      </Stack>
    </Stack>
  );
};
