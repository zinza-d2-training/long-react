import {
  IInjectionRegistration,
  IInjectionRegistrationProcess,
  InjectionRegistrationStatus
} from 'models';

export const fakeInjectionRegistration: IInjectionRegistration[] = [
  {
    id: 'id-sadad',
    fullName: 'Bùi Đức Long',
    dob: new Date('11/05/2000'),
    gender: 1,
    phone: '0911448457',
    citizenId: '123456789',
    status: InjectionRegistrationStatus.SUCCESS,
    process: 0
  },
  {
    id: 'id-dghd',
    fullName: 'Bùi Đức Long',
    dob: new Date('11/05/2000'),
    gender: 1,
    phone: '0911448457',
    citizenId: '123456789',
    status: InjectionRegistrationStatus.SUCCESS,
    process: 1
  },
  {
    id: 'id-gjgh',
    fullName: 'Bùi Đức Long',
    dob: new Date('11/05/2000'),
    gender: 1,
    phone: '0911448457',
    citizenId: '123456789',
    status: InjectionRegistrationStatus.FAILURE,
    process: 2
  }
];

export const injectionRegistrationProcess: IInjectionRegistrationProcess[] = [
  {
    id: 0,
    label: 'Đăng ký thành công'
  },
  {
    id: 1,
    label: 'Chuyển cơ sở tiêm'
  },
  {
    id: 2,
    label: 'Đã tiêm'
  }
];
