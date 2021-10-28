export interface IFile {
  file: File;
  preview: string;
}

export interface IRegisterForm {
  citizenId: string;
  imageName: string;
  citizenImages: IFile[];
  fullName: string;
  dob: Date | null;
  gender: string;
  phoneNumber: string;
  cityProvince: string;
  district: string;
  wards: string;
}
