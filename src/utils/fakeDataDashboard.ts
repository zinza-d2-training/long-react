import {
  IInjectedByDay,
  IInjectedByTotalSupplied,
  IStatisticVaccinationByArea,
  IStatisticVaccinationByLocal
} from 'models';

export const fakeInjectedByDay: IInjectedByDay[] = [
  {
    day: new Date('10/02/2021'),
    amount: 1381864
  },
  {
    day: new Date('10/03/2021'),
    amount: 1181761
  },
  {
    day: new Date('10/04/2021'),
    amount: 1086361
  },
  {
    day: new Date('10/05/2021'),
    amount: 1274649
  },
  {
    day: new Date('10/06/2021'),
    amount: 1165291
  },
  {
    day: new Date('10/07/2021'),
    amount: 1481934
  },
  {
    day: new Date('10/08/2021'),
    amount: 1113685
  },
  {
    day: new Date('10/09/2021'),
    amount: 1220757
  },
  {
    day: new Date('10/10/2021'),
    amount: 1118526
  },
  {
    day: new Date('10/11/2021'),
    amount: 934703
  },
  {
    day: new Date('10/12/2021'),
    amount: 1142514
  },
  {
    day: new Date('10/13/2021'),
    amount: 1204947
  },
  {
    day: new Date('10/14/2021'),
    amount: 1547763
  },
  {
    day: new Date('10/15/2021'),
    amount: 1279973
  },
  {
    day: new Date('10/16/2021'),
    amount: 1512310
  },
  {
    day: new Date('10/17/2021'),
    amount: 1506365
  },
  {
    day: new Date('10/18/2021'),
    amount: 1609812
  },
  {
    day: new Date('10/19/2021'),
    amount: 2062348
  },
  {
    day: new Date('10/20/2021'),
    amount: 1800271
  },
  {
    day: new Date('10/21/2021'),
    amount: 1535250
  },
  {
    day: new Date('10/22/2021'),
    amount: 1154115
  },
  {
    day: new Date('10/23/2021'),
    amount: 1030833
  },
  {
    day: new Date('10/24/2021'),
    amount: 1086485
  },
  {
    day: new Date('10/25/2021'),
    amount: 915269
  },
  {
    day: new Date('10/26/2021'),
    amount: 1007267
  },
  {
    day: new Date('10/27/2021'),
    amount: 1167446
  },
  {
    day: new Date('10/28/2021'),
    amount: 1651657
  },
  {
    day: new Date('10/29/2021'),
    amount: 1586904
  },
  {
    day: new Date('10/30/2021'),
    amount: 911698
  },
  {
    day: new Date('10/31/2021'),
    amount: 541601
  }
];

export const fakeInjectedByTotalSupplied: IInjectedByTotalSupplied[] = [
  {
    province: 'Ph?? Th???',
    amount: 853936,
    totalSupplied: 765590
  },
  {
    province: 'Th??i B??nh',
    amount: 797297,
    totalSupplied: 715420
  },
  {
    province: 'Cao B???ng',
    amount: 235546,
    totalSupplied: 215060
  },
  {
    province: 'S??n La',
    amount: 410633,
    totalSupplied: 378860
  },
  {
    province: 'Kon Tum',
    amount: 306916,
    totalSupplied: 287500
  },
  {
    province: 'H?? T??nh',
    amount: 664856,
    totalSupplied: 624450
  },
  {
    province: 'H??a B??nh',
    amount: 520115,
    totalSupplied: 499870
  },
  {
    province: 'Tuy??n Quang',
    amount: 317372,
    totalSupplied: 307650
  },
  {
    province: 'Ngh??? An',
    amount: 1152668,
    totalSupplied: 1119940
  },
  {
    province: 'H???i D????ng',
    amount: 1190456,
    totalSupplied: 1158660
  },
  {
    province: 'Ki??n Giang',
    amount: 1343041,
    totalSupplied: 2242630
  },
  {
    province: 'Tr?? Vinh',
    amount: 532043,
    totalSupplied: 838900
  },
  {
    province: 'An Giang',
    amount: 1430390,
    totalSupplied: 2178620
  },
  {
    province: 'Qu???ng B??nh',
    amount: 444268,
    totalSupplied: 641510
  },
  {
    province: 'H???i Ph??ng',
    amount: 1289547,
    totalSupplied: 1834200
  },
  {
    province: 'B???c Li??u',
    amount: 529817,
    totalSupplied: 737280
  },
  {
    province: 'V??nh Long',
    amount: 871886,
    totalSupplied: 1210720
  },
  {
    province: 'B?? R???a - V??ng T??u',
    amount: 1117514,
    totalSupplied: 1551505
  },
  {
    province: 'H???u Giang',
    amount: 519600,
    totalSupplied: 719340
  },
  {
    province: 'B??nh Ph?????c',
    amount: 690770,
    totalSupplied: 946200
  }
];

export const fakeStatisticVaccinationByLocal: IStatisticVaccinationByLocal[] = [
  {
    provinceId: 1,
    distributionPlan: 11376541,
    actualDistribution: 10419772,
    population: 6200000,
    numberOfInjected: 9876581,
    distributionPlanPerPopulation: 91.75,
    actualDistributionPerPopulation: 84.03,
    atLeastOneInjectedPerPopulation: 159.3,
    injectedPerActualDistribution: 94.79,
    distributionPerTotalNationnalDistribution: 11.06
  },
  {
    provinceId: 1,
    distributionPlan: 11376541,
    actualDistribution: 10419772,
    population: 6200000,
    numberOfInjected: 9876581,
    distributionPlanPerPopulation: 91.75,
    actualDistributionPerPopulation: 84.03,
    atLeastOneInjectedPerPopulation: 159.3,
    injectedPerActualDistribution: 94.79,
    distributionPerTotalNationnalDistribution: 11.06
  },
  {
    provinceId: 1,
    distributionPlan: 11376541,
    actualDistribution: 10419772,
    population: 6200000,
    numberOfInjected: 9876581,
    distributionPlanPerPopulation: 91.75,
    actualDistributionPerPopulation: 84.03,
    atLeastOneInjectedPerPopulation: 159.3,
    injectedPerActualDistribution: 94.79,
    distributionPerTotalNationnalDistribution: 11.06
  },
  {
    provinceId: 1,
    distributionPlan: 11376541,
    actualDistribution: 10419772,
    population: 6200000,
    numberOfInjected: 9876581,
    distributionPlanPerPopulation: 91.75,
    actualDistributionPerPopulation: 84.03,
    atLeastOneInjectedPerPopulation: 159.3,
    injectedPerActualDistribution: 94.79,
    distributionPerTotalNationnalDistribution: 11.06
  },
  {
    provinceId: 1,
    distributionPlan: 11376541,
    actualDistribution: 10419772,
    population: 6200000,
    numberOfInjected: 9876581,
    distributionPlanPerPopulation: 91.75,
    actualDistributionPerPopulation: 84.03,
    atLeastOneInjectedPerPopulation: 159.3,
    injectedPerActualDistribution: 94.79,
    distributionPerTotalNationnalDistribution: 11.06
  },
  {
    provinceId: 1,
    distributionPlan: 11376541,
    actualDistribution: 10419772,
    population: 6200000,
    numberOfInjected: 9876581,
    distributionPlanPerPopulation: 91.75,
    actualDistributionPerPopulation: 84.03,
    atLeastOneInjectedPerPopulation: 159.3,
    injectedPerActualDistribution: 94.79,
    distributionPerTotalNationnalDistribution: 11.06
  },
  {
    provinceId: 1,
    distributionPlan: 11376541,
    actualDistribution: 10419772,
    population: 6200000,
    numberOfInjected: 9876581,
    distributionPlanPerPopulation: 91.75,
    actualDistributionPerPopulation: 84.03,
    atLeastOneInjectedPerPopulation: 159.3,
    injectedPerActualDistribution: 94.79,
    distributionPerTotalNationnalDistribution: 11.06
  },
  {
    provinceId: 1,
    distributionPlan: 11376541,
    actualDistribution: 10419772,
    population: 6200000,
    numberOfInjected: 9876581,
    distributionPlanPerPopulation: 91.75,
    actualDistributionPerPopulation: 84.03,
    atLeastOneInjectedPerPopulation: 159.3,
    injectedPerActualDistribution: 94.79,
    distributionPerTotalNationnalDistribution: 11.06
  },
  {
    provinceId: 1,
    distributionPlan: 11376541,
    actualDistribution: 10419772,
    population: 6200000,
    numberOfInjected: 9876581,
    distributionPlanPerPopulation: 91.75,
    actualDistributionPerPopulation: 84.03,
    atLeastOneInjectedPerPopulation: 159.3,
    injectedPerActualDistribution: 94.79,
    distributionPerTotalNationnalDistribution: 11.06
  },
  {
    provinceId: 1,
    distributionPlan: 11376541,
    actualDistribution: 10419772,
    population: 6200000,
    numberOfInjected: 9876581,
    distributionPlanPerPopulation: 91.75,
    actualDistributionPerPopulation: 84.03,
    atLeastOneInjectedPerPopulation: 159.3,
    injectedPerActualDistribution: 94.79,
    distributionPerTotalNationnalDistribution: 11.06
  }
];

export const fakeStatisticVaccinationByArea: IStatisticVaccinationByArea[] = [
  {
    injectionSiteName: 'B???nh vi???n ??a khoa Medlatec',
    apartmentNumber: '42-44 Ngh??a D??ng',
    wardId: 1,
    districtId: 1,
    provinceId: 1,
    leader: 'Nguy???n Th??? Kim Li??n',
    numberOfInjectionTables: 1
  },
  {
    injectionSiteName: 'B???nh vi???n ??a khoa Medlatec',
    apartmentNumber: '42-44 Ngh??a D??ng',
    wardId: 1,
    districtId: 1,
    provinceId: 2,
    leader: 'Nguy???n Th??? Kim Li??n',
    numberOfInjectionTables: 1
  },
  {
    injectionSiteName: 'B???nh vi???n ??a khoa Medlatec',
    apartmentNumber: '42-44 Ngh??a D??ng',
    wardId: 1,
    districtId: 2,
    provinceId: 1,
    leader: 'Nguy???n Th??? Kim Li??n',
    numberOfInjectionTables: 1
  },
  {
    injectionSiteName: 'B???nh vi???n ??a khoa Medlatec',
    apartmentNumber: '42-44 Ngh??a D??ng',
    wardId: 1,
    districtId: 1,
    provinceId: 1,
    leader: 'Nguy???n Th??? Kim Li??n',
    numberOfInjectionTables: 1
  },
  {
    injectionSiteName: 'B???nh vi???n ??a khoa Medlatec',
    apartmentNumber: '42-44 Ngh??a D??ng',
    wardId: 1,
    districtId: 1,
    provinceId: 2,
    leader: 'Nguy???n Th??? Kim Li??n',
    numberOfInjectionTables: 1
  },
  {
    injectionSiteName: 'B???nh vi???n ??a khoa Medlatec',
    apartmentNumber: '42-44 Ngh??a D??ng',
    wardId: 1,
    districtId: 2,
    provinceId: 1,
    leader: 'Nguy???n Th??? Kim Li??n',
    numberOfInjectionTables: 1
  },
  {
    injectionSiteName: 'B???nh vi???n ??a khoa Medlatec',
    apartmentNumber: '42-44 Ngh??a D??ng',
    wardId: 1,
    districtId: 2,
    provinceId: 2,
    leader: 'Nguy???n Th??? Kim Li??n',
    numberOfInjectionTables: 1
  },
  {
    injectionSiteName: 'B???nh vi???n ??a khoa Medlatec',
    apartmentNumber: '42-44 Ngh??a D??ng',
    wardId: 2,
    districtId: 1,
    provinceId: 1,
    leader: 'Nguy???n Th??? Kim Li??n',
    numberOfInjectionTables: 1
  },
  {
    injectionSiteName: 'B???nh vi???n ??a khoa Medlatec',
    apartmentNumber: '42-44 Ngh??a D??ng',
    wardId: 2,
    districtId: 1,
    provinceId: 2,
    leader: 'Nguy???n Th??? Kim Li??n',
    numberOfInjectionTables: 1
  },
  {
    injectionSiteName: 'B???nh vi???n ??a khoa Medlatec',
    apartmentNumber: '42-44 Ngh??a D??ng',
    wardId: 2,
    districtId: 2,
    provinceId: 1,
    leader: 'Nguy???n Th??? Kim Li??n',
    numberOfInjectionTables: 1
  },
  {
    injectionSiteName: 'B???nh vi???n ??a khoa Medlatec',
    apartmentNumber: '42-44 Ngh??a D??ng',
    wardId: 2,
    districtId: 2,
    provinceId: 2,
    leader: 'Nguy???n Th??? Kim Li??n',
    numberOfInjectionTables: 1
  },
  {
    injectionSiteName: 'B???nh vi???n ??a khoa Medlatec',
    apartmentNumber: '42-44 Ngh??a D??ng',
    wardId: 1,
    districtId: 1,
    provinceId: 1,
    leader: 'Nguy???n Th??? Kim Li??n',
    numberOfInjectionTables: 1
  },
  {
    injectionSiteName: 'B???nh vi???n ??a khoa Medlatec',
    apartmentNumber: '42-44 Ngh??a D??ng',
    wardId: 1,
    districtId: 1,
    provinceId: 1,
    leader: 'Nguy???n Th??? Kim Li??n',
    numberOfInjectionTables: 1
  }
];
