/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * paths:
 *   /api/projects/project-list:
 *     post:
 *       summary: Get list of projects
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
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Prj_ID:
 *                           type: string
 *                           description: Project ID.
 *                         Prj_Name:
 *                           type: string
 *                           description: Project name.
 *                         PlanGroup:
 *                           type: string
 *                           description: Plan group.
 *                         Pat_Name:
 *                           type: string
 *                           description: Parent category name.
 *                         SubjectType:
 *                           type: string
 *                           description: Subject type.
 *                         TechnicalType:
 *                           type: string
 *                           description: Technical type.
 *                         ExecuteState:
 *                           type: string
 *                           description: Execution state.
 *                         Province:
 *                           type: string
 *                           description: Province name.
 *                         City:
 *                           type: string
 *                           description: City name.
 *                         Unit:
 *                           type: string
 *                           description: Operational unit.
 *                         Prj_SubjectType:
 *                           type: integer
 *                           description: Project subject type ID.
 *                         Prj_ExecuteMethod:
 *                           type: integer
 *                           description: Project execution method ID.
 *                         Prj_ExecuteState:
 *                           type: integer
 *                           description: Project execution state ID.
 *                         Prj_Amount:
 *                           type: number
 *                           description: Project amount.
 *                         Prj_Unit:
 *                           type: integer
 *                           description: Project unit.
 *                         Prj_AreaCovered:
 *                           type: string
 *                           description: Area covered by the project.
 *                         Prj_Province:
 *                           type: integer
 *                           description: Province ID.
 *                         Prj_City:
 *                           type: string
 *                           description: City ID.
 *                         Prj_AreaComment:
 *                           type: string
 *                           description: Comments about the project area.
 *                         Prj_AreaType:
 *                           type: integer
 *                           description: Project area type ID.
 *                         Prj_Comment:
 *                           type: string
 *                           description: Comments about the project.
 *                         Prj_StartDate:
 *                           type: string
 *                           description: Project start date (in YYYY/MM/DD format).
 *                         Prj_FinishDate:
 *                           type: string
 *                           description: Project finish date (in YYYY/MM/DD format).
 *                         Prj_ContractType:
 *                           type: integer
 *                           description: Contract type ID.
 *                         Prj_PlanGroup:
 *                           type: integer
 *                           description: Plan group ID.
 *                         Prj_TechnicalType:
 *                           type: integer
 *                           description: Technical type ID.
 *                         Prj_Excelphase:
 *                           type: string
 *                           description: Excel phase ID.
 *                         PhisicalProgress:
 *                           type: integer
 *                           description: Physical progress percentage.
 *                         Prj_TotalCredit:
 *                           type: string
 *                           description: Total credit allocated for the project.
 *                         Takhsis:
 *                           type: string
 *                           description: Allocated budget.
 *                         CreditAllocation:
 *                           type: string
 *                           description: Credit allocation for the project.
 *                         Cust:
 *                           type: string
 *                           description: Custom field (if applicable).
 *                         Pmap_Lat:
 *                           type: number
 *                           format: float
 *                           description: Project map latitude.
 *                         Pmap_Long:
 *                           type: number
 *                           format: float
 *                           description: Project map longitude.
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
      .input("sql_mode", sql.SmallInt, "1")
      .input("UserID", sql.BigInt, token.data?.id)
      .input("Prj_PlanGroup", sql.NVarChar, planGroup || "")
      .input("Prj_AreaType", sql.NVarChar, areaType || "")
      .input("Prj_SubjectType", sql.NVarChar, subjectType || "")
      .input("Prj_TechnicalType", sql.NVarChar, technicalType || "")
      .input("Prj_Province", sql.NVarChar, province || "")
      .input("Prj_ExecuteState", sql.NVarChar, executeState || "")
      .execute("PMO_ProjectList");
    if (!result || !result?.recordset) {
      return NextResponse.json(
        { success: false, error: "unknown error" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: true, data: result?.recordset },
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
