"use client";
import { breakPointsMd } from "@/constants/screen";
import { Flex } from "antd";
import styled from "styled-components";
export const MainHeaderContainer = styled(Flex)`
  background: ${(props) => props.theme.colors.background.baseBg};
  padding: 16px 24px;
  height: 88px;
  align-items: center;
  box-shadow: 2px 4px 15px 0px rgba(0, 0, 0, 0.1) !important;
  z-index: 2;

  .samp {
    font-family: LEMON MILK;
    font-weight: 500;
    font-size: 24px;
    color: ${(props) => props.theme.colors.icon.icPri};
  }
  .des {
    font-family: Doran !important;
    font-weight: 500;
    font-size: 20px;
    color: ${(props) => props.theme.colors.text.primaryText};
  }
  .sampFa {
    font-family: Doran !important;
    font-weight: 500;
    font-size: 20px;
    color: ${(props) => props.theme.colors.icon.icPri};
  }
  @media only screen and (max-width: ${breakPointsMd}px) {
    height: 60px;
    .samp {
      font-family: LEMON MILK;
      font-weight: 500;
      font-size: 20px;
      color: ${(props) => props.theme.colors.icon.icPri};
    }
  }
`;
