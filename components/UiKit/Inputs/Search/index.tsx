import { Input as AntdInput, InputProps } from "antd";
import { FC } from "react";
import Icons from "espil-icons";
import { useTheme } from "src/theme";
import { ClearIcon } from "../ClearIcon";

export const SearchInputUikit: FC<InputProps> = (props) => {
  const {
    theme: { colors },
  } = useTheme();

  const searchIcon = (
    <Icons name="Search" size={20} color={colors.icon.icDef2} />
  );

  return (
    <AntdInput
      {...props}
      suffix={searchIcon}
      allowClear={{ clearIcon: <ClearIcon /> }}
    />
  );
};
