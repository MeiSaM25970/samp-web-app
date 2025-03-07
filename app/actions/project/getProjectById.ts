import { connectDB } from "@/lib/db";
import { checkToken } from "@/lib/checkToken";
import sql from "mssql";
import { IProjectById } from "../models";
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
    return { success: true, data: result?.recordset[0] };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: "Internal server error" };
  }
}
