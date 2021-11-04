import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Checkbox, Divider, Stack, Typography } from '@mui/material';
import { OtpDialog, StyledButton } from 'components';
import { useState } from 'react';

interface IProps {
  onNextStep: () => void;
  onBackStep: () => void;
}

export const Step3 = (props: IProps) => {
  const [acceptInjection, setAcceptInjection] = useState(false);
  const [openOtp, setOpenOtp] = useState(false);

  const handleChangeAcceptInjection = () => {
    setAcceptInjection(!acceptInjection);
  };

  const handleConfirm = () => {
    handleCloseOtp();
    props.onNextStep();
  };

  const handleOpenOtp = () => {
    setOpenOtp(true);
  };

  const handleCloseOtp = () => {
    setOpenOtp(false);
  };
  return (
    <Box>
      <Stack direction="row" alignItems="center" mb={2} spacing={2}>
        <Box>
          <img src="images/shield.png" alt="" />
        </Box>
        <Typography variant="body1">
          1. Tiêm chủng vắc xin là biện pháp phòng chống dịch hiệu quả, tuy
          nhiên vắc xin phòng COVID-19 có thể không phòng được bệnh hoàn toàn.
          Người được tiêm chủng vắc xin phòng COVID-19 có thể phòng được bệnh
          hoặc giảm mức độ nặng nếu mắc bệnh. Tuy nhiên, sau khi tiêm chủng vẫn
          phải tiếp tục thực hiện nghiêm các biện pháp phòng chống dịch theo quy
          định.
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" mb={2} spacing={2}>
        <Box>
          <img src="images/vaccine2.png" alt="" />
        </Box>
        <Typography variant="body1">
          2. Tiêm chủng vắc xin phòng COVID-19 có thể gây ra một số biểu hiện
          tại chỗ tiêm hoặc toàn thân như sưng, đau chỗ tiêm, nhức đầu, buồn
          nôn, sốt, đau cơ…hoặc tai biến nặng sau tiêm chủng. Tiêm vắc xin mũi 2
          do Pfizer sản xuất ở người đã tiêm mũi 1 bằng vắc xin AstraZeneca có
          thể tăng khả năng xảy ra phản ứng thông thường sau tiêm chủng.
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" mb={2} spacing={2}>
        <Box>
          <img src="images/hospital.png" alt="" />
        </Box>
        <Typography variant="body1">
          3. Khi có triệu chứng bất thường về sức khỏe, người được tiêm chủng
          cần đến ngay cơ sở y tế gần nhất để được tư vấn, thăm khám và điều trị
          kịp thời.
        </Typography>
      </Stack>
      <Divider />
      <Stack direction="row" alignItems="center" spacing={2} mt={2}>
        <Typography variant="body1">
          Sau khi đã đọc các thông tin nêu trên, tôi đã hiểu về các nguy cơ và:{' '}
        </Typography>
        <Typography
          component="label"
          htmlFor="accept-injection"
          variant="body1"
          sx={{ userSelect: 'none', cursor: 'pointer' }}>
          <Checkbox
            id="accept-injection"
            checked={acceptInjection}
            onChange={handleChangeAcceptInjection}
          />
          Đồng ý tiêm chủng
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
        <StyledButton
          variant="outlined"
          onClick={props.onBackStep}
          startIcon={<ArrowBackIcon />}>
          Quay lại
        </StyledButton>
        <StyledButton
          disabled={!acceptInjection}
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={handleOpenOtp}>
          Tiếp tục
        </StyledButton>
      </Stack>
      <OtpDialog
        open={openOtp}
        onClose={handleCloseOtp}
        onConfirm={handleConfirm}
      />
    </Box>
  );
};
