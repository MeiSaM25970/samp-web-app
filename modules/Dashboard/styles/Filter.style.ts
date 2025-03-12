"use client";
import { Flex } from "antd";
import styled from "styled-components";

export const FilterContainer = styled(Flex)`
  flex-direction: column;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.background.baseBg};
  /* 3 */
  box-shadow: 2px 6px 16px 0px rgba(0, 0, 0, 0.18);
  padding: 16px 12px;
  min-height: calc(100vh - 300px);
  .checkBoxGroup {
    display: flex;
    flex-direction: column;
  }
`;
export const FilterModalMobileContainer = styled.div`
  width: 100%;
  .checkBoxGroup {
    display: flex;
    flex-direction: column;
  }
`;
