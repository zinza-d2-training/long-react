export interface IInjectionRegistrationForm {
  citizenId: string;
  phone: string;
}

export interface IInjectionRegistration {
  id: string;
  fullName: string;
  dob: Date;
  gender: number;
  phone: string;
  citizenId: string;
  status: InjectionRegistrationStatus;
  process: number;
}

export enum InjectionRegistrationStatus {
  SUCCESS,
  FAILURE
}

export interface IInjectionRegistrationProcess {
  id: number;
  label: string;
}
