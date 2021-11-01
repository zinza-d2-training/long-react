import ClearIcon from '@mui/icons-material/Clear';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Box,
  colors,
  Dialog,
  DialogContent,
  IconButton,
  Theme,
  Typography
} from '@mui/material';
import { SxProps } from '@mui/system';
import StyledDialogTitle from 'components/DialogTitle';
import { IFile } from 'models/register';
import React, { HTMLAttributes, useState } from 'react';

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

interface IProps {
  max?: number;
  min?: number;
  multiple?: boolean;
  inputProps?: HTMLAttributes<HTMLInputElement>;
  onAddImage: (file: IFile[]) => void;
  onRemoveImage: (imageIndex: number) => void;
}

const FilePicker = (props: IProps) => {
  const {
    max = 10000,
    inputProps,
    onRemoveImage,
    multiple,
    onAddImage
  } = props;

  const [files, setFiles] = useState<IFile[]>([]);
  const [selectedImage, setSelectedImage] = useState<{
    name: string;
    blob: string;
  } | null>(null);
  const [isOpenPreview, setIsOpenPreview] = useState<boolean>(false);

  const handleChangeSelectedImage = (name: string, blob: string) => {
    setIsOpenPreview(true);
    setSelectedImage({ name, blob });
  };

  const id = inputProps?.id;
  return (
    <Box>
      <input
        {...inputProps}
        onChange={(e) => {
          if (e.target.files) {
            const listFiles = Object.values(e.target.files);
            const newImages = [
              ...files,
              ...listFiles.map((file) => ({
                file,
                preview: URL.createObjectURL(file)
              }))
            ];
            const newValue = newImages.splice(0, max);
            setFiles(newValue);
            e.target.value = '';
            onAddImage(newValue);
          }
        }}
        style={{ display: 'none' }}
        type="file"
        multiple={multiple}
        id={id ? id : 'file_picker_id'}
      />
      <Box
        sx={{
          display: 'flex',
          p: 2,
          border: `1px solid ${colors.grey[100]}`,
          width: '100%',
          flexWrap: 'wrap'
        }}>
        {files.map(({ preview, file }, index) => (
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
                onClick={() => handleChangeSelectedImage(file.name, preview)}>
                <VisibilityIcon />
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: '#fff' }}
                onClick={() => {
                  setFiles((prevState) => {
                    return prevState.filter(
                      (file, fileIndex) => fileIndex !== index
                    );
                  });
                  onRemoveImage(index);
                }}>
                <DeleteOutlinedIcon />
              </IconButton>
            </Box>
            <img src={preview} style={{ borderRadius: '4px' }} alt="" />
          </Box>
        ))}
        {files.length < max && (
          <Box
            component="label"
            htmlFor={id ? id : 'file_picker_id'}
            sx={{
              ...stylePreview,
              backgroundColor: colors.grey[100],
              '&:hover': { border: `1px dashed ${colors.blue[700]}` }
            }}>
            + Upload
          </Box>
        )}
      </Box>
      <Dialog
        open={isOpenPreview}
        hideBackdrop
        sx={{ '& > div': { width: '490px', m: '0 auto' } }}>
        <StyledDialogTitle>
          <Typography
            mr={1}
            component="p"
            variant="h6"
            sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {selectedImage?.name}
          </Typography>
          <IconButton onClick={() => setIsOpenPreview(false)}>
            <ClearIcon />
          </IconButton>
        </StyledDialogTitle>
        <DialogContent>
          <img
            src={selectedImage?.blob}
            width="100%"
            alt={selectedImage?.name}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default FilePicker;
