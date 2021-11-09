import { NestedValue } from 'react-hook-form';

export interface IFile {
  file?: File;
  preview: string;
}

export interface IRegisterForm {
  citizenId: string;
  imageName: string;
  citizenImages: NestedValue<IFile[]>;
  fullName: string;
  dob: string;
  gender: number;
  phoneNumber: string;
  provinceId: number;
  districtId: number;
  wardId: number;
}

export interface IUserInfoForm extends IRegisterForm {
  newPassword: string;
  confirmPassword: string;
}
