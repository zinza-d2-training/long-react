interface IBaseAddress {
  id: string;
  label: string;
  value: string;
}

export interface IWard extends IBaseAddress {}

export interface IDistrict extends IBaseAddress {
  children: IWard[];
}

export interface ICity extends IBaseAddress {
  children: IDistrict[];
}

export interface IAddress extends ICity {}
