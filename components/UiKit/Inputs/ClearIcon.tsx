import Icons from "espil-icons";
import { FC } from "react";
import { useTheme } from "src/theme";

export const ClearIcon: FC = () => {
  const {
    theme: { colors },
  } = useTheme();
  return (
    <Icons name="CloseCircleOutline" size={20} color={colors.icon.icDef2} />
  );
};
