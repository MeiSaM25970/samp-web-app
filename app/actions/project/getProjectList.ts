"use server";
import { connectDB } from "@/lib/db";
import { checkToken } from "@/lib/checkToken";
import sql from "mssql";
import { IGetProjectArg, IProject } from "../models";
import { detectMimeType, uint8ArrayToBase64 } from "@/lib/binarryToBase64";

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
      progress,
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
      .input("prj_Supervisor", sql.NVarChar, supervisor || "")
      .input("prj_Progress", sql.NVarChar, progress || "")
      .execute("PMO_ProjectList");
    if (!result || !result?.recordset) {
      return { success: false, error: "unknown error" };
    }
    const resultData: IProject[] = result?.recordset.map((i) => {
      const mimeType = detectMimeType(i.Image_Default);
      const base64String = uint8ArrayToBase64(i.Image_Default);
      const imageUrl =
        base64String && mimeType
          ? `data:${mimeType};base64,${base64String}`
          : "";
      return {
        ...i,
        Image_Default: imageUrl,
      };
    });

    resultData.sort((a, b) => Number(b.Prj_ID) - Number(a.Prj_ID));

    return { success: true, data: resultData };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: "Internal server error" };
  }
}
