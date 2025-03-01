export interface IResponse {
  success: string;
  message: string;
}
export interface IResponseWithData<T> extends IResponse {
  data?: T;
}
export interface IResponseWithPaginationData<T> extends IResponse {
  data: {
    count: number;
    data: T;
  };
}

export interface IObject {
  [key: string]: any;
}
