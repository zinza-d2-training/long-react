import {
  IInjectionRegistration,
  ILogin,
  InjectionRegistrationStatus,
  IUserInfo
} from 'models';

export const fakeUserInfoData: IUserInfo = {
  username: 'Bùi Đức Long',
  citizenId: '012345678'
};

export const fakeAccountData: ILogin = {
  citizenId: '012345678',
  password: 'long@zinza123'
};

export const fakeUserRegistrationData: IInjectionRegistration[] = [
  {
    id: 'id-sadad',
    fullName: 'Bùi Đức Long',
    dob: new Date('11/05/2000'),
    gender: 1,
    phone: '0911448457',
    citizenId: '123456789',
    status: InjectionRegistrationStatus.SUCCESS,
    process: 0
  }
];
