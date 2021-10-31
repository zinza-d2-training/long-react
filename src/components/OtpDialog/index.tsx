import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
  Box,
  colors
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import OtpInput from 'react-otp-input';
import StyledButton from 'components/Button';

interface IProps {
  open: boolean;
  otp: string;
  isShowReSendOtp: boolean;
  time: string;
  onReSendOtp: () => void;
  onChangeOtp: (otp: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}
const OtpDialog = (props: IProps) => {
  const {
    open,
    onClose,
    otp,
    onChangeOtp,
    isShowReSendOtp,
    onReSendOtp,
    onConfirm,
    time
  } = props;
  return (
    <Dialog open={open} hideBackdrop sx={{ '.container': { width: '500px' } }}>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: '12px 11px 12px 24px'
        }}>
        <Typography component="p" variant="h6">
          Xác thực OTP
        </Typography>
        <IconButton onClick={onClose}>
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
          onChange={onChangeOtp}
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
          Nếu bạn không nhân được tin nhắn, xin vui lòng thử lại sau: {time}
        </Typography>
        {isShowReSendOtp && (
          <Typography
            variant="body1"
            sx={{
              color: colors.blue['600'],
              mb: 3,
              cursor: 'pointer'
            }}
            onClick={onReSendOtp}>
            Gửi lại mã OTP?
          </Typography>
        )}
        <Box>
          <StyledButton variant="outlined" sx={{ mr: 2 }} onClick={onClose}>
            Hủy bỏ
          </StyledButton>
          <StyledButton
            variant="contained"
            onClick={onConfirm}
            disabled={otp.trim().length < 6}>
            Xác nhận
          </StyledButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default OtpDialog;
