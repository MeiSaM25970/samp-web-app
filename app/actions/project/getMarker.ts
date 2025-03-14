"use server";
import { connectDB } from "@/lib/db";
import { checkToken } from "@/lib/checkToken";
import { ISubjectType } from "../models";

interface IResponse {
  success: boolean;
  error?: string | undefined;
  marker?: string | undefined;
}
export async function getMarker(subjectType?: string): Promise<IResponse> {
  try {
    const token = await checkToken();

    if (!token.success) {
      return { success: false, error: token.error };
    }
    if (!subjectType)
      return { success: false, error: "subjectType is required." };

    const db = await connectDB();

    const result = await db?.request().query("SELECT * FROM Pmo__SubjectType");

    const findSubjectType = (result.recordset as ISubjectType[]).find(
      (subject) => subject.Pst_ID.toString() === subjectType.toString()
    );
    const imageUrl = findSubjectType
      ? `data:image/png;base64,${findSubjectType.Pst_PlaceMarker.toString(
          "base64"
        )}`
      : "";

    return { success: true, marker: imageUrl };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: "Internal server error" };
  }
}
