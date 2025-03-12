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
  supervisor: IOption[];
}

export interface ISubjectType {
  Pst_Name: string;
  Pst_Group: string;
  Pst_PlaceMarker: Buffer;
  Pst_ID: string;
}
