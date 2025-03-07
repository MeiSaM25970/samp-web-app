interface IOption {
  label: string;
  value: number;
}
export interface IFilterOptions {
  planGroups: IOption[];
  areaType: IOption[];
  subjectType: IOption[];
  technicalType: IOption[];
  province: IOption[];
  executeState: IOption[];
}
