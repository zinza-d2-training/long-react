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
  fullName: yup.string().required('Đây là trường bắt buộc!'),
  dob: yup.string().required('Đây là trường bắt buộc!'),
  gender: yup.number().required('Đây là trường bắt buộc!'),
  phoneNumber: yup
    .string()
    .required('Đây là trường bắt buộc!')
    .matches(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
      'Số điện thoại không hợp lệ!'
    ),
  provinceId: yup.number().required('Đây là trường bắt buộc!'),
  districtId: yup.number().required('Đây là trường bắt buộc!'),
  wardId: yup.number().required('Đây là trường bắt buộc!')
});

export const certificationSchema = yup.object().shape({
  fullName: yup.string().required('Đây là trường bắt buộc!'),
  dob: yup.date().required('Đây là trường bắt buộc!'),
  gender: yup.number().required('Đây là trường bắt buộc!'),
  phone: yup.string().required('Đây là trường bắt buộc!'),
  citizenId: yup.string(),
  healthInsuranceCardNumber: yup.string()
});

export const injectionRegistrationSchema = yup.object().shape({
  citizenId: yup
    .string()
    .required('Đây là trường bắt buộc!')
    .matches(
      /^\d{9}$|^\d{12}$/g,
      'Số căn cước hoặc chứng minh thư không hợp lệ!'
    ),
  phone: yup
    .string()
    .required('Đây là trường bắt buộc!')
    .matches(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
      'Số điện thoại không hợp lệ!'
    )
});

export const vaccineRegistrationSchema = yup.object().shape({
  injectionTime: yup
    .number()
    .required('Đây là trường bắt buộc!')
    .test('test', 'Đây là trường bắt buộc!', (value) => value !== 0),
  registrantInfo: yup.object().shape({
    fullName: yup.string().required('Đây là trường bắt buộc!'),
    dob: yup.date().nullable().required('Đây là trường bắt buộc!'),
    gender: yup
      .number()
      .required('Đây là trường bắt buộc!')
      .test('test', 'Đây là trường bắt buộc!', (value) => value !== -1),
    phone: yup
      .string()
      .required('Đây là trường bắt buộc!')
      .matches(
        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
        'Số điện thoại không hợp lệ!'
      ),
    email: yup.string().email('Email không hợp lệ!'),
    citizenId: yup
      .string()
      .required('Đây là trường bắt buộc!')
      .matches(
        /^\d{9}$|^\d{12}$/g,
        'Số căn cước hoặc chứng minh thư không hợp lệ!'
      ),
    healthInsuranceCardNumber: yup.string(),
    provinceId: yup
      .number()
      .required('Đây là trường bắt buộc!')
      .test('test', 'Đây là trường bắt buộc!', (value) => value !== -1),
    districtId: yup
      .number()
      .required('Đây là trường bắt buộc!')
      .test('test', 'Đây là trường bắt buộc!', (value) => value !== -1),
    wardId: yup
      .number()
      .required('Đây là trường bắt buộc!')
      .test('test', 'Đây là trường bắt buộc!', (value) => value !== -1),
    ethnic: yup.string(),
    priorityGroup: yup
      .number()
      .required('Đây là trường bắt buộc!')
      .test('test', 'Đây là trường bắt buộc!', (value) => value !== -1)
  }),
  vaccinationRegistrationInfo: yup.object().shape({
    injectionDate: yup.date().nullable(),
    injectionTime: yup.number()
  }),
  historyOfFirstInjection: yup.object().shape({
    vaccineId: yup
      .number()
      .required('Đây là trường bắt buộc!')
      .test(
        'test',
        'Đây là trường bắt buộc!',
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
        'Đây là trường bắt buộc!',
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

export const userFormSchema = yup.object().shape({
  citizenId: yup
    .string()
    .required('Đây là trường bắt buộc!')
    .matches(
      /^\d{9}$|^\d{12}$/g,
      'Số căn cước hoặc chứng minh thư không hợp lệ!'
    ),
  fullName: yup.string().required('Đây là trường bắt buộc!'),
  dob: yup.string().required('Đây là trường bắt buộc!'),
  gender: yup.number().required('Đây là trường bắt buộc!'),
  phoneNumber: yup
    .string()
    .required('Đây là trường bắt buộc!')
    .matches(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
      'Số điện thoại không hợp lệ!'
    ),
  provinceId: yup
    .number()
    .required('Đây là trường bắt buộc!')
    .test('test', 'Đây là trường bắt buộc!', (value) => value !== -1),
  districtId: yup
    .number()
    .required('Đây là trường bắt buộc!')
    .test('test', 'Đây là trường bắt buộc!', (value) => value !== -1),
  wardId: yup
    .number()
    .required('Đây là trường bắt buộc!')
    .test('test', 'Đây là trường bắt buộc!', (value) => value !== -1),
  newPassword: yup.string().min(8, 'Ít nhất 8 ký tự'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Mật khẩu không khớp!')
});
