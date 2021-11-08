import { FilePicker } from 'components';
import { IFile, IRegisterForm } from 'models/register';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

export const FileInput = () => {
  const { register, watch, setValue, clearErrors, setError } =
    useFormContext<IRegisterForm>();

  const handleAddImage = useCallback(
    (files: IFile[]) => {
      setValue('citizenImages', files);
      if (files.length < 2) {
        setError('citizenImages', { message: 'Chọn tối thiểu 2 ảnh' });
      } else {
        clearErrors('citizenImages');
      }
    },
    [clearErrors, setError, setValue]
  );

  const handleRemoveImage = useCallback(
    (imageIndex: number) => {
      const citizenImages = watch('citizenImages');
      URL.revokeObjectURL(citizenImages[imageIndex].preview);
      if (citizenImages.length <= 2) {
        setError('citizenImages', { message: 'Chọn tối thiểu 2 ảnh' });
      } else {
        clearErrors('citizenImages');
      }
      setValue(
        'citizenImages',
        citizenImages.filter((image, index) => index !== imageIndex)
      );
    },
    [clearErrors, setError, setValue, watch]
  );
  return (
    <FilePicker
      max={2}
      inputProps={{ ...register('imageName'), multiple: true }}
      onRemoveImage={handleRemoveImage}
      onAddImage={handleAddImage}
    />
  );
};
