import { IObject } from "./IObject";

export interface IPagination extends IObject {
  Limit: number;
  Offset: number;
}

export interface ITablePagination {
  current: number;
  pageSize: number;
  total?: number;
}
