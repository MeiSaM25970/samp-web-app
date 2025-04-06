import { connectDB } from "@/lib/db";
import { checkToken } from "@/lib/checkToken";
import sql from "mssql";
import { IProjectFile } from "../models/project/getProjectFiles";
import { detectMimeType, uint8ArrayToBase64 } from "@/lib/binarryToBase64";
interface IResponse {
  success: boolean;
  error?: string | undefined;
  data?: IProjectFile[] | undefined;
}
export async function getProjectFiles(projectId: string): Promise<IResponse> {
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
      .execute("PMO_Project_Files");
    if (!result || !result?.recordset.length) {
      return { success: true, data: [] };
    }
    const newData = result?.recordset.map((i) => {
      let imageUrl = null;
      if (i.Archive_byteFile?.length > 0) {
        const mimeType = detectMimeType(i.Archive_byteFile);
        const base64String = uint8ArrayToBase64(i.Archive_byteFile);
        imageUrl =
          base64String && mimeType
            ? `data:${mimeType};base64,${base64String}`
            : "";
      }

      return {
        ...i,
        Archive_byteFile: imageUrl,
      };
    });
    return { success: true, data: newData };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: "Internal server error" };
  }
}
