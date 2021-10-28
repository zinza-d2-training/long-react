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
  citizenImages: yup.array().min(2, 'Chọn tối thiểu 2 ảnh'),
  fullName: yup.string().required('Trường này là bắt buộc'),
  dob: yup.date().required('Trường này là bắt buộc'),
  gender: yup.string().required('Trường này là bắt buộc'),
  phoneNumber: yup
    .string()
    .required('Trường này là bắt buộc')
    .matches(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
      'Số điện thoại không hợp lệ'
    ),
  cityProvince: yup.string().required('Trường này là bắt buộc'),
  district: yup.string().required('Trường này là bắt buộc'),
  wards: yup.string().required('Trường này là bắt buộc')
});
