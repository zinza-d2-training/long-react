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
  provinceId: yup.number().required('Đây là trường bắt buộc'),
  districtId: yup.number().required('Đây là trường bắt buộc'),
  wardId: yup.number().required('Đây là trường bắt buộc')
});

export const certificationSchema = yup.object().shape({
  fullName: yup.string().required('Họ tên không được bỏ trống'),
  dob: yup.date().required('Ngày sinh không được bỏ trống'),
  gender: yup.number().required('Giới tính không được bỏ trống'),
  phone: yup.string().required('Số điện thoại không được bỏ trống'),
  citizenId: yup.string(),
  healthInsuranceCardNumber: yup.string()
});

export const injectionRegistrationSchema = yup.object().shape({
  citizenId: yup
    .string()
    .required('Số CMND/CCCD không được bỏ trống')
    .matches(/^\d{9}$|^\d{12}$/g, 'Số CMND/CCCD không hợp lệ'),
  phone: yup
    .string()
    .required('Số điện thoại không được bỏ trống')
    .matches(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
      'Số điện thoại không hợp lệ'
    )
});
