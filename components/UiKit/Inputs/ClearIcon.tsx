import { useTheme } from "@/app/theme";
import Icons from "espil-icons";
import { FC } from "react";

export const ClearIcon: FC = () => {
  const {
    theme: { colors },
  } = useTheme();
  return (
    <Icons name="CloseCircleOutline" size={20} color={colors.icon.icDef2} />
  );
};
