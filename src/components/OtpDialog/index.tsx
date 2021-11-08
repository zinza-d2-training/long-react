import {
  Box,
  colors,
  Dialog,
  DialogContent,
  Divider,
  Typography
} from '@mui/material';
import { StyledButton, StyledDialogTitle } from 'components';
import { useClock } from 'hooks';
import { useCallback, useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { isNumberOrNull } from 'utils';

const START_TIME = { hours: 0, minutes: 0, seconds: 0 };
interface IProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const OtpDialog = (props: IProps) => {
  const { open, onClose, onConfirm } = props;
  const [otp, setOtp] = useState<string>('');
  const [isShowReSendOtp, setIsShowReSendOtp] = useState<boolean>(false);

  const { time, setTime } = useClock(START_TIME);

  useEffect(() => {
    setTime({ hours: 0, minutes: 2, seconds: 0 });
  }, [setTime]);

  useEffect(() => {
    if (time === '00:00:00') {
      setIsShowReSendOtp(true);
    } else {
      setIsShowReSendOtp(false);
    }
  }, [time]);

  const handleChangeOtp = (otp: string) => {
    if (isNumberOrNull(otp)) {
      setOtp(otp);
    }
  };
  const handleReSendOtp = () => {
    setTime({ hours: 0, minutes: 2, seconds: 0 });
  };

  const handleClose = useCallback(() => {
    setOtp('');
    onClose();
  }, [onClose]);

  const handleConfirm = () => {
    setOtp('');
    onConfirm();
  };

  return (
    <Dialog open={open} hideBackdrop sx={{ '.container': { width: '500px' } }}>
      <StyledDialogTitle title="Xác thực OTP" onClose={handleClose} />
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
          Nếu bạn không nhận được tin nhắn, xin vui lòng thử lại sau: {time}
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
          <StyledButton variant="outlined" sx={{ mr: 2 }} onClick={handleClose}>
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
  );
};
