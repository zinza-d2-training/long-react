import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, colors, IconButton, Theme } from '@mui/material';
import { SxProps } from '@mui/system';
import { IFile } from 'models/register';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IProps {
  register: UseFormRegisterReturn;
  value: IFile[];
  maxlength?: number;
  id?: string;
  accept?: 'image/*' | 'video/*';
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickPreviewIcon: (name: string, blob: string) => void;
  onClickRemoveIcon: (imageIndex: number) => void;
}

const stylePreview: SxProps<Theme> = {
  width: '104px',
  height: '104px',
  mr: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  borderRadius: '4px',
  border: `1px solid ${colors.grey[100]}`,
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  }
};

const styleOverlay: SxProps<Theme> = {
  position: 'absolute',
  top: '8px',
  left: '8px',
  bottom: '8px',
  right: '8px',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  opacity: 0,
  borderRadius: '4px',
  transition: '300ms'
};

const FileInput = (props: IProps) => {
  const {
    register,
    onChange,
    value,
    onClickPreviewIcon,
    onClickRemoveIcon,
    maxlength = 10000,
    id,
    accept
  } = props;
  return (
    <Box>
      <input
        {...register}
        onChange={onChange}
        type="file"
        accept={accept}
        multiple
        style={{ display: 'none' }}
        id={id}
      />
      <Box
        sx={{
          display: 'flex',
          p: 2,
          border: `1px solid ${colors.grey[100]}`,
          width: '100%',
          flexWrap: 'wrap'
        }}>
        {value.map(({ preview, file }, index) => (
          <Box
            key={preview + index}
            sx={{
              ...stylePreview,
              position: 'relative',
              transition: '300ms',
              p: 1,
              '&:hover': {
                '.buttons': {
                  opacity: 1,
                  visibility: 'visible'
                },
                '.overlay': {
                  opacity: 1
                }
              }
            }}>
            <Box className="overlay" sx={styleOverlay} />
            <Box
              className="buttons"
              sx={{
                position: 'absolute',
                top: '50%',
                left: 0,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                transform: 'translateY(-50%)',
                opacity: 0,
                visibility: 'hidden',
                transition: '200ms'
              }}>
              <IconButton
                size="small"
                sx={{ color: '#fff' }}
                onClick={() => onClickPreviewIcon(file.name, preview)}>
                <VisibilityIcon />
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: '#fff' }}
                onClick={() => onClickRemoveIcon(index)}>
                <DeleteOutlinedIcon />
              </IconButton>
            </Box>
            <img src={preview} style={{ borderRadius: '4px' }} alt="" />
          </Box>
        ))}
        {value.length < maxlength && (
          <Box
            component="label"
            htmlFor={id}
            sx={{
              ...stylePreview,
              backgroundColor: colors.grey[100],
              '&:hover': { border: `1px dashed ${colors.blue[700]}` }
            }}>
            + Upload
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FileInput;
