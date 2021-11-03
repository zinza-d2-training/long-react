import { IInjectedByTotalSupplied } from 'models';
import { addressData } from './addressData';

export const getHighestInjectionRate = (
  data: IInjectedByTotalSupplied[],
  amount?: number
) =>
  data
    .sort(
      (o1, o2) => o2.amount / o2.totalSupplied - o1.amount / o1.totalSupplied
    )
    .slice(0, amount || data.length)
    .map((item) => ({
      ...item,
      percent: Math.round((item.amount / item.totalSupplied) * 100)
    }));

export const getLowestInjectionRate = (
  data: IInjectedByTotalSupplied[],
  amount?: number
) =>
  data
    .sort(
      (o1, o2) => o1.amount / o1.totalSupplied - o2.amount / o2.totalSupplied
    )
    .slice(0, amount || data.length)
    .map((item) => ({
      ...item,
      percent: Math.round((item.amount / item.totalSupplied) * 100)
    }));

export const getProvince = (provinceId: number) => {
  const province = addressData.find(({ id }) => id === provinceId);
  if (province) {
    const { children, ...result } = province;
    return result;
  }
  return undefined;
};

export const getDistrict = (provinceId: number, districtId: number) => {
  const province = addressData.find(({ id }) => id === provinceId);
  if (province) {
    const district = province.children.find(({ id }) => id === districtId);
    if (district) {
      const { children, ...result } = district;
      return result;
    }
  }
  return undefined;
};

export const getWard = (
  provinceId: number,
  districtId: number,
  wardId: number
) => {
  const province = addressData.find(({ id }) => id === provinceId);
  if (province) {
    const district = province.children.find(({ id }) => id === districtId);
    if (district) {
      const ward = district.children.find(({ id }) => id === wardId);
      if (ward) {
        return ward;
      }
    }
  }
  return undefined;
};
