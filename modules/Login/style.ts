"use client";

import { breakPointsSm } from "@/constants/screen";
import { Row } from "antd";
import styled from "styled-components";

export const LoginContainer = styled(Row)`
  background: url(/images/loginLogo.svg);
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;

  @media only screen and (max-width: ${breakPointsSm}px) {
    background-position: left bottom;
  }
  .loginFormContainer {
    padding: var(--Spacing-Vertical-32_32_32, 32px)
      var(--Spacing-Horizontal-24_24_24, 24px);
    gap: 24px;
    border-radius: var(--Radius-16-16-20, 16px);
    background: ${(props) => props.theme.colors.background.baseBg};
    box-shadow: 2px 6px 16px 0px rgba(0, 0, 0, 0.18);
  }
  .rectangleHolder {
    height: 2.2px;
    width: 100%;
    background: ${(props) => props.theme.colors.icon.icDef2};
  }
`;
