"use server";
import { cookieKey } from "@/constants/cookieKey";
import { ROUTES } from "@/constants/Routes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = () => {
  cookies().delete(cookieKey.token);
  redirect(ROUTES.login);
};
