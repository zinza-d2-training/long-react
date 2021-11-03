import { ICountry } from './country';

export interface IRegistrantInfo {
  fullName: string;
  dob: Date | null;
  gender: number;
  phone: string;
  email: string;
  citizenId: string;
  healthInsuranceCardNumber: string;
  job: string;
  workUnit: string;
  currentAddress: string;
  provinceId: number;
  districtId: number;
  wardId: number;
  ethnic: string;
  nationality: ICountry | null;
  priorityGroup: number;
}

export interface IVaccinationRegistrationInfo {
  injectionDate: Date | null;
  injectionTime: number;
}

export interface IHistoryOfFirstInjection {
  vaccineId: number;
  injectionDate: Date | null;
  shipmentNumber: string;
  vaccinePlace: string;
  postVaccinationReaction: string;
}

export interface IVaccineRegistration {
  injectionTime: number;
  registrantInfo: IRegistrantInfo;
  vaccinationRegistrationInfo: IVaccinationRegistrationInfo;
  historyOfFirstInjection?: IHistoryOfFirstInjection;
}
