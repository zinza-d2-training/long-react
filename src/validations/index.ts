import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  citizenId: yup
    .string()
    .required('Đây là trường bắt buộc!')
    .matches(
      /^\d{9}$|^\d{12}$/g,
      'Số căn cước hoặc chứng minh thư không hợp lệ!'
    ),
  password: yup.string().required('Đây là trường bắt buộc!')
});

export const registerSchema = yup.object().shape({
  citizenId: yup
    .string()
    .required('Đây là trường bắt buộc!')
    .matches(
      /^\d{9}$|^\d{12}$/g,
      'Số căn cước hoặc chứng minh thư không hợp lệ!'
    ),
  citizenImages: yup.mixed().test('test', 'error', (value) => {
    return false;
  }),
  fullName: yup.string().required('Trường này là bắt buộc'),
  dob: yup.string().required('Trường này là bắt buộc'),
  gender: yup.number().required('Trường này là bắt buộc'),
  phoneNumber: yup
    .string()
    .required('Trường này là bắt buộc')
    .matches(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
      'Số điện thoại không hợp lệ'
    ),
  provinceId: yup.number().required(),
  districtId: yup.number().required(),
  wardsId: yup.number().required()
});
