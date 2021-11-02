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

export interface IStatisticVaccinationByLocal {
  provinceId: number;
  distributionPlan: number;
  actualDistribution: number;
  population: number;
  numberOfInjected: number;
  distributionPlanPerPopulation: number;
  actualDistributionPerPopulation: number;
  atLeastOneInjectedPerPopulation: number;
  injectedPerActualDistribution: number;
  distributionPerTotalNationnalDistribution: number;
}

export interface IStatisticVaccinationByArea {
  injectionSiteName: string;
  apartmentNumber: string;
  wardId: number;
  districtId: number;
  provinceId: number;
  leader: string;
  numberOfInjectionTables: number;
}
