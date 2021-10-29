import { Box, colors, TextField, Typography } from '@mui/material';
import StyledButton from 'components/Button';
import OtpDialog from 'components/OtpDialog';
import { useClock } from 'hooks';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { PATH_LOGIN } from 'routes';
import { styleInputLarge } from 'theme';
import { isNumberOrNull } from 'utils/validate';

const START_TIME = { hours: 0, minutes: 0, seconds: 0 };

const ForgotPassword = () => {
  const [citizenId, setCitizenId] = useState<string>('');
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const [isShowReSendOtp, setIsShowReSendOtp] = useState<boolean>(false);

  const history = useHistory();
  const { time, setTime } = useClock(START_TIME);

  useEffect(() => {
    if (time === '00:00:00') {
      setIsShowReSendOtp(true);
    } else {
      setIsShowReSendOtp(false);
    }
  }, [time]);

  const handleChangeCitizenId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (isNumberOrNull(value)) {
      setCitizenId(value);
    }
  };

  const handleOpenModal = () => {
    if (citizenId.trim()) {
      setIsOpenModal(true);
      setTime({ hours: 0, minutes: 2, seconds: 0 });
    }
  };

  const handleCloseModal = () => {
    setOtp('');
    setIsOpenModal(false);
  };

  const backToLoginPage = () => {
    history.push(PATH_LOGIN);
  };

  const handleChangeOtp = (otp: string) => {
    if (isNumberOrNull(otp)) {
      setOtp(otp);
    }
  };

  const handleReSendOtp = () => {
    setTime({ hours: 0, minutes: 2, seconds: 0 });
  };

  const handleConfirm = () => {
    handleCloseModal();
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'stretch', flex: 1 }}>
      <Box
        sx={{
          flex: 1,
          background: 'url("images/login_background.png") no-repeat',
          backgroundSize: 'cover'
        }}
      />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Box
          sx={{
            width: '479px',
            maxWidth: '100%',
            p: '0 40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Typography variant="body1" align="center">
            Để khôi phục mật khẩu, vui lòng nhập đúng số CMND/CCCD bạn đã dùng
            để đăng ký{' '}
            <Box component="span" sx={{ color: colors.red[700] }}>
              (*)
            </Box>
          </Typography>
          <TextField
            placeholder="123456789"
            variant="outlined"
            fullWidth
            sx={{ ...styleInputLarge, mt: 3 }}
            value={citizenId}
            onChange={handleChangeCitizenId}
          />
          <Box sx={{ mt: (theme) => theme.spacing(3), px: '12px' }}>
            <StyledButton variant="outlined" onClick={backToLoginPage}>
              Quay lại
            </StyledButton>
            <StyledButton
              disabled={!citizenId.trim().length}
              variant="contained"
              sx={{ ml: (theme) => theme.spacing(2) }}
              onClick={handleOpenModal}>
              Gửi
            </StyledButton>
          </Box>
          <OtpDialog
            open={isOpenModal}
            otp={otp}
            isShowReSendOtp={isShowReSendOtp}
            time={time}
            onReSendOtp={handleReSendOtp}
            onChangeOtp={handleChangeOtp}
            onClose={handleCloseModal}
            onConfirm={handleConfirm}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
