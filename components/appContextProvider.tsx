import { FC, PropsWithChildren } from "react";
import { ThemeContextProvider } from "../app/theme";
import ConfigProviders from "./ConfigProvider";

export const AppContextProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeContextProvider>
      <ConfigProviders>{children}</ConfigProviders>
    </ThemeContextProvider>
  );
};
