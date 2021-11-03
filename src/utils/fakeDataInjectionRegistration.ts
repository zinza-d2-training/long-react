import { IInjectionRegistration, InjectionRegistrationStatus } from 'models';

export const fakeInjectionRegistration: IInjectionRegistration[] = [
  {
    id: 'id-sadad',
    fullName: 'Bùi Đức Long',
    dob: new Date('11/05/2000'),
    gender: 1,
    phone: '0911448457',
    citizenId: '123456789',
    status: InjectionRegistrationStatus.SUCCESS,
    operation: '0123456789'
  },
  {
    id: 'id-dghd',
    fullName: 'Bùi Đức Long',
    dob: new Date('11/05/2000'),
    gender: 1,
    phone: '0911448457',
    citizenId: '123456789',
    status: InjectionRegistrationStatus.SUCCESS,
    operation: '0123456789'
  },
  {
    id: 'id-gjgh',
    fullName: 'Bùi Đức Long',
    dob: new Date('11/05/2000'),
    gender: 1,
    phone: '0911448457',
    citizenId: '123456789',
    status: InjectionRegistrationStatus.FAILURE,
    operation: '0123456789'
  }
];
