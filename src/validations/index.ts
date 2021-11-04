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

export const vaccineRegistrationSchema = yup.object().shape({
  injectionTime: yup
    .number()
    .required('Trường này không được bỏ trống')
    .test('test', 'Trường này không được bỏ trống', (value) => value !== 0),
  registrantInfo: yup.object().shape({
    fullName: yup.string().required('Trường này không được bỏ trống'),
    dob: yup.date().nullable().required('Trường này không được bỏ trống'),
    gender: yup
      .number()
      .required('Trường này không được bỏ trống')
      .test('test', 'Trường này không được bỏ trống', (value) => value !== -1),
    phone: yup
      .string()
      .required('Trường này không được bỏ trống')
      .matches(
        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
        'Số điện thoại không hợp lệ'
      ),
    email: yup.string().email('Email không hợp lệ'),
    citizenId: yup
      .string()
      .required('Trường này không được bỏ trống')
      .matches(/^\d{9}$|^\d{12}$/g, 'Số CMND/CCCD không hợp lệ'),
    healthInsuranceCardNumber: yup.string(),
    provinceId: yup
      .number()
      .required('Trường này không được bỏ trống')
      .test('test', 'Trường này không được bỏ trống', (value) => value !== -1),
    districtId: yup
      .number()
      .required('Trường này không được bỏ trống')
      .test('test', 'Trường này không được bỏ trống', (value) => value !== -1),
    wardId: yup
      .number()
      .required('Trường này không được bỏ trống')
      .test('test', 'Trường này không được bỏ trống', (value) => value !== -1),
    ethnic: yup.string(),
    priorityGroup: yup
      .number()
      .required('Trường này không được bỏ trống')
      .test('test', 'Trường này không được bỏ trống', (value) => value !== -1)
  }),
  vaccinationRegistrationInfo: yup.object().shape({
    injectionDate: yup.date().nullable(),
    injectionTime: yup.number()
  }),
  historyOfFirstInjection: yup.object().shape({
    vaccineId: yup
      .number()
      .required('Trường này không được bỏ trống')
      .test(
        'test',
        'Trường này không được bỏ trống',
        (value, originalValue: any) =>
          originalValue.from[1].value.injectionTime === 1 ||
          originalValue.from[1].value.injectionTime === 0 ||
          value !== -1
      ),
    injectionDate: yup
      .date()
      .nullable()
      .test(
        'test',
        'Trường này không được bỏ trống',
        (value, originalValue: any) =>
          originalValue.from[1].value.injectionTime === 1 ||
          originalValue.from[1].value.injectionTime === 0 ||
          value !== null
      ),
    shipmentNumber: yup.string(),
    vaccinePlace: yup.string(),
    postVaccinationReaction: yup.string()
  })
});
