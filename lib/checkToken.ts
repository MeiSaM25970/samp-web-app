import { cookieKey } from "@/constant/cookieKey";
import { cookies } from "next/headers";
import { verifyJWT } from "./token";

export const checkToken = async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get(cookieKey.token)?.value;

  if (!token) {
    return { success: false, error: "Token is missing" };
  }
  try {
    const decoded = verifyJWT(token);
    if (!decoded) {
      return { success: false, error: "Invalid or expired token" };
    }
    return { success: true, data: decoded };
  } catch {
    return { success: false, error: "Invalid or expired token" };
  }
};
