interface IBaseAddress {
  id: number;
  label: string;
  value: string;
}

export interface IWard extends IBaseAddress {}

export interface IDistrict extends IBaseAddress {
  children: IWard[];
}

export interface IProvince extends IBaseAddress {
  children: IDistrict[];
}

export interface IAddress extends IProvince {}
