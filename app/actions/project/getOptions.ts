"use server";
import { connectDB } from "@/lib/db";
import { checkToken } from "@/lib/checkToken";
import { IFilterOptions } from "../models";

interface IResponse {
  success: boolean;
  error?: string | undefined;
  data?: IFilterOptions | undefined;
}
export async function getFilterOptions(): Promise<IResponse> {
  try {
    const token = await checkToken();
    if (!token.success) {
      return { success: false, error: token.error };
    }
    const db = await connectDB();
    const results = await Promise.allSettled([
      db?.request().query("SELECT * FROM Pmo__PlanGroup"),
      db?.request().query("SELECT * FROM Pmo__AreaType"),
      db?.request().query("SELECT * FROM Pmo__SubjectType"),
      db?.request().query("SELECT * FROM Pmo__TechnicalType"),
      db?.request().query("SELECT * FROM Pmo__Province"),
      db?.request().query("SELECT * FROM Pmo__ExecuteState"),
      db
        ?.request()
        .query("SELECT * FROM Users_Users WHERE User_Supervisor = 1 "),
    ]);

    const [
      planGroups,
      areaType,
      subjectType,
      technicalType,
      province,
      executeState,
      supervisor,
    ] = results.map((result) =>
      result.status === "fulfilled" ? result.value.recordset : null
    );
    if (
      !planGroups &&
      !areaType &&
      !subjectType &&
      !technicalType &&
      !province &&
      !executeState &&
      !supervisor
    ) {
      return { success: false, error: "No data found" };
    }
    const data: IFilterOptions = {
      planGroups:
        planGroups
          ?.map((i) => ({
            label: i.PlanGroup_Name,
            value: Number(i.PlanGroup_ID),
          }))
          .filter((i) => i.value !== 0) || [],
      areaType:
        areaType
          ?.map((i) => ({
            label: i.Pat_Name,
            value: Number(i.Pat_ID),
          }))
          .filter((i) => i.value !== 0) || [],
      subjectType:
        subjectType
          ?.map((i) => ({
            label: i.Pst_Name,
            value: Number(i.Pst_ID),
          }))
          .filter((i) => i.value !== 0) || [],
      technicalType:
        technicalType
          ?.map((i) => ({
            label: i.Ptt_Name,
            value: Number(i.Ptt_ID),
          }))
          .filter((i) => i.value !== 0) || [],
      province:
        province
          ?.map((i) => ({
            label: i.province_Name,
            value: Number(i.province_ID),
          }))
          .filter((i) => i.value !== 0) || [],
      executeState:
        executeState
          ?.map((i) => ({
            label: i.Ps_Name,
            value: Number(i.Ps_ID),
          }))
          .filter((i) => i.value !== 0) || [],
      supervisor:
        supervisor
          ?.map((i) => ({
            label: i.User_Name,
            value: Number(i.User_ID),
          }))
          .filter((i) => i.value !== 0) || [],
    };
    return { success: true, data };
  } catch (error) {
    console.error("Error:", error);
    return { error: "Internal server error", success: false };
  }
}
