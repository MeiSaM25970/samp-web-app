import { cookieKey } from "@/constants/cookieKey";
import { cookies } from "next/headers";
import { verifyJWT } from "./token";

export const checkToken = async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get(cookieKey.token)?.value;

  if (!token) {
    return { success: false, error: "Token is missing" };
  }
  try {
    const decoded = await verifyJWT(token);
    console.log({ decoded });
    if (!decoded) {
      return { success: false, error: "Invalid or expired token" };
    }
    return { success: true, data: decoded };
  } catch {
    console.log("here 2");
    return { success: false, error: "Invalid or expired token" };
  }
};
