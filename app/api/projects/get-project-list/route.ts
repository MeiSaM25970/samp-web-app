/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   security:
 *     - BearerAuth: []
 * /api/projects/get-project-list:
 *   get:
 *     summary: Get user data
 *     tags:
 *      - Projects
 *     description: This endpoint fetches user data after validating JWT token.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User data retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *       401:
 *         description: Unauthorized - Invalid or missing token.
 *       500:
 *         description: Internal server error.
 */
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { checkToken } from "@/lib/checkToken";
import sql from "mssql";

export async function GET(req: Request) {
  try {
    const token = await checkToken();

    if (!token.success) {
      return NextResponse.json({ error: token.error }, { status: 401 });
    }
    console.log({ token });
    const db = await connectDB();
    const result = await db
      ?.request()
      .input("sql_mode", sql.SmallInt, "1")
      .input("UserID", sql.BigInt, token.data?.id)
      .input("Prj_PlanGroup", sql.NVarChar, "")
      .input("Prj_AreaType", sql.NVarChar, "")
      .input("Prj_SubjectType", sql.NVarChar, "")
      .input("Prj_TechnicalType", sql.NVarChar, "")
      .input("Prj_Province", sql.NVarChar, "")
      .input("Prj_ExecuteState", sql.NVarChar, "")
      .execute("PMO_ProjectList");
    if (!result || !result?.recordset?.length) {
      return NextResponse.json({ data: [] }, { status: 200 });
    }
    return NextResponse.json({ data: result?.recordset }, { status: 200 });
  } catch (error) {
    console.error("Stored Procedure Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
