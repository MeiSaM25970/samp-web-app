import { FC } from "react";
import { Input as AntdInput, InputProps } from "antd";

import { ClearIcon } from "../ClearIcon";

export const InputUikit: FC<InputProps> = (props) => {
  return <AntdInput {...props} allowClear={{ clearIcon: <ClearIcon /> }} />;
};
