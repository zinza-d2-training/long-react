import {
  Box,
  colors,
  Divider,
  Modal,
  TextField,
  Typography
} from '@mui/material';
import { useHistory } from 'react-router';
import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import StyledButton from 'components/Button';
import { useAppSelector } from 'store';
import { authSelector } from 'store/slices/authSlice';
import { PATH_HOME, PATH_LOGIN } from 'routes';
import { useClock } from 'hooks';

const ForgotPassword = () => {
  const [citizenId, setCitizenId] = useState<string>('');
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const [isShowReSendOtp, setIsShowReSendOtp] = useState<boolean>(false);
  const history = useHistory();
  const token = useAppSelector(authSelector).token;
  const { time, setTime } = useClock({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (token) {
      history.push(PATH_HOME);
    }
  }, [history, token]);

  useEffect(() => {
    if (time === '00:00:00') {
      setIsShowReSendOtp(true);
    } else {
      setIsShowReSendOtp(false);
    }
  }, [time]);

  const handleChangeCitizenId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCitizenId(e.target.value);
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
    setOtp(otp);
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
            sx={{
              height: '50px',
              mt: (theme) => theme.spacing(3),
              '& > div': {
                height: '100%'
              }
            }}
            value={citizenId}
            onChange={handleChangeCitizenId}
          />
          <Box sx={{ mt: (theme) => theme.spacing(3), px: '12px' }}>
            <StyledButton variant="outlined" onClick={backToLoginPage}>
              Quay lại
            </StyledButton>
            <StyledButton
              disabled={citizenId.trim().length === 0}
              variant="contained"
              sx={{ ml: (theme) => theme.spacing(2) }}
              onClick={handleOpenModal}>
              Gửi
            </StyledButton>
          </Box>
          <Modal open={isOpenModal} hideBackdrop>
            <Box
              sx={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#fff',
                width: '500px',
                maxWidth: '100%',
                boxShadow:
                  '0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)'
              }}>
              <Box
                sx={{
                  height: '64px',
                  p: '16px 0 16px 24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                <Typography variant="h6">Xác thực OTP</Typography>
                <Box
                  sx={{
                    width: '56px',
                    fontSize: '40px',
                    textAlign: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={handleCloseModal}>
                  &times;
                </Box>
              </Box>
              <Divider />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: '24px 42px'
                }}>
                <img src="images/logo.png" alt="" />
                <Typography
                  variant="body1"
                  sx={{ maxWidth: '310px', my: '24px' }}
                  align="center">
                  Mã xác minh sẽ được gửi bằng tin nhắn đến SĐT bạn đăng ký
                </Typography>
                <OtpInput
                  value={otp}
                  onChange={handleChangeOtp}
                  numInputs={6}
                  separator={<Box width="16px"></Box>}
                  inputStyle={{
                    boxShadow:
                      '0px 2px 4px rgba(0, 0, 0, 0.075), inset 0px -2px 0px #E53935',
                    width: '40px',
                    height: '40px',
                    border: 'none',
                    outline: 'none',
                    fonWeight: 'bold',
                    fontSize: '24px'
                  }}
                  focusStyle={{
                    boxShadow:
                      '0px 2px 4px rgba(0, 0, 0, 0.075), inset 0px -2px 0px #78909C'
                  }}
                />
                <Typography
                  variant="body1"
                  align="center"
                  sx={{ my: '24px', color: colors.blueGrey['400'] }}>
                  Nếu bạn không nhân được tin nhắn, xin vui lòng thử lại sau:{' '}
                  {time}
                </Typography>
                {isShowReSendOtp && (
                  <Typography
                    variant="body1"
                    sx={{
                      color: colors.blue['600'],
                      mb: '24px',
                      cursor: 'pointer'
                    }}
                    onClick={handleReSendOtp}>
                    Gửi lại mã OTP?
                  </Typography>
                )}
                <Box>
                  <StyledButton
                    variant="outlined"
                    sx={{ mr: '16px' }}
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
              </Box>
            </Box>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
