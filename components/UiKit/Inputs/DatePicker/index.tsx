import { FC } from "react";
import { DatePicker as AntdDatePicker, DatePickerProps } from "antd";
import Icons from "espil-icons";
import { ClearIcon } from "../ClearIcon";
import { useTheme } from "@/app/theme";

export const DatePickerUikit: FC<DatePickerProps> = (props) => {
  const {
    theme: { colors },
  } = useTheme();

  const customIcon = (
    <Icons name="Calendar" size={20} color={colors.icon.icDef2} />
  );

  return (
    <AntdDatePicker
      suffixIcon={customIcon}
      {...props}
      allowClear={{ clearIcon: <ClearIcon /> }}
    />
  );
};
