"use server";
import _ from "lodash";
import { cookies } from "next/headers";

export const setCookie = async (
  key: string | string[],
  value: string | string[]
) => {
  const cookie = await cookies();
  if (_.isArray(key)) {
    for (let i = 0; i < key.length; i++) {
      cookie.set(key[i], value[i]);
    }
  } else {
    cookie.set(key as string, value as string);
  }
};
