"use server";
import { connectDB } from "@/lib/db";
import { checkToken } from "@/lib/checkToken";
import sql from "mssql";
import {
  IGetProjectArg,
  IMap,
  IMapProject,
  IProject,
  ISubjectType,
} from "../models";
import { detectMimeType, uint8ArrayToBase64 } from "@/lib/binarryToBase64";

interface IResponse {
  success: boolean;
  error?: string | undefined;
  data?: IMapProject[] | undefined;
}
export async function getMapProjectList(
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
      .input("Prj_Supervisor", sql.NVarChar, supervisor || "")
      .input("prj_Progress", sql.NVarChar, progress || "")

      .execute("PMO_ProjectList");
    if (!result || !result?.recordset) {
      return { success: false, error: "unknown error" };
    }
    const projectList: IProject[] = [...result.recordset];
    const results = await Promise.allSettled([
      db?.request().query("SELECT * FROM Pmo_Map"),
      db?.request().query("SELECT * FROM Pmo__SubjectType"),
    ]);

    const [maps, mapSubjectType] = results.map((result) =>
      result.status === "fulfilled" ? result.value.recordset : null
    );
    const newProjectList: IMapProject[] = projectList.map((project) => {
      const map = (maps as IMap[]).filter(
        (map) => map.Pmap_ProjectID === project.Prj_ID
      );
      const subjectType = (mapSubjectType as ISubjectType[]).find(
        (subject) =>
          subject.Pst_ID.toString() === project.Prj_SubjectType.toString()
      );

      const imageUrl = subjectType
        ? `data:image/png;base64,${subjectType.Pst_PlaceMarker.toString(
            "base64"
          )}`
        : "";
      const mimeType = detectMimeType(project.Image_Default as Buffer);
      const base64String = uint8ArrayToBase64(project.Image_Default as Buffer);
      const imageDefault =
        base64String && mimeType
          ? `data:${mimeType};base64,${base64String}`
          : "";
      // const imageDefault = Buffer.from(
      //   project.Image_Default as Buffer
      // ).toString("base64");
      // `data:image/png;base64,${(
      //         project.Image_Default as Buffer
      //       ).toString("base64")}`;
      return {
        ...project,
        map: map || null,
        marker: imageUrl,
        Image_Default: imageDefault,
      };
    });
    return { success: true, data: newProjectList };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: "Internal server error" };
  }
}
