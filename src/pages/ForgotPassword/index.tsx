import { Box, TextField, Typography } from '@mui/material';
import { OtpDialog, StyledButton } from 'components';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import { RoutePaths } from 'routes';
import { styleInputLarge } from 'theme';
import { isNumberOrNull } from 'utils';

export const ForgotPassword = () => {
  const [citizenId, setCitizenId] = useState<string>('');
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const history = useHistory();

  const handleChangeCitizenId = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();
      if (isNumberOrNull(value)) {
        setCitizenId(value);
      }
    },
    []
  );

  const handleOpenModal = useCallback(() => {
    if (citizenId.trim()) {
      setIsOpenModal(true);
    }
  }, [citizenId]);

  const handleCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  const backToLoginPage = useCallback(() => {
    history.push(RoutePaths.login);
  }, [history]);

  const handleConfirm = useCallback(() => {
    handleCloseModal();
  }, [handleCloseModal]);

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
            width: '380px',
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Typography variant="body1" align="center">
            Để khôi phục mật khẩu, vui lòng nhập đúng số CMND/CCCD bạn đã dùng
            để đăng ký
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
            onClose={handleCloseModal}
            onConfirm={handleConfirm}
          />
        </Box>
      </Box>
    </Box>
  );
};
