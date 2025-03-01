"use client";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useLayoutEffect,
} from "react";
import { JalaliLocaleListener } from "antd-jalali";
import { axiosConfiguration } from "@/hooks/axiosConfig";
import authStore from "@/store/auth";
import { useUserInfo } from "@/hooks/useUserInfo";
import { USER_JWT_TOKEN } from "@/constants/localStorage";

interface IContext {}
const defaultValues: IContext = {};
export const AppContext = createContext<IContext>(defaultValues);

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  axiosConfiguration();
  const { fetchUserInfo } = useUserInfo();
  const { login } = authStore();
  const contextValue: IContext = {};
  useLayoutEffect(() => {
    const userToken = localStorage.getItem(USER_JWT_TOKEN);
    if (userToken) {
      fetchUserInfo().then(() => {
        login(userToken);
      });
    }
  }, []);
  return (
    <AppContext.Provider value={contextValue}>
      <JalaliLocaleListener />
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
