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
  operation: string;
}

export enum InjectionRegistrationStatus {
  SUCCESS,
  FAILURE
}
