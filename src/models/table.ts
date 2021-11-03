export interface ITableData {
  heading: string[];
  dataSet: Array<Array<number | string | undefined>>;
}

export interface IOptionsTable {
  percentColumns?: {
    number: number;
    color: string;
  }[];
  minHeight?: string;
  maxHeight?: string;
  hasLoadMore?: boolean;
}
