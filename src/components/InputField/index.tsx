/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import {
  Theme,
  Typography,
  Box,
  TextField,
  TextFieldProps
} from '@mui/material';
import { css } from '@mui/styled-engine';
import { Interpolation } from '@emotion/serialize';

const inputStyle: Interpolation<Theme> = css`
  border: none;
  height: 50px;
  width: 376px;
  max-width: 100%;
  outline: none;
  border-radius: 4px;

  &.fullWidth {
    width: 100%;
  }
`;

const labelStyle: Interpolation<Theme> = css`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.87);
  display: block;
  line-height: 24px;
`;

const errorStyle: Interpolation<Theme> = css`
  color: #d32f2f;
  line-height: 20px;
  font-size: 12px;
`;

const InputField = (props: TextFieldProps) => {
  const { label, name, error, fullWidth, ...inputProps } = props;

  return (
    <Box sx={fullWidth ? { width: '100%' } : {}}>
      {label && (
        <Typography
          component="label"
          variant="label"
          htmlFor={name}
          css={labelStyle}
          mb={1}>
          {label}
        </Typography>
      )}
      <TextField
        {...inputProps}
        className={fullWidth ? 'fullWidth' : ''}
        id={name}
        css={inputStyle}
      />
      {error && <Typography css={errorStyle}>{error}</Typography>}
    </Box>
  );
};

export default InputField;
