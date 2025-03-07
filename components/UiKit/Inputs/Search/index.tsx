import { Input as AntdInput, InputProps } from "antd";
import { FC } from "react";
import { useTheme } from "@/app/theme";
import { ClearIcon } from "../ClearIcon";
import dynamic from "next/dynamic";
const Icons = dynamic(() => import("espil-icons"), { ssr: false });

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
