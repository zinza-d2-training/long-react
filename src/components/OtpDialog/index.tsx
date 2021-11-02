import ClearIcon from '@mui/icons-material/Clear';
import {
  Box,
  colors,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Typography
} from '@mui/material';
import StyledButton from 'components/Button';
import StyledDialogTitle from 'components/DialogTitle';
import { useClock } from 'hooks';
import { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { isNumberOrNull } from 'utils/validate';

const START_TIME = { hours: 0, minutes: 0, seconds: 0 };
interface IProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const OtpDialog = (props: IProps) => {
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

  const handleClose = () => {
    setOtp('');
    onClose();
  };

  const handleConfirm = () => {
    setOtp('');
    onConfirm();
  };

  return (
    <Dialog open={open} hideBackdrop sx={{ '.container': { width: '500px' } }}>
      <StyledDialogTitle>
        <Typography component="p" variant="h6">
          Xác thực OTP
        </Typography>
        <IconButton onClick={handleClose}>
          <ClearIcon />
        </IconButton>
      </StyledDialogTitle>
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

export default OtpDialog;
