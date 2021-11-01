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
  gender: number;
  phoneNumber: string;
  provinceId: number;
  districtId: number;
  wardsId: number;
}
