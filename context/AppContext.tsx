"use client";
import { createContext, FC, PropsWithChildren, useContext } from "react";
import { JalaliLocaleListener } from "antd-jalali";
interface IProps extends PropsWithChildren {}
interface IContext {}
export const AppContext = createContext<IContext | undefined>(undefined);

export const AppProvider: FC<IProps> = ({ children }) => {
  const contextValue: IContext = {};

  return (
    <AppContext.Provider value={contextValue}>
      <JalaliLocaleListener />
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const data = useContext(AppContext);
  if (data) return data;
  else throw console.error("App provider not found ");
};
