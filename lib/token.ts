import { ITokenData } from "@/models/backend";
import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET || "jwt_secret_key";
const secret = new TextEncoder().encode(secretKey);

export async function createJWT(user: { id: string; username: string }) {
  const token = await new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("3h") // اعتبار توکن 3 ساعت
    .sign(secret);

  return token;
}

export async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    const userData: ITokenData = {
      id: payload.id as number,
      username: payload.username as string,
    };
    return userData;
  } catch (error) {
    console.error("Invalid token:", error);
    return undefined;
  }
}
