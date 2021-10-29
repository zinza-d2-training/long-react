import {
  Box,
  colors,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  TextField,
  Typography
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useHistory } from 'react-router';
import StyledButton from 'components/Button';
import { useClock } from 'hooks';
import { PATH_LOGIN } from 'routes';
import { isNumberOrNull } from 'utils/validate';
import { styleInputLarge } from 'theme';

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
          <Dialog
            open={isOpenModal}
            hideBackdrop
            sx={{ '.container': { width: '500px' } }}>
            <DialogTitle
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%'
              }}>
              <Typography component="p" variant="h6">
                Xác thực OTP
              </Typography>
              <IconButton onClick={handleCloseModal}>
                <ClearIcon />
              </IconButton>
            </DialogTitle>
            <Divider />
            <DialogContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: '24px 42px',
                width: '500px'
              }}>
              <img src="images/logo.png" alt="" />
              <Typography
                variant="body1"
                sx={{ maxWidth: '310px', my: 3 }}
                align="center">
                Mã xác minh sẽ được gửi bằng tin nhắn đến SĐT bạn đăng ký
              </Typography>
              <OtpInput
                value={otp}
                onChange={handleChangeOtp}
                numInputs={6}
                separator={<Box width="16px"></Box>}
                inputStyle={{
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.075)',
                  border: 'none',
                  borderBottom: '2px inset #E53935',
                  width: '40px',
                  height: '40px',
                  outline: 'none',
                  fonWeight: 'bold',
                  fontSize: '24px'
                }}
                focusStyle={{
                  borderBottom: '2px inset #78909C'
                }}
                isInputNum
                shouldAutoFocus
              />
              <Typography
                variant="body1"
                align="center"
                sx={{ my: 3, color: colors.blueGrey['400'] }}>
                Nếu bạn không nhân được tin nhắn, xin vui lòng thử lại sau:{' '}
                {time}
              </Typography>
              {isShowReSendOtp && (
                <Typography
                  variant="body1"
                  sx={{
                    color: colors.blue['600'],
                    mb: 3,
                    cursor: 'pointer'
                  }}
                  onClick={handleReSendOtp}>
                  Gửi lại mã OTP?
                </Typography>
              )}
              <Box>
                <StyledButton
                  variant="outlined"
                  sx={{ mr: 2 }}
                  onClick={handleCloseModal}>
                  Hủy bỏ
                </StyledButton>
                <StyledButton
                  variant="contained"
                  onClick={handleConfirm}
                  disabled={otp.trim().length < 6}>
                  Xác nhận
                </StyledButton>
              </Box>
            </DialogContent>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
