/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { Theme, Typography } from '@mui/material';
import { css } from '@mui/styled-engine';
import { Interpolation } from '@mui/system';
import { HTMLAttributes } from 'react';

interface IProps extends HTMLAttributes<HTMLInputElement> {
  label?: string;
  name?: string;
  error?: string;
  fullWidth?: boolean;
}

const InputField = (props: IProps) => {
  const { label, name, error, fullWidth, ...inputProps } = props;

  const inputStyle: Interpolation<Theme> = css`
    border: none;
    height: 50px;
    width: ${fullWidth ? '100%' : '376px'};
    max-width: 100%;
    border: 1px solid #e8e8e8;
    outline: none;
    padding: 0 16px;
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
  return (
    <>
      {label && (
        <Typography
          component="label"
          variant="label"
          htmlFor={name}
          css={labelStyle}>
          {label}
        </Typography>
      )}
      <input {...inputProps} id={name} css={inputStyle} />
      {error && <Typography css={errorStyle}>{error}</Typography>}
    </>
  );
};

export default InputField;
