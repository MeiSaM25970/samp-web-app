"use client";
import { Flex } from "antd";
import styled from "styled-components";

export const CardContainer = styled(Flex)`
  padding: 16px;
  gap: 40px;
  align-self: stretch;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.background.baseBg};
  /* 3 */
  box-shadow: 2px 6px 16px 0px rgba(0, 0, 0, 0.18);
  height: 288px;
`;
