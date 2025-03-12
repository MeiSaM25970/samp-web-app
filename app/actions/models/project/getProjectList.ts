export interface IProject {
  Prj_ID: string;
  Prj_Name: string;
  PlanGroup: string;
  Pat_Name: string;
  SubjectType: string;
  TechnicalType: string;
  ExecuteState: string;
  Province: string;
  City: string;
  Unit: string;
  Prj_SubjectType: number;
  Prj_ExecuteMethod: number;
  Prj_ExecuteState: number;
  Prj_Amount: number;
  Prj_Unit: number;
  Prj_AreaCovered: string;
  Prj_Province: number;
  Prj_City: string;
  Prj_AreaComment: string;
  Prj_AreaType: number;
  Prj_Comment: string;
  Prj_StartDate: string;
  Prj_FinishDate: string;
  Prj_ContractType: number;
  Prj_PlanGroup: number;
  Prj_TechnicalType: number;
  Prj_Excelphase: string;
  PhisicalProgress: number;
  Prj_TotalCredit: string;
  Takhsis: string;
  CreditAllocation: string;
  Cust: string;
  Pmap_Lat: number;
  Pmap_Long: number;
}

export interface IMap {
  Pmap_ProjectID: string;
  Pmap_Lat: number;
  Pmap_Long: number;
}
export interface IMapProject extends IProject {
  map: IMap[] | null;
  marker: string | undefined;
}
