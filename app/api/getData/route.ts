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
 * /api/getData:
 *   get:
 *     summary: Get user data
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

export async function GET(req: Request) {
  try {
    const token = checkToken(req);
    if (!token.success) {
      return NextResponse.json({ error: token.error }, { status: 401 });
    }
    console.log({ token });
    const db = await connectDB();
    // const result = await db?.request().execute("Users_ActionsHistory");
    // if (!result || !result?.recordset?.length) {
    //   return NextResponse.json(
    //     { error: "Username or password is wrong " },
    //     { status: 404 }
    //   );
    // }
    // const user = result.recordset[0];
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error("Stored Procedure Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
