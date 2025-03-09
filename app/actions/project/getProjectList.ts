"use server";
import { connectDB } from "@/lib/db";
import { checkToken } from "@/lib/checkToken";
import sql from "mssql";
import { IGetProjectArg, IProject } from "../models";

interface IResponse {
  success: boolean;
  error?: string | undefined;
  data?: IProject[] | undefined;
}
export async function getProjectList(
  data?: IGetProjectArg
): Promise<IResponse> {
  try {
    const token = await checkToken();

    if (!token.success) {
      return { success: false, error: token.error };
    }
    const {
      planGroup,
      areaType,
      subjectType,
      technicalType,
      province,
      executeState,
      supervisor,
    } = data || {};
    const db = await connectDB();
    const result = await db
      ?.request()
      .input("sql_mode", sql.SmallInt, "1")
      .input("UserID", sql.BigInt, token.data?.id)
      .input("Prj_PlanGroup", sql.NVarChar, planGroup || "")
      .input("Prj_AreaType", sql.NVarChar, areaType || "")
      .input("Prj_SubjectType", sql.NVarChar, subjectType || "")
      .input("Prj_TechnicalType", sql.NVarChar, technicalType || "")
      .input("Prj_Province", sql.NVarChar, province || "")
      .input("Prj_ExecuteState", sql.NVarChar, executeState || "")
      .input("Prj_Supervisor", sql.NVarChar, supervisor || "")
      .execute("PMO_ProjectList");
    if (!result || !result?.recordset) {
      return { success: false, error: "unknown error" };
    }
    return { success: true, data: result?.recordset };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: "Internal server error" };
  }
}
