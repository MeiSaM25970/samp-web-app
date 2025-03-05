import { Spin } from "antd";
import type { RefSelectProps, TreeSelectProps } from "antd";
import { forwardRef } from "react";
import { TreeSelect as AntTreeSelect } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useTheme } from "@/app/theme";
import Icons from "espil-icons";
import { ClearIcon } from "../ClearIcon";
import styled from "styled-components";

export const TreeSelectUiKit = forwardRef<RefSelectProps, TreeSelectProps>(
  (props, ref) => {
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
      <AntTreeSelectStyle
        suffixIcon={
          props.loading ? loadingIcon : props.open ? null : dropDownIcon
        }
        allowClear={{ clearIcon }}
        prefix={
          props.open && props.showSearch ? (
            <Icons name="Search" color={colors.icon.icDef2} />
          ) : null
        }
        ref={ref}
        {...props}
      />
    );
  }
);

export const AntTreeSelectStyle = styled(AntTreeSelect)`
  .ant-select-clear {
    width: 20px;
    height: 20px;
  }
`;
