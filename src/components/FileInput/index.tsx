import FilePicker from 'components/FilePicker';
import { IFile, IRegisterForm } from 'models/register';
import { useFormContext } from 'react-hook-form';

const FileInput = () => {
  const { register, watch, setValue, clearErrors, setError } =
    useFormContext<IRegisterForm>();

  const handleAddImage = (files: IFile[]) => {
    setValue('citizenImages', files);
    if (files.length < 2) {
      setError('citizenImages', { message: 'Chọn tối thiểu 2 ảnh' });
    } else {
      clearErrors('citizenImages');
    }
  };

  const handleRemoveImage = (imageIndex: number) => {
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
  };
  return (
    <FilePicker
      max={2}
      inputProps={{ ...register('imageName'), multiple: true }}
      onRemoveImage={handleRemoveImage}
      onAddImage={handleAddImage}
    />
  );
};

export default FileInput;
