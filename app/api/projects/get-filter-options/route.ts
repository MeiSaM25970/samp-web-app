/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /api/projects/get-filter-options:
 *   get:
 *     summary: Get filter options
 *     tags:
 *       - Projects
 *     description: This endpoint fetches filter options data after validating JWT token.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Filter options retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     planGroups:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           label:
 *                             type: string
 *                           value:
 *                             type: integer
 *                     areaType:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           label:
 *                             type: string
 *                           value:
 *                             type: integer
 *                     subjectType:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           label:
 *                             type: string
 *                           value:
 *                             type: integer
 *                     technicalType:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           label:
 *                             type: string
 *                           value:
 *                             type: integer
 *                     province:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           label:
 *                             type: string
 *                           value:
 *                             type: integer
 *                     executeState:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           label:
 *                             type: string
 *                           value:
 *                             type: integer
 *       401:
 *         description: Unauthorized - Invalid or missing token.
 *       500:
 *         description: Internal server error.
 */

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { checkToken } from "@/lib/checkToken";

export async function GET() {
  try {
    const token = await checkToken();
    if (!token.success) {
      return NextResponse.json({ error: token.error }, { status: 401 });
    }
    const db = await connectDB();
    const results = await Promise.allSettled([
      db?.request().query("SELECT * FROM Pmo__PlanGroup"),
      db?.request().query("SELECT * FROM Pmo__AreaType"),
      db?.request().query("SELECT * FROM Pmo__SubjectType"),
      db?.request().query("SELECT * FROM Pmo__TechnicalType"),
      db?.request().query("SELECT * FROM Pmo__Province"),
      db?.request().query("SELECT * FROM Pmo__ExecuteState"),
    ]);

    const [
      planGroups,
      areaType,
      subjectType,
      technicalType,
      province,
      executeState,
    ] = results.map((result) =>
      result.status === "fulfilled" ? result.value.recordset : null
    );
    if (
      !planGroups &&
      !areaType &&
      !subjectType &&
      !technicalType &&
      !province &&
      !executeState
    ) {
      return NextResponse.json(
        { success: false, error: "No data found" },
        { status: 404 }
      );
    }
    const data = {
      planGroups:
        planGroups
          ?.map((i) => ({
            label: i.PlanGroup_Name,
            value: Number(i.PlanGroup_ID),
          }))
          .filter((i) => i.value !== 0) || [],
      areaType:
        areaType
          ?.map((i) => ({ label: i.Pat_Name, value: Number(i.Pat_ID) }))
          .filter((i) => i.value !== 0) || [],
      subjectType:
        subjectType
          ?.map((i) => ({ label: i.Pst_Name, value: Number(i.Pst_ID) }))
          .filter((i) => i.value !== 0) || [],
      technicalType:
        technicalType
          ?.map((i) => ({ label: i.Ptt_Name, value: Number(i.Ptt_ID) }))
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
          ?.map((i) => ({ label: i.Ps_Name, value: Number(i.Ps_ID) }))
          .filter((i) => i.value !== 0) || [],
    };
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
