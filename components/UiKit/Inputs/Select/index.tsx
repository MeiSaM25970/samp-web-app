import { SelectProps, Spin } from "antd";
import type { GetProps, RefSelectProps } from "antd";
import { forwardRef } from "react";
import { Select as AntSelect } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useTheme } from "@/app/theme";
import { ClearIcon } from "../ClearIcon";
import styled from "styled-components";
import dynamic from "next/dynamic";
const Icons = dynamic(() => import("espil-icons"), { ssr: false });

type IProps = GetProps<SelectProps>;

export const SelectUikit = forwardRef<RefSelectProps, IProps>((props, ref) => {
  const {
    theme: { colors },
  } = useTheme();

  const dropDownIcon = (
    <Icons name="ArrowDownSmall" size={20} color={colors.icon.icDef2} />
  );

  const clearIcon = (
    <div className="relative top-[-4px]">
      <ClearIcon />
    </div>
  );

  const loadingIcon = (
    <Spin
      indicator={
        <LoadingOutlined
          style={{ fontSize: 12, color: colors.icon.icDef2 }}
          spin
        />
      }
    />
  );

  return (
    <AntdSelectStyle
      suffixIcon={props.loading ? loadingIcon : dropDownIcon}
      optionFilterProp="label"
      allowClear={{ clearIcon }}
      ref={ref}
      {...props}
    />
  );
});

const AntdSelectStyle = styled(AntSelect)`
  .ant-select-clear {
    width: 20px;
    height: 20px;
  }
`;

SelectUikit.displayName = "Select";
