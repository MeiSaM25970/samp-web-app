import { InputProps } from "antd";
import { FC } from "react";
import { useTheme } from "@/app/theme";
import { ClearIcon } from "../ClearIcon";
import styled from "styled-components";
import Password from "antd/es/input/Password";
import dynamic from "next/dynamic";
const Icons = dynamic(() => import("espil-icons"), { ssr: false });

export const PasswordUikit: FC<InputProps> = (props) => {
  const {
    theme: { colors },
  } = useTheme();

  const visibleIcon = <Icons name="EyeClosed" color={colors.icon.icDef2} />;

  const unVisibleIcon = <Icons name="ViewOutline" color={colors.icon.icDef2} />;

  return (
    <PasswordUikitContainer
      {...props}
      allowClear={{ clearIcon: <ClearIcon /> }}
      iconRender={(visible) => {
        if (!visible) {
          return visibleIcon;
        } else {
          return unVisibleIcon;
        }
      }}
    />
  );
};

const PasswordUikitContainer = styled(Password)`
  height: 49px;
  .ant-input-password-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
