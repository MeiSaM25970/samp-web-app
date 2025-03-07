import { useTheme } from "@/app/theme";
import dynamic from "next/dynamic";
import { FC } from "react";
const Icons = dynamic(() => import("espil-icons"), { ssr: false });

export const ClearIcon: FC = () => {
  const {
    theme: { colors },
  } = useTheme();
  return (
    <Icons name="CloseCircleOutline" size={20} color={colors.icon.icDef2} />
  );
};
