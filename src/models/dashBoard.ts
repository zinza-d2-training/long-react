export interface IInjected {
  amount: number;
}

export interface IInjectedByDay extends IInjected {
  day: Date;
}

export interface IInjectedByTotalSupplied extends IInjected {
  totalSupplied: number;
  province: string;
}
