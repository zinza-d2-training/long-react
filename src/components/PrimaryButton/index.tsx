/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { Interpolation } from '@emotion/serialize';
import { Theme } from '@mui/material';
import { css } from '@mui/styled-engine';
import { FC, HTMLAttributes } from 'react';

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  color?: string;
  fullWidth?: boolean;
}

const PrimaryButton: FC<IProps> = (props) => {
  const { color, fullWidth, ...buttonProps } = props;
  const buttonStyle: Interpolation<Theme> = css`
    background-color: ${color ? color : '#04C35C'};
    border-radius: 5px;
    outline: none;
    border: none;
    font-size: 16px;
    color: #fff;
    padding: 15px;
    width: ${fullWidth ? '100%' : 'auto'};
    cursor: pointer;
    font-weight: bold;
  `;
  return (
    <button {...buttonProps} css={buttonStyle}>
      {props.children}
    </button>
  );
};

export default PrimaryButton;
