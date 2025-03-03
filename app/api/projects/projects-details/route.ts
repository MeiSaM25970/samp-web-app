/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * paths:
 *   /api/projects/projects-details:
 *     post:
 *       summary: Get details of projects
 *       tags:
 *         - Projects
 *       description: This endpoint retrieves project data after validating the JWT token.
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 planGroup:
 *                   type: string
 *                   description: The plan group.
 *                   example: "1,2"
 *                 areaType:
 *                   type: string
 *                   description: The area type.
 *                   example: "1,2"
 *                 subjectType:
 *                   type: string
 *                   description: The subject type.
 *                   example: "1,2"
 *                 technicalType:
 *                   type: string
 *                   description: The technical type.
 *                   example: "1,2"
 *                 province:
 *                   type: string
 *                   description: The province.
 *                   example: "1,2"
 *                 executeState:
 *                   type: string
 *                   description: The execution state.
 *                   example: "1,2"
 *       responses:
 *         200:
 *           description: Project data retrieved successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     description: Indicates if the request was successful.
 *                     example: true
 *                   data:
 *                       type: object
 *                       properties:
 *                         CountAll:
 *                           type: number
 *                           description: All Count.
 *                         Sum_PishBini:
 *                           type: string
 *                           description: Sum pish bini.
 *                         Sum_BudjeMosavab:
 *                           type: string
 *                           description: sum budje mosavab .
 *                         Sum_SooratVazeiyat:
 *                           type: string
 *                           description: sum soorat vazeiyat.
 *                         Sum_SooratVazeiyat_TaeidShode:
 *                           type: string
 *                           description: sum soorat vazeiyat taeid shode.
 *                         Percent_Progressed:
 *                           type: number
 *                           description: Percent Progressed.
 *                         Percent_Progressed_Submited:
 *                           type: number
 *                           description: Percent Progressed Submited
 *         401:
 *           description: Unauthorized - Invalid or missing token.
 *         500:
 *           description: Internal server error.
 */

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { checkToken } from "@/lib/checkToken";
import sql from "mssql";

export async function POST(req: Request) {
  try {
    const token = await checkToken();

    if (!token.success) {
      return NextResponse.json(
        { success: false, error: token.error },
        { status: 401 }
      );
    }
    const {
      planGroup,
      areaType,
      subjectType,
      technicalType,
      province,
      executeState,
    } = await req.json();
    const db = await connectDB();
    const result = await db
      ?.request()
      .input("sql_mode", sql.SmallInt, "0")
      .input("UserID", sql.BigInt, token.data?.id)
      .input("Prj_PlanGroup", sql.NVarChar, planGroup || "")
      .input("Prj_AreaType", sql.NVarChar, areaType || "")
      .input("Prj_SubjectType", sql.NVarChar, subjectType || "")
      .input("Prj_TechnicalType", sql.NVarChar, technicalType || "")
      .input("Prj_Province", sql.NVarChar, province || "")
      .input("Prj_ExecuteState", sql.NVarChar, executeState || "")
      .execute("PMO_ProjectList");
    if (!result || !result?.recordset.length) {
      return NextResponse.json(
        { success: false, error: "unknown error" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: true, data: result?.recordset[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
