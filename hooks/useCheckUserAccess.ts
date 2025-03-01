"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { IUserInfo } from "@/services/Customer/models/result.model";
import { ROUTES } from "@/constants/Routes";
import { USER_DATA, USER_JWT_TOKEN } from "@/constants/localStorage";

type ICheckUserAccess = (
  check?: "token" | "plan",
  returnUrl?: string
) => Promise<boolean>;

export const checkUserAccess: ICheckUserAccess = async (check, returnUrl) => {
  let redirectUrl: string = ROUTES.auth;
  if (returnUrl) redirectUrl += `?returnUrl=${returnUrl}`;

  const cookieStore = await cookies();

  if (check === "token" || !check) {
    const token = cookieStore.get(USER_JWT_TOKEN)?.value;
    if (!token || token === "undefined") {
      redirect(redirectUrl);
      return false;
    }
  }

  if (check === "plan" || !check) {
    const stringUserData = cookieStore.get(USER_DATA)?.value;
    console.log(stringUserData);
    if (!stringUserData) {
      redirect(redirectUrl);
      return false;
    }

    const userData: IUserInfo = JSON.parse(stringUserData);
    if (userData.subscription_id === 1) {
      let plansUrl: string = ROUTES.plans;
      if (returnUrl) plansUrl += `?returnUrl=${returnUrl}`;
      redirect(plansUrl);
      return false;
    }
  }

  return true;
};
