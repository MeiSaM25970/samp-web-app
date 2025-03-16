import { connectDB } from "@/lib/db";
import { checkToken } from "@/lib/checkToken";
import sql from "mssql";
import { IProjectById } from "../models";
import { detectMimeType, uint8ArrayToBase64 } from "@/lib/binarryToBase64";
interface IResponse {
  success: boolean;
  error?: string | undefined;
  data?: IProjectById | undefined;
}
export async function getProjectById(projectId: string): Promise<IResponse> {
  try {
    const token = await checkToken();

    if (!token.success) {
      return { success: false, error: token.error };
    }

    if (!projectId) return { success: false, error: "projectId is required." };
    const db = await connectDB();
    const result = await db
      ?.request()
      .input("Prj_ID", sql.NVarChar, projectId.toString())
      .execute("PMO_Project_Info");
    if (!result || !result?.recordset.length) {
      return { success: false, error: "Notfound" };
    }
    let resultData = result?.recordset[0];
    const mimeType = detectMimeType(resultData.Image_Default as Buffer);
    const base64String = uint8ArrayToBase64(resultData.Image_Default as Buffer);
    const imageDefault =
      base64String && mimeType ? `data:${mimeType};base64,${base64String}` : "";
    resultData = {
      ...resultData,
      Image_Default: imageDefault,

      // `data:image/jpg;base64,${(
      //   resultData.Image_Default as Buffer
      // ).toString("base64")}`,
    };
    return { success: true, data: resultData };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: "Internal server error" };
  }
}
