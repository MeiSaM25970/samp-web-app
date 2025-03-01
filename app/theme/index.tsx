"use client";

import React, {
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { StorageKeys } from "../../constants/localStorage";

import { lightColors } from "./ts/light";
import { darkColors } from "./ts/dark";

// const language = localStorage.getItem(USER_Language) || null;

const lightTheme = {
  colors: lightColors,
};

export type Theme = typeof lightTheme;
export type ThemeType = "dark" | "light";
export interface ThemeContextValue {
  theme: Theme;
  themeType: ThemeType;
  isDarkTheme: boolean;
  toggleThemeType: () => void;
  setThemeType: React.Dispatch<React.SetStateAction<ThemeType>>;
}
export const ThemeContext = React.createContext<ThemeContextValue>({
  theme: lightTheme,
  themeType: "light",
  isDarkTheme: false,
  setThemeType: () => {},
  toggleThemeType: () => {},
});
export const useTheme = () => useContext<ThemeContextValue>(ThemeContext);

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [themeType, setThemeType] = useState<ThemeType>("light");
  const toggleThemeType = useCallback(() => {
    setThemeType((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";
      localStorage.setItem(StorageKeys.theme, newTheme);
      return newTheme;
    });
  }, []);
  const isDarkTheme = useMemo(() => themeType === "dark", [themeType]);
  const colors: typeof lightColors = useMemo(
    () => (isDarkTheme ? darkColors : lightColors),
    [isDarkTheme]
  );
  const theme = useMemo(() => {
    return {
      colors,
    };
  }, [colors]);
  useEffect(() => {
    try {
      const localTheme = localStorage.getItem(StorageKeys.theme);
      if (!localTheme) {
        setThemeType("light");
      } else {
        setThemeType(localTheme as ThemeType);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeType,
        isDarkTheme,
        setThemeType,
        toggleThemeType,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
