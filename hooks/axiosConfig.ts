"use client";
import { redirect } from "next/navigation";
import axios from "axios";
import authStore from "@/store/auth";
import { USER_JWT_TOKEN } from "@/constants/localStorage";
import { ROUTES } from "@/constants/Routes";
import { OtpUrls } from "@/services/Otp/urls";
import { responseHandler } from "@/services/responseHandler";

export const axiosConfiguration = () => {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
  const { logout } = authStore();
  const logoutHandler = async () => {
    localStorage.removeItem(USER_JWT_TOKEN);
    logout();
    redirect(ROUTES.home);
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
      if (
        error?.response?.status === 404 &&
        error.config.url === OtpUrls.verifyOtp
      ) {
        return Promise.reject(error);
      }
      responseHandler(error);

      return Promise.reject(error);
    }
  );

  axios.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem(USER_JWT_TOKEN);
      if (accessToken && !config.url?.includes("auth")) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => {
      responseHandler(error);
      throw Promise.reject(error);
    }
  );
};
