import _ from "lodash";
import { fireError } from "@/helper/fireError";

export const responseHandler = (res: any) => {
  const { response } = res;
  if (response.data && response.data.message) {
    fireError(`خطا`, response.data.message);
    return;
  }
  if (response?.status === 404) {
    fireError(`خطا ۴۰۴`, response?.data?.message);
    return;
  }

  if (response?.status === 401 || response?.status === 403) {
    fireError(`خطا`, `شما اجازه دسترسی ندارید`);

    return;
  }

  if (response?.status >= 500) {
    fireError(`خطا`, `خطا از سمت سرور`);

    return;
  }
  if (!response && res.code === "ERR_NETWORK") {
    fireError(`خطا`, `اتصال به اینترنت را بررسی کنید`);

    return;
  }

  return response;
};
