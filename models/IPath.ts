export type IMethods = "POST" | "PUT" | "DELETE" | "GET" | "PATCH";

export interface IPath {
  httpMethod: IMethods | null;
  path: string;
}
