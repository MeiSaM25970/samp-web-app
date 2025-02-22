/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login a user
 *     tags:
 *      - Authentication
 *     description: This endpoint logs in a user by validating the username and password via the Users_Login stored procedure.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 required: true
 *                 type: string
 *                 description: The username of the user.
 *                 example: "johndoe"
 *               password:
 *                 required: true
 *                 type: string
 *                 description: The password for the user.
 *                 example: "securepassword"
 *     responses:
 *       200:
 *         description: Successfully logged in. Returns user data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The user token.
 *                   example: "string"
 *       400:
 *         description: Missing username or password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Username is required"
 *       404:
 *         description: User not found or invalid username/password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import sql from "mssql";
import jwt from "jsonwebtoken";
import { Encrypt } from "@/lib/decryptPass";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }
    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }
    console.log({ username, password });
    const db = await connectDB();
    const encryptedPass = Encrypt(password);
    const result = await db
      ?.request()
      .input("UserName", sql.NVarChar, username)
      .input("PassCode", sql.NVarChar, encryptedPass)
      .execute("Users_Login"); // اجرای Stored Procedure
    if (!result || !result?.recordset?.length) {
      return NextResponse.json(
        { error: "Username or password is wrong " },
        { status: 404 }
      );
    }
    const user = result.recordset[0];
    const token = jwt.sign(
      { id: user.User_ID, username: user.User_Name },
      JWT_SECRET,
      {
        expiresIn: "1h", // اعتبار توکن 1 ساعت
      }
    );

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error("Stored Procedure Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
