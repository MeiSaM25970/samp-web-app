import { FC } from "react";
import { DatePicker } from "antd";
import { useTheme } from "src/theme";
import Icons from "espil-icons";
import { RangePickerProps } from "antd/es/date-picker";
import { ClearIcon } from "../ClearIcon";

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
