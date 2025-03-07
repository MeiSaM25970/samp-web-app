import { TimePicker as AntTimePicker, DatePickerProps } from "antd";
import { FC } from "react";
import { useTheme } from "@/app/theme";
import { ClearIcon } from "../ClearIcon";
import dynamic from "next/dynamic";
const Icons = dynamic(() => import("espil-icons"), { ssr: false });

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
