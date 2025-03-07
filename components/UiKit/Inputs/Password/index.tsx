import { Input, InputProps } from "antd";
import { FC } from "react";
import { useTheme } from "@/app/theme";
import { ClearIcon } from "../ClearIcon";
import dynamic from "next/dynamic";
const Icons = dynamic(() => import("espil-icons"), { ssr: false });

export const PasswordUikit: FC<InputProps> = (props) => {
  const { Password } = Input;

  const {
    theme: { colors },
  } = useTheme();

  const visibleIcon = <Icons name="EyeClosed" color={colors.icon.icDef2} />;

  const unVisibleIcon = <Icons name="ViewOutline" color={colors.icon.icDef2} />;

  return (
    <Password
      {...props}
      allowClear={{ clearIcon: <ClearIcon /> }}
      iconRender={(visible) => {
        if (!visible) {
          return visibleIcon;
        } else {
          return unVisibleIcon;
        }
      }}
    />
  );
};
