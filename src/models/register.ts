import { ICity, IDistrict, IWard } from 'models';

export interface IFile {
  file: File;
  preview: string;
}

export interface IRegisterForm {
  citizenId: string;
  imageName: string;
  citizenImages: IFile[];
  fullName: string;
  dob: Date | undefined;
  gender: 'Nam' | 'Nữ' | 'Khác';
  phoneNumber: string;
  cityProvince: string;
  district: string;
  wards: string;
}
