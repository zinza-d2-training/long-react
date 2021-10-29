import ClearIcon from '@mui/icons-material/Clear';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography
} from '@mui/material';
import ErrorMessage from 'components/ErrorMessage';
import FileInput from 'components/FileInput';
import Label from 'components/Label';
import { IRegisterForm } from 'models/register';
import { useState } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch
} from 'react-hook-form';
import { styleInputLarge } from 'theme';

interface IProps {
  control: Control<IRegisterForm, object>;
  errors: FieldErrors<IRegisterForm>;
  register: UseFormRegister<IRegisterForm>;
  watch: UseFormWatch<IRegisterForm>;
  getValues: UseFormGetValues<IRegisterForm>;
  setValue: UseFormSetValue<IRegisterForm>;
  setError: UseFormSetError<IRegisterForm>;
  clearErrors: UseFormClearErrors<IRegisterForm>;
}

const Step1 = (props: IProps) => {
  const {
    control,
    errors,
    register,
    watch,
    getValues,
    setValue,
    setError,
    clearErrors
  } = props;
  const [selectedImage, setSelectedImage] = useState<{
    name: string;
    blob: string;
  } | null>(null);
  const [isOpenPreview, setIsOpenPreview] = useState<boolean>(false);

  const handleChangeSelectedImage = (name: string, blob: string) => {
    setIsOpenPreview(true);
    setSelectedImage({ name, blob });
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentImages = getValues().citizenImages;
    // @ts-ignore
    const file = e.target.files[0];
    setValue('citizenImages', [
      ...currentImages,
      { file, preview: URL.createObjectURL(file) }
    ]);
    if (currentImages.length < 1) {
      setError('citizenImages', { message: 'Chọn tối thiểu 2 ảnh' });
    } else {
      clearErrors('citizenImages');
    }
    e.target.value = '';
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
  // @ts-ignore
  const imageError = errors.citizenImages?.message;
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Label required htmlFor="citizenId">
          Số CMND/CCCD
        </Label>
        <Controller
          name="citizenId"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              sx={styleInputLarge}
              fullWidth
              placeholder="Số CMND/CCCD"
              {...field}
              id="citizenId"
            />
          )}
        />
        {errors.citizenId?.message && (
          <ErrorMessage>{errors.citizenId.message}</ErrorMessage>
        )}
      </Box>
      <Box sx={{ width: '100%' }}>
        <Label mt={2} mb={1} sx={{ display: 'block' }} htmlFor="citizenImages">
          Ảnh chụp CMND/CCCD 2 mặt
        </Label>
        <FileInput
          register={register}
          value={watch('citizenImages')}
          onChange={handleChangeImage}
          onChangeSelectedImages={handleChangeSelectedImage}
          onRemoveImages={handleRemoveImage}
        />
        {imageError && (
          <ErrorMessage sx={{ display: 'block', width: '100%' }}>
            {imageError}
          </ErrorMessage>
        )}
      </Box>
      <Dialog
        open={isOpenPreview}
        hideBackdrop
        sx={{ '& > div': { width: '490px', m: '0 auto' } }}>
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <Typography
            component="p"
            variant="h6"
            sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {selectedImage?.name}
          </Typography>
          <IconButton onClick={() => setIsOpenPreview(false)}>
            <ClearIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <img
            src={selectedImage?.blob}
            width="100%"
            alt={selectedImage?.name}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Step1;
