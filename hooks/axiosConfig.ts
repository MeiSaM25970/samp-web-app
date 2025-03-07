import { redirect } from "next/navigation";
import axios from "axios";
import { ROUTES } from "@/constants/Routes";
import { responseHandler } from "@/services/responseHandler";
import { cookies } from "next/headers";
import { cookieKey } from "@/constants/cookieKey";

export const axiosConfiguration = () => {
  const cookie = cookies();
  const logoutHandler = async () => {
    await cookie.delete(cookieKey.token);
    redirect(ROUTES.login);
  };
  axios.interceptors.response.use(
    (response) => {
      if (response?.status < 200 && response?.status > 300)
        responseHandler(response);
      if (response?.status === 401) {
        logoutHandler();
      }
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        logoutHandler();
      }
      if (error?.response?.status === 404) {
        return Promise.reject(error);
      }
      responseHandler(error);

      return Promise.reject(error);
    }
  );

  axios.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      responseHandler(error);
      throw Promise.reject(error);
    }
  );
};
