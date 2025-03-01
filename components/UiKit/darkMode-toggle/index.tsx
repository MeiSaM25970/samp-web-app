import { FC } from "react";
import NIghtModeToggle from "./NIghtModeToggle";
import { useTheme } from "src/theme";

export const DarkModeSwitch: FC = () => {
  const { isDarkTheme, toggleThemeType } = useTheme();
  return (
    <NIghtModeToggle
      checked={isDarkTheme}
      onChange={toggleThemeType}
      speed={3}
    />
  );
};
