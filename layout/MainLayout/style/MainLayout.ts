"use client";

import { breakPointsMd } from "@/constants/screen";
import { Layout } from "antd";
import styled from "styled-components";

const { Content } = Layout;

export const MainLayoutStyled = styled(Content)`
  background: ${({ theme }) => theme.colors.background.baseBg};
  min-height: calc(100vh - 88px);
  padding: 16px 32px 24px;
  .language-box {
    margin: 20px 0 0 30px;
  }
  @media only screen and (max-width: ${breakPointsMd}px) {
    padding: 16px 12px 24px 12px;
    min-height: calc(100vh - 60px);
  }
`;
