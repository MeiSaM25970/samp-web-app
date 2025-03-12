"use client";
import { Row } from "antd";
import styled from "styled-components";

export const MapProjectInfoContainer = styled(Row)`
  padding: 16px;
  align-self: stretch;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.background.baseBg};
  /* 3 */
  box-shadow: 2px 6px 16px 0px rgba(0, 0, 0, 0.18);
  /* height: 288px; */
  .rectHolder {
    border-radius: 6px;
    background: ${({ theme }) => theme.colors.icon.icDisable};
    width: 2px;
    height: 20px;
  }
  .statusHolder {
    border-radius: 8px;
    border: 1px solid var(--Chips-Strock-Chip-St-Green, #97d4b4);
    background: ${({ theme }) => theme.colors.chips.bg.green};
    display: flex;
    width: 75px;
    padding: var(--Spacing-Horizontal-6_6_6, 6px)
      var(--Spacing-Horizontal-8_8_8, 8px);
    justify-content: center;
    align-items: center;
  }
  .grayHolder {
    padding: 4px 12px;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.project.priceBG};
    align-items: center;
  }
  .ant-tabs-content-holder {
    margin-top: 24px;
  }
  .projectProgress {
    width: 100%;
    display: flex;
    padding: 4px 12px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    align-self: stretch;
    border-radius: 8px;
    background: var(--Project-PriceBG, #eee);
  }
`;
