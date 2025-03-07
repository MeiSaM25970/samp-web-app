import { FC } from "react";
import { DatePicker } from "antd";
import { useTheme } from "@/app/theme";
import { RangePickerProps } from "antd/es/date-picker";
import { ClearIcon } from "../ClearIcon";
import dynamic from "next/dynamic";
const Icons = dynamic(() => import("espil-icons"), { ssr: false });

export const RangePickerUikit: FC<RangePickerProps> = (props) => {
  const { RangePicker } = DatePicker;

  const {
    theme: { colors },
  } = useTheme();

  const customIcon = (
    <Icons name="Calendar" size={20} color={colors.icon.icDef2} />
  );

  return (
    <RangePicker
      {...props}
      suffixIcon={customIcon}
      allowClear={{ clearIcon: <ClearIcon /> }}
    />
  );
};
