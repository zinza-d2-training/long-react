import FilePicker from 'components/FilePicker';
import { IRegisterForm } from 'models/register';
import { useFormContext } from 'react-hook-form';

const FileInput = () => {
  const { register, watch, setValue, getValues, clearErrors, setError } =
    useFormContext<IRegisterForm>();

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
        setError('citizenImages', { message: 'Chọn tối thiểu 2 ảnh' });
      } else {
        clearErrors('citizenImages');
      }
      e.target.value = '';
    }
  };

  const handleRemoveImage = (imageIndex: number) => {
    const currentImages = watch('citizenImages');
    const newImages = [...currentImages];
    newImages.splice(imageIndex, 1);
    URL.revokeObjectURL(currentImages[imageIndex].preview);
    setValue('citizenImages', newImages);
    if (currentImages.length < 3) {
      setError('citizenImages', { message: 'Chọn tối thiểu 2 ảnh' });
    }
  };
  return (
    <FilePicker
      files={watch('citizenImages')}
      max={2}
      inputProps={{ ...register('imageName'), onChange: handleChangeImage }}
      onRemoveImage={handleRemoveImage}
      multiple
    />
  );
};

export default FileInput;
