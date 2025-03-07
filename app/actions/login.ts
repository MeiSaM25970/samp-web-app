"use server";
import { connectDB } from "@/lib/db";
import sql from "mssql";
import { Encrypt } from "@/lib/decryptPass";
import { cookies } from "next/headers";
import { cookieKey } from "@/constants/cookieKey";
import { createJWT } from "@/lib/token";
import { ILoginArgs } from "./models/login";

interface IResponse {
  token?: string;
  error?: string;
}
export async function loginAction(data: ILoginArgs): Promise<IResponse> {
  try {
    const { username, password } = data;
    if (!username) {
      return { error: "نام کاربری اجباریست" };
    }
    if (!password) {
      return { error: "رمز عبور اجباریست" };
    }
    const db = await connectDB();
    const encryptedPass = Encrypt(password);
    const result = await db
      ?.request()
      .input("UserName", sql.NVarChar, username)
      .input("PassCode", sql.NVarChar, encryptedPass)
      .execute("Users_Login"); // اجرای Stored Procedure
    if (!result || !result?.recordset?.length) {
      return { error: "نام کاربری یا رمز عبور اشتباه است" };
    }
    const user = result.recordset[0];
    const token = await createJWT({
      id: user.UserID,
      username,
    });
    const cookieStore = await cookies();
    cookieStore.set(cookieKey.token, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // یک هفته
      path: "/",
    });
    return { token };
  } catch (error) {
    console.error("Stored Procedure Error:", error);
    return { error: "Internal server error" };
  }
}
