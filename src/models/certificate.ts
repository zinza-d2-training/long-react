export interface ICertificateSearch {
  fullName: string;
  dob: Date | undefined;
  gender: number;
  phone: string;
  citizenId: string;
  healthInsuranceCardNumber: string;
}

export interface IVaccinate {
  id: string;
  number: number;
  time: Date;
  vaccinationName: string;
  shipmentNumber: string;
  vaccinationSite: string;
}

export interface ICertificate {
  fullName: string;
  dob: Date;
  citizenId: string;
  healthInsuranceCardNumber: string;
  phone: string;
  provinceId: number;
  districtId: number;
  wardId: number;
  vaccinate: IVaccinate[];
}
