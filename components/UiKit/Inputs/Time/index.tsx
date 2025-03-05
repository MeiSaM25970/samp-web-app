import { TimePicker as AntTimePicker, DatePickerProps } from "antd";
import { FC } from "react";
import Icons from "espil-icons";
import { useTheme } from "@/app/theme";
import { ClearIcon } from "../ClearIcon";

export const TimePickerUikit: FC<DatePickerProps> = (props) => {
  const {
    theme: { colors },
  } = useTheme();

  const customIcon = (
    <Icons name="ClockCircle" size={20} color={colors.icon.icDef2} />
  );

  return (
    <AntTimePicker
      {...props}
      suffixIcon={customIcon}
      allowClear={{ clearIcon: <ClearIcon /> }}
    />
  );
};
