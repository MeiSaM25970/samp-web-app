import { FC } from "react";
import { Input as AntdInput, InputProps } from "antd";

import { ClearIcon } from "../ClearIcon";
import Icons from "espil-icons";
import { useTheme } from "@/app/theme";

export const UserNameUikit: FC<InputProps> = (props) => {
  const {
    theme: { colors },
  } = useTheme();

  const visibleIcon = <Icons name="User" color={colors.icon.icDef2} />;

  return (
    <AntdInput
      {...props}
      allowClear={{ clearIcon: <ClearIcon /> }}
      prefix={visibleIcon}
    />
  );
};
