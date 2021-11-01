import React, { useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ClearIcon from '@mui/icons-material/Clear';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import StyledDialogTitle from 'components/DialogTitle';
import ErrorMessage from 'components/ErrorMessage';
import FileInput from 'components/FileInput';
import Label from 'components/Label';
import { IRegisterForm } from 'models/register';
import { Controller, useFormContext } from 'react-hook-form';
import { styleInputLarge } from 'theme';

interface IProps {
  onNextStep: () => void;
}

const Step1 = (props: IProps) => {
  const { onNextStep } = props;
  const {
    control,
    register,
    watch,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors }
  } = useFormContext<IRegisterForm>();
  const [selectedImage, setSelectedImage] = useState<{
    name: string;
    blob: string;
  } | null>(null);
  const [isOpenPreview, setIsOpenPreview] = useState<boolean>(false);

  const disableButton =
    !!errors.citizenId ||
    !!errors.citizenImages ||
    !watch('citizenId') ||
    !watch('citizenImages').length;

  const handleChangeSelectedImage = (name: string, blob: string) => {
    setIsOpenPreview(true);
    setSelectedImage({ name, blob });
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentImages = getValues().citizenImages;
    if (e.target.files) {
      const files = Object.values(e.target.files);
      const newImages = [
        ...currentImages,
        ...files.map((file) => ({ file, preview: URL.createObjectURL(file) }))
      ];
      const newValue = newImages.splice(0, 2);
      setValue('citizenImages', newValue);
      if (newValue.length < 2) {
        console.log(newImages);
        setError('citizenImages', { message: 'Chọn tối thiểu 2 ảnh' });
      } else {
        clearErrors('citizenImages');
      }
      e.target.value = '';
    }
  };

  const handleRemoveImage = (imageIndex: number) => {
    const currentImages = getValues().citizenImages;
    const newImages = [...currentImages];
    newImages.splice(imageIndex, 1);
    URL.revokeObjectURL(currentImages[imageIndex].preview);
    setValue('citizenImages', newImages);
    if (currentImages.length < 3) {
      setError('citizenImages', { message: 'Chọn tối thiểu 2 ảnh' });
    }
  };
  return (
    <Stack width="100%" spacing={2}>
      <Box>
        <Label required htmlFor="citizenId">
          Số CMND/CCCD
        </Label>
        <Controller
          name="citizenId"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              sx={styleInputLarge}
              fullWidth
              placeholder="Số CMND/CCCD"
              {...field}
              error={invalid}
              helperText={error?.message}
            />
          )}
        />
      </Box>
      <Box>
        <Label mb={1} sx={{ display: 'block' }} htmlFor="citizenImages">
          Ảnh chụp CMND/CCCD 2 mặt
        </Label>
        <FileInput
          register={register('imageName')}
          value={watch('citizenImages')}
          onChange={handleChangeImage}
          onClickPreviewIcon={handleChangeSelectedImage}
          onClickRemoveIcon={handleRemoveImage}
          maxlength={2}
          id="citizenImageInput"
          accept="image/*"
        />
        <ErrorMessage>{errors.citizenImages?.message}</ErrorMessage>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          width: '100%'
        }}
        pt={1}>
        <Button
          type={'button'}
          disabled={disableButton}
          onClick={onNextStep}
          endIcon={<ArrowForwardIcon />}>
          Tiếp tục
        </Button>
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
    </Stack>
  );
};

export default Step1;
