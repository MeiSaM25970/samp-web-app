import { ITokenData } from "@/models/backend";
import { SignJWT, jwtVerify, decodeProtectedHeader } from "jose";

// کلید مخفی را به صورت آرایه‌ای از بایت‌ها تعریف کنید
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function createJWT(user: { id: number; username: string }) {
  const token = await new SignJWT({ id: user.id, username: user.username })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("8h") // اعتبار توکن 8 ساعت
    .sign(secret);

  return token;
}

export async function verifyJWT(token: string) {
  try {
    console.log({ token, secret });
    const { payload } = await jwtVerify(token, secret);
    // دسترسی به payload
    const protectedHeader = decodeProtectedHeader(token);
    console.log({ protectedHeader });
    console.log(payload, payload.id, payload.username);
    const userData: ITokenData = {
      id: payload.id as number,
      username: payload.username as string,
    };
    return userData;
  } catch (error) {
    console.error("Invalid token:", error);
    // مدیریت خطا
  }
}
