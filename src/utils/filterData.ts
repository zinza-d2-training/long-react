import { IInjectedByTotalSupplied } from 'models';

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
