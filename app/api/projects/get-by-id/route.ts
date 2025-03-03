/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * paths:
 *   /api/projects/get-by-id:
 *     post:
 *       summary: Get single project info
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
 *                 projectId:
 *                   type: string
 *                   description: The project id.
 *                   example: "14410"
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
 *                         Percent_Progressed:
 *                           type: number
 *                           description: Percent Progressed.
 *                         Credit_PishBini:
 *                           type: string
 *                           description: Credit PishBini
 *                         BudjeMosavab:
 *                           type: string
 *                           description: Budje Mosavab
 *                         PhisicalProgress:
 *                           type: integer
 *                           description: Physical progress percentage.
 *                         Progressed_Submited:
 *                           type: integer
 *                           description: Progressed Submited percentage.
 *                         Credit_SooratVazeiyat:
 *                           type: string
 *                           description: Credit Soorat Vazeiyat.
 *                         Credit_SooratVazeiyat_TaeidShode:
 *                           type: string
 *                           description: Credit Soorat Vazeiyat Taeid Shode.
 *                         Takhsis:
 *                           type: string
 *                           description: Allocated budget.
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

    const { projectId } = await req.json();
    if (!projectId)
      return NextResponse.json(
        { success: false, error: "projectId is required." },
        { status: 400 }
      );
    const db = await connectDB();
    const result = await db
      ?.request()
      .input("Prj_ID", sql.NVarChar, projectId.toString())
      .execute("PMO_Project_Info");
    if (!result || !result?.recordset.length) {
      return NextResponse.json(
        { success: false, error: "Notfound" },
        { status: 404 }
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
